import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const html = readFileSync(new URL("../dist/index.html", import.meta.url), "utf8");
const bootstrap = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const animationSrc = html.match(/data-animation="([^"]+)"/)[1];
const controller = ts.transpileModule(
  readFileSync(new URL("../src/lib/loading.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } },
).outputText;
const key = "npg:intro-seen:v1";

function environment({ seen = false, reduce = false, blockedStorage = false, slowAsset = false } = {}) {
  const flags = new Set();
  const timers = new Map();
  const storage = new Map(seen ? [[key, "1"]] : []);
  let clock = 0;
  let nextId = 0;
  const decode = () => slowAsset ? new Promise(() => {}) : Promise.resolve();
  const image = {
    dataset: { animation: animationSrc, still: "/npg/branding/mark-light.png" },
    decode,
  };
  const root = {
    inert: false,
    attributes: new Map(),
    setAttribute(name, value) { this.attributes.set(name, value); },
    removeAttribute(name) { this.attributes.delete(name); },
  };
  const overlay = {
    hidden: true,
    isConnected: true,
    dataset: {},
    classList: { add: (name) => flags.add(name) },
    querySelector: () => image,
    remove() { this.isConnected = false; },
  };
  const setTimeout = (callback, delay) => {
    const id = ++nextId;
    timers.set(id, { callback, at: clock + delay });
    return id;
  };
  const clearTimeout = (id) => timers.delete(id);
  const matchMedia = () => ({ matches: reduce });
  const context = vm.createContext({
    exports: {},
    require: () => ({ homeContent: { hero: { image: { src: "/hero.webp" } } } }),
    document: {
      getElementById: (id) => id === "root" ? root : overlay.isConnected ? overlay : null,
      documentElement: { classList: { add: (name) => flags.add(name), remove: (name) => flags.delete(name) } },
      fonts: { ready: Promise.resolve() },
    },
    sessionStorage: {
      getItem(name) { if (blockedStorage) throw Error("Storage blocked"); return storage.get(name); },
      setItem(name, value) { if (blockedStorage) throw Error("Storage blocked"); storage.set(name, value); },
    },
    Image: class { decode = decode; },
    window: { matchMedia, setTimeout, clearTimeout },
    performance: { now: () => clock },
    matchMedia,
    setTimeout,
    clearTimeout,
  });

  async function advance(ms) {
    for (let i = 0; i < 10; i++) await Promise.resolve();
    const end = clock + ms;
    while (true) {
      const next = [...timers].filter(([, timer]) => timer.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!next) break;
      clock = next[1].at;
      timers.delete(next[0]);
      next[1].callback();
      for (let i = 0; i < 10; i++) await Promise.resolve();
    }
    clock = end;
  }

  vm.runInContext(bootstrap, context);
  const start = () => {
    vm.runInContext(controller, context);
    context.exports.finishInitialLoading();
  };
  return { root, overlay, image, flags, storage, advance, start };
}

const first = environment();
assert.equal(first.overlay.hidden, false);
assert.equal(first.root.inert, true);
first.start();
await first.advance(1699);
assert.equal(first.flags.has("is-leaving"), false);
await first.advance(1);
assert.equal(first.root.inert, false);
assert.equal(first.storage.get(key), undefined);
await first.advance(350);
assert.equal(first.overlay.isConnected, false);
assert.equal(first.flags.has("is-loading"), false);

const returning = environment({ seen: true });
assert.equal(returning.overlay.hidden, false);
assert.equal(returning.root.inert, true);
returning.start();
await returning.advance(2050);
assert.equal(returning.overlay.isConnected, false);
assert.equal(returning.image.src, animationSrc);
assert.equal(returning.root.inert, false);

const slow = environment({ slowAsset: true });
slow.start();
await slow.advance(1699);
assert.equal(slow.root.inert, true);
await slow.advance(351);
assert.equal(slow.root.inert, false);
assert.equal(slow.overlay.isConnected, false);

const slowStartup = environment();
await slowStartup.advance(1200);
slowStartup.start();
await slowStartup.advance(499);
assert.equal(slowStartup.root.inert, true);
await slowStartup.advance(351);
assert.equal(slowStartup.overlay.isConnected, false);
assert.equal(slowStartup.root.inert, false);

const noBundle = environment();
await noBundle.advance(8000);
assert.equal(noBundle.root.inert, false);
assert.equal(noBundle.overlay.isConnected, false);

const restricted = environment({ blockedStorage: true });
restricted.start();
await restricted.advance(2050);
assert.equal(restricted.root.inert, false);
assert.equal(restricted.overlay.isConnected, false);

const reduced = environment({ reduce: true });
assert.equal(reduced.image.src, "/npg/branding/mark-light.png");
reduced.start();
await reduced.advance(0);
assert.equal(reduced.overlay.isConnected, false);
assert.equal(reduced.root.inert, false);

const animation = readFileSync(new URL(`../public${animationSrc.split("?")[0]}`, import.meta.url));
let loopCount;
for (let offset = 12; offset + 8 <= animation.length;) {
  const size = animation.readUInt32LE(offset + 4);
  if (animation.toString("ascii", offset, offset + 4) === "ANIM") {
    loopCount = animation.readUInt16LE(offset + 12);
    break;
  }
  offset += 8 + size + (size % 2);
}
assert.equal(loopCount, 1, "The loading animation must play exactly once.");

console.log("Passed: every entry, returning session, single playback, slow assets, delayed startup, missing bundle, blocked storage, reduced motion.");
