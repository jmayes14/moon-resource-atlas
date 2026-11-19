// Moon Resource Atlas, map engine v2.
// The Moon is drawn pixel by pixel on a canvas (orthographic projection) from NASA's LROC color map,
// with lighting and resource "glow" layers blended into the surface. Missions and labels are SVG (d3).
(function () {
  const box = document.getElementById("globe");
  const canvas = box.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const svg = d3.select(box).select("svg");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DEG = Math.PI / 180;
  const TEX_SHIFT = 0.5;   // NASA LROC map has longitude 0 in the middle (checked against Copernicus and Mare Crisium)

  const state = {
    lon: 20, lat: 8, zoom: 1,
    mode: "both",                     // both | res | mis
    layers: new Set(Object.keys(RESOURCES).filter(k => RESOURCES[k].on)),
    who: new Set(Object.keys(COUNTRIES)),
    status: new Set(["landed", "partial", "crashed", "planned"]),
    showAll: false,                   // landing sites are hidden until a mission is picked (or "show all" is on)
    selected: null,
    shift: +(box.dataset.shift || 0),
    size: +(box.dataset.size || 0.44),
  };

  // Resource glow colors (RGB)
  const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
  const GLOW = Object.fromEntries(Object.entries(RESOURCES).map(([k, r]) => [k, hex(r.color)]));
  const GLOW_STRENGTH = { he3: 0.75, ice: 1.0, ree: 0.6, ti: 0.85, fe: 0.62, al: 0.55 };

  let W = 0, H = 0, Q = 1, tex = null, tw = 0, th = 0, img = null;
  const GW = 2048, GH = 1024;         // resolution of the resource fields
  const field = {};                   // key -> Uint8Array(GW*GH), 0..255

  // ---------- texture + resource fields ----------
  const image = new Image();
  image.src = "assets/moon.jpg";
  let fieldsReady = false;
  image.onload = () => {
    const c = document.createElement("canvas");
    tw = c.width = image.naturalWidth; th = c.height = image.naturalHeight;
    const cx = c.getContext("2d");
    cx.drawImage(image, 0, 0);
    tex = cx.getImageData(0, 0, tw, th).data;
    draw();                              // show the Moon right away
    setTimeout(buildFields, 30);         // then build the resource glows in the background
  };

  const smooth = (a, b, x) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t); };
  const vec = (lon, lat) => { const l = lon * DEG, b = lat * DEG; return [Math.cos(b) * Math.cos(l), Math.cos(b) * Math.sin(l), Math.sin(b)]; };

  // Fields are illustrations built from published maps, shaped by the real terrain:
  //  helium-3: dark lava plains (maria), brightest inside the richer areas of the USGS model
  //  water ice: craters with permanently shadowed floors near the poles
  //  rare earths & thorium: the KREEP region around the Imbrium basin (Lunar Prospector, USGS)
  //  titanium: lava plains scaled by surface blueness (the LROC method uses the same color effect)
  //  iron: lava plains plus the South Pole-Aitken basin floor; aluminum: bright highlands
  function buildFields() {
    const N = GW * GH;
    const L = new Float32Array(N), BR = new Float32Array(N);
    for (let y = 0; y < GH; y++) {
      const row = Math.floor((y + 0.5) / GH * th) * tw;
      for (let x = 0; x < GW; x++) {
        const ti = (row + Math.floor((x + 0.5) / GW * tw)) * 4;
        L[y * GW + x] = 0.3 * tex[ti] + 0.59 * tex[ti + 1] + 0.11 * tex[ti + 2];
        BR[y * GW + x] = tex[ti + 2] / (tex[ti] + 1);   // blueness; checked: Tranquillitatis 0.97 vs Serenitatis 0.90
      }
    }
    const Lb = blur(L, 4), BRb = blur(BR, 5);
    const he3C = RESOURCES.he3.areas.map(a => ({ v: vec(a.c[0], a.c[1]), s: (a.c[2] * 0.9 * DEG) ** 2 }));
    const craters = RESOURCES.ice.spots.map(c => ({ v: vec(c.ll[0], c.ll[1]), s: ((c.d / 2 / 30.3) * 0.85 * DEG) ** 2 }));
    const reeV = vec(-25, 18), reeS = (26 * DEG) ** 2, imbV = vec(-17, 33), spaV = vec(-169, -53);
    for (const k of ["he3", "ice", "ree", "ti", "fe", "al"]) field[k] = new Uint8Array(N);
    const cosL = new Float32Array(GW), sinL = new Float32Array(GW);
    for (let x = 0; x < GW; x++) { const l = ((x + 0.5) / GW - TEX_SHIFT) * 2 * Math.PI; cosL[x] = Math.cos(l); sinL[x] = Math.sin(l); }
    const ringCos0 = Math.cos(36 * DEG), spaCos0 = Math.cos(38 * DEG);
    let y = 0;
    (function chunk() {
      const t0 = performance.now();
      for (; y < GH && performance.now() - t0 < 24; y++) {
        const lat = 90 - (y + 0.5) / GH * 180, alat = Math.abs(lat);
        const cb = Math.cos(lat * DEG), sb = Math.sin(lat * DEG);
        const notPolar = 1 - smooth(68, 76, alat), he3Lat = 1 - smooth(60, 75, alat);
        for (let x = 0; x < GW; x++) {
          const i = y * GW + x, lum = Lb[i];
          const px = cb * cosL[x], py = cb * sinL[x], pz = sb;
          const maria = smooth(128, 92, lum);
          // helium-3
          if (maria > 0 && he3Lat > 0) {
            let rich = 0;
            for (const c of he3C) { const d = 1 - (px * c.v[0] + py * c.v[1] + pz * c.v[2]); if (d < 4 * c.s) rich = Math.max(rich, Math.exp(-2 * d / c.s)); }
            field.he3[i] = 255 * maria * (0.2 + 0.8 * rich) * he3Lat;
          }
          // water ice
          if (alat > 80) {
            let ice = 0;
            for (const c of craters) { const d = 1 - (px * c.v[0] + py * c.v[1] + pz * c.v[2]); if (d < 4 * c.s) ice = Math.max(ice, Math.exp(-2 * d / c.s)); }
            field.ice[i] = 255 * Math.min(1, smooth(0.12, 0.75, ice) * (0.7 + 0.3 * smooth(110, 50, L[i])));
          }
          // rare earths & thorium
          const dr = 1 - (px * reeV[0] + py * reeV[1] + pz * reeV[2]);
          if (dr < 4 * reeS) {
            const blob = Math.exp(-2 * dr / reeS);
            const ci = px * imbV[0] + py * imbV[1] + pz * imbV[2];
            const ring = ci > ringCos0 ? Math.exp(-(((Math.acos(Math.min(1, ci)) / DEG) - 18) ** 2) / 72) : 0;
            field.ree[i] = 255 * Math.min(1, 0.65 * blob + 0.6 * ring * blob ** 0.3) * (0.7 + 0.3 * smooth(80, 160, L[i]));
          }
          // titanium
          if (maria > 0) field.ti[i] = 255 * maria * smooth(0.905, 0.975, BRb[i]) * notPolar;
          // iron and aluminum
          const cs = px * spaV[0] + py * spaV[1] + pz * spaV[2];
          const spaIn = cs > spaCos0 ? 1 - smooth(26, 36, Math.acos(Math.min(1, cs)) / DEG) : 0;
          field.fe[i] = 255 * Math.max(maria * (0.45 + 0.55 * smooth(105, 65, lum)), spaIn * 0.5) * notPolar;
          field.al[i] = 255 * (1 - maria) * (0.35 + 0.65 * smooth(125, 190, lum)) * smooth(105, 135, lum) * (1 - 0.6 * spaIn) * (0.6 + 0.4 * notPolar);
        }
      }
      if (y < GH) setTimeout(chunk, 0);
      else { fieldsReady = true; draw(); }
    })();
  }
  function blur(src, r) {
    const tmp = new Float32Array(src.length), out = new Float32Array(src.length);
    for (let y = 0; y < GH; y++) { let s = 0; for (let x = -r; x <= r; x++) s += src[y * GW + ((x + GW) % GW)];
      for (let x = 0; x < GW; x++) { tmp[y * GW + x] = s / (2 * r + 1); s += src[y * GW + ((x + r + 1) % GW)] - src[y * GW + ((x - r + GW) % GW)]; } }
    for (let x = 0; x < GW; x++) { let s = 0; for (let y = -r; y <= r; y++) s += tmp[Math.max(0, Math.min(GH - 1, y)) * GW + x];
      for (let y = 0; y < GH; y++) { out[y * GW + x] = s / (2 * r + 1); s += tmp[Math.min(GH - 1, y + r + 1) * GW + x] - tmp[Math.max(0, y - r) * GW + x]; } }
    return out;
  }
  function fieldAt(key, lon, lat) {
    const f = field[key]; if (!f || !fieldsReady) return 0;
    let u = (lon / 360 + TEX_SHIFT) % 1; if (u < 0) u += 1;
    const y = Math.min(GH - 1, Math.max(0, Math.floor((90 - lat) / 180 * GH)));
    return f[y * GW + Math.floor(u * GW)] / 255;
  }

  function radius() { return Math.min(W, H) * state.size * state.zoom; }
  function centerX() { return W / 2 + state.shift * W; }

  // ---------- Moon picture ----------
  // Sunlight comes from the upper left of the screen, so the Moon looks round.
  const SUN = (() => { const v = [-0.45, 0.5, 0.74]; const n = Math.hypot(...v); return v.map(x => x / n); })();
  function paint(step) {
    if (!tex || !img) return;
    const bw = img.width, bh = img.height, out = img.data;
    const r = radius() * Q, cx = centerX() * Q, cy = bh / 2;
    const lon0 = state.lon * DEG, lat0 = state.lat * DEG;
    const sl = Math.sin(lat0), cl = Math.cos(lat0);
    const showRes = state.mode !== "mis" && fieldsReady;
    const keys = showRes ? [...state.layers] : [];
    const fl = keys.map(k => field[k]), cols = keys.map(k => GLOW[k]), str = keys.map(k => GLOW_STRENGTH[k]);
    const dim = keys.length ? 0.82 : 1; // dim the surface a little so glows stand out
    out.fill(0);
    const y0 = Math.max(0, Math.floor(cy - r - 2)), y1 = Math.min(bh, Math.ceil(cy + r + 2));
    for (let py = y0 - (y0 % step); py < y1; py += step) {
      const y = (cy - py) / r;
      const xr = Math.sqrt(Math.max(0, 1 - y * y)) * r;
      const x0 = Math.max(0, Math.floor(cx - xr - 2)), x1 = Math.min(bw, Math.ceil(cx + xr + 2));
      for (let px = x0 - (x0 % step); px < x1; px += step) {
        const x = (px - cx) / r;
        const rho2 = x * x + y * y;
        if (rho2 > 1) continue;
        const cosc = Math.sqrt(1 - rho2);
        const lat = Math.asin(Math.max(-1, Math.min(1, cosc * sl + y * cl)));
        const lon = lon0 + Math.atan2(x, cosc * cl - y * sl);
        let u = (lon / (2 * Math.PI) + TEX_SHIFT) % 1; if (u < 0) u += 1;
        const vrow = Math.min(th - 1, ((Math.PI / 2 - lat) / Math.PI) * th | 0);
        const ti = (vrow * tw + (u * tw | 0)) * 4;
        // lighting: view-space normal is (x, y, cosc)
        const ndl = x * SUN[0] + y * SUN[1] + cosc * SUN[2];
        const light = (0.38 + 0.62 * Math.max(0, 0.35 + 0.65 * ndl)) * (0.72 + 0.28 * Math.sqrt(cosc)) * dim;
        let R = ((tex[ti] - 120) * 1.22 + 108) * light, G = ((tex[ti + 1] - 120) * 1.22 + 108) * light, B = ((tex[ti + 2] - 120) * 1.22 + 110) * light;
        if (fl.length) {
          const gi = Math.min(GH - 1, ((Math.PI / 2 - lat) / Math.PI) * GH | 0) * GW + (u * GW | 0);
          for (let k = 0; k < fl.length; k++) {
            const a = fl[k][gi] / 255 * str[k];
            if (a > 0.01) {
              // tint by the surface brightness, so craters and ridges stay visible under the color
              const c = cols[k], lf = 0.42 + 0.7 * Math.min(1.4, (R + G + B) / 420);
              R += (c[0] * lf - R) * a; G += (c[1] * lf - G) * a; B += (c[2] * lf - B) * a;
            }
          }
        }
        for (let dy = 0; dy < step && py + dy < bh; dy++) {
          let oi = ((py + dy) * bw + px) * 4;
          for (let dx = 0; dx < step && px + dx < bw; dx++, oi += 4) { out[oi] = R; out[oi + 1] = G; out[oi + 2] = B; out[oi + 3] = 255; }
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // ---------- overlays ----------
  const proj = d3.geoOrthographic().clipAngle(90);
  const path = d3.geoPath(proj);
  const defs = svg.append("defs");
  const rg = defs.append("radialGradient").attr("id", "rimglow");
  [[0, 0], [92, 0], [94, 0.2], [100, 0]].forEach(([o, a]) => rg.append("stop").attr("offset", o + "%").attr("stop-color", "#9fc3ff").attr("stop-opacity", a));
  const gRim = svg.append("circle").attr("fill", "url(#rimglow)").style("pointer-events", "none");
  const gGrid = svg.append("path").attr("fill", "none").attr("stroke", "rgb(255 255 255 / 6%)").style("pointer-events", "none");
  const gRegions = svg.append("g");
  const gMarks = svg.append("g");
  const gLabels = svg.append("g").style("pointer-events", "none");
  const gTip = svg.append("g").style("pointer-events", "none").attr("opacity", 0);
  gTip.append("rect").attr("rx", 6).attr("fill", "rgb(10 12 16 / 92%)").attr("stroke", "rgb(255 255 255 / 20%)");
  gTip.append("text").attr("class", "tip1").attr("fill", "#fff").attr("font-weight", 700).attr("font-size", 13);
  gTip.append("text").attr("class", "tip2").attr("fill", "#b7bec8").attr("font-size", 11.5);

  function visible(ll) { return d3.geoDistance(ll, [state.lon, state.lat]) < Math.PI / 2 - 0.03; }
  function missionShown(m) { return state.who.has(m.who) && state.status.has(m.status); }
  const STATUS = { landed: "Landed", partial: "Landed, but tipped over or damaged", crashed: "Failed landing", planned: "Planned" };
  const FEATURED = new Set(["a11", "a17", "ce4", "ce6", "ch3", "ce7", "bg1", "slim"]);
  const isPolar = m => { const ll = m.ll || [m.region[0], m.region[1]]; return ll[1] < -78; };

  function overlays() {
    proj.rotate([-state.lon, -state.lat]).scale(radius()).translate([centerX(), H / 2]);
    const R = radius();
    gRim.attr("cx", centerX()).attr("cy", H / 2).attr("r", R * 1.07);
    gGrid.attr("d", state.zoom > 1.6 ? path(d3.geoGraticule10()) : null);

    const showM = state.mode !== "res";
    let all = showM && state.showAll ? MISSIONS.filter(missionShown) : [];
    if (state.selected && !all.includes(state.selected)) all = all.concat([state.selected]);
    const cluster = showM && state.showAll && state.zoom < 1.75;
    const polar = cluster ? all.filter(m => isPolar(m) && m !== state.selected) : [];
    const singles = all.filter(m => !polar.includes(m));

    // planned regions (no exact site): soft dashed outline
    const regs = singles.filter(m => m.region && visible([m.region[0], m.region[1]]));
    const rp = gRegions.selectAll("path").data(regs, d => d.id);
    rp.exit().remove();
    rp.enter().append("path").style("cursor", "pointer")
      .on("click", (e, d) => { e.stopPropagation(); select({ type: "mission", d }); })
      .on("mouseenter", (e, d) => tip(d, proj([d.region[0], d.region[1]]))).on("mouseleave", hideTip)
      .merge(rp)
      .attr("d", d => path(d3.geoCircle().center([d.region[0], d.region[1]]).radius(d.region[2] * 0.7)()))
      .attr("fill", d => COUNTRIES[d.who].color).attr("fill-opacity", d => d === state.selected ? 0.22 : 0.06)
      .attr("stroke", d => COUNTRIES[d.who].color).attr("stroke-opacity", 0.9).attr("stroke-width", d => d === state.selected ? 2.4 : 1.3)
      .attr("stroke-dasharray", "3 4");

    // mission markers
    const dots = singles.filter(m => m.ll && visible(m.ll));
    const mk = gMarks.selectAll("g.m").data(dots, d => d.id);
    mk.exit().remove();
    const en = mk.enter().append("g").attr("class", "m").style("cursor", "pointer")
      .on("click", (e, d) => { e.stopPropagation(); select({ type: "mission", d }); })
      .on("mouseenter", (e, d) => tip(d, proj(d.ll))).on("mouseleave", hideTip);
    en.append("circle").attr("r", 14).attr("fill", "transparent");
    en.each(function (d) {
      const g = d3.select(this), c = COUNTRIES[d.who].color;
      if (d.status === "landed" || d.status === "partial") {
        g.append("circle").attr("r", 7.5).attr("fill", "rgb(0 0 0 / 45%)");
        g.append("circle").attr("r", 5.2).attr("fill", c).attr("stroke", "#fff").attr("stroke-width", 1.6).attr("stroke-dasharray", d.status === "partial" ? "2.2 1.8" : null);
      } else if (d.status === "planned") {
        if (!reduce) g.append("circle").attr("class", "pulse").attr("r", 6).attr("fill", "none").attr("stroke", c).attr("stroke-width", 2);
        g.append("circle").attr("r", 5.5).attr("fill", "rgb(0 0 0 / 55%)").attr("stroke", c).attr("stroke-width", 2.6);
        g.append("circle").attr("r", 1.8).attr("fill", c);
      } else {
        g.append("path").attr("d", "M-4,-4L4,4M4,-4L-4,4").attr("stroke", "rgb(0 0 0 / 60%)").attr("stroke-width", 4.5).attr("stroke-linecap", "round");
        g.append("path").attr("d", "M-4,-4L4,4M4,-4L-4,4").attr("stroke", c).attr("stroke-width", 2.2).attr("stroke-linecap", "round");
      }
      g.append("circle").attr("class", "sel").attr("r", 11).attr("fill", "none").attr("stroke", "#fff").attr("stroke-width", 2);
      if (!reduce) g.append("circle").attr("class", "selpulse").attr("r", 11).attr("fill", "none").attr("stroke", c).attr("stroke-width", 2.5);
    });
    gMarks.selectAll("g.m").attr("transform", d => { const p = proj(d.ll); return `translate(${p[0]},${p[1]})`; })
      .call(sel => { sel.select(".sel").attr("opacity", d => d === state.selected ? 1 : 0); sel.select(".selpulse").attr("opacity", d => d === state.selected ? 1 : 0).classed("pulse-sel", d => d === state.selected); });

    // south pole cluster badge
    const cl = polar.length ? [{ n: polar.length, list: polar }] : [];
    const poleLL = [0, -89.5];
    const cb = gMarks.selectAll("g.cluster").data(cl.filter(() => visible(poleLL) || d3.geoDistance(poleLL, [state.lon, state.lat]) < Math.PI / 2 + 0.02));
    cb.exit().remove();
    const ce = cb.enter().append("g").attr("class", "cluster").style("cursor", "pointer")
      .on("click", e => { e.stopPropagation(); setView("south"); });
    ce.append("circle").attr("r", 19).attr("fill", "rgb(8 10 14 / 88%)").attr("stroke", "#fff").attr("stroke-width", 1.5);
    ce.append("g").attr("class", "donut");
    ce.append("text").attr("text-anchor", "middle").attr("dy", 5).attr("fill", "#fff").attr("font-weight", 800).attr("font-size", 15);
    const cAll = gMarks.selectAll("g.cluster");
    cAll.attr("transform", () => { let p = proj(poleLL); if (!p) p = [centerX(), H / 2 + R]; return `translate(${p[0]},${Math.min(p[1], H / 2 + R - 6)})`; });
    cAll.select("text").text(d => d.n);
    cAll.each(function (d) {
      const counts = d3.rollups(d.list, v => v.length, m => m.who);
      const arcs = d3.pie().value(v => v[1]).sort(null)(counts);
      d3.select(this).select(".donut").selectAll("path").data(arcs).join("path")
        .attr("d", d3.arc().innerRadius(19).outerRadius(24)).attr("fill", a => COUNTRIES[a.data[0]].color);
    });

    labels(dots, regs, cAll.size() ? polar.length : 0);
  }

  function labels(dots, regs, clusterN) {
    const items = [];
    const z = state.zoom;
    if (state.mode !== "mis" && fieldsReady) {
      for (const [k, res] of Object.entries(RESOURCES)) {
        if (!state.layers.has(k)) continue;
        for (const a of res.areas) {
          const ll = a.lp || [a.c[0], a.c[1]];
          if (!visible(ll)) continue;
          const p = proj(ll);
          items.push({ x: p[0], y: p[1], text: a.label || res.name, fill: res.color, size: 11, upper: true, pri: 2, anchor: "middle" });
        }
      }
    }
    for (const d of dots) {
      if (!(d === state.selected || (state.showAll && FEATURED.has(d.id) && z >= 1) || z >= 2.2)) continue;
      const p = proj(d.ll);
      items.push({ x: p[0] + 11, y: p[1] + 4, text: d.name.replace(/ \(.*\)$/, ""), fill: "#fff", size: 12, pri: d === state.selected ? 0 : 3, anchor: "start" });
    }
    for (const d of regs) {
      if (!(d === state.selected || z >= 1.75)) continue;
      const p = proj([d.region[0], d.region[1]]);
      items.push({ x: p[0], y: p[1] + 4, text: d.name.replace(/ \(.*\)$/, ""), fill: COUNTRIES[d.who].color, size: 12, pri: d === state.selected ? 0 : 4, anchor: "middle" });
    }
    if (clusterN) {
      let p = proj([0, -89.5]); if (!p) p = [centerX(), H / 2 + radius()];
      items.push({ x: p[0] + 30, y: Math.min(p[1], H / 2 + radius() - 6) + 4, text: `South pole: ${clusterN} missions · click to zoom`, fill: "#fff", size: 12, pri: 1, anchor: "start" });
    }
    items.sort((a, b) => a.pri - b.pri);
    const placed = [], keep = [];
    for (const it of items) {
      const w = it.text.length * (it.upper ? 7.4 : 6.7), h = 15;
      const x0 = it.anchor === "middle" ? it.x - w / 2 : it.x;
      const b = { x0, x1: x0 + w, y0: it.y - 12, y1: it.y + 4 };
      if (b.x0 < 4 || b.x1 > W - 4 || b.y0 < 4 || b.y1 > H - 4) continue;
      if (placed.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue;
      placed.push(b); keep.push(it);
    }
    gLabels.selectAll("text").data(keep).join("text")
      .attr("class", d => d.upper ? "lbl area" : "lbl").attr("x", d => d.x).attr("y", d => d.y)
      .attr("text-anchor", d => d.anchor).attr("fill", d => d.fill).text(d => d.upper ? d.text.toUpperCase() : d.text);
  }

  function tip(m, p) {
    if (!p) return;
    const st = STATUS[m.status];
    gTip.select(".tip1").text(m.name).attr("x", 12).attr("y", 20);
    gTip.select(".tip2").text(`${COUNTRIES[m.who].name} · ${st} · ${m.year}`).attr("x", 12).attr("y", 37);
    const w = Math.max(gTip.select(".tip1").node().getComputedTextLength(), gTip.select(".tip2").node().getComputedTextLength()) + 24;
    gTip.select("rect").attr("width", w).attr("height", 48);
    let x = p[0] + 14, y = p[1] - 58;
    if (x + w > W - 6) x = p[0] - w - 14;
    if (y < 6) y = p[1] + 14;
    gTip.attr("transform", `translate(${x},${y})`).attr("opacity", 1);
  }
  function hideTip() { gTip.attr("opacity", 0); }

  // ---------- drawing ----------
  let raf = 0, fastFlag = false;
  function draw(fast) {
    fastFlag = fastFlag || !!fast;
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; paint(fastFlag ? 3 : 1); fastFlag = false; overlays(); });
  }
  function resize() {
    const r = box.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    Q = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(W * Q); canvas.height = Math.round(H * Q);
    img = ctx.createImageData(canvas.width, canvas.height);
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    draw();
  }
  new ResizeObserver(resize).observe(box);

  // ---------- interaction ----------
  let dragging = false;
  svg.call(d3.drag().clickDistance(4)
    .on("start", () => { dragging = true; hideTip(); box.querySelector(".hint")?.remove(); })
    .on("drag", e => {
      const k = 180 / Math.PI / radius();
      state.lon = wrap(state.lon - e.dx * k);
      state.lat = Math.max(-90, Math.min(90, state.lat + e.dy * k));
      draw(true);
    })
    .on("end", () => { dragging = false; draw(); }));
  svg.on("click", e => {
    if (dragging) return;
    const ll = proj.invert(d3.pointer(e));
    if (ll && visible(ll) && state.mode !== "mis") {
      let best = null, bv = 0.18;
      for (const k of state.layers) { const v = fieldAt(k, ll[0], ll[1]); if (v > bv) { bv = v; best = k; } }
      if (best) return select({ type: "res", key: best, ll });
    }
    select(null);
  });
  svg.on("wheel", e => {
    if (!e.ctrlKey && !e.metaKey) return; // only zoom with ctrl/cmd or pinch, so the page still scrolls
    e.preventDefault();
    state.zoom = Math.max(0.8, Math.min(6, state.zoom * Math.exp(-e.deltaY * 0.01)));
    draw(true); clearTimeout(svg._t); svg._t = setTimeout(() => draw(), 120);
  }, { passive: false });

  function wrap(l) { return ((l + 540) % 360) - 180; }
  function fly(lon, lat, zoom) {
    if (reduce) { state.lon = lon; state.lat = lat; if (zoom) state.zoom = zoom; draw(); return; }
    const l0 = state.lon, b0 = state.lat, z0 = state.zoom, dl = wrap(lon - l0), z1 = zoom || z0;
    d3.select(box).transition().duration(1000).ease(d3.easeCubicInOut)
      .tween("fly", () => t => { state.lon = wrap(l0 + dl * t); state.lat = b0 + (lat - b0) * t; state.zoom = z0 + (z1 - z0) * t; draw(t < 1); });
  }
  const VIEWS = { near: [15, 6, 1], far: [170, 0, 1], south: [40, -87.6, 4.6], north: [-60, 87, 4] };
  function setView(name) {
    const v = VIEWS[name]; if (!v) return;
    document.querySelectorAll("[data-view]").forEach(x => x.setAttribute("aria-pressed", x.dataset.view === name));
    fly(v[0], v[1], v[2]);
  }
  document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => setView(b.dataset.view)));
  function setMode(m) {
    state.mode = m;
    document.querySelectorAll("[data-mode]").forEach(x => x.setAttribute("aria-pressed", x.dataset.mode === m));
    draw();
  }
  document.querySelectorAll("[data-mode]").forEach(b => b.addEventListener("click", () => setMode(b.dataset.mode)));
  box.querySelector("[data-zoom='in']")?.addEventListener("click", () => fly(state.lon, state.lat, Math.min(6, state.zoom * 1.5)));
  box.querySelector("[data-zoom='out']")?.addEventListener("click", () => fly(state.lon, state.lat, Math.max(0.8, state.zoom / 1.5)));

  // ---------- side panels ----------
  // Resource details appear in a small card over the map (#info); missions use the Missions panel (#mpanel).
  const info = document.getElementById("info") || document.createElement("div");
  const mp = document.getElementById("mpanel");
  const ORDER = ["ru", "us", "cn", "in", "jp", "il", "kr", "ot"];
  const GROUP = m => m.status === "planned" ? "planned" : m.status === "crashed" ? "failed" : "landed";
  const EXTRA = UNMAPPED.map((m, i) => ({ ...m, id: "u" + i, nosite: true }));
  const ALL = MISSIONS.concat(EXTRA);
  let mpTab = "landed";

  function locate(m) {
    const ll = m.ll || (m.region && [m.region[0], m.region[1]]);
    if (!ll) return;
    const polarZ = Math.abs(ll[1]) > 70;
    if (!visible(ll) || d3.geoDistance(ll, [state.lon, state.lat]) > 0.3 || state.zoom < (polarZ ? 2 : 1.4))
      fly(ll[0], Math.max(-84, Math.min(84, ll[1])), Math.max(state.zoom, polarZ ? 2.6 : 1.7));
  }

  function select(sel) {
    if (!sel) { state.selected = null; info.hidden = true; if (mp) mpList(); draw(); return; }
    if (sel.type === "mission") {
      const m = sel.d;
      state.selected = m.nosite ? null : m;
      info.hidden = true;
      if (mp) mpDetail(m); else {
        info.hidden = false;
        info.innerHTML = `<h2>${m.name}</h2><p>${m.purpose}</p><div class="src">Source: ${srcList(m.src)}</div>`;
      }
      if (!m.nosite) locate(m);
    } else {
      const res = RESOURCES[sel.key];
      const near = res.areas.slice().sort((a, b) => d3.geoDistance(sel.ll, [a.c[0], a.c[1]]) - d3.geoDistance(sel.ll, [b.c[0], b.c[1]]))[0];
      const nearOK = d3.geoDistance(sel.ll, [near.c[0], near.c[1]]) < (near.c[2] + 8) * DEG;
      info.hidden = false;
      info.innerHTML = `<button class="x" type="button" aria-label="Close">×</button><span class="tag" style="background:${res.color}">${res.name}</span>
        <h2>${nearOK ? near.name : res.name + " here"}</h2>
        <p>${nearOK ? near.note : res.short}</p>
        <div class="src">Source: ${srcList(res.src)}</div>`;
      info.querySelector(".x").addEventListener("click", e => { e.stopPropagation(); info.hidden = true; });
    }
    draw();
  }

  function rowHTML(m) {
    const c = COUNTRIES[m.who];
    const note = m.status === "partial" ? "tipped/damaged" : m.nosite ? "no site" : "";
    return `<li><button type="button" data-id="${m.id}"${state.selected === m ? ' aria-current="true"' : ""}><span class="yr">${m.year}</span><i style="background:${c.color}"></i><span class="nm">${m.name}${note ? ` <em>${note}</em>` : ""}</span><span class="go">›</span></button></li>`;
  }
  function byCountry(list) {
    return ORDER.map(k => [k, list.filter(m => m.who === k).sort((a, b) => a.year - b.year)]).filter(([, l]) => l.length)
      .map(([k, l]) => `<div class="mp-group"><h4><i style="background:${COUNTRIES[k].color}"></i>${COUNTRIES[k].name}<span>${l.length}</span></h4><ul>${l.map(rowHTML).join("")}</ul></div>`).join("");
  }
  function mpTabs() {
    const n = g => ALL.filter(m => GROUP(m) === g || (g === "failed" && m.status === "partial")).length;
    return `<div class="mp-tabs" role="tablist">${[["landed", "Landed"], ["failed", "Failed"], ["planned", "Planned"]].map(([g, t]) =>
      `<button type="button" role="tab" data-tab="${g}" aria-selected="${mpTab === g}">${t} <b>${n(g)}</b></button>`).join("")}</div>`;
  }
  function mpList() {
    if (!mp) return;
    let body = "";
    if (mpTab === "landed") {
      const landed = ALL.filter(m => m.status === "landed");
      const firsts = ORDER.map(k => [k, landed.filter(m => m.who === k).map(m => m.year)]).filter(([, y]) => y.length).map(([k, y]) => [k, Math.min(...y)]);
      body = `<p class="mp-intro"><strong>${firsts.length} countries have landed on the Moon.</strong> Pick a mission to see where it touched down and what it was for.</p>
        <div class="mp-firsts">${firsts.map(([k, y]) => `<span><i style="background:${COUNTRIES[k].color}"></i>${COUNTRIES[k].name} <b>${y}</b></span>`).join("")}</div>
        ${byCountry(ALL.filter(m => GROUP(m) === "landed"))}`;
    } else if (mpTab === "failed") {
      body = `<p class="mp-intro"><strong>Landing on the Moon is hard.</strong> These missions crashed or never arrived. Pick one to see why.</p>
        ${byCountry(ALL.filter(m => m.status === "crashed"))}
        <p class="mp-sub">Landed, but tipped over or damaged</p>${byCountry(ALL.filter(m => m.status === "partial"))}`;
    } else {
      body = `<p class="mp-intro"><strong>Coming next.</strong> Target dates; most Moon missions slip.</p>${byCountry(ALL.filter(m => m.status === "planned"))}`;
    }
    mp.innerHTML = mpTabs() + `<div class="mp-body">${body}</div>`;
    wireMP();
  }
  function mpDetail(m) {
    if (!mp) return;
    mpTab = m.status === "partial" ? mpTab === "failed" ? "failed" : "landed" : GROUP(m);
    const c = COUNTRIES[m.who];
    const cls = { landed: "ok", partial: "warn", crashed: "bad", planned: "plan" }[m.status];
    mp.innerHTML = mpTabs() + `<div class="mp-body mp-detail">
      <button type="button" class="mp-back">← All ${mpTab === "failed" ? "failed" : mpTab} missions</button>
      <div class="mp-tags"><span class="tag" style="background:${c.color}">${c.name}</span><span class="st st-${cls}">${STATUS[m.status]}</span></div>
      <h2>${m.name}</h2>
      <p class="mp-meta">${m.status === "planned" ? "Target " : ""}${m.year} · ${m.org}${m.site ? ` · ${m.site}` : ""}${m.approx ? " (approx.)" : ""}</p>
      <h4>Purpose</h4><p>${m.purpose}</p>
      <h4>${m.status === "planned" ? "Status" : "What happened"}</h4><p>${m.result}</p>
      ${m.why ? `<div class="mp-why"><h4>${m.status === "partial" ? "What went wrong" : "Why it failed"}</h4><p>${m.why}</p></div>` : ""}
      ${m.nosite ? `<p class="mp-note">${m.status === "crashed" ? "It never reached the Moon, so there is no site on the map." : "No public landing site yet, so it is not on the map."}</p>` : `<p class="mp-note">Shown on the Moon with a pulsing ring.</p>`}
      <div class="src">Sources: ${srcList(m.src)}</div></div>`;
    wireMP();
  }
  function wireMP() {
    mp.querySelectorAll("[data-tab]").forEach(b => b.addEventListener("click", () => { mpTab = b.dataset.tab; mpList(); }));
    mp.querySelectorAll("[data-id]").forEach(b => b.addEventListener("click", () => { const m = ALL.find(x => x.id === b.dataset.id); select({ type: "mission", d: m }); if (matchMedia("(max-width: 960px)").matches) box.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); }));
    mp.querySelector(".mp-back")?.addEventListener("click", () => { state.selected = null; draw(); mpList(); });
  }
  if (mp) mpList();
  const allBtn = document.getElementById("showall");
  allBtn?.addEventListener("click", () => { state.showAll = !state.showAll; allBtn.setAttribute("aria-pressed", state.showAll); draw(); });

  // ---------- filters and list ----------
  function chip(container, label, color, on, toggle) {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button"; b.setAttribute("aria-pressed", on);
    b.innerHTML = `<i style="background:${color}"></i>${label}`;
    b.addEventListener("click", () => { const now = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", now); toggle(now); draw(); renderList(); });
    container.appendChild(b);
  }
  const layerBox = document.getElementById("f-layers");
  // Resource picker: one resource at a time, or the overview of the three headline resources.
  const OVERVIEW = Object.keys(RESOURCES).filter(k => RESOURCES[k].on);
  const pickBtns = [];
  function syncPicker() { pickBtns.forEach(b => b.setAttribute("aria-pressed", [...state.layers].sort().join() === b._keys.slice().sort().join())); }
  if (layerBox) {
    const opts = [{ name: "Key resources", sub: "", keys: OVERVIEW, color: `conic-gradient(${OVERVIEW.map(k => RESOURCES[k].color).join(",")})`, group: null }]
      .concat(Object.entries(RESOURCES).map(([k, r]) => ({ name: r.name, keys: [k], color: r.color, group: r.group })));
    let g;
    for (const o of opts) {
      if (o.group !== g) { g = o.group; if (g) { const h = document.createElement("div"); h.className = "grp"; h.textContent = g; layerBox.appendChild(h); } }
      const b = document.createElement("button");
      b.className = "chip pick"; b.type = "button"; b._keys = o.keys;
      b.innerHTML = `<i style="background:${o.color};border-radius:50%"></i>${o.name}${o.sub ? `<small>${o.sub}</small>` : ""}`;
      b.addEventListener("click", () => { state.layers = new Set(o.keys); if (state.mode === "mis") setMode("both"); syncPicker(); ramps(); draw(); });
      layerBox.appendChild(b); pickBtns.push(b);
    }
    syncPicker();
  }
  const rampBox = document.getElementById("ramps");
  function ramps() {
    if (!rampBox) return;
    rampBox.innerHTML = [...state.layers].map(k => { const r = RESOURCES[k];
      return `<div><b>${r.name}</b><span style="background:linear-gradient(90deg,#2b2a28,${r.color})"></span><em><i>${r.ramp[0]}</i><i>${r.ramp[1]}</i></em></div>`; }).join("");
  }
  ramps();
  const whoBox = document.getElementById("f-who");
  if (whoBox) for (const [k, c] of Object.entries(COUNTRIES)) chip(whoBox, c.name, c.color, true, on => on ? state.who.add(k) : state.who.delete(k));
  const stBox = document.getElementById("f-status");
  if (stBox) [["landed", "Landed"], ["crashed", "Crashed"], ["planned", "Planned"]].forEach(([k, n]) => chip(stBox, n, "#d8dee4", true, on => on ? state.status.add(k) : state.status.delete(k)));

  const list = document.getElementById("mlist");
  function renderList() {
    if (!list) return;
    list.innerHTML = "";
    for (const m of MISSIONS.filter(missionShown).slice().sort((a, b) => a.year - b.year)) {
      const li = document.createElement("li");
      li.innerHTML = `<button type="button"><span class="yr">${m.year}</span><i style="background:${COUNTRIES[m.who].color}"></i><span>${m.name}${m.status !== "landed" ? ` <span class='muted'>(${m.status})</span>` : ""}</span></button>`;
      li.querySelector("button").addEventListener("click", () => { select({ type: "mission", d: m }); box.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }); });
      list.appendChild(li);
    }
  }
  renderList();

  // deep links: ?m=ce7 or ?view=south
  const qs = new URLSearchParams(location.search);
  if (VIEWS[qs.get("view")]) { const v = VIEWS[qs.get("view")]; [state.lon, state.lat, state.zoom] = v; }
  const m0 = MISSIONS.find(m => m.id === qs.get("m"));
  if (m0) { const ll = m0.ll || [m0.region[0], m0.region[1]]; state.lon = ll[0]; state.lat = Math.max(-84, Math.min(84, ll[1])); state.zoom = Math.abs(ll[1]) > 70 ? 2.4 : 1.5; setTimeout(() => select({ type: "mission", d: m0 }), 0); }

  window.atlas = {
    fly, draw, state, view: setView,
    pick: id => { const m = MISSIONS.find(x => x.id === id); if (m) select({ type: "mission", d: m }); },
    clear: () => select(null),
    layers: keys => { state.layers = new Set(keys); syncPicker(); ramps(); draw(); },
    who: keys => { state.who = new Set(keys); draw(); renderList(); },
    showAll: on => { state.showAll = !!on; draw(); },
    mode: setMode,
    shift: f => { const s0 = state.shift; if (reduce) { state.shift = f; draw(); return; } d3.select(canvas).transition().duration(700).tween("s", () => t => { state.shift = s0 + (f - s0) * t; draw(t < 1); }); },
  };
})();
