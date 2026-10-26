// LocalPictureGallery – runtime check
// Loads the page in a headless DOM with scripts enabled and records every outbound request.
// Expected result: the page initialises (title, language, version) and makes ZERO requests.
//   npm install jsdom && node runtime-check.js LocalPictureGallery.html
const fs = require('fs');
const jsdom = require('jsdom');
const file = process.argv[2] || 'LocalPictureGallery.html';
const html = fs.readFileSync(file, 'utf8');
const requests = [];

// Any attempt to load an external resource is reported here by jsdom (as a load error,
// because the sandbox has no network) – that is the signal we are watching for.
const vc = new jsdom.VirtualConsole();
vc.on('jsdomError', e => {
  const m = String(e && (e.message || e));
  const url = (m.match(/https?:\/\/\S+/) || [])[0];
  if (/Could not load|resource/i.test(m)) requests.push(url || m.slice(0, 120));
  else console.error('page error:', m.slice(0, 200));
});

const opts = {
  runScripts: 'dangerously', resources: 'usable', url: 'file:///' + file,
  pretendToBeVisual: true, virtualConsole: vc,
  beforeParse(w) {   // browser APIs jsdom lacks – installed before the page's script runs
    w.IntersectionObserver = class { constructor() {} observe() {} disconnect() {} };
    w.requestAnimationFrame = () => 0;
    w.fetch = u => { requests.push('fetch ' + u); return new Promise(() => {}); };   // record, never resolve
    const origOpen = w.XMLHttpRequest.prototype.open;
    w.XMLHttpRequest.prototype.open = function (m, u, ...a) { requests.push('xhr ' + u); return origOpen.call(this, m, u, ...a); };
    if (w.navigator) w.navigator.sendBeacon = u => { requests.push('beacon ' + u); return false; };
  }
};
if (jsdom.ResourceLoader) {   // older jsdom: direct hook on every resource fetch
  opts.resources = new (class extends jsdom.ResourceLoader { fetch(url) { requests.push(url); return null; } })();
}

const dom = new jsdom.JSDOM(html, opts);
const w = dom.window;

setTimeout(() => {
  const d = w.document;
  const info = { title: d.title, lang: d.documentElement.lang, dir: d.documentElement.dir, version: d.getElementById('ver')?.textContent };
  console.log('page initialised:', JSON.stringify(info));
  if (!info.title || !info.version) { console.log('FAIL  page did not initialise'); process.exit(1); }
  if (requests.length) { console.log('FAIL  outbound requests:', requests); process.exit(1); }
  console.log('PASS  outbound network requests: 0');
  process.exit(0);
}, 800);
