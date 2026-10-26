<img src="icons/icon-128.png" width="96" align="right" alt="">

# LocalPictureGallery

<a name="he"></a>עברית · [English](#english)

[![Security check](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml/badge.svg)](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml)
[![Latest release](https://img.shields.io/github/v/release/BacharGroup/LocalPictureGallery?label=version&color=2ea44f)](https://github.com/BacharGroup/LocalPictureGallery/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

מציג תמונות מקומי בקובץ HTML יחיד. בוחרים תיקייה במחשב, מקבלים רשת תמונות עם סינון, תצוגה מוגדלת ושינוי שם קובץ.
הכול רץ בדפדפן, על המכשיר בלבד – אין שרת, אין התקנה, אין רשת.

**הורדה:** [הגרסה האחרונה](https://github.com/BacharGroup/LocalPictureGallery/releases/latest) · **פתיחה בדפדפן:** [bachargroup.github.io/LocalPictureGallery](https://bachargroup.github.io/LocalPictureGallery/LocalPictureGallery.html)

---

## תאימות

| | צפייה | שינוי שם | חיפוש קולי |
|---|:-:|:-:|:-:|
| Chrome / Edge במחשב | ✔ | ✔ | ✔ |
| Firefox / Safari במחשב | ✔ | ✖ | ✖ |
| Android / iPhone | ✔ | ✖ | ✖ |

שינוי שם וחיפוש קולי נשענים על יכולות שקיימות כיום רק בדפדפני Chromium במחשב. בכל מקרה אחר הקובץ עובד במצב צפייה.

---

## שימוש

1. פותחים את `LocalPictureGallery.html` ב־Chrome או Edge (הורדה ולחיצה כפולה, או הקישור למעלה).
2. **בחר תיקייה** ← בוחרים תיקיית תמונות ← מאשרים בחלון הדפדפן *"להציג ולערוך קבצים"*.
   תתי־תיקיות נסרקות גם כן. הדפדפן לא מאפשר לבחור שורש כונן או תיקיית מערכת.
3. התמונות מוצגות ברשת, 100 בכל פעם; גלילה לתחתית טוענת עוד.
4. **סינון** – מקלידים בתיבת החיפוש. שם שמוקלד בעברית מוצא גם קבצים באנגלית ולהפך (`יוסי` ↔ `yossi`, `rivka` ↔ `רבקה`): התאמה פונטית של שמות, לא תרגום.
5. **חיפוש קולי** – 🎤 בתיבת החיפוש; מופיע רק כשהדפדפן מזהה דיבור במכשיר עצמו (ראה אבטחה). מספרים שנאמרים בעברית או בערבית הופכים לספרות ("ארבעים ושתיים" ← 42, "خمسة وعشرين" ← 25).
6. **תצוגה מוגדלת** – לחיצה על תמונה. ניווט: חיצים, מקשי ← →, החלקה. סגירה: ✕, Esc, או לחיצה על הרקע.
7. **שינוי שם** – בתצוגה המוגדלת, שורת **File name** ← שם חדש ← **Save**. הסיומת קבועה. השינוי נעשה בדיסק מיד.
8. **שפה** – בורר עם דגל בפינה השמאלית. ברירת המחדל היא שפת המכשיר (עברית או אנגלית). הבחירה תקפה ללשונית הנוכחית; לשפה קבועה מוסיפים `#lang=he` או `#lang=en` לכתובת (עובד גם בסימנייה).

**בלי Chrome/Edge או בטלפון:** **בחר קבצים** ← מסמנים תמונות. צפייה בלבד.

---

## הרשאות

| מה | מתי | היקף |
|---|---|---|
| גישה לתיקייה | בלחיצה על "בחר תיקייה" | התיקייה שנבחרה בלבד. נמחקת ברענון או בסגירת הלשונית. |
| מיקרופון | רק בלחיצה על 🎤 | זיהוי דיבור במכשיר בלבד. אפשר לסרב; השאר עובד כרגיל. |

הפעולה היחידה שכותבת לדיסק היא שינוי שם קובץ. הקובץ לא מוחק, לא מעתיק ולא יוצר קבצים.
אין התקנה, אין הרשאות ברמת מערכת ההפעלה, אין צורך באינטרנט.

---

## אבטחה ופרטיות

**שום מידע לא יוצא מהמכשיר.** לקובץ אין קוד רשת: אין כתובות, אין סקריפטים חיצוניים, אין `fetch`, אין אחסון מקומי. התמונות נטענות לזיכרון הדפדפן ומשוחררות ברענון; הדף לא זוכר דבר בין הפעלות.

**חיפוש קולי** משתמש בזיהוי הדיבור של הדפדפן **במצב מקומי בלבד** (`processLocally: true`). אם הדפדפן לא יכול לזהות דיבור במכשיר, הכפתור לא מוצג – אין מסלול לענן. בפעם הראשונה Chrome מוריד חבילת שפה; זו הורדה של הדפדפן, לא של הקובץ.

**אימות אוטומטי.** התג **Security check** למעלה משקף ריצה חיה ב־GitHub על כל שינוי וכל גרסה, ולחיצה עליו פותחת את הלוג. הבדיקות (`security-check.sh`, `runtime-check.js`) מאמתות: אפס כתובות ושאבים חיצוניים, אפס קריאות רשת ואחסון, אפס `eval`, מקורות תמונה `blob:` בלבד, קובץ יחיד, 0 בקשות רשת בטעינה בדפדפן ללא ממשק, והתאמה בין מספר הגרסה בקובץ לתג ב־Git.

**לבדוק בעצמך:** F12 ← Network ← בוחרים תיקייה ומשנים שם – הרשימה נשארת ריקה. או: מנתקים את האינטרנט; הכול עובד זהה.

מה שהבדיקה לא מכסה: באגים (היא בודקת רק מה הקובץ *לא יכול* לעשות), והדפדפן עצמו – Safe Browsing, סנכרון ותוספים נשלטים בהגדרות הדפדפן.

---

## מגבלות ידועות

- **שינוי שם משנה תאריכי קובץ** ברוב הדפדפנים (העתקה לשם החדש ומחיקת המקורי). התוכן, כולל EXIF, זהה.
- **אין ביטול** לשינוי שם; משנים חזרה.
- **שינוי אותיות גדולות/קטנות בלבד** נחסם ב־Windows וב־macOS ("כבר קיים").
- **HEIC/HEIF** (צילומי iPhone) לא מוצגים. נתמכים: jpg, png, gif, webp, bmp, avif.
- **ההתאמה עברית⇄אנגלית מקורבת** – שמות דומים עלולים להיתפס יחד. חיפוש בכתב של שם הקובץ תמיד מדויק.
- **הרשאה ושפה לא נשמרות** בין הפעלות – בכוונה, כדי שלא יהיה אחסון. לשפה קבועה: `#lang=xx` בכתובת.

---

## רישיון

MIT – ראה [LICENSE](LICENSE). מותר להשתמש, להעתיק ולשנות, גם מסחרית, בתנאי שמירת שורת זכויות היוצרים.

---

<a name="english"></a>

<img src="icons/icon-128.png" width="96" align="right" alt="">

# LocalPictureGallery

[עברית](#he) · English

[![Security check](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml/badge.svg)](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml)
[![Latest release](https://img.shields.io/github/v/release/BacharGroup/LocalPictureGallery?label=version&color=2ea44f)](https://github.com/BacharGroup/LocalPictureGallery/releases/latest)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A local image viewer in a single HTML file. Pick a folder on your computer and get an image grid with filtering, a full-size view and file renaming.
Everything runs in the browser, on the device only – no server, no installation, no network.

**Download:** [latest release](https://github.com/BacharGroup/LocalPictureGallery/releases/latest) · **Open in the browser:** [bachargroup.github.io/LocalPictureGallery](https://bachargroup.github.io/LocalPictureGallery/LocalPictureGallery.html)

---

## Compatibility

| | View | Rename | Voice search |
|---|:-:|:-:|:-:|
| Chrome / Edge on desktop | ✔ | ✔ | ✔ |
| Firefox / Safari on desktop | ✔ | ✖ | ✖ |
| Android / iPhone | ✔ | ✖ | ✖ |

Renaming and voice search rely on capabilities that currently exist only in Chromium desktop browsers. Everywhere else the file works in view mode.

---

## Usage

1. Open `LocalPictureGallery.html` in Chrome or Edge (download and double-click, or the link above).
2. **Choose folder** → pick an image folder → approve the browser prompt *"view and edit files"*.
   Subfolders are scanned too. The browser does not allow a drive root or a system folder.
3. Images appear in a grid, 100 at a time; scrolling to the bottom loads more.
4. **Filter** – type in the search box. A name typed in Hebrew also finds files named in English and vice versa (`יוסי` ↔ `yossi`, `rivka` ↔ `רבקה`): phonetic name matching, not translation.
5. **Voice search** – 🎤 in the search box; shown only when the browser recognises speech on the device itself (see Security). Numbers spoken in Hebrew or Arabic become digits ("ארבעים ושתיים" → 42, "خمسة وعشرين" → 25).
6. **Full-size view** – click an image. Navigate: arrows, ← → keys, swipe. Close: ✕, Esc, or click the background.
7. **Rename** – in the full-size view, the **File name** row → new name → **Save**. The extension is fixed. The change is written to disk immediately.
8. **Language** – picker with a flag at the top-left. The default is the device language (Hebrew or English). The choice applies to the current tab; for a fixed language add `#lang=he` or `#lang=en` to the address (works in a bookmark too).

**Without Chrome/Edge, or on a phone:** **Choose files** → select images. View only.

---

## Permissions

| What | When | Scope |
|---|---|---|
| Folder access | On "Choose folder" | The chosen folder only. Cleared on refresh or when the tab closes. |
| Microphone | Only on 🎤 | On-device speech recognition only. You can decline; everything else works. |

The only action that writes to disk is renaming a file. The file does not delete, copy or create files.
No installation, no operating-system permissions, no internet needed.

---

## Security and privacy

**No data leaves the device.** The file has no network code: no addresses, no external scripts, no `fetch`, no local storage. Images are loaded into browser memory and released on refresh; the page remembers nothing between sessions.

**Voice search** uses the browser's speech recognition **in on-device mode only** (`processLocally: true`). If the browser cannot recognise speech on the device, the button is not shown – there is no cloud path. The first time, Chrome downloads a language pack; that is the browser's download, not the file's.

**Automated verification.** The **Security check** badge above reflects a live run on GitHub for every change and every release; clicking it opens the log. The checks (`security-check.sh`, `runtime-check.js`) verify: zero addresses and external resources, zero network and storage calls, zero `eval`, `blob:` image sources only, a single file, 0 network requests when loaded in a headless browser, and that the version number in the file matches the Git tag.

**Check for yourself:** F12 → Network → choose a folder and rename a file – the list stays empty. Or disconnect the internet; everything works the same.

What the check does not cover: bugs (it only verifies what the file *cannot* do), and the browser itself – Safe Browsing, sync and extensions are controlled by the browser settings.

---

## Known limitations

- **Renaming changes file dates** in most browsers (copy to the new name, delete the original). The content, including EXIF, is identical.
- **No undo** for a rename; rename back.
- **Changing letter case only** is blocked on Windows and macOS ("already exists").
- **HEIC/HEIF** (iPhone photos) are not shown. Supported: jpg, png, gif, webp, bmp, avif.
- **Hebrew⇄English matching is approximate** – similar names may be caught together. Searching in the file name's own script is always exact.
- **Permission and language are not kept** between sessions – deliberately, so there is no storage. For a fixed language: `#lang=xx` in the address.

---

## License

MIT – see [LICENSE](LICENSE). Use, copy and modify freely, including commercially, as long as the copyright line is kept.
