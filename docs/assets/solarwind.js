// Animated diagram: the solar wind flows from the Sun, bends around Earth's
// magnetic shield, and hits the unprotected Moon, where helium-3 builds up in the soil.
(function () {
  const cv = document.getElementById("sw");
  if (!cv) return;
  const ctx = cv.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const W = 1200, H = 520;
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = W * dpr; cv.height = H * dpr;
  ctx.scale(dpr, dpr);

  const sun = { x: -60, y: H / 2, r: 190 };
  const earth = { x: 560, y: 200, r: 34, shield: 120 };
  const moon = { x: 960, y: 360, r: 62 };
  const stuck = []; // helium-3 grains that landed on the Moon

  function newParticle(anywhere) {
    const he3 = Math.random() < 0.07; // shown far more often than real life so it can be seen
    return { x: anywhere ? 140 + Math.random() * (W - 160) : 130, y: 30 + Math.random() * (H - 60), vx: 2.2 + Math.random() * 1.4, vy: 0, he3, life: 0 };
  }
  const parts = Array.from({ length: 260 }, () => newParticle(true));

  function step() {
    for (let i = 0; i < parts.length; i++) {
      const p = parts[i];
      p.life++;
      // Earth's shield: push particles away from Earth when they get close.
      const dx = p.x - earth.x, dy = p.y - earth.y, d = Math.hypot(dx, dy);
      if (d < earth.shield + 40 && dx < 60) {
        const push = (earth.shield + 40 - d) / (earth.shield + 40);
        p.vy += (dy >= 0 ? 1 : -1) * push * 0.9;
        p.vx *= 0.995;
      } else {
        p.vy *= 0.96;
      }
      p.x += p.vx; p.y += p.vy;
      // Moon: no shield, so particles hit the ground.
      const mx = p.x - moon.x, my = p.y - moon.y;
      if (Math.hypot(mx, my) < moon.r) {
        if (p.he3 && stuck.length < 420) {
          const a = Math.atan2(my, mx);
          const rr = moon.r - 2 - Math.random() * 7;
          stuck.push({ x: moon.x + Math.cos(a) * rr, y: moon.y + Math.sin(a) * rr });
        }
        parts[i] = newParticle(false);
        continue;
      }
      if (p.x > W + 10 || p.y < -20 || p.y > H + 20) parts[i] = newParticle(false);
    }
  }

  function label(text, x, y, color, align = "center", size = 17) {
    ctx.font = `700 ${size}px Inter, system-ui, sans-serif`;
    ctx.textAlign = align;
    ctx.lineWidth = 5; ctx.strokeStyle = "rgb(5 8 12 / 90%)"; ctx.strokeText(text, x, y);
    ctx.fillStyle = color; ctx.fillText(text, x, y);
  }

  function frame() {
    ctx.clearRect(0, 0, W, H);
    // Sun
    const g = ctx.createRadialGradient(sun.x, sun.y, 20, sun.x, sun.y, sun.r * 1.5);
    g.addColorStop(0, "#fff6c9"); g.addColorStop(0.45, "#ffcf5a"); g.addColorStop(0.7, "rgb(255 140 60 / 35%)"); g.addColorStop(1, "rgb(255 140 60 / 0%)");
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sun.x, sun.y, sun.r * 1.5, 0, 7); ctx.fill();

    // Earth's shield (magnetosphere): a teardrop shape
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(earth.x - earth.shield * 0.8, earth.y);
    ctx.bezierCurveTo(earth.x - earth.shield * 0.8, earth.y - earth.shield, earth.x + 80, earth.y - earth.shield * 0.9, earth.x + 330, earth.y - 60);
    ctx.lineTo(earth.x + 330, earth.y + 60);
    ctx.bezierCurveTo(earth.x + 80, earth.y + earth.shield * 0.9, earth.x - earth.shield * 0.8, earth.y + earth.shield, earth.x - earth.shield * 0.8, earth.y);
    const sg = ctx.createLinearGradient(earth.x - 100, 0, earth.x + 330, 0);
    sg.addColorStop(0, "rgb(78 161 255 / 30%)"); sg.addColorStop(1, "rgb(78 161 255 / 0%)");
    ctx.fillStyle = sg; ctx.fill();
    ctx.setLineDash([6, 6]); ctx.strokeStyle = "rgb(120 185 255 / 70%)"; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();

    // particles
    for (const p of parts) {
      ctx.fillStyle = p.he3 ? "#ffcf5a" : "rgb(255 255 255 / 55%)";
      ctx.beginPath(); ctx.arc(p.x, p.y, p.he3 ? 3.2 : 1.6, 0, 7); ctx.fill();
    }

    // Earth
    const eg = ctx.createRadialGradient(earth.x - 10, earth.y - 10, 4, earth.x, earth.y, earth.r);
    eg.addColorStop(0, "#7cc4ff"); eg.addColorStop(1, "#1b5fa8");
    ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(earth.x, earth.y, earth.r, 0, 7); ctx.fill();
    ctx.strokeStyle = "rgb(160 210 255 / 60%)"; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(earth.x, earth.y, earth.r + 4, 0, 7); ctx.stroke();

    // Moon
    const mg = ctx.createRadialGradient(moon.x - 18, moon.y - 18, 6, moon.x, moon.y, moon.r);
    mg.addColorStop(0, "#d9d6cf"); mg.addColorStop(1, "#7d7a74");
    ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(moon.x, moon.y, moon.r, 0, 7); ctx.fill();
    ctx.fillStyle = "rgb(60 58 55 / 45%)";
    [[-20, -12, 14], [16, 10, 10], [-6, 24, 8]].forEach(([a, b, r]) => { ctx.beginPath(); ctx.arc(moon.x + a, moon.y + b, r, 0, 7); ctx.fill(); });
    ctx.fillStyle = "#ffcf5a";
    for (const s of stuck) { ctx.beginPath(); ctx.arc(s.x, s.y, 1.8, 0, 7); ctx.fill(); }

    // labels
    label("The Sun", 90, 70, "#ffcf5a", "left", 20);
    label("solar wind →", 250, 110, "#e6e6e6", "left", 15);
    label("Earth", earth.x, earth.y + earth.r + 26, "#9fd0ff");
    label("Magnetic shield + air", earth.x + 40, earth.y - earth.shield - 8, "#9fd0ff", "center", 15);
    label("push the wind away", earth.x + 40, earth.y - earth.shield + 12, "#9fd0ff", "center", 15);
    label("The Moon", moon.x, moon.y + moon.r + 28, "#e6e6e6");
    label("No shield, almost no air:", moon.x, moon.y - moon.r - 40, "#ffcf5a", "center", 15);
    label("helium-3 sticks in the soil", moon.x, moon.y - moon.r - 20, "#ffcf5a", "center", 15);
    label("● helium-3 (gold)   · other particles (white)", W - 20, H - 18, "#a3b0bc", "right", 13);
  }

  if (reduce) {
    for (let i = 0; i < 900; i++) step();
    frame();
    return;
  }
  // Prime the scene so it starts full, then animate while on screen.
  for (let i = 0; i < 300; i++) step();
  let on = false, running = false;
  new IntersectionObserver(es => { on = es[0].isIntersecting; if (on && !running) { running = true; loop(); } }).observe(cv);
  function loop() { if (!on) { running = false; return; } step(); frame(); requestAnimationFrame(loop); }
  frame();
})();
