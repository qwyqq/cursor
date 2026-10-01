const BOARD_W = 22.8;
const BOARD_H = 6.35;
const NAV = 15.4;
const NUM = 18.8;
const Y = [0, 1.35, 2.35, 3.35, 4.35, 5.35];
const CHATTER_MS = 15;
const STORAGE_KEY = "kb-bench-ansi104-v1";

const LAYERS = [
  { id: "base", name: "Base" },
  { id: "fn", name: "Fn" },
  { id: "fn2", name: "Fn2" },
];

const FN = {
  Escape: "QK_BOOT",
  Insert: "RGB_MOD",
  Home: "RGB_HUI",
  PageUp: "RGB_VAI",
  Delete: "RGB_RMOD",
  End: "RGB_HUD",
  PageDown: "RGB_VAD",
  PrintScreen: "RGB_TOG",
  Pause: "KC_MUTE",
  ArrowUp: "KC_VOLU",
  ArrowDown: "KC_VOLD",
  ArrowLeft: "KC_MPRV",
  ArrowRight: "KC_MNXT",
  NumLock: "RGB_SAI",
  NumpadDivide: "RGB_SAD",
  NumpadMultiply: "RGB_HUI",
  NumpadSubtract: "RGB_HUD",
};

const FN2 = {
  Escape: "EE_CLR",
  Digit1: "KC_F13",
  Digit2: "KC_F14",
  Digit3: "KC_F15",
  Digit4: "KC_F16",
  Digit5: "KC_F17",
  Digit6: "KC_F18",
  Digit7: "KC_F19",
  Digit8: "KC_F20",
  Digit9: "KC_F21",
  Digit0: "KC_F22",
  Minus: "KC_F23",
  Equal: "KC_F24",
  Backspace: "QK_RBT",
};

const SHORT = {
  KC_TRNS: "TRNS",
  KC_NO: "NO",
  QK_BOOT: "BOOT",
  QK_RBT: "RBT",
  EE_CLR: "EECLR",
  RGB_TOG: "TOG",
  RGB_MOD: "MOD",
  RGB_RMOD: "RMOD",
  RGB_HUI: "HUI",
  RGB_HUD: "HUD",
  RGB_SAI: "SAI",
  RGB_SAD: "SAD",
  RGB_VAI: "VAI",
  RGB_VAD: "VAD",
  KC_VOLU: "VOL+",
  KC_VOLD: "VOL-",
  KC_MUTE: "MUTE",
  KC_MPLY: "PLAY",
  KC_MNXT: "NEXT",
  KC_MPRV: "PREV",
  "MO(1)": "MO1",
  "MO(2)": "MO2",
};

const SUGGESTIONS = [
  "KC_TRNS", "KC_NO", "QK_BOOT", "QK_RBT", "EE_CLR", "MO(1)", "MO(2)",
  "RGB_TOG", "RGB_MOD", "RGB_RMOD", "RGB_HUI", "RGB_HUD", "RGB_SAI", "RGB_SAD", "RGB_VAI", "RGB_VAD",
  "KC_VOLU", "KC_VOLD", "KC_MUTE", "KC_MPLY", "KC_MNXT", "KC_MPRV",
];

const MOD_MASK = [
  [0x01, "ControlLeft"],
  [0x02, "ShiftLeft"],
  [0x04, "AltLeft"],
  [0x08, "MetaLeft"],
  [0x10, "ControlRight"],
  [0x20, "ShiftRight"],
  [0x40, "AltRight"],
  [0x80, "MetaRight"],
];

const CODE_ALIAS = { OSLeft: "MetaLeft", OSRight: "MetaRight" };

function letter(ch) {
  return 0x04 + ch.charCodeAt(0) - 65;
}

function k(id, legend, kc, hid, r, c, x, y, w = 1, h = 1) {
  return { id, legend, kc, hid, r, c, x, y, w, h };
}

