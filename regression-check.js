// LocalPictureGallery – regression tests
// Every behaviour that was built, reported broken, or fixed in an earlier version is asserted here,
// so a later change cannot silently undo it. Runs in GitHub Actions on every push / release, and locally:
//   npm install jsdom && node regression-check.js LocalPictureGallery.html
// Each test names the version it guards. Add a test whenever a bug is fixed or a capability is added.

const fs = require('fs');
const jsdom = require('jsdom');
const file = process.argv[2] || 'LocalPictureGallery.html';
const html = fs.readFileSync(file, 'utf8');

let pass = 0, fail = 0;
const results = [];
function test(id, name, fn) {
  try { const r = fn(); if (r instanceof Promise) return r.then(() => ok(id, name)).catch(e => bad(id, name, e)); ok(id, name); }
  catch (e) { bad(id, name, e); }
}
function ok(id, name) { pass++; results.push(`PASS  [${id}] ${name}`); }
function bad(id, name, e) { fail++; results.push(`FAIL  [${id}] ${name}\n        ${String(e && e.message || e).split('\n')[0]}`); }
function eq(a, b, what) { if (a !== b) throw new Error(`${what || 'value'}: expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`); }
function has(arr, x, what) { if (!arr.includes(x)) throw new Error(`${what || 'list'} should include ${JSON.stringify(x)}; got ${JSON.stringify(arr)}`); }
function hasNot(arr, x, what) { if (arr.includes(x)) throw new Error(`${what || 'list'} must NOT include ${JSON.stringify(x)}; got ${JSON.stringify(arr)}`); }

// ---------- a fresh page, driven like a user ----------
function page({ langs = ['en-US'], hash = '', speech = null, width = 1280 } = {}) {
  const vc = new jsdom.VirtualConsole(); vc.on('jsdomError', () => {});
  const dom = new jsdom.JSDOM(html, {
    runScripts: 'dangerously', url: 'file:///LocalPictureGallery.html' + hash, pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) {
      Object.defineProperty(w.navigator, 'languages', { get: () => langs });
      Object.defineProperty(w.navigator, 'language', { get: () => langs[0] });
      Object.defineProperty(w, 'innerWidth', { get: () => width });
      w.IntersectionObserver = class { constructor() {} observe() {} disconnect() {} };
      w.requestAnimationFrame = () => 0;
      w.URL.createObjectURL = () => 'blob:fake'; w.URL.revokeObjectURL = () => {};
      // speech: null = no API at all; otherwise the status available() reports, plus a hook to feed results
      if (speech) {
        const hooks = w.__speech = { instances: [] };
        w.SpeechRecognition = class { constructor() { hooks.instances.push(this); } start() { this.onstart && this.onstart(); } stop() { this.onend && this.onend(); } };
        w.SpeechRecognition.available = async () => speech;
        w.SpeechRecognition.install = async () => true;
      } else { delete w.SpeechRecognition; delete w.webkitSpeechRecognition; }
    }
  });
  const w = dom.window, d = w.document;
  const $ = id => d.getElementById(id);
  // load a set of file names the way "Choose files" does (view-only mode)
  const load = names => {
    const mime = n => /\.(jpe?g)$/i.test(n) ? 'image/jpeg' : /\.png$/i.test(n) ? 'image/png' : /\.heic$/i.test(n) ? 'image/heic' : '';   // as a real browser reports them
    const files = names.map(n => ({ name: n, type: mime(n), webkitRelativePath: '' }));
    const input = $('files'); Object.defineProperty(input, 'files', { value: files, configurable: true });
    input.dispatchEvent(new w.Event('change'));
  };
  const search = q => { $('search').value = q; $('search').dispatchEvent(new w.Event('input')); };
  const shown = () => [...d.querySelectorAll('#grid .card .name')].map(e => e.textContent);
  const tick = ms => new Promise(r => setTimeout(r, ms || 50));
  return { w, d, $, load, search, shown, tick };
}

