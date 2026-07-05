/* THE STORY MACHINE — engine */
'use strict';

/* ═══════════ persistence ═══════════ */
const STORE_KEY = 'storymachine_v1';
let DATA = {};
try { DATA = JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); } catch (e) { DATA = {}; }
function saveData() { localStorage.setItem(STORE_KEY, JSON.stringify(DATA)); }

function beatDone(id) {
  const b = BEATS[id];
  return b.fields.every(f => (DATA[f.key] || '').trim().length > 0);
}
function nextStep() {
  for (const id of WRITE_ORDER) if (!beatDone(id)) return id;
  return null;
}

/* ═══════════ SVG helpers ═══════════ */
const SVGNS = 'http://www.w3.org/2000/svg';
function svgEl(tag, attrs, parent) {
  const el = document.createElementNS(SVGNS, tag);
  for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}

function d20Svg(size, opts) {
  // icosahedron front: white outline + white number, per spec
  const o = opts || {};
  const s = size, c = s / 2, r = s * 0.42;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('width', s); svg.setAttribute('height', s);
  svg.setAttribute('viewBox', `0 0 ${s} ${s}`);
  const pt = (a, rr) => [c + rr * Math.cos(a - Math.PI / 2), c + rr * Math.sin(a - Math.PI / 2)];
  // outer hexagon
  const hex = [];
  for (let i = 0; i < 6; i++) hex.push(pt(i * Math.PI / 3, r));
  svgEl('polygon', { points: hex.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#fff', 'stroke-width': s * 0.045, 'stroke-linejoin': 'round' }, svg);
  // central triangle
  const tri = [pt(0, r * 0.62), pt(2 * Math.PI / 3, r * 0.62), pt(4 * Math.PI / 3, r * 0.62)];
  svgEl('polygon', { points: tri.map(p => p.join(',')).join(' '), fill: 'none', stroke: '#fff', 'stroke-width': s * 0.035, 'stroke-linejoin': 'round' }, svg);
  // spokes hexagon → triangle
  for (let i = 0; i < 6; i++) {
    const hp = hex[i];
    const tp = tri[[0, 0, 1, 1, 2, 2][i]];
    svgEl('line', { x1: hp[0], y1: hp[1], x2: tp[0], y2: tp[1], stroke: '#fff', 'stroke-width': s * 0.028 }, svg);
  }
  const t = svgEl('text', {
    x: c, y: c + s * 0.055, 'text-anchor': 'middle', fill: '#fff',
    'font-family': 'Georgia, serif', 'font-weight': 'bold', 'font-size': s * (o.num20 ? 0.2 : 0.24),
  }, svg);
  t.textContent = '20';
  return svg;
}

function gearSvg(size, teeth, color) {
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('width', size); svg.setAttribute('height', size);
  svg.setAttribute('viewBox', '0 0 100 100');
  const g = svgEl('g', {}, svg);
  let d = '';
  const n = teeth, ro = 48, ri = 38;
  for (let i = 0; i < n; i++) {
    const a0 = (i / n) * 2 * Math.PI, a1 = ((i + 0.35) / n) * 2 * Math.PI,
      a2 = ((i + 0.5) / n) * 2 * Math.PI, a3 = ((i + 0.85) / n) * 2 * Math.PI;
    const p = (a, r) => `${50 + r * Math.cos(a)},${50 + r * Math.sin(a)}`;
    d += (i ? 'L' : 'M') + p(a0, ro) + 'L' + p(a1, ro) + 'L' + p(a2, ri) + 'L' + p(a3, ri);
  }
  d += 'Z';
  svgEl('path', { d, fill: color, stroke: 'rgba(0,0,0,0.4)', 'stroke-width': 1.4 }, g);
  svgEl('circle', { cx: 50, cy: 50, r: 15, fill: 'rgba(0,0,0,0.45)' }, g);
  svgEl('circle', { cx: 50, cy: 50, r: 26, fill: 'none', stroke: 'rgba(0,0,0,0.3)', 'stroke-width': 7 }, g);
  return svg;
}

/* ═══════════ machine face builder ═══════════ */
/* Arc geometry from the original builder */
const ARC_STOPS = {
  inciting:  0.02, rising1: 0.20, rising2: 0.32, rising3: 0.44,
  climax: 0.56, falling: 0.75, resolution: 0.97,
};

function buildMachine(interactive) {
  const m = document.createElement('div');
  m.className = 'machine';
  m.innerHTML = `
    <div class="screw tl" style="--rot:40deg"></div><div class="screw tr" style="--rot:-25deg"></div>
    <div class="screw bl" style="--rot:80deg"></div><div class="screw br" style="--rot:10deg"></div>
    <div class="plate"><h1>THE STORY MACHINE</h1><small>— TALES FROM THE LODE —</small></div>
  `;

  // decorative gears
  const gearSpots = [
    { x: 40, y: 250, s: 92, t: 12, cls: 'spin-slow', c: '#b08d45' },
    { x: 96, y: 300, s: 60, t: 10, cls: 'spin-rev', c: '#8a6a2f' },
    { x: 1120, y: 240, s: 74, t: 11, cls: 'spin-rev', c: '#a5803c' },
    { x: 300, y: 745, s: 56, t: 9, cls: 'spin-slow', c: '#8a6a2f' },
    { x: 880, y: 748, s: 64, t: 10, cls: 'spin-rev', c: '#b08d45' },
  ];
  for (const g of gearSpots) {
    const d = document.createElement('div');
    d.className = 'gear';
    d.style.cssText = `left:${g.x}px;top:${g.y}px;width:${g.s}px;height:${g.s}px`;
    const inner = document.createElement('div');
    inner.className = g.cls;
    inner.appendChild(gearSvg(g.s, g.t, g.c));
    d.appendChild(inner);
    m.appendChild(d);
  }

  // big theme / protagonist buttons
  for (const [id, cls] of [['theme', 'theme'], ['protagonist', 'protag']]) {
    const b = document.createElement('button');
    b.className = 'big-btn ' + cls;
    b.dataset.beat = id;
    b.style.setProperty('--lit', BEATS[id].color);
    b.style.setProperty('--lit-soft', BEATS[id].color + '66');
    b.innerHTML = `<span class="ring"></span><span class="face"><span>${BEATS[id].short === 'PROTAG' ? 'Protagonist' : 'Theme'}</span></span>`;
    m.appendChild(b);
  }

  // porthole with arc panel
  const mount = document.createElement('div');
  mount.className = 'porthole-mount';
  mount.innerHTML = `<div class="porthole-ring"></div>`;
  const ph = document.createElement('div');
  ph.className = 'porthole';
  const arcPan = document.createElement('div');
  arcPan.className = 'pan arc-pan';
  arcPan.dataset.pan = 'arc';
  arcPan.appendChild(buildArcSvg());
  ph.appendChild(arcPan);
  const glass = document.createElement('div');
  glass.className = 'glass';
  ph.appendChild(glass);
  mount.appendChild(ph);
  m.appendChild(mount);

  // side boxes
  const nb = document.createElement('div');
  nb.className = 'side-box next-box';
  nb.innerHTML = `<div class="inner"><span class="lbl">Next Step</span><span class="val" data-role="next">THEME</span></div>`;
  m.appendChild(nb);

  const dome = document.createElement('div');
  dome.className = 'side-box dome-box';
  const domeBtn = document.createElement('button');
  domeBtn.className = 'dome-d20';
  domeBtn.title = 'Roll a whole-story concept';
  domeBtn.appendChild(d20Svg(86, { num20: true }));
  dome.appendChild(domeBtn);
  const domeLbl = document.createElement('span');
  domeLbl.className = 'lbl';
  domeLbl.textContent = 'Story Concept';
  dome.appendChild(domeLbl);
  m.appendChild(dome);

  const gauge = document.createElement('div');
  gauge.className = 'gauge-box';
  gauge.innerHTML = `
    <div class="gauge-face"><div class="gauge-needle" data-role="needle"></div><div class="gauge-hub"></div></div>
    <div class="txt"><div class="lbl">Story Pressure</div><div class="val" data-role="gauge-val">0 / 9</div></div>`;
  m.appendChild(gauge);

  const disp = document.createElement('button');
  disp.className = 'dispense';
  disp.innerHTML = `<div class="arch"><div class="slot"></div></div><span class="lbl">Dispense Story</span>`;
  m.appendChild(disp);

  return m;
}

function buildArcSvg() {
  const W = 480, H = 420;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`);

  const defs = svgEl('defs', {}, svg);
  const grad = svgEl('radialGradient', { id: 'brassCap', cx: '38%', cy: '30%' }, defs);
  svgEl('stop', { offset: '0%', 'stop-color': '#f0d491' }, grad);
  svgEl('stop', { offset: '55%', 'stop-color': '#c69a4d' }, grad);
  svgEl('stop', { offset: '100%', 'stop-color': '#8a6425' }, grad);

  // the arc path — rising line to a peak then falling (like the original)
  const pL = 46, pR = 40, pT = 82, pB = 66;
  const aW = W - pL - pR, aH = H - pT - pB;
  const skew = 0.56, peak = 0.03;
  const pts = [
    [pL, pT + aH * 1.0],
    [pL + aW * 0.08, pT + aH * 0.88],
    [pL + aW * 0.20, pT + aH * 0.70],
    [pL + aW * (skew * 0.65), pT + aH * 0.38],
    [pL + aW * (skew * 0.88), pT + aH * 0.18],
    [pL + aW * skew, pT + aH * peak],
    [pL + aW * (skew + 0.10), pT + aH * 0.22],
    [pL + aW * (skew + 0.20), pT + aH * 0.42],
    [pL + aW * (skew + 0.30), pT + aH * 0.60],
    [pL + aW, pT + aH * 0.71],
  ];
  function crPoint(t) {
    const seg = pts.length - 1, tsc = t * seg;
    const i = Math.min(Math.floor(tsc), seg - 1), f = tsc - i;
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[Math.min(seg, i + 1)], p3 = pts[Math.min(seg, i + 2)];
    const t2 = f * f, t3 = t2 * f;
    const cr = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * f + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
    return [cr(p0[0], p1[0], p2[0], p3[0]), cr(p0[1], p1[1], p2[1], p3[1])];
  }
  let d = '';
  for (let i = 0; i <= 100; i++) {
    const [x, y] = crPoint(i / 100);
    d += (i ? ' L ' : 'M ') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  // engraved groove effect: dark underlay + patina line
  svgEl('path', { d, fill: 'none', stroke: 'rgba(30,12,2,0.85)', 'stroke-width': 7, 'stroke-linecap': 'round' }, svg);
  svgEl('path', { d, fill: 'none', stroke: '#3f7d6d', 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0.9 }, svg);

  // beat nodes along the arc
  for (const id in ARC_STOPS) {
    const [x, y] = crPoint(ARC_STOPS[id]);
    const g = svgEl('g', { class: 'beat-node', 'data-beat': id, transform: `translate(${x},${y})` }, svg);
    g.style.setProperty('--lit', BEATS[id].color);
    svgEl('circle', { r: 27, class: 'cap' }, g);
    svgEl('circle', { r: 21, fill: 'none', stroke: 'rgba(90,55,10,0.55)', 'stroke-width': 1 }, g);
    const words = BEATS[id].label.replace('Action', 'Act.').split(' ');
    const t = svgEl('text', { y: words.length > 1 ? -1 : 4 }, g);
    words.forEach((w, i) => {
      const ts = svgEl('tspan', { x: 0, dy: i === 0 ? 0 : 11 }, t);
      ts.textContent = w;
    });
  }
  return svg;
}

/* ═══════════ beat panels ═══════════ */
function buildBeatPanel(id) {
  const b = BEATS[id];
  const pan = document.createElement('div');
  pan.className = 'pan beat-pan off-r';
  pan.dataset.pan = id;
  const frame = document.createElement('div');
  frame.className = 'frame';
  frame.style.setProperty('--accent', b.color);
  frame.style.setProperty('--accent-soft', b.color + '55');

  frame.innerHTML = `<h3>${b.label}</h3><div class="sub">${b.sub}</div>`;

  const cards = document.createElement('div');
  cards.className = 'cards';
  for (const f of b.fields) {
    const card = document.createElement('div');
    card.className = 'card';
    const rows = f.rows || 3;
    card.innerHTML = `<label>${f.label}</label>`;
    const ta = document.createElement('textarea');
    ta.rows = rows;
    ta.placeholder = f.ph || '';
    ta.value = DATA[f.key] || '';
    ta.addEventListener('input', () => {
      DATA[f.key] = ta.value;
      saveData();
      machineSync();
    });
    card.appendChild(ta);
    cards.appendChild(card);
  }
  frame.appendChild(cards);

  // randomizer row (or climax fate row)
  if (b.roll) {
    const row = document.createElement('div');
    row.className = 'controls';
    const die = document.createElement('button');
    die.className = 'd20-btn';
    die.title = 'Randomise';
    die.appendChild(d20Svg(38, {}));
    const roller = document.createElement('div');
    roller.className = 'roller';
    roller.innerHTML = `<div class="tape"><span>— roll for a suggestion —</span></div>`;
    let catIdx = 0;
    die.addEventListener('click', () => {
      die.classList.add('rolling');
      roller.classList.add('spin');
      setTimeout(() => {
        let out;
        if (b.rollCat) { out = b.roll(b.rollCat[catIdx % b.rollCat.length]); catIdx++; }
        else out = b.roll();
        roller.querySelector('span').textContent = out;
        roller.classList.remove('spin');
        die.classList.remove('rolling');
      }, 260);
    });
    row.appendChild(die);
    row.appendChild(roller);
    frame.appendChild(row);
  } else if (b.fate) {
    const row = document.createElement('div');
    row.className = 'fate-row';
    const mk = (txt) => {
      const bt = document.createElement('button');
      bt.className = 'fate-btn';
      bt.textContent = txt;
      return bt;
    };
    const w = mk('WANT — tragedy'), n = mk('NEED — comedy');
    const roller = document.createElement('div');
    roller.className = 'roller';
    roller.style.marginTop = '8px';
    roller.innerHTML = `<div class="tape"><span>the choice defines the genre</span></div>`;
    w.addEventListener('click', () => { roller.querySelector('span').textContent = b.fate.want; });
    n.addEventListener('click', () => { roller.querySelector('span').textContent = b.fate.need; });
    row.appendChild(w); row.appendChild(n);
    frame.appendChild(row);
    const wrap = document.createElement('div');
    wrap.className = 'controls';
    wrap.appendChild(roller);
    frame.appendChild(wrap);
  }

  // advice row
  const arow = document.createElement('div');
  arow.className = 'advice-row';
  const led = document.createElement('div');
  led.className = 'led';
  led.innerHTML = `<span>ADVICE</span><div class="scan"></div>`;
  const abtn = document.createElement('button');
  abtn.className = 'advice-btn';
  abtn.textContent = 'Advice';
  let ai = 0, marqueeTimer = null;
  abtn.addEventListener('click', () => {
    const msg = b.advice[ai % b.advice.length];
    ai++;
    ledMarquee(led, msg.toUpperCase());
  });
  const done = document.createElement('button');
  done.className = 'done-btn';
  done.title = 'Back to the arc';
  done.textContent = '↺';
  done.addEventListener('click', () => showPanel('arc'));
  arow.appendChild(led);
  arow.appendChild(abtn);
  arow.appendChild(done);
  frame.appendChild(arow);

  pan.appendChild(frame);
  return pan;
}

function ledMarquee(led, text) {
  const span = led.querySelector('span');
  span.textContent = text;
  span.style.transition = 'none';
  // measure
  const ledW = led.clientWidth, w = span.scrollWidth;
  if (w <= ledW - 20) {
    span.style.left = '50%';
    span.style.transform = 'translate(-50%,-50%)';
    return;
  }
  span.style.left = '0';
  span.style.transform = `translate(${ledW}px, -50%)`;
  requestAnimationFrame(() => {
    const dur = (w + ledW) / 90; // px per sec
    span.style.transition = `transform ${dur}s linear`;
    span.style.transform = `translate(${-w}px, -50%)`;
  });
}

/* ═══════════ interactive machine wiring ═══════════ */
let THE_MACHINE = null;
let currentPan = 'arc';

function showPanel(id) {
  const ph = THE_MACHINE.querySelector('.porthole');
  const panels = ph.querySelectorAll('.pan');
  const mount = THE_MACHINE.querySelector('.porthole-mount');
  mount.classList.add('spinning');
  setTimeout(() => mount.classList.remove('spinning'), 700);
  panels.forEach(p => {
    if (p.dataset.pan === id) {
      p.classList.remove('off-l', 'off-r');
    } else if (!p.classList.contains('off-l') && !p.classList.contains('off-r')) {
      p.classList.add(id === 'arc' ? 'off-r' : 'off-l');
    }
  });
  currentPan = id;
  machineSync();
}

function machineSync() {
  if (!THE_MACHINE) return;
  const ns = nextStep();
  // light buttons
  THE_MACHINE.querySelectorAll('[data-beat]').forEach(el => {
    const id = el.dataset.beat;
    el.classList.toggle('lit', beatDone(id) || currentPan === id);
    el.classList.toggle('next-hint', ns === id && !beatDone(id));
  });
  // next-step roller
  const nv = THE_MACHINE.querySelector('[data-role="next"]');
  if (nv) {
    if (ns) { nv.textContent = NEXT_LABELS[ns]; nv.classList.remove('done-all'); }
    else { nv.textContent = 'COMPLETE'; nv.classList.add('done-all'); }
  }
  // gauge
  const doneCount = WRITE_ORDER.filter(beatDone).length;
  const needle = THE_MACHINE.querySelector('[data-role="needle"]');
  if (needle) needle.style.transform = `translateX(-50%) rotate(${-100 + (doneCount / 9) * 200}deg)`;
  const gv = THE_MACHINE.querySelector('[data-role="gauge-val"]');
  if (gv) gv.textContent = `${doneCount} / 9`;
}

function wireMachine(m) {
  THE_MACHINE = m;
  const ph = m.querySelector('.porthole');
  const glass = ph.querySelector('.glass');
  // add all beat panels
  for (const id of Object.keys(BEATS)) ph.insertBefore(buildBeatPanel(id), glass);

  m.addEventListener('click', e => {
    const bt = e.target.closest('[data-beat]');
    if (bt && m.contains(bt)) { showPanel(bt.dataset.beat); return; }
  });

  // dome d20 → whole-story concept, shown on ticket-style LED in dome? show via marquee on next-box + alert-free
  const domeBtn = m.querySelector('.dome-d20');
  const domeOut = document.getElementById('concept-line');
  domeBtn.addEventListener('click', () => {
    domeBtn.classList.add('rolling');
    setTimeout(() => {
      domeBtn.classList.remove('rolling');
      const c = rand(POOLS.STRUCTURAL_CONCEITS);
      DATA._concept = c;
      saveData();
      domeOut.textContent = '⚃  ' + c;
      domeOut.style.opacity = 1;
    }, 300);
  });
  if (DATA._concept) { domeOut.textContent = '⚃  ' + DATA._concept; domeOut.style.opacity = 1; }

  // dispense story
  m.querySelector('.dispense').addEventListener('click', openTicket);

  machineSync();
}

/* ═══════════ story ticket ═══════════ */
function esc(s) { return (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function openTicket() {
  const t = document.getElementById('ticket-body');
  const gv = k => esc((DATA[k] || '').trim());
  const line = (label, val, fallback) =>
    `<p><b>${label}.</b> ${val || `<i style="color:#a4906b">${fallback}</i>`}</p>`;
  const name = gv('protagonistName') || 'The protagonist';
  t.innerHTML = [
    DATA._concept ? `<p style="text-align:center;color:#8a6d35"><i>${esc(DATA._concept)}</i></p>` : '',
    line('Theme', gv('themeStatement'), 'not yet written'),
    line('Protagonist', gv('protagonistDesc') ? `${name} — ${gv('protagonistDesc')}` : '', 'not yet written'),
    gv('want') || gv('need') ? `<p><b>Wants</b> ${gv('want') || '—'}<br><b>Needs</b> ${gv('need') || '—'}${gv('flaw') ? `<br><b>Flaw</b> ${gv('flaw')}` : ''}</p>` : '',
    line('It begins when', gv('inciting'), 'not yet written'),
    gv('rising1') ? `<p><b>Because of that,</b> ${gv('rising1')}${gv('rising2') ? ` <b>Because of that,</b> ${gv('rising2')}` : ''}${gv('rising3') ? ` <b>Because of that,</b> ${gv('rising3')}` : ''}</p>` : '',
    gv('climaxConflict') || gv('climaxChoice') ? `<p><b>Until finally,</b> ${gv('climaxConflict')} ${gv('climaxChoice')}</p>` : '',
    line('And after', gv('falling'), 'not yet written'),
    gv('resolution') || gv('change') ? `<p><b>The new normal.</b> ${gv('resolution')} ${gv('change')}</p>` : '',
  ].join('');
  document.getElementById('ticket-wrap').classList.add('open');
}

/* ═══════════ scroll engine ═══════════ */
function clamp01(x) { return Math.max(0, Math.min(1, x)); }
function sectionProgress(sec) {
  const r = sec.getBoundingClientRect();
  const vh = window.innerHeight;
  return clamp01(-r.top / (r.height - vh));
}
const ease = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

/* — frames scrub — */
const FRAME_COUNT = 118;
const frames = [];
let framesLoaded = 0;
function preloadFrames(cb) {
  let firstShown = false;
  for (let i = 1; i <= FRAME_COUNT; i++) {
    const img = new Image();
    img.src = `assets/frames/f${String(i).padStart(3, '0')}.jpg`;
    img.onload = () => {
      framesLoaded++;
      if (!firstShown && i === 1) { firstShown = true; cb(); }
    };
    frames.push(img);
  }
}

const canvas = document.getElementById('scrub-canvas');
const ctx = canvas.getContext('2d');
function drawFrame(idx) {
  const img = frames[Math.max(0, Math.min(FRAME_COUNT - 1, idx))];
  if (!img || !img.complete || !img.naturalWidth) return;
  const cw = canvas.width = canvas.clientWidth * devicePixelRatio;
  const chh = canvas.height = canvas.clientHeight * devicePixelRatio;
  const s = Math.max(cw / img.naturalWidth, chh / img.naturalHeight);
  const w = img.naturalWidth * s, h = img.naturalHeight * s;
  ctx.drawImage(img, (cw - w) / 2, (chh - h) / 2, w, h);
}

/* scrub captions: [start, end, elementId] in scrub progress */
const SCRUB_CAPS = [
  [0.02, 0.16, 'cap-1'],
  [0.24, 0.40, 'cap-2'],
  [0.50, 0.66, 'cap-3'],
  [0.86, 0.995, 'cap-4'],
];

/* — fly-through camera — */
/* target positions of each beat on the 1240×830 machine, in px */
function beatAnchor(id) {
  // porthole center: (620, 448); arc svg is 88% of 538px ≈ 473 wide, viewBox 480×420
  if (id === 'theme') return { x: 62 + 95, y: 84 + 95 };
  if (id === 'protagonist') return { x: 1240 - 62 - 95, y: 84 + 95 };
  const W = 480, H = 420;
  // recompute the same arc geometry
  const pL = 46, pR = 40, pT = 82, pB = 66;
  const aW = W - pL - pR, aH = H - pT - pB;
  const skew = 0.56, peak = 0.03;
  const pts = [
    [pL, pT + aH * 1.0], [pL + aW * 0.08, pT + aH * 0.88], [pL + aW * 0.20, pT + aH * 0.70],
    [pL + aW * (skew * 0.65), pT + aH * 0.38], [pL + aW * (skew * 0.88), pT + aH * 0.18],
    [pL + aW * skew, pT + aH * peak], [pL + aW * (skew + 0.10), pT + aH * 0.22],
    [pL + aW * (skew + 0.20), pT + aH * 0.42], [pL + aW * (skew + 0.30), pT + aH * 0.60],
    [pL + aW, pT + aH * 0.71],
  ];
  const t = ARC_STOPS[id];
  const seg = pts.length - 1, tsc = t * seg;
  const i = Math.min(Math.floor(tsc), seg - 1), f = tsc - i;
  const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[Math.min(seg, i + 1)], p3 = pts[Math.min(seg, i + 2)];
  const t2 = f * f, t3 = t2 * f;
  const cr = (a, b, c, dd) => 0.5 * ((2 * b) + (-a + c) * f + (2 * a - 5 * b + 4 * c - dd) * t2 + (-a + 3 * b - 3 * c + dd) * t3);
  const sx = cr(p0[0], p1[0], p2[0], p3[0]), sy = cr(p0[1], p1[1], p2[1], p3[1]);
  // svg (480×420) is centered in porthole: rendered width = 88% of porthole inner (~538-52=486?) — measured live instead
  return { svg: [sx, sy] };
}

let tourMachine, tourCamera;
function tourTransformFor(prog) {
  // stops: 0 = wide, then one per TOUR entry, final = wide
  const stops = [];
  stops.push({ x: 620, y: 430, z: 0.72 });
  for (const t of TOUR) stops.push(Object.assign({ z: 2.6 }, tourAnchorPx(t.id)));
  stops.push({ x: 620, y: 430, z: 0.8 });
  const n = stops.length - 1;
  const ft = prog * n;
  const i = Math.min(Math.floor(ft), n - 1);
  const f = ease(clamp01(ft - i));
  const a = stops[i], b = stops[i + 1];
  return {
    x: a.x + (b.x - a.x) * f,
    y: a.y + (b.y - a.y) * f,
    z: a.z + (b.z - a.z) * f,
    seg: i, segF: f,
  };
}
let anchorCache = {};
function tourAnchorPx(id) {
  if (anchorCache[id]) return anchorCache[id];
  let out;
  if (id === 'theme') out = { x: 157, y: 179 };
  else if (id === 'protagonist') out = { x: 1083, y: 179 };
  else {
    // measure the node inside the tour machine's svg
    const node = tourMachine.querySelector(`.beat-node[data-beat="${id}"]`);
    const mrect = tourMachine.getBoundingClientRect();
    const nrect = node.getBoundingClientRect();
    const scale = mrect.width / 1240;
    out = {
      x: (nrect.left + nrect.width / 2 - mrect.left) / scale,
      y: (nrect.top + nrect.height / 2 - mrect.top) / scale,
    };
  }
  anchorCache[id] = out;
  return out;
}

/* ═══════════ main loop ═══════════ */
const $ = s => document.querySelector(s);
let vw = window.innerWidth, vh = window.innerHeight;

function onScroll() {
  vw = window.innerWidth; vh = window.innerHeight;

  // ACT 1: scrub
  const scrub = $('#scrub');
  const sp = sectionProgress(scrub);
  const r1 = scrub.getBoundingClientRect();
  if (r1.top < vh && r1.bottom > 0) {
    drawFrame(Math.round(sp * (FRAME_COUNT - 1)));
    for (const [a, b, id] of SCRUB_CAPS) {
      document.getElementById(id).style.opacity = (sp >= a && sp <= b) ? 1 : 0;
    }
  }

  // ACT 2: fly-through
  const tour = $('#tour');
  const r2 = tour.getBoundingClientRect();
  if (r2.top < vh && r2.bottom > 0) {
    const tp = sectionProgress(tour);
    const T = tourTransformFor(tp);
    // camera: translate so (T.x,T.y) maps to viewport center, at zoom z
    const baseScale = Math.min(vw / 1340, vh / 930, 1);
    const z = T.z * baseScale;
    tourCamera.style.transform =
      `translate(${vw / 2 - T.x * z}px, ${vh / 2 - T.y * z}px) scale(${z})`;
    // captions
    const capEl = $('#tour .caption');
    const titleEl = $('#tour .tour-title');
    titleEl.style.opacity = (T.seg === 0 && T.segF < 0.4) ? 1 : 0;
    let capIdx = -1;
    if (T.segF > 0.72) capIdx = T.seg + 1;      // arriving at next stop
    else if (T.segF < 0.45) capIdx = T.seg;     // resting at current stop
    if (capIdx >= 1 && capIdx <= TOUR.length) {
      const t = TOUR[capIdx - 1];
      if (capEl.dataset.cur !== String(capIdx)) {
        capEl.dataset.cur = String(capIdx);
        capEl.querySelector('h3').textContent = t.line;
        capEl.querySelector('p').textContent = t.body;
      }
      capEl.style.opacity = 1;
    } else {
      capEl.style.opacity = 0;
      capEl.dataset.cur = '';
    }
  }
}

let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(() => { onScroll(); ticking = false; });
  }
}, { passive: true });
window.addEventListener('resize', () => { anchorCache = {}; scaleMachines(); onScroll(); });

/* responsive: scale fixed-size machines to viewport */
function scaleMachines() {
  document.querySelectorAll('.machine-scaler').forEach(sc => {
    const s = Math.min((window.innerWidth - 70) / 1300, (window.innerHeight - 90) / 890, 1);
    sc.style.transform = `scale(${s})`;
    sc.style.height = (890 * s) + 'px';
  });
}

/* ═══════════ boot ═══════════ */
document.addEventListener('DOMContentLoaded', () => {
  // poster bg = final frame
  $('#poster .bg').style.backgroundImage = 'url(assets/frames/f118.jpg)';

  // tour machine (non-interactive)
  tourMachine = buildMachine(false);
  tourMachine.style.pointerEvents = 'none';
  tourCamera = $('#tour .camera');
  const holder = document.createElement('div');
  holder.style.cssText = 'width:1240px;height:830px;position:relative;margin:26px 30px;';
  holder.appendChild(tourMachine);
  tourCamera.appendChild(holder);
  tourCamera.style.position = 'absolute';
  tourCamera.style.left = '0';
  tourCamera.style.top = '0';
  tourCamera.style.transformOrigin = '0 0';

  // interactive machine
  const im = buildMachine(true);
  const scaler = document.createElement('div');
  scaler.className = 'machine-scaler';
  scaler.style.cssText = 'width:1240px;position:relative;padding:30px;';
  scaler.appendChild(im);
  $('#machine-slot').appendChild(scaler);
  wireMachine(im);
  scaleMachines();

  // ticket close
  $('#ticket-wrap').addEventListener('click', e => {
    if (e.target.id === 'ticket-wrap' || e.target.classList.contains('close-tk'))
      $('#ticket-wrap').classList.remove('open');
  });

  preloadFrames(() => { drawFrame(0); onScroll(); });
});
