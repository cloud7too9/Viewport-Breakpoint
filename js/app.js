// Skalen-Mapping: logarithmisch
const logMin = Math.log(SCALE_MIN);
const logMax = Math.log(SCALE_MAX);
const pct = v => {
  const c = Math.max(SCALE_MIN, Math.min(SCALE_MAX, v));
  return ((Math.log(c) - logMin) / (logMax - logMin)) * 100;
};

// --- Zone-Breiten (flex-basis) ---
const scaleEl = document.getElementById("scale");
const zoneEls = scaleEl.querySelectorAll(".zone");
zoneEls.forEach(el => {
  const min = +el.dataset.min;
  const max = +el.dataset.max;
  el.style.flex = `0 0 ${pct(max) - pct(min)}%`;
});

// --- Ticks ---
const ticksEl = document.getElementById("ticks");
[320, 600, 840, 1200, 1600, 2000].forEach(v => {
  const t = document.createElement("div");
  t.className = "tick";
  t.style.left = pct(v) + "%";
  t.textContent = v;
  ticksEl.appendChild(t);
});

// --- Refs ---
const markerEl    = document.getElementById("marker");
const markerLabel = document.getElementById("markerLabel");
const classLabel  = document.getElementById("classLabel");
const classDot    = document.getElementById("classDot");
const classHint   = document.getElementById("classHint");
const liveNum     = document.getElementById("liveNum");
const sliderVal   = document.getElementById("sliderVal");
const slider      = document.getElementById("slider");
const followLive  = document.getElementById("followLive");

const classify = v => {
  for (const z of zones) if (v >= z.min && v < z.max) return z;
  return zones[zones.length - 1];
};

const getCssVar = name => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

function update(value){
  const v = Math.round(value);
  const z = classify(v);

  liveNum.textContent = v;
  sliderVal.textContent = v + " px";

  markerEl.style.left = pct(v) + "%";
  markerLabel.textContent = v + " px";

  classLabel.textContent = z.label;
  classDot.style.background = getCssVar(`--c-${z.key}`);
  classHint.textContent = zoneHints[z.key];

  const activeFilter   = getCssVar("--zone-active-filter")   || "brightness(1.35) saturate(1.2)";
  const inactiveFilter = getCssVar("--zone-inactive-filter") || "brightness(0.6) saturate(0.8)";
  zoneEls.forEach(el => {
    el.style.filter = el.classList.contains(z.key) ? activeFilter : inactiveFilter;
  });
}

// --- Mobile Phone Ticks ---
const phonesEl = document.getElementById("phones");
const phonePct = v => ((v - PHONE_MIN) / (PHONE_MAX - PHONE_MIN)) * 100;
phones.forEach(p => {
  const el = document.createElement("div");
  el.className = "phone-tick" + (p.pos === "below" ? " below" : "");
  el.style.left = phonePct(p.px) + "%";
  const html = `<span class="px">${p.px} px</span><span class="nm">${p.name.replace(/\n/g, "<br>")}</span>`;
  el.innerHTML = p.pos === "below"
    ? `<span class="pin"></span>${html}`
    : `${html}<span class="pin"></span>`;
  phonesEl.appendChild(el);
});

// --- Events ---
slider.addEventListener("input", () => {
  followLive.checked = false;
  update(+slider.value);
});

function syncWithLive(){
  if (!followLive.checked) return;
  const w = window.innerWidth;
  slider.value = Math.max(+slider.min, Math.min(+slider.max, w));
  update(w);
}

followLive.addEventListener("change", syncWithLive);
window.addEventListener("resize", syncWithLive);

// --- Theme-Switcher ---
const themeSwitch = document.getElementById("themeSwitch");

function setTheme(t){
  document.documentElement.setAttribute("data-theme", t);
  themeSwitch.querySelectorAll(".theme-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.t === t);
  });
  try { localStorage.setItem(THEME_KEY, t); } catch(e){}
  update(+slider.value);
}

themeSwitch.addEventListener("click", e => {
  const btn = e.target.closest(".theme-btn");
  if (!btn) return;
  setTheme(btn.dataset.t);
});

// Initial
let initial = "workhub";
try {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) initial = saved;
} catch(e){}
setTheme(initial);
syncWithLive();
if (!followLive.checked) update(+slider.value);