function buildKeys() {
  const keys = [];
  keys.push(k("Escape", "Esc", "KC_ESC", 0x29, 0, 0, 0, Y[0]));
  [
    [1, 2, 2], [2, 3, 3], [3, 4, 4], [4, 5, 5],
    [5, 7, 6.5], [6, 8, 7.5], [7, 9, 8.5], [8, 10, 9.5],
    [9, 12, 11], [10, 13, 12], [11, 14, 13], [12, 15, 14],
  ].forEach(([n, c, x]) => {
    keys.push(k("F" + n, "F" + n, "KC_F" + n, 0x3a + n - 1, 0, c, x, Y[0]));
  });
  keys.push(k("PrintScreen", "PrtSc", "KC_PSCR", 0x46, 0, 17, NAV, Y[0]));
  keys.push(k("ScrollLock", "ScrLk", "KC_SCRL", 0x47, 0, 18, NAV + 1, Y[0]));
  keys.push(k("Pause", "Pause", "KC_PAUS", 0x48, 0, 19, NAV + 2, Y[0]));

  keys.push(k("Backquote", "`", "KC_GRV", 0x35, 1, 0, 0, Y[1]));
  for (let n = 1; n <= 9; n += 1) {
    keys.push(k("Digit" + n, String(n), "KC_" + n, 0x1e + n - 1, 1, n, n, Y[1]));
  }
  keys.push(k("Digit0", "0", "KC_0", 0x27, 1, 10, 10, Y[1]));
  keys.push(k("Minus", "-", "KC_MINS", 0x2d, 1, 11, 11, Y[1]));
  keys.push(k("Equal", "=", "KC_EQL", 0x2e, 1, 12, 12, Y[1]));
  keys.push(k("Backspace", "Bksp", "KC_BSPC", 0x2a, 1, 13, 13, Y[1], 2));
  keys.push(k("Insert", "Ins", "KC_INS", 0x49, 1, 15, NAV, Y[1]));
  keys.push(k("Home", "Home", "KC_HOME", 0x4a, 1, 16, NAV + 1, Y[1]));
  keys.push(k("PageUp", "PgUp", "KC_PGUP", 0x4b, 1, 17, NAV + 2, Y[1]));
  keys.push(k("NumLock", "Num", "KC_NUM", 0x53, 1, 19, NUM, Y[1]));
  keys.push(k("NumpadDivide", "/", "KC_PSLS", 0x54, 1, 20, NUM + 1, Y[1]));
  keys.push(k("NumpadMultiply", "*", "KC_PAST", 0x55, 1, 21, NUM + 2, Y[1]));
  keys.push(k("NumpadSubtract", "-", "KC_PMNS", 0x56, 1, 22, NUM + 3, Y[1]));

  keys.push(k("Tab", "Tab", "KC_TAB", 0x2b, 2, 0, 0, Y[2], 1.5));
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].forEach((ch, i) => {
    keys.push(k("Key" + ch, ch, "KC_" + ch, letter(ch), 2, 1 + i, 1.5 + i, Y[2]));
  });
  keys.push(k("BracketLeft", "[", "KC_LBRC", 0x2f, 2, 11, 11.5, Y[2]));
  keys.push(k("BracketRight", "]", "KC_RBRC", 0x30, 2, 12, 12.5, Y[2]));
  keys.push(k("Backslash", "\\", "KC_BSLS", 0x31, 2, 13, 13.5, Y[2], 1.5));
  keys.push(k("Delete", "Del", "KC_DEL", 0x4c, 2, 15, NAV, Y[2]));
  keys.push(k("End", "End", "KC_END", 0x4d, 2, 16, NAV + 1, Y[2]));
  keys.push(k("PageDown", "PgDn", "KC_PGDN", 0x4e, 2, 17, NAV + 2, Y[2]));
  keys.push(k("Numpad7", "7", "KC_P7", 0x5f, 2, 19, NUM, Y[2]));
  keys.push(k("Numpad8", "8", "KC_P8", 0x60, 2, 20, NUM + 1, Y[2]));
  keys.push(k("Numpad9", "9", "KC_P9", 0x61, 2, 21, NUM + 2, Y[2]));
  keys.push(k("NumpadAdd", "+", "KC_PPLS", 0x57, 2, 22, NUM + 3, Y[2], 1, 2));

  keys.push(k("CapsLock", "Caps", "KC_CAPS", 0x39, 3, 0, 0, Y[3], 1.75));
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"].forEach((ch, i) => {
    keys.push(k("Key" + ch, ch, "KC_" + ch, letter(ch), 3, 1 + i, 1.75 + i, Y[3]));
  });
  keys.push(k("Semicolon", ";", "KC_SCLN", 0x33, 3, 10, 10.75, Y[3]));
  keys.push(k("Quote", "'", "KC_QUOT", 0x34, 3, 11, 11.75, Y[3]));
  keys.push(k("Enter", "Enter", "KC_ENT", 0x28, 3, 12, 12.75, Y[3], 2.25));
  keys.push(k("Numpad4", "4", "KC_P4", 0x5c, 3, 19, NUM, Y[3]));
  keys.push(k("Numpad5", "5", "KC_P5", 0x5d, 3, 20, NUM + 1, Y[3]));
  keys.push(k("Numpad6", "6", "KC_P6", 0x5e, 3, 21, NUM + 2, Y[3]));

  keys.push(k("ShiftLeft", "Shift", "KC_LSFT", 0xe1, 4, 0, 0, Y[4], 2.25));
  ["Z", "X", "C", "V", "B", "N", "M"].forEach((ch, i) => {
    keys.push(k("Key" + ch, ch, "KC_" + ch, letter(ch), 4, 1 + i, 2.25 + i, Y[4]));
  });
  keys.push(k("Comma", ",", "KC_COMM", 0x36, 4, 8, 9.25, Y[4]));
  keys.push(k("Period", ".", "KC_DOT", 0x37, 4, 9, 10.25, Y[4]));
  keys.push(k("Slash", "/", "KC_SLSH", 0x38, 4, 10, 11.25, Y[4]));
  keys.push(k("ShiftRight", "Shift", "KC_RSFT", 0xe5, 4, 11, 12.25, Y[4], 2.75));
  keys.push(k("ArrowUp", "↑", "KC_UP", 0x52, 4, 16, NAV + 1, Y[4]));
  keys.push(k("Numpad1", "1", "KC_P1", 0x59, 4, 19, NUM, Y[4]));
  keys.push(k("Numpad2", "2", "KC_P2", 0x5a, 4, 20, NUM + 1, Y[4]));
  keys.push(k("Numpad3", "3", "KC_P3", 0x5b, 4, 21, NUM + 2, Y[4]));
  keys.push(k("NumpadEnter", "Enter", "KC_PENT", 0x58, 4, 22, NUM + 3, Y[4], 1, 2));

  keys.push(k("ControlLeft", "Ctrl", "KC_LCTL", 0xe0, 5, 0, 0, Y[5], 1.25));
  keys.push(k("MetaLeft", "Win", "KC_LGUI", 0xe3, 5, 1, 1.25, Y[5], 1.25));
  keys.push(k("AltLeft", "Alt", "KC_LALT", 0xe2, 5, 2, 2.5, Y[5], 1.25));
  keys.push(k("Space", "Space", "KC_SPC", 0x2c, 5, 3, 3.75, Y[5], 6.25));
  keys.push(k("AltRight", "Alt", "KC_RALT", 0xe6, 5, 4, 10, Y[5], 1.25));
  keys.push(k("MetaRight", "Win", "KC_RGUI", 0xe7, 5, 5, 11.25, Y[5], 1.25));
  keys.push(k("ContextMenu", "Menu", "KC_APP", 0x65, 5, 6, 12.5, Y[5], 1.25));
  keys.push(k("ControlRight", "Ctrl", "KC_RCTL", 0xe4, 5, 7, 13.75, Y[5], 1.25));
  keys.push(k("ArrowLeft", "←", "KC_LEFT", 0x50, 5, 15, NAV, Y[5]));
  keys.push(k("ArrowDown", "↓", "KC_DOWN", 0x51, 5, 16, NAV + 1, Y[5]));
  keys.push(k("ArrowRight", "→", "KC_RGHT", 0x4f, 5, 17, NAV + 2, Y[5]));
  keys.push(k("Numpad0", "0", "KC_P0", 0x62, 5, 19, NUM, Y[5], 2));
  keys.push(k("NumpadDecimal", ".", "KC_PDOT", 0x63, 5, 21, NUM + 2, Y[5]));
  return keys;
}

