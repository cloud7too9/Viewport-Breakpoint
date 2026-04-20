// Material Width Classes
const zones = [
  { key:"compact",  min:0,    max:600,  label:"Compact"     },
  { key:"medium",   min:600,  max:840,  label:"Medium"      },
  { key:"expanded", min:840,  max:1200, label:"Expanded"    },
  { key:"large",    min:1200, max:1600, label:"Large"       },
  { key:"xlarge",   min:1600, max:2400, label:"Extra-Large" },
];

// Typische Mobile-Viewports
const phones = [
  { px:320, name:"sehr klein /\nenge Layouts", pos:"above" },
  { px:360, name:"Android\nStandard",          pos:"below" },
  { px:375, name:"iPhone",                      pos:"above" },
  { px:393, name:"iPhone\n(modern)",            pos:"below" },
  { px:412, name:"Android\n(groß)",             pos:"above" },
  { px:430, name:"Pro Max /\nPhones groß",      pos:"below" },
];

// Hauptskala: logarithmisch von SCALE_MIN bis SCALE_MAX
const SCALE_MIN = 280;
const SCALE_MAX = 2000;

// Mobile-Detail-Skala: linear
const PHONE_MIN = 300;
const PHONE_MAX = 450;

// Hints pro Width Class
const zoneHints = {
  compact:  "Handy-Layout · 1 Spalte · Bottom-Nav",
  medium:   "kleines Tablet · 1–2 Pane",
  expanded: "großes Tablet · Sidebar + Content",
  large:    "kleines Desktop-Fenster · Multi-Pane",
  xlarge:   "großes Desktop · Max-Width empfohlen",
};

const THEME_KEY = "viewport-ref-theme";