const NAMES = ['IMG-20261025-947911764.jpg', 'IMG-20261025-952921765.jpg', 'IMG-20261025-952921773.jpg', 'IMG_17.jpg', 'IMG_177.jpg', 'IMG_117.jpg',
  'yossi_2024.jpg', 'יוסי_חתונה.jpg', 'Moshe-Cohen.jpg', 'משה כהן.png', 'Rivka.jpg', 'רבקה.png', 'Noa.jpg', 'נועה.jpg', 'Shira1.jpg', 'שירה.jpg',
  'Chaim.jpg', 'חיים.jpg', 'David.jpg', 'דוד.jpg', 'Sarah.jpg', 'שרה.jpg', 'Itzik.jpg', 'איציק.jpg', 'ahmad.png', 'أحمد.jpg', 'photo.HEIC', 'notes.txt', 'sub/dir/Tamar.jpg'];

(async () => {
  // ===== v1.0.0 – language detection =====
  await test('1.0.0', 'Hebrew device opens in Hebrew, RTL', () => { const p = page({ langs: ['he-IL'] }); eq(p.d.documentElement.lang, 'he'); eq(p.d.documentElement.dir, 'rtl'); });
  await test('1.0.0', 'English device opens in English, LTR', () => { const p = page({ langs: ['en-US'] }); eq(p.d.documentElement.lang, 'en'); eq(p.d.documentElement.dir, 'ltr'); });
  await test('1.4.0', 'Arabic device opens in Arabic, RTL', () => { const p = page({ langs: ['ar-IL', 'he'] }); eq(p.d.documentElement.lang, 'ar'); eq(p.d.documentElement.dir, 'rtl'); eq(p.$('pickDir').textContent, 'اختر مجلدًا'); });
  await test('1.4.0', 'Arabic entry shows the Israeli flag and the native name', () => { const p = page(); const b = p.d.querySelector('#langMenu button[data-code=ar]'); if (!b) throw new Error('no ar entry'); eq(b.querySelector('.native').textContent, 'العربية'); if (b.querySelector('.flag').innerHTML !== p.d.querySelector('#langMenu button[data-code=he] .flag').innerHTML) throw new Error('flag differs from Hebrew (should be Israel)'); });
  await test('1.4.0', 'Every UI string exists in all three languages', () => { const p = page(); for (const code of ['he', 'ar']) { p.d.querySelector('#langMenu button[data-code=' + code + ']').click(); for (const el of p.d.querySelectorAll('[data-i18n]')) if (!el.textContent.trim()) throw new Error(code + ': empty ' + el.dataset.i18n); } });
  await test('1.4.0', 'Arabic file names are found by plain search', () => { const p = page({ langs: ['ar'] }); p.load(NAMES); p.search('أحمد'); has(p.shown(), 'أحمد.jpg'); });
  await test('1.0.0', 'Unknown device language falls back to English', () => { const p = page({ langs: ['fr-FR', 'de'] }); eq(p.d.documentElement.lang, 'en'); });
  await test('1.0.0', '#lang=he in the address overrides an English device', () => { const p = page({ langs: ['en-US'], hash: '#lang=he' }); eq(p.d.documentElement.lang, 'he'); });
  await test('1.0.0', 'Rename row stays English/LTR in a Hebrew UI', () => { const p = page({ langs: ['he-IL'] }); eq(p.d.querySelector('#renameBar label').textContent, 'File name:'); eq(p.w.getComputedStyle(p.$('renameBar')).direction, 'ltr'); });
  await test('1.0.0', 'Version stamp shown next to the title', () => { const p = page(); if (!/^v\d+\.\d+\.\d+$/.test(p.$('ver').textContent)) throw new Error('got ' + p.$('ver').textContent); });

  // ===== v1.0.0 – loading, filtering, paging =====
  await test('1.3.3', 'Only browser-renderable images are listed; txt and HEIC are not (HEIC was listed as a broken thumbnail)', () => { const p = page(); p.load(NAMES); const s = p.shown(); hasNot(s, 'notes.txt'); hasNot(s, 'photo.HEIC'); has(s, 'yossi_2024.jpg'); });
  await test('1.0.0', 'Plain substring filter works and the count shows filtered/total', () => { const p = page(); p.load(NAMES); p.search('IMG_1'); eq(p.shown().length, 3); eq(p.$('count').textContent, '3 / ' + (NAMES.length - 2)); });
  await test('1.0.0', 'Empty filter shows everything again', () => { const p = page(); p.load(NAMES); p.search('zzz'); eq(p.shown().length, 0); p.search(''); eq(p.shown().length, NAMES.length - 2); });
  await test('1.1.0', 'Grid builds 100 cards at a time and reports the rest', () => { const p = page(); p.load(Array.from({ length: 250 }, (_, i) => `p${i}.jpg`)); eq(p.shown().length, 100); if (!/100/.test(p.$('more').textContent) || !/250/.test(p.$('more').textContent)) throw new Error('more: ' + p.$('more').textContent); });
  await test('1.1.0', 'Filter still searches all files, not just the rendered 100', () => { const p = page(); p.load(Array.from({ length: 250 }, (_, i) => `p${i}.jpg`)); p.search('p249'); has(p.shown(), 'p249.jpg'); });

  // ===== v1.2.1 – numeric search is exact (reported: 117 matched 17 and 177) =====
  await test('1.2.1', 'Searching 117 does not match 17 or 177', () => { const p = page(); p.load(NAMES); p.search('117'); const s = p.shown(); has(s, 'IMG_117.jpg'); has(s, 'IMG-20261025-947911764.jpg'); hasNot(s, 'IMG_17.jpg'); hasNot(s, 'IMG_177.jpg'); hasNot(s, 'IMG-20261025-952921765.jpg'); hasNot(s, 'IMG-20261025-952921773.jpg'); });
  await test('1.2.1', 'Searching 1773 finds exactly one of the three camera files', () => { const p = page(); p.load(NAMES); p.search('1773'); eq(p.shown().filter(n => n.startsWith('IMG-2026')).length, 1); });

  // ===== v1.1.0 – Hebrew ⇄ Latin name matching =====
  const pairs = [['יוסי', 'yossi_2024.jpg'], ['yossi', 'יוסי_חתונה.jpg'], ['משה', 'Moshe-Cohen.jpg'], ['cohen', 'משה כהן.png'], ['rivka', 'רבקה.png'], ['רבקה', 'Rivka.jpg'],
    ['noa', 'נועה.jpg'], ['נועה', 'Noa.jpg'], ['שירה', 'Shira1.jpg'], ['chaim', 'חיים.jpg'], ['david', 'דוד.jpg'], ['sarah', 'שרה.jpg'], ['איציק', 'Itzik.jpg'], ['תמר', 'sub/dir/Tamar.jpg']];
  for (const [q, want] of pairs) await test('1.1.0', `Cross-script: "${q}" finds ${want}`, () => { const p = page(); p.load(NAMES); p.search(q); has(p.shown(), want); });
  await test('1.1.0', 'Cross-script matching does not match everything', () => { const p = page(); p.load(NAMES); p.search('yossi'); if (p.shown().length > 4) throw new Error('too broad: ' + p.shown().length); });
  await test('1.1.0', 'Subfolder path is searchable', () => { const p = page(); p.load(NAMES); p.search('sub/dir'); has(p.shown(), 'sub/dir/Tamar.jpg'); });

  // ===== v1.1.0 / v1.3.2 – language picker =====
  await test('1.1.0', 'Picker lists every language with a flag and marks the current one', () => { const p = page({ langs: ['he-IL'] }); const bs = [...p.d.querySelectorAll('#langMenu button')]; eq(bs.length, 3); eq(bs.every(b => b.querySelector('.flag svg')), true, 'flags'); eq(p.d.querySelector('#langMenu button[aria-checked=true]').dataset.code, 'he'); });
  await test('1.1.0', 'Choosing English in the picker switches the UI to English/LTR', () => { const p = page({ langs: ['he-IL'] }); p.d.querySelector('#langMenu button[data-code=en]').click(); eq(p.d.documentElement.lang, 'en'); eq(p.d.documentElement.dir, 'ltr'); eq(p.$('pickDir').textContent, 'Choose folder'); });
  await test('1.1.1', 'Choosing a language does not write to the address', () => { const p = page({ langs: ['he-IL'] }); p.d.querySelector('#langMenu button[data-code=en]').click(); eq(p.w.location.hash, ''); });
  await test('1.3.2', 'Language menu is anchored to the left in Hebrew (was clipped off-screen)', () => { const p = page({ langs: ['he-IL'] }); const cs = p.w.getComputedStyle(p.$('langMenu')); eq(cs.left, '0px', 'left'); if (cs.right === '0px') throw new Error('right:0 re-introduced'); });
  await test('1.3.2', 'Picker wrapper stacks above the toolbar (menu was painted under the search box)', () => { const p = page(); const z = parseInt(p.w.getComputedStyle(p.d.querySelector('.langwrap')).zIndex, 10); if (!(z > 5)) throw new Error('z-index ' + z); });
  await test('1.3.2', 'Picker always sits top-left, version always bottom-right, in both directions', () => { for (const l of ['he-IL', 'en-US']) { const p = page({ langs: [l] }); const lw = p.w.getComputedStyle(p.d.querySelector('.brand .langwrap')); const v = p.w.getComputedStyle(p.$('ver')); eq(lw.left, '16px', l + ' picker left'); eq(v.right, '16px', l + ' version right'); } });

  // ===== v1.3.0 – logo =====
  await test('1.3.0', 'Logo is inline (data: URI) and sits in the title block', () => { const p = page(); const img = p.d.querySelector('.brand .title img.logo'); if (!img) throw new Error('no logo'); if (!img.src.startsWith('data:image/png;base64,')) throw new Error('not inline'); });
  await test('1.3.0', 'Favicon is inline; apple-touch-icon points into icons/', () => { const p = page(); if (!p.d.querySelector('link[rel=icon]').href.startsWith('data:image/png;base64,')) throw new Error('favicon not inline'); if (!/icons\/icon-180\.png$/.test(p.d.querySelector('link[rel=apple-touch-icon]').href)) throw new Error('apple-touch-icon'); });

  // ===== v1.5.0 – link-preview tags =====
  await test('1.5.0', 'Open Graph preview tags exist and og:image points at the hosted 512 icon', () => { const p = page(); const og = n => p.d.querySelector(`meta[property="og:${n}"]`)?.content; eq(og('title'), 'LocalPictureGallery'); if (!og('description')) throw new Error('no description'); eq(og('image'), 'https://bachargroup.github.io/LocalPictureGallery/icons/icon-512.png'); });
  await test('1.5.0', 'Header logo is still inline (data:), not the hosted icon', () => { const p = page(); if (!p.d.querySelector('.brand .title img.logo').src.startsWith('data:')) throw new Error('logo not inline'); });

  // ===== v1.3.1 – update link =====
  await test('1.3.1', 'Version number is a link to the latest release, opened safely', () => { const p = page(); const a = p.$('ver'); eq(a.tagName, 'A'); eq(a.href, 'https://github.com/BacharGroup/LocalPictureGallery/releases/latest'); eq(a.target, '_blank'); eq(a.rel, 'noopener noreferrer'); });
  await test('1.3.1', 'It is the only link in the page', () => { const p = page(); eq(p.d.querySelectorAll('a[href]').length, 1); });

  // ===== v1.1.0 / v1.3.2 – voice search availability =====
  await test('1.1.0', 'No speech API at all → mic hidden', async () => { const p = page({ speech: null }); await p.tick(); eq(p.$('mic').classList.contains('hidden'), true); });
  await test('1.1.0', 'On-device pack available → mic enabled', async () => { const p = page({ langs: ['en-US'], speech: 'downloadable' }); await p.tick(); eq(p.$('mic').classList.contains('hidden'), false); eq(p.$('mic').disabled, false); });
  await test('1.3.2', 'No on-device pack (Hebrew) → mic visible but disabled, with an explanation', async () => { const p = page({ langs: ['he-IL'], speech: 'unavailable' }); await p.tick(); eq(p.$('mic').classList.contains('hidden'), false); eq(p.$('mic').disabled, true); if (!/ענן/.test(p.$('mic').title)) throw new Error('title: ' + p.$('mic').title); });
  await test('1.1.0', 'Recognizer is created on-device only (processLocally = true)', async () => { const p = page({ langs: ['en-US'], speech: 'available' }); await p.tick(); p.$('mic').click(); await p.tick(); const r = p.w.__speech.instances[0]; if (!r) throw new Error('not started'); eq(r.processLocally, true); eq(r.lang, 'en-US'); });

  // ===== v1.2.0 – spoken numbers → digits =====
  const spoken = [['he-IL', 'תמונה ארבעים ושתיים', 'תמונה 42'], ['he-IL', 'אלפיים ועשרים ושש', '2026'], ['he-IL', 'שלושת אלפים', '3000'], ['he-IL', 'שתים עשרה', '12'], ['he-IL', 'ואז הלכתי', 'ואז הלכתי'],
    ['en-US', 'صورة خمسة وعشرين', 'صورة 25'], ['en-US', 'ثلاثمائة واثنان وعشرون', '322'], ['en-US', 'أحد عشر', '11'], ['en-US', 'IMG ٠٠٤٢', 'IMG 0042']];
  for (const [l, said, want] of spoken) await test('1.2.0', `Spoken "${said}" → "${want}"`, async () => {
    const p = page({ langs: [l], speech: 'available' }); await p.tick(); p.$('mic').click(); await p.tick();
    const r = p.w.__speech.instances[0]; r.onresult({ results: [[{ transcript: said }]] }); eq(p.$('search').value, want);
  });
  await test('1.2.0', 'Dictated number filters the grid (voice → search → results)', async () => {
    const p = page({ langs: ['he-IL'], speech: 'available' }); p.load(NAMES); await p.tick(); p.$('mic').click(); await p.tick();
    p.w.__speech.instances[0].onresult({ results: [[{ transcript: 'מאה ושבע עשרה' }]] }); eq(p.$('search').value, '117'); has(p.shown(), 'IMG_117.jpg'); hasNot(p.shown(), 'IMG_17.jpg');
  });

  // ===== v1.0.0 – lightbox & rename UI =====
  await test('1.0.0', 'Clicking a card opens the lightbox with its name and index', () => { const p = page(); p.load(NAMES); p.d.querySelectorAll('#grid .card')[2].click(); eq(p.$('lb').classList.contains('open'), true); eq(p.$('lbName').textContent, p.shown()[2]); eq(p.$('lbIdx').textContent, '3 / ' + p.shown().length); });
  await test('1.0.0', 'Arrow keys step through images; Escape closes', () => { const p = page(); p.load(NAMES); p.d.querySelectorAll('#grid .card')[0].click(); p.d.dispatchEvent(new p.w.KeyboardEvent('keydown', { key: 'ArrowRight' })); eq(p.$('lbIdx').textContent.split(' / ')[0], '2'); p.d.dispatchEvent(new p.w.KeyboardEvent('keydown', { key: 'Escape' })); eq(p.$('lb').classList.contains('open'), false); });
  await test('1.0.0', 'Rename row is hidden in view-only mode (no folder handle)', () => { const p = page(); p.load(NAMES); p.d.querySelectorAll('#grid .card')[0].click(); eq(p.$('renameBar').classList.contains('hidden'), true); });

  // ===== report =====
  console.log(results.join('\n'));
  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail ? 1 : 0);
})();