const KEYS = buildKeys();
const byId = new Map(KEYS.map((key) => [key.id, key]));
const byHid = new Map(KEYS.map((key) => [key.hid, key]));

function keyById(id) {
  return byId.get(id);
}

function assignLeds(keys) {
  [...keys]
    .sort((a, b) => a.y - b.y || a.x - b.x || a.id.localeCompare(b.id))
    .forEach((key, index) => {
      key.led = index;
    });
}

function overlaps(a, b) {
  const gap = 0.02;
  return a.x < b.x + b.w - gap
    && a.x + a.w > b.x + gap
    && a.y < b.y + b.h - gap
    && a.y + a.h > b.y + gap;
}

function validateKeys(keys, boardW = BOARD_W, boardH = BOARD_H) {
  assignLeds(keys);
  const errors = [];
  if (keys.length !== 104) errors.push("count " + keys.length);
  const ids = new Set();
  const cells = new Set();
  const hids = new Set();
  keys.forEach((key) => {
    if (ids.has(key.id)) errors.push("dup id " + key.id);
    ids.add(key.id);
    const cell = key.r + "," + key.c;
    if (cells.has(cell)) errors.push("dup cell " + cell + " " + key.id);
    cells.add(cell);
    if (hids.has(key.hid)) errors.push("dup hid " + key.hid.toString(16) + " " + key.id);
    hids.add(key.hid);
    if (key.r < 0 || key.r > 5 || key.c < 0 || key.c > 22) errors.push("range " + key.id);
    if (key.x < -0.001 || key.y < -0.001 || key.x + key.w > boardW + 0.02 || key.y + key.h > boardH + 0.02) {
      errors.push("bounds " + key.id);
    }
  });
  for (let i = 0; i < keys.length; i += 1) {
    for (let j = i + 1; j < keys.length; j += 1) {
      if (overlaps(keys[i], keys[j])) errors.push("overlap " + keys[i].id + " " + keys[j].id);
    }
  }
  Object.keys(FN).forEach((id) => {
    if (!ids.has(id)) errors.push("fn " + id);
  });
  Object.keys(FN2).forEach((id) => {
    if (!ids.has(id)) errors.push("fn2 " + id);
  });
  if (new Set(keys.map((key) => key.led)).size !== keys.length) errors.push("led");
  return errors;
}

function defaultBinding(id, layer) {
  const key = byId.get(id);
  if (!key) return "KC_NO";
  if (layer === "base") return key.kc;
  if (layer === "fn") return FN[id] || "KC_TRNS";
  if (layer === "fn2") return FN2[id] || "KC_TRNS";
  return "KC_TRNS";
}

function matrixSize(keys, cell) {
  let rows = 6;
  let cols = 23;
  keys.forEach((key) => {
    const pos = cell(key.id);
    if (pos.r + 1 > rows) rows = pos.r + 1;
    if (pos.c + 1 > cols) cols = pos.c + 1;
  });
  return {
    rows: Math.min(Math.max(rows, 1), 12),
    cols: Math.min(Math.max(cols, 1), 24),
  };
}

