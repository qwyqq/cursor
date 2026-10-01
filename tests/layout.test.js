const assert = require("assert");
const {
  KEYS,
  LAYERS,
  validateKeys,
  renderKeymapC,
  defaultBinding,
} = require("../app.js");

const errors = validateKeys(KEYS);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const byId = new Map(KEYS.map((key) => [key.id, key]));
assert.strictEqual(byId.get("KeyA").hid, 0x04);
assert.strictEqual(byId.get("KeyZ").hid, 0x1d);
assert.strictEqual(byId.get("Digit1").hid, 0x1e);
assert.strictEqual(byId.get("Digit0").hid, 0x27);
assert.strictEqual(byId.get("Escape").hid, 0x29);
assert.strictEqual(byId.get("F1").hid, 0x3a);
assert.strictEqual(byId.get("F12").hid, 0x45);
assert.strictEqual(byId.get("Numpad1").hid, 0x59);
assert.strictEqual(byId.get("Numpad7").hid, 0x5f);
assert.strictEqual(byId.get("ControlLeft").hid, 0xe0);
assert.strictEqual(KEYS.length, 104);
assert.strictEqual(new Set(KEYS.map((key) => key.led)).size, 104);

const text = renderKeymapC({
  keys: KEYS,
  layers: LAYERS,
  binding: defaultBinding,
  cell: (id) => {
    const key = byId.get(id);
    return { r: key.r, c: key.c, led: key.led };
  },
});

assert.match(text, /#define MATRIX_ROWS 6/);
assert.match(text, /#define MATRIX_COLS 23/);
assert.match(text, /KC_ESC/);
assert.match(text, /KC_A/);
assert.match(text, /QK_BOOT/);
assert.match(text, /EE_CLR/);
assert.match(text, /255/);
assert.strictEqual(defaultBinding("KeyA", "fn"), "KC_TRNS");
assert.strictEqual(defaultBinding("Escape", "fn"), "QK_BOOT");
assert.strictEqual(defaultBinding("ArrowUp", "fn"), "KC_VOLU");

console.log("layout ok", KEYS.length);
