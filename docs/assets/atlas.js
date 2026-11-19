// Moon Resource Atlas: a draggable Moon globe with resource areas and missions.
// The Moon picture is drawn pixel by pixel on a canvas (orthographic projection),
// and everything on top (areas, dots, labels) is drawn in SVG with d3.
(function () {
  const box = document.getElementById("globe");
  const canvas = box.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const svg = d3.select(box).select("svg");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const DEG = Math.PI / 180;
  // Where longitude 0 sits across the width of the Moon picture (0 = left edge, 0.5 = middle).
  // The NASA LROC map has longitude 0 in the middle. Checked against Copernicus crater and Mare Crisium.
  const TEX_SHIFT = 0.5;
  const CONTRAST = 1.25; // makes the dark lava plains (maria) easier to see

  const state = {
    lon: 20, lat: 8, zoom: 1,
    layers: new Set(["he3", "ice", "ree"]),
    who: new Set(Object.keys(COUNTRIES)),
    status: new Set(["landed", "crashed", "planned"]),
    selected: null,
  };

  let W = 0, H = 0, Q = 1, tex = null, tw = 0, th = 0, img = null;

  // ---------- texture ----------
  const image = new Image();
  image.src = "assets/moon.jpg";
  image.onload = () => {
    const c = document.createElement("canvas");
    tw = c.width = image.naturalWidth; th = c.height = image.naturalHeight;
    const cx = c.getContext("2d");
    cx.drawImage(image, 0, 0);
    tex = cx.getImageData(0, 0, tw, th).data;
    draw();
  };

  function radius() { return Math.min(W, H) * 0.46 * state.zoom; }

  // ---------- Moon picture ----------
  function paint(step) {
    if (!tex || !img) return;
    const bw = img.width, bh = img.height, out = img.data;
    const r = radius() * Q, cx = bw / 2, cy = bh / 2;
    const lon0 = state.lon * DEG, lat0 = state.lat * DEG;
    const sl = Math.sin(lat0), cl = Math.cos(lat0);
    const TWO_PI = 2 * Math.PI;
    out.fill(0);
    for (let py = 0; py < bh; py += step) {
      const y = (cy - py) / r;
      for (let px = 0; px < bw; px += step) {
        const x = (px - cx) / r;
        const rho2 = x * x + y * y;
        if (rho2 > 1) continue;
        const cosc = Math.sqrt(1 - rho2);
        const lat = Math.asin(Math.max(-1, Math.min(1, cosc * sl + y * cl)));
        const lon = lon0 + Math.atan2(x, cosc * cl - y * sl);
        let u = (lon / TWO_PI + TEX_SHIFT) % 1; if (u < 0) u += 1;
        const ti = ((Math.min(th - 1, ((Math.PI / 2 - lat) / Math.PI) * th | 0) * tw) + (u * tw | 0)) * 4;
        const shade = 0.42 + 0.58 * Math.sqrt(cosc);
        const R = ((tex[ti] - 120) * CONTRAST + 100) * shade, G = ((tex[ti + 1] - 120) * CONTRAST + 100) * shade, B = ((tex[ti + 2] - 120) * CONTRAST + 100) * shade;
        for (let dy = 0; dy < step && py + dy < bh; dy++) {
          let oi = ((py + dy) * bw + px) * 4;
          for (let dx = 0; dx < step && px + dx < bw; dx++, oi += 4) {
            out[oi] = R; out[oi + 1] = G; out[oi + 2] = B; out[oi + 3] = 255;
          }
        }
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  // ---------- overlays ----------
  const proj = d3.geoOrthographic().clipAngle(90);
  const path = d3.geoPath(proj);
  const grat = d3.geoGraticule10();
  const gGrid = svg.append("path").attr("fill", "none").attr("stroke", "rgb(255 255 255 / 8%)");
  const gRim = svg.append("circle").attr("fill", "none").attr("stroke", "rgb(255 255 255 / 18%)");
  const gAreas = svg.append("g");
  const gMarks = svg.append("g");
  const gLabels = svg.append("g");

  function visible(ll) { return d3.geoDistance(ll, [state.lon, state.lat]) < Math.PI / 2 - 0.02; }

  function missionShown(m) { return state.who.has(m.who) && state.status.has(m.status); }

  function overlays() {
    proj.rotate([-state.lon, -state.lat]).scale(radius()).translate([W / 2, H / 2]);
    gGrid.attr("d", path(grat));
    gRim.attr("cx", W / 2).attr("cy", H / 2).attr("r", radius());

    // resource areas
    const areas = [];
    for (const key of state.layers) {
      const res = RESOURCES[key];
      res.areas.forEach((a, i) => areas.push({ key, res, a, id: key + i }));
    }
    const ap = gAreas.selectAll("path.area").data(areas, d => d.id);
    ap.exit().remove();
    ap.enter().append("path").attr("class", "area").style("cursor", "pointer")
      .on("click", (e, d) => select({ type: "area", d }))
      .merge(ap)
      .attr("d", d => path(d3.geoCircle().center([d.a.c[0], d.a.c[1]]).radius(d.a.c[2])()))
      .attr("fill", d => d.res.color).attr("fill-opacity", 0.2)
      .attr("stroke", d => d.res.color).attr("stroke-width", 1.6).attr("stroke-dasharray", "5 4");

    // ice spots
    const spots = state.layers.has("ice") ? RESOURCES.ice.spots.filter(s => visible(s.ll)) : [];
    const sp = gAreas.selectAll("circle.spot").data(spots, d => d.name);
    sp.exit().remove();
    sp.enter().append("circle").attr("class", "spot").attr("r", 3.5).attr("fill", "#7fdcff").attr("stroke", "#05080c")
      .append("title").text(d => d.name);
    gAreas.selectAll("circle.spot").attr("cx", d => proj(d.ll)[0]).attr("cy", d => proj(d.ll)[1]);

    // mission regions (plans with no exact site)
    const regs = MISSIONS.filter(m => m.region && missionShown(m));
    const rp = gAreas.selectAll("path.region").data(regs, d => d.id);
    rp.exit().remove();
    rp.enter().append("path").attr("class", "region").style("cursor", "pointer")
      .on("click", (e, d) => select({ type: "mission", d }))
      .merge(rp)
      .attr("d", d => path(d3.geoCircle().center([d.region[0], d.region[1]]).radius(d.region[2])()))
      .attr("fill", d => COUNTRIES[d.who].color).attr("fill-opacity", d => d === state.selected ? 0.25 : 0.07)
      .attr("stroke", d => COUNTRIES[d.who].color).attr("stroke-width", d => d === state.selected ? 3 : 1.6)
      .attr("stroke-dasharray", "2 4");

    // mission dots
    const dots = MISSIONS.filter(m => m.ll && missionShown(m) && visible(m.ll));
    const mk = gMarks.selectAll("g.m").data(dots, d => d.id);
    mk.exit().remove();
    const enter = mk.enter().append("g").attr("class", "m").style("cursor", "pointer")
      .on("click", (e, d) => { e.stopPropagation(); select({ type: "mission", d }); });
    enter.append("circle").attr("class", "hit").attr("r", 13).attr("fill", "transparent");
    enter.append("circle").attr("class", "halo").attr("r", 12).attr("fill", "none").attr("stroke", "#fff").attr("stroke-width", 2);
    enter.each(function (d) {
      const g = d3.select(this), c = COUNTRIES[d.who].color;
      if (d.status === "landed") g.append("circle").attr("r", 6).attr("fill", c).attr("stroke", "#05080c").attr("stroke-width", 2);
      else if (d.status === "planned") g.append("circle").attr("r", 6).attr("fill", "rgb(5 8 12 / 60%)").attr("stroke", c).attr("stroke-width", 2.6);
      else g.append("path").attr("d", "M-5,-5L5,5M5,-5L-5,5").attr("stroke", c).attr("stroke-width", 3).attr("stroke-linecap", "round");
      g.append("title").text(`${d.name} (${d.year})`);
    });
    gMarks.selectAll("g.m")
      .attr("transform", d => { const p = proj(d.ll); return `translate(${p[0]},${p[1]})`; })
      .select(".halo").attr("opacity", d => d === state.selected ? 1 : 0);

    labels(areas, dots, regs);
  }

  // Labels with simple collision avoidance.
  function labels(areas, dots, regs) {
    const items = [];
    const z = state.zoom;
    for (const d of areas) {
      const ll = [d.a.c[0], d.a.c[1]];
      if (!visible(ll)) continue;
      const p = proj(ll);
      items.push({ x: p[0], y: p[1], text: d.res.name, cls: "lbl area", fill: d.res.color, pri: 1, anchor: "middle", dy: 4 });
    }
    for (const d of dots) {
      if (!(z >= 1.8 || d === state.selected || d.status === "planned")) continue;
      const p = proj(d.ll);
      items.push({ x: p[0] + 10, y: p[1] + 4, text: short(d.name), cls: "lbl", fill: "#fff", pri: d === state.selected ? 0 : 2, anchor: "start" });
    }
    for (const d of regs) {
      const ll = [d.region[0], d.region[1]];
      if (!visible(ll) || !(z >= 1.6 || d === state.selected)) continue;
      const p = proj(ll);
      items.push({ x: p[0], y: p[1] - 8, text: short(d.name), cls: "lbl", fill: COUNTRIES[d.who].color, pri: d === state.selected ? 0 : 3, anchor: "middle" });
    }
    items.sort((a, b) => a.pri - b.pri);
    const placed = [];
    const keep = [];
    for (const it of items) {
      const w = it.text.length * 6.6, h = 14;
      const x0 = it.anchor === "middle" ? it.x - w / 2 : it.x;
      const b = { x0, x1: x0 + w, y0: it.y - 11 + (it.dy || 0), y1: it.y + 3 + (it.dy || 0) };
      if (b.x0 < 2 || b.x1 > W - 2 || b.y0 < 2 || b.y1 > H - 2) continue;
      if (placed.some(o => b.x0 < o.x1 && b.x1 > o.x0 && b.y0 < o.y1 && b.y1 > o.y0)) continue;
      placed.push(b); keep.push(it);
    }
    const t = gLabels.selectAll("text").data(keep);
    t.exit().remove();
    t.enter().append("text").merge(t)
      .attr("class", d => d.cls).attr("x", d => d.x).attr("y", d => d.y + (d.dy || 0))
      .attr("text-anchor", d => d.anchor).attr("fill", d => d.fill).text(d => d.text);
  }
  function short(n) { return n.replace(/ \(.*\)$/, ""); }

  // ---------- drawing ----------
  let raf = 0, fastFlag = false;
  function draw(fast) {
    fastFlag = fastFlag || !!fast;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      paint(fastFlag ? 3 : 1);
      fastFlag = false;
      overlays();
    });
  }

  function resize() {
    const r = box.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
    Q = Math.min(window.devicePixelRatio || 1, 1.25);
    canvas.width = Math.round(W * Q); canvas.height = Math.round(H * Q);
    img = ctx.createImageData(canvas.width, canvas.height);
    svg.attr("viewBox", `0 0 ${W} ${H}`);
    draw();
  }
  new ResizeObserver(resize).observe(box);

  // ---------- interaction ----------
  let dragging = false;
  svg.call(d3.drag().clickDistance(4)
    .on("start", () => { dragging = true; box.querySelector(".hint")?.remove(); })
    .on("drag", e => {
      const k = 180 / Math.PI / radius();
      state.lon = wrap(state.lon - e.dx * k);
      state.lat = Math.max(-90, Math.min(90, state.lat + e.dy * k));
      draw(true);
    })
    .on("end", () => { dragging = false; draw(); }));
  svg.on("click", () => { if (!dragging) select(null); });

  function wrap(l) { return ((l + 540) % 360) - 180; }

  function fly(lon, lat, zoom) {
    if (reduce) { state.lon = lon; state.lat = lat; if (zoom) state.zoom = zoom; draw(); return; }
    const l0 = state.lon, b0 = state.lat, z0 = state.zoom;
    let dl = wrap(lon - l0);
    const z1 = zoom || z0;
    d3.select(box).transition().duration(900).ease(d3.easeCubicInOut)
      .tween("fly", () => t => {
        state.lon = wrap(l0 + dl * t); state.lat = b0 + (lat - b0) * t; state.zoom = z0 + (z1 - z0) * t;
        draw(t < 1);
      });
  }

  document.querySelectorAll("[data-view]").forEach(b => b.addEventListener("click", () => {
    const v = VIEWS[b.dataset.view];
    document.querySelectorAll("[data-view]").forEach(x => x.setAttribute("aria-pressed", x === b));
    fly(v[0], v[1], v[2]);
  }));
  const VIEWS = { near: [20, 8, 1], far: [170, 0, 1], south: [30, -82, 2], north: [0, 84, 1.8] };

  box.querySelector("[data-zoom='in']").addEventListener("click", () => { state.zoom = Math.min(6, state.zoom * 1.4); draw(); });
  box.querySelector("[data-zoom='out']").addEventListener("click", () => { state.zoom = Math.max(0.8, state.zoom / 1.4); draw(); });

  // ---------- side panel ----------
  const info = document.getElementById("info");
  const defaultInfo = info.innerHTML;

  function select(sel) {
    state.selected = sel && sel.type === "mission" ? sel.d : null;
    if (!sel) { info.innerHTML = defaultInfo; draw(); return; }
    if (sel.type === "mission") {
      const m = sel.d, c = COUNTRIES[m.who];
      const st = { landed: "Landed", crashed: "Crashed", planned: "Planned" }[m.status];
      info.innerHTML = `<span class="tag" style="background:${c.color}">${c.name}</span>
        <h2>${m.name}</h2>
        <p class="muted small">${st} · ${m.status === "planned" ? "target " : ""}${m.year}${m.approx ? " · location approximate" : ""}${m.region ? " · area, no exact site yet" : ""}</p>
        <p>${m.what}</p>
        <div class="src">Source: ${srcList(m.src)}</div>`;
      const ll = m.ll || [m.region[0], m.region[1]];
      if (!visible(ll) || state.zoom < 1.4 || d3.geoDistance(ll, [state.lon, state.lat]) > 0.5) fly(ll[0], Math.max(-84, Math.min(84, ll[1])), Math.max(state.zoom, Math.abs(ll[1]) > 70 ? 2.4 : 1.5));
    } else {
      const { res, a } = sel.d;
      info.innerHTML = `<span class="tag" style="background:${res.color}">${res.name}</span>
        <h2>${a.name}</h2>
        <p>${a.note}</p>
        <p class="muted small">${res.long}</p>
        <div class="src">Source: ${srcList(res.src)}</div>`;
    }
    draw();
  }

  // filter chips
  function chip(container, label, color, on, toggle) {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button";
    b.setAttribute("aria-pressed", on);
    b.innerHTML = `<i style="background:${color}"></i>${label}`;
    b.addEventListener("click", () => { const now = b.getAttribute("aria-pressed") !== "true"; b.setAttribute("aria-pressed", now); toggle(now); draw(); renderList(); });
    container.appendChild(b);
  }
  const layerBox = document.getElementById("f-layers");
  for (const [k, r] of Object.entries(RESOURCES)) chip(layerBox, r.name, r.color, true, on => on ? state.layers.add(k) : state.layers.delete(k));
  const whoBox = document.getElementById("f-who");
  for (const [k, c] of Object.entries(COUNTRIES)) chip(whoBox, c.name, c.color, true, on => on ? state.who.add(k) : state.who.delete(k));
  const stBox = document.getElementById("f-status");
  [["landed", "Landed"], ["crashed", "Crashed"], ["planned", "Planned"]].forEach(([k, n]) =>
    chip(stBox, n, "#d8dee4", true, on => on ? state.status.add(k) : state.status.delete(k)));

  // mission list
  const list = document.getElementById("mlist");
  function renderList() {
    list.innerHTML = "";
    const rows = MISSIONS.filter(missionShown).slice().sort((a, b) => a.year - b.year);
    for (const m of rows) {
      const li = document.createElement("li");
      li.innerHTML = `<button type="button"><span class="yr">${m.year}</span><i style="background:${COUNTRIES[m.who].color}"></i><span>${m.name}${m.status === "crashed" ? " <span class='muted'>(crashed)</span>" : ""}${m.status === "planned" ? " <span class='muted'>(planned)</span>" : ""}</span></button>`;
      li.querySelector("button").addEventListener("click", () => { select({ type: "mission", d: m }); box.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" }); });
      list.appendChild(li);
    }
    const un = UNMAPPED.filter(m => state.who.has(m.who) && state.status.has("planned"));
    if (un.length) {
      const li = document.createElement("li");
      li.innerHTML = `<p class="small muted" style="margin:0.8rem 0 0.3rem">Planned, no public site yet:</p>`;
      list.appendChild(li);
      for (const m of un) {
        const l = document.createElement("li");
        l.innerHTML = `<button type="button"><span class="yr">${m.year}</span><i style="background:${COUNTRIES[m.who].color}"></i><span>${m.name}</span></button>`;
        l.querySelector("button").addEventListener("click", () => {
          state.selected = null;
          info.innerHTML = `<span class="tag" style="background:${COUNTRIES[m.who].color}">${COUNTRIES[m.who].name}</span><h2>${m.name}</h2><p class="muted small">Planned · target ${m.year} · not on the map</p><p>${m.what}</p><div class="src">Source: ${srcList(m.src)}</div>`;
          draw();
        });
        list.appendChild(l);
      }
    }
  }
  renderList();

  // deep links: ?m=ce7 or ?view=south
  const qs = new URLSearchParams(location.search);
  if (qs.get("view") && VIEWS[qs.get("view")]) { const v = VIEWS[qs.get("view")]; state.lon = v[0]; state.lat = v[1]; state.zoom = v[2]; }
  const m0 = MISSIONS.find(m => m.id === qs.get("m"));
  if (m0) { const ll = m0.ll || [m0.region[0], m0.region[1]]; state.lon = ll[0]; state.lat = Math.max(-84, Math.min(84, ll[1])); state.zoom = Math.abs(ll[1]) > 70 ? 2.4 : 1.5; setTimeout(() => select({ type: "mission", d: m0 }), 0); }
})();