function renderKeymapC({ keys, layers, binding, cell }) {
  const size = matrixSize(keys, cell);
  const grid = Array.from({ length: size.rows }, () => Array(size.cols).fill(null));
  const problems = [];
  keys.forEach((key) => {
    const pos = cell(key.id);
    if (pos.r < 0 || pos.c < 0 || pos.r >= size.rows || pos.c >= size.cols) {
      problems.push(key.id + " 超出矩阵");
      return;
    }
    const occupied = grid[pos.r][pos.c];
    if (occupied) {
      problems.push("R" + pos.r + "C" + pos.c + "：" + occupied.id + " 与 " + key.id);
      return;
    }
    grid[pos.r][pos.c] = key;
  });

  const lines = [
    "/* 键位调试台导出",
    " * 布局: ANSI 104",
    " * 逻辑矩阵: " + size.rows + " 行 × " + size.cols + " 列。空位键值 KC_NO，空位灯序 255。",
    " * 这里的行列是页面上的逻辑坐标，写进固件前改成原理图上的矩阵。",
  ];
  if (problems.length) {
    lines.push(" * 冲突:");
    problems.forEach((problem) => lines.push(" * - " + problem));
  }
  lines.push(" */", "");
  lines.push("#define MATRIX_ROWS " + size.rows);
  lines.push("#define MATRIX_COLS " + size.cols, "");
  lines.push("enum layer_names {", "    L_BASE = 0,", "    L_FN,", "    L_FN2,", "};", "");
  lines.push("const uint16_t keymaps[][MATRIX_ROWS][MATRIX_COLS] = {");
  layers.forEach((layer, index) => {
    lines.push("    [" + index + "] = { /* " + layer.name + " */");
    for (let r = 0; r < size.rows; r += 1) {
      const items = [];
      for (let c = 0; c < size.cols; c += 1) {
        const key = grid[r][c];
        items.push(key ? binding(key.id, layer.id) : "KC_NO");
      }
      lines.push("        { " + items.join(", ") + " },");
    }
    lines.push("    },");
  });
  lines.push("};", "");
  lines.push("const uint8_t led_index[MATRIX_ROWS][MATRIX_COLS] = {");
  for (let r = 0; r < size.rows; r += 1) {
    const items = [];
    for (let c = 0; c < size.cols; c += 1) {
      const key = grid[r][c];
      items.push(key ? String(cell(key.id).led) : "255");
    }
    lines.push("    { " + items.join(", ") + " },");
  }
  lines.push("};", "");
  return lines.join("\n");
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    KEYS,
    BOARD_W,
    BOARD_H,
    LAYERS,
    FN,
    FN2,
    validateKeys,
    defaultBinding,
    renderKeymapC,
    matrixSize,
    assignLeds,
  };
}

function boot() {
  assignLeds(KEYS);
  const deckEl = document.getElementById("deck");
  const matrixEl = document.getElementById("matrix");
  const logEl = document.getElementById("log");
  const sideEl = document.getElementById("side");
  const statsEl = document.getElementById("stats");
  const boardView = document.getElementById("boardView");
  const matrixView = document.getElementById("matrixView");
  const focusBanner = document.getElementById("focusBanner");
  const reportHex = document.getElementById("reportHex");
  const hidDot = document.getElementById("hidDot");
  const hidBtn = document.getElementById("hidBtn");

  const holders = new Map();
  let resetTimer = 0;
  const state = {
    layer: "base",
    selected: null,
    showCoord: false,
    showLed: false,
    down: new Set(),
    pressedAt: new Map(),
    pointerHeld: null,
    log: [],
    chatterCount: 0,
    pressCount: 0,
    lastDur: null,
    bindings: {},
    matrix: {},
    formError: "",
    formDraft: "",
    confirmReset: false,
    device: null,
  };

  deckEl.style.setProperty("--board-w", BOARD_W);
  deckEl.style.setProperty("--board-h", BOARD_H);
  deckEl.style.aspectRatio = BOARD_W + " / " + BOARD_H;

  function loadPersisted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (data && data.bindings && typeof data.bindings === "object") state.bindings = data.bindings;
      if (data && data.matrix && typeof data.matrix === "object") state.matrix = data.matrix;
    } catch (err) {
      /* ignore broken local data */
    }
  }

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        bindings: state.bindings,
        matrix: state.matrix,
      }));
    } catch (err) {
      /* ignore quota errors */
    }
  }

  function binding(id, layer) {
    const over = state.bindings[id];
    if (over && typeof over[layer] === "string" && over[layer]) return over[layer];
    return defaultBinding(id, layer);
  }

  function cellOf(id) {
    const key = keyById(id);
    const over = state.matrix[id] || {};
    return {
      r: Number.isInteger(over.r) ? over.r : key.r,
      c: Number.isInteger(over.c) ? over.c : key.c,
      led: Number.isInteger(over.led) ? over.led : key.led,
    };
  }

  function currentExport() {
    return renderKeymapC({
      keys: KEYS,
      layers: LAYERS,
      binding,
      cell: cellOf,
    });
  }

  function shortCode(code) {
    if (SHORT[code]) return SHORT[code];
    if (code.startsWith("KC_")) return code.slice(3);
    return code;
  }

  function fmtHid(n) {
    return "0x" + n.toString(16).toUpperCase().padStart(2, "0");
  }

  function esc(value) {
    return String(value).replace(/[&<>"']/g, (ch) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[ch]));
  }

  function clamp(n, min, max) {
    if (!Number.isFinite(n)) return min;
    return Math.min(max, Math.max(min, Math.round(n)));
  }

  function fillKey(el, key) {
    const code = binding(key.id, state.layer);
    const trans = code === "KC_TRNS";
    const custom = !trans && code !== key.kc;
    const wide = key.w >= 1.5 || key.h >= 2;
    const cell = cellOf(key.id);
    let center = key.legend;
    let micro = "";
    if (trans) {
      if (wide) micro = "TRNS";
    } else if (custom) {
      center = shortCode(code);
      if (wide) micro = key.legend;
    } else if (wide) {
      micro = shortCode(code);
    }
    el.classList.toggle("trans", trans);
    el.classList.toggle("custom", custom);
    el.classList.toggle("selected", state.selected === key.id);
    el.classList.toggle("down", state.down.has(key.id));
    const legendEl = el.querySelector(".legend");
    legendEl.textContent = center;
    legendEl.className = "legend";
    if (center === "Space") legendEl.classList.add("space");
    else if (String(center).length > 3) legendEl.classList.add("compact");
    el.querySelector(".micro").textContent = micro;
    const bits = [];
    if (state.showCoord) bits.push(cell.r + "," + cell.c);
    if (state.showLed) bits.push("#" + cell.led);
    const meta = el.querySelector(".meta");
    meta.textContent = bits.join(" ");
    meta.hidden = bits.length === 0;
    el.title = key.legend + "  " + code + "  HID " + fmtHid(key.hid) + "  R" + cell.r + " C" + cell.c + "  灯 " + cell.led;
  }

  function renderDeck() {
    deckEl.replaceChildren();
    KEYS.forEach((key) => {
      const el = document.createElement("div");
      el.className = "key";
      el.dataset.id = key.id;
      el.style.setProperty("--x", key.x);
      el.style.setProperty("--y", key.y);
      el.style.setProperty("--w", key.w);
      el.style.setProperty("--h", key.h);
      el.innerHTML = '<div class="cap"><span class="micro"></span><span class="legend"></span><span class="meta"></span></div>';
      deckEl.appendChild(el);
      fillKey(el, key);
    });
  }

  function updateFaces() {
    Array.from(deckEl.children).forEach((el) => {
      const key = keyById(el.dataset.id);
      if (key) fillKey(el, key);
    });
  }

  function matrixLabel(key) {
    const code = binding(key.id, state.layer);
    if (code !== "KC_TRNS" && code !== key.kc) return shortCode(code);
    return key.legend;
  }

  function renderMatrix() {
    const size = matrixSize(KEYS, cellOf);
    const buckets = Array.from({ length: size.rows }, () => Array.from({ length: size.cols }, () => []));
    KEYS.forEach((key) => {
      const pos = cellOf(key.id);
      if (pos.r >= 0 && pos.c >= 0 && pos.r < size.rows && pos.c < size.cols) buckets[pos.r][pos.c].push(key);
    });
    const downCells = new Set();
    const crossR = new Set();
    const crossC = new Set();
    state.down.forEach((id) => {
      const pos = cellOf(id);
      downCells.add(pos.r + "," + pos.c);
      crossR.add(pos.r);
      crossC.add(pos.c);
    });
    matrixEl.classList.add("matrix");
    matrixEl.style.gridTemplateColumns = "32px repeat(" + size.cols + ", minmax(34px, 1fr))";
    const parts = ['<div class="mh"></div>'];
    for (let c = 0; c < size.cols; c += 1) parts.push('<div class="mh">' + c + "</div>");
    for (let r = 0; r < size.rows; r += 1) {
      parts.push('<div class="mh">R' + r + "</div>");
      for (let c = 0; c < size.cols; c += 1) {
        const list = buckets[r][c];
        const down = downCells.has(r + "," + c);
        const cross = !down && (crossR.has(r) || crossC.has(c));
        if (!list.length) {
          parts.push('<div class="cell empty' + (cross ? " cross" : "") + '"></div>');
          continue;
        }
        const label = list.map(matrixLabel).join("/");
        const cls = ["cell"];
        if (down) cls.push("down");
        else if (cross) cls.push("cross");
        if (list.length > 1) cls.push("conflict");
        if (list.some((key) => key.id === state.selected)) cls.push("selected");
        parts.push('<div class="' + cls.join(" ") + '" data-id="' + esc(list[0].id) + '" title="' + esc(label) + '">' + esc(label) + "</div>");
      }
    }
    matrixEl.innerHTML = parts.join("");
  }

  function fmtTime(ts) {
    const date = new Date(ts);
    const pad = (n, len = 2) => String(n).padStart(len, "0");
    return pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" + pad(date.getSeconds()) + "." + pad(date.getMilliseconds(), 3);
  }

  function renderLog() {
    const cols = '<div class="logcols"><span>时间</span><span>动作</span><span>键</span><span>键值</span><span>HID</span><span>矩阵</span><span>时长</span><span>来源</span></div>';
    if (!state.log.length) {
      logEl.innerHTML = cols + '<div class="empty-log">在这个页面上按键。键帽、矩阵和这里的记录会一起动。也可以用鼠标按住键帽。</div>';
      return;
    }
    const rows = state.log.map((row) => {
      const dur = row.dur == null ? "—" : (row.dur + " ms" + (row.chatter ? " 抖动" : ""));
      return '<div class="logrow' + (row.chatter ? " chatter" : "") + '">'
        + "<span>" + fmtTime(row.t) + "</span>"
        + '<span class="' + (row.action === "松开" ? "act-up" : "") + '">' + row.action + "</span>"
        + "<span>" + esc(row.legend) + "</span>"
        + '<span class="mono">' + esc(row.kc) + "</span>"
        + '<span class="mono">' + esc(row.hid) + "</span>"
        + '<span class="mono">' + row.r + "," + row.c + "</span>"
        + '<span class="' + (row.chatter ? "bad" : "mono") + '">' + esc(dur) + "</span>"
        + "<span>" + esc(row.source) + "</span>"
        + "</div>";
    });
    logEl.innerHTML = cols + rows.join("");
    logEl.scrollTop = logEl.scrollHeight;
  }

  function updateStats() {
    const names = [];
    state.down.forEach((id) => {
      const key = keyById(id);
      if (key) names.push(key.legend);
    });
    const held = names.length ? names.slice(0, 8).join(" ") : "无";
    const extra = names.length > 8 ? "…" : "";
    const last = state.lastDur == null ? "—" : state.lastDur + "ms";
    statsEl.textContent = "按住 " + state.down.size + " · " + held + extra + " · 记录 " + state.pressCount + " · 抖动 " + state.chatterCount + " · 上次 " + last;
  }

  function logEvent(entry) {
    state.log.push(entry);
    if (state.log.length > 40) state.log.shift();
    renderLog();
  }

  function snapshot(id) {
    const key = keyById(id);
    const cell = cellOf(id);
    return {
      legend: key.legend,
      kc: binding(id, state.layer),
      hid: fmtHid(key.hid),
      r: cell.r,
      c: cell.c,
    };
  }

  function press(id, source) {
    if (!keyById(id)) return;
    let sources = holders.get(id);
    if (!sources) {
      sources = new Set();
      holders.set(id, sources);
    }
    if (sources.has(source)) return;
    const wasDown = sources.size > 0;
    sources.add(source);
    if (wasDown) return;
    state.down.add(id);
    state.pressedAt.set(id, performance.now());
    state.pressCount += 1;
    logEvent(Object.assign({ t: Date.now(), action: "按下", source, dur: null, chatter: false }, snapshot(id)));
    syncPressVisual();
  }

  function release(id, source) {
    const sources = holders.get(id);
    if (!sources || !sources.has(source)) return;
    sources.delete(source);
    if (sources.size > 0) return;
    holders.delete(id);
    state.down.delete(id);
    const started = state.pressedAt.get(id);
    state.pressedAt.delete(id);
    const dur = started == null ? null : Math.round(performance.now() - started);
    const chatter = dur != null && dur < CHATTER_MS;
    if (chatter) state.chatterCount += 1;
    if (dur != null) state.lastDur = dur;
    logEvent(Object.assign({ t: Date.now(), action: "松开", source, dur, chatter }, snapshot(id)));
    syncPressVisual();
  }

  function releaseSource(source) {
    const ids = [];
    holders.forEach((sources, id) => {
      if (sources.has(source)) ids.push(id);
    });
    ids.forEach((id) => release(id, source));
  }

  function syncPressVisual() {
    Array.from(deckEl.children).forEach((el) => {
      el.classList.toggle("down", state.down.has(el.dataset.id));
    });
    renderMatrix();
    updateStats();
  }

  function conflicts(id) {
    const cell = cellOf(id);
    return KEYS.filter((key) => key.id !== id && cellOf(key.id).r === cell.r && cellOf(key.id).c === cell.c);
  }

  function ledConflicts(id) {
    const led = cellOf(id).led;
    return KEYS.filter((key) => key.id !== id && cellOf(key.id).led === led);
  }

  function renderSide() {
    const key = state.selected ? keyById(state.selected) : null;
    const parts = [];
    parts.push("<h2>选中的键</h2>");
    if (!key) {
      parts.push('<p class="note">点一个键帽，或直接按键盘。右边可以改这个键在当前层的键值、矩阵坐标和灯序。</p>');
    } else {
      const cell = cellOf(key.id);
      const code = state.formDraft || binding(key.id, state.layer);
      const same = conflicts(key.id);
      const leds = ledConflicts(key.id);
      parts.push('<p class="keyname">' + esc(key.legend) + "</p>");
      parts.push('<p class="subline">' + esc(key.id) + " · " + esc(binding(key.id, state.layer)) + " · " + fmtHid(key.hid) + "</p>");
      parts.push('<div class="fields">');
      parts.push('<label class="field"><span>矩阵行</span><input id="editR" type="number" min="0" max="11" value="' + cell.r + '"></label>');
      parts.push('<label class="field"><span>矩阵列</span><input id="editC" type="number" min="0" max="23" value="' + cell.c + '"></label>');
      parts.push('<label class="field"><span>灯序</span><input id="editLed" type="number" min="0" max="255" value="' + cell.led + '"></label>');
      parts.push('<label class="field wide"><span>当前层键值</span><input id="editCode" type="text" autocomplete="off" spellcheck="false" list="kcList" value="' + esc(code) + '"></label>');
      parts.push("</div>");
      parts.push('<datalist id="kcList">' + SUGGESTIONS.map((item) => '<option value="' + item + '"></option>').join("") + "</datalist>");
      if (state.formError) parts.push('<p class="warn">' + esc(state.formError) + "</p>");
      if (same.length) parts.push('<p class="warn">这个坐标还被 ' + esc(same.map((item) => item.legend).join("、")) + " 占用</p>");
      if (leds.length) parts.push('<p class="warn">这个灯序还被 ' + esc(leds.map((item) => item.legend).join("、")) + " 占用</p>");
      parts.push('<div class="actions" style="margin-top:10px">');
      parts.push('<button type="button" class="ghost" data-act="mo1">设为 MO(1)</button>');
      parts.push('<button type="button" class="ghost" data-act="mo2">设为 MO(2)</button>');
      parts.push('<button type="button" class="ghost" data-act="revert">恢复这一层</button>');
      parts.push("</div>");
      parts.push('<p class="note">键值用 QMK 写法，例如 KC_A、KC_TRNS、QK_BOOT、MO(1)。层在上方手动切换，不跟物理 Fn 键走。</p>');
    }
    parts.push("<h2>导出</h2>");
    parts.push('<div class="actions">');
    parts.push('<button type="button" class="primary" data-act="copy">复制 C 数组</button>');
    parts.push('<button type="button" class="ghost" data-act="download">下载 keymap.c</button>');
    parts.push('<button type="button" class="ghost' + (state.confirmReset ? " danger-text" : "") + '" data-act="reset">' + (state.confirmReset ? "再点一次确认" : "恢复初始") + "</button>");
    parts.push("</div>");
    parts.push('<pre id="exportPreview" class="export"></pre>');
    parts.push('<p class="note">第一版只在浏览器里看和导出，不会把键值写进键盘。</p>');
    sideEl.innerHTML = parts.join("");
    const preview = document.getElementById("exportPreview");
    if (preview) preview.textContent = currentExport();
  }

  function select(id) {
    if (state.selected === id) return;
    state.selected = id;
    state.formError = "";
    state.formDraft = "";
    updateFaces();
    renderMatrix();
    renderSide();
  }

  function setBinding(id, layer, value) {
    const clean = value.trim().toUpperCase().replace(/\s+/g, "");
    if (!state.bindings[id]) state.bindings[id] = {};
    if (!clean || clean === defaultBinding(id, layer)) delete state.bindings[id][layer];
    else state.bindings[id][layer] = clean;
    if (state.bindings[id] && !Object.keys(state.bindings[id]).length) delete state.bindings[id];
    state.formDraft = "";
    state.formError = "";
    persist();
    updateFaces();
    renderMatrix();
    renderSide();
  }

  function setCell(id, patch) {
    const key = keyById(id);
    const next = Object.assign(cellOf(id), patch);
    next.r = clamp(next.r, 0, 11);
    next.c = clamp(next.c, 0, 23);
    next.led = clamp(next.led, 0, 255);
    const defaults = { r: key.r, c: key.c, led: key.led };
    if (!state.matrix[id]) state.matrix[id] = {};
    ["r", "c", "led"].forEach((name) => {
      if (next[name] === defaults[name]) delete state.matrix[id][name];
      else state.matrix[id][name] = next[name];
    });
    if (!Object.keys(state.matrix[id]).length) delete state.matrix[id];
    persist();
    updateFaces();
    renderMatrix();
    renderSide();
  }

  function commitCode(id, value) {
    const raw = value.trim();
    if (raw === "") {
      setBinding(id, state.layer, defaultBinding(id, state.layer));
      return;
    }
    if (!/^[A-Za-z0-9_()]+$/.test(raw)) {
      state.formError = "键值只能包含字母、数字、下划线和括号";
      state.formDraft = raw;
      renderSide();
      return;
    }
    setBinding(id, state.layer, raw);
  }

  function doReset() {
    state.bindings = {};
    state.matrix = {};
    state.confirmReset = false;
    state.formError = "";
    state.formDraft = "";
    try { localStorage.removeItem(STORAGE_KEY); } catch (err) { /* ignore */ }
    updateFaces();
    renderMatrix();
    renderSide();
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
    return Promise.resolve();
  }

  function downloadText(text) {
    const blob = new Blob([text], { type: "text/x-c" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "keymap.c";
    link.click();
    URL.revokeObjectURL(link.href);
  }

  function setLayer(layer) {
    state.layer = layer;
    state.formDraft = "";
    state.formError = "";
    document.querySelectorAll("[data-layer]").forEach((btn) => {
      btn.classList.toggle("on", btn.dataset.layer === layer);
    });
    updateFaces();
    renderMatrix();
    renderSide();
  }

  function setView(view) {
    boardView.hidden = view !== "board";
    matrixView.hidden = view !== "matrix";
    document.querySelectorAll("[data-view]").forEach((btn) => {
      btn.classList.toggle("on", btn.dataset.view === view);
    });
  }

  function typingTarget(el) {
    if (!el || !el.tagName) return false;
    return el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable;
  }

  function setReport(text, live, bad) {
    reportHex.textContent = text;
    reportHex.classList.toggle("live", !!live);
    reportHex.classList.toggle("bad", !!bad);
  }

  function onReport(event) {
    const view = event.data;
    const bytes = new Uint8Array(view.buffer, view.byteOffset, view.byteLength);
    const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join(" ");
    const names = [];
    let rollover = false;
    if (bytes.length >= 8) {
      MOD_MASK.forEach(([mask, id]) => {
        if (bytes[0] & mask) names.push(keyById(id).legend);
      });
      for (let i = 2; i < 8; i += 1) {
        const usage = bytes[i];
        if (!usage) continue;
        if (usage === 0x01) {
          rollover = true;
          continue;
        }
        const key = byHid.get(usage);
        names.push(key ? key.legend : "0x" + usage.toString(16));
      }
    }
    const name = state.device && state.device.productName ? state.device.productName : "HID";
    let text = name + " · " + hex;
    if (names.length) text += "  →  " + names.join(" ");
    if (rollover) text += "  ErrorRollOver";
    if (bytes.length !== 8) text += "  · " + bytes.length + " 字节";
    setReport(text, !rollover, rollover);
  }

  async function openDevice(device) {
    if (!device.opened) await device.open();
    device.addEventListener("inputreport", onReport);
    state.device = device;
    hidBtn.textContent = "断开";
    hidDot.classList.add("on");
    setReport("已连接 " + (device.productName || "HID 键盘"), true, false);
  }

  async function disconnectHid() {
    const device = state.device;
    if (!device) return;
    device.removeEventListener("inputreport", onReport);
    try { await device.close(); } catch (err) { /* already closed */ }
    state.device = null;
    hidBtn.textContent = "连接键盘";
    hidDot.classList.remove("on");
    setReport("未连接 · 直接按键就能看高亮", false, false);
  }

  async function connectHid() {
    if (state.device) {
      await disconnectHid();
      return;
    }
    if (!navigator.hid) {
      setReport("这个浏览器没有 WebHID，请用 Chrome 或 Edge", false, true);
      return;
    }
    try {
      const devices = await navigator.hid.requestDevice({
        filters: [{ usagePage: 0x01, usage: 0x06 }],
      });
      if (!devices[0]) return;
      await openDevice(devices[0]);
    } catch (err) {
      if (err && (err.name === "NotFoundError" || err.name === "AbortError")) return;
      setReport((err && err.message) || "连接失败", false, true);
    }
  }

  async function restoreHid() {
    if (!navigator.hid || !navigator.hid.getDevices) return;
    try {
      const devices = await navigator.hid.getDevices();
      const found = devices.find((device) => device.collections
        && device.collections.some((col) => col.usagePage === 0x01 && col.usage === 0x06));
      if (found) await openDevice(found);
    } catch (err) {
      /* permission not granted yet */
    }
  }

  document.querySelector(".plate").addEventListener("pointerdown", (event) => {
    if (!event.target.closest(".key")) select(null);
  });

  deckEl.addEventListener("pointerdown", (event) => {
    const keyEl = event.target.closest(".key");
    if (!keyEl) return;
    event.preventDefault();
    const id = keyEl.dataset.id;
    select(id);
    press(id, "鼠标");
    state.pointerHeld = id;
    if (keyEl.setPointerCapture) keyEl.setPointerCapture(event.pointerId);
  });

  function endPointer() {
    if (!state.pointerHeld) return;
    release(state.pointerHeld, "鼠标");
    state.pointerHeld = null;
  }
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);

  matrixEl.addEventListener("click", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell || !cell.dataset.id) return;
    select(cell.dataset.id);
  });

  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });
  document.querySelectorAll("[data-layer]").forEach((btn) => {
    btn.addEventListener("click", () => setLayer(btn.dataset.layer));
  });
  document.getElementById("showCoord").addEventListener("change", (event) => {
    state.showCoord = event.target.checked;
    updateFaces();
  });
  document.getElementById("showLed").addEventListener("change", (event) => {
    state.showLed = event.target.checked;
    updateFaces();
  });
  document.getElementById("clearLog").addEventListener("click", () => {
    state.log = [];
    renderLog();
  });
  hidBtn.addEventListener("click", () => { connectHid(); });

  sideEl.addEventListener("change", (event) => {
    const id = state.selected;
    if (!id) return;
    const target = event.target;
    if (target.id === "editCode") commitCode(id, target.value);
    if (target.id === "editR") setCell(id, { r: Number(target.value) });
    if (target.id === "editC") setCell(id, { c: Number(target.value) });
    if (target.id === "editLed") setCell(id, { led: Number(target.value) });
  });
  sideEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.id === "editCode" && state.selected) {
      event.preventDefault();
      commitCode(state.selected, event.target.value);
    }
  });
  sideEl.addEventListener("click", (event) => {
    const btn = event.target.closest("button");
    if (!btn) return;
    const act = btn.dataset.act;
    const id = state.selected;
    if (act === "mo1" && id) setBinding(id, state.layer, "MO(1)");
    if (act === "mo2" && id) setBinding(id, state.layer, "MO(2)");
    if (act === "revert" && id) setBinding(id, state.layer, defaultBinding(id, state.layer));
    if (act === "copy") {
      copyText(currentExport()).then(() => {
        btn.textContent = "已复制";
        setTimeout(() => { if (btn.isConnected) btn.textContent = "复制 C 数组"; }, 1200);
      }).catch(() => {
        btn.textContent = "复制失败";
      });
    }
    if (act === "download") downloadText(currentExport());
    if (act === "reset") {
      if (!state.confirmReset) {
        state.confirmReset = true;
        renderSide();
        clearTimeout(resetTimer);
        resetTimer = setTimeout(() => {
          state.confirmReset = false;
          renderSide();
        }, 2500);
        return;
      }
      clearTimeout(resetTimer);
      doReset();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.repeat || typingTarget(event.target)) return;
    if (event.target && event.target.closest && event.target.closest("button, a")) return;
    const id = CODE_ALIAS[event.code] || event.code;
    if (!keyById(id)) return;
    event.preventDefault();
    press(id, "键盘");
    select(id);
  });
  window.addEventListener("keyup", (event) => {
    if (typingTarget(event.target)) return;
    const id = CODE_ALIAS[event.code] || event.code;
    if (!keyById(id)) return;
    event.preventDefault();
    release(id, "键盘");
  });
  window.addEventListener("blur", () => {
    focusBanner.hidden = false;
    releaseSource("键盘");
  });
  window.addEventListener("focus", () => {
    focusBanner.hidden = true;
  });
  document.addEventListener("focusin", (event) => {
    if (typingTarget(event.target)) releaseSource("键盘");
  });

  loadPersisted();
  renderDeck();
  renderMatrix();
  renderLog();
  renderSide();
  updateStats();
  restoreHid();

  const layoutErrors = validateKeys(KEYS);
  if (layoutErrors.length) console.error(layoutErrors);
}

if (typeof document !== "undefined") boot();
