# LocalPictureGallery – מציג תמונות מקומי (`LocalPictureGallery.html`)

<a name="he"></a>עברית · [English](#english) · [github.com/BacharGroup/LocalPictureGallery](https://github.com/BacharGroup/LocalPictureGallery)

**גרסה נוכחית: 1.0.0**

[![Security check](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml/badge.svg)](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml)

קובץ HTML יחיד שמציג תמונות מתיקייה במחשב, עם סינון לפי שם קובץ, תצוגה מוגדלת ושינוי שם קובץ (הסיומת נשמרת).
הכול רץ בתוך הדפדפן, על המכשיר בלבד. אין שרת, אין התקנה, אין רשת.

---

## 1. דרישות

| מה | שימוש בלבד | שינוי שם קובץ |
|---|---|---|
| Chrome / Edge במחשב (Windows, macOS, Linux) | ✔ | ✔ |
| Firefox / Safari במחשב | ✔ ("בחר קבצים") | ✖ |
| טלפון (Android / iPhone) | ✔ ("בחר קבצים") | ✖ |

שינוי שם דורש את File System Access API, שקיים רק בדפדפנים מבוססי Chromium במחשב.
בכל שאר המקרים הקובץ עובד אוטומטית במצב צפייה בלבד.

---

## 2. הוראות שימוש – צעד אחר צעד

1. **הורד** את `LocalPictureGallery.html` ושמור אותו במחשב (למשל ב־Documents).
2. **פתח** אותו בלחיצה כפולה. אם נפתח בדפדפן אחר – קליק ימני ← "פתח באמצעות" ← Chrome או Edge.
   בשורת הכתובת תופיע כתובת שמתחילה ב־`file:///` – זה תקין וזה המצב המקומי.
3. לחץ **"בחר תיקייה"**. ייפתח חלון בחירת תיקייה של מערכת ההפעלה.
   בחר תיקיית תמונות ספציפית (לא שורש כונן ולא תיקיית מערכת – הדפדפן חוסם כאלה).
4. **אישור הרשאה** (זה האישור היחיד שתתבקש לתת):
   Chrome מציג חלון בסגנון *"לאפשר ל־LocalPictureGallery.html להציג ולערוך קבצים בתיקייה X?"* ← לחץ **אפשר / ערוך קבצים**.
   אם תלחץ "חסום" – הדף פשוט יישאר ריק. אין דרך לגשת לתיקייה בלי האישור הזה.
5. התמונות מוצגות ברשת. **תיבת הסינון** מסננת לפי שם קובץ תוך כדי הקלדה (עובד בעברית, בערבית ובאנגלית).
6. **לחיצה על תמונה** פותחת אותה בגדול. ניווט: חיצים על המסך, מקשי ← →, או החלקה באצבע. סגירה: ✕, Esc, או לחיצה על הרקע.
7. **שינוי שם**: בתצוגה המוגדלת, בשורה **File name** – הקלד את השם החדש ולחץ **Save** (או Enter).
   הסיומת מוצגת ליד השדה ואינה ניתנת לשינוי. הקובץ משנה שם **בדיסק עצמו**, והרשימה מתעדכנת מיד.
   נבדק אוטומטית: שם ריק, תווים אסורים (`\ / : * ? " < > |`), והתנגשות עם קובץ קיים.
8. **רענון או סגירת הלשונית** מבטלים את ההרשאה. בפעם הבאה צריך לבחור תיקייה ולאשר מחדש. זה מכוון – הדפדפן לא שומר גישה קבועה.

**צפייה בלבד** (בכל דפדפן ובטלפון): לחץ "בחר קבצים", סמן את התמונות הרצויות. במצב הזה שורת שינוי השם לא מוצגת.

---

## 2א. שפת הממשק

- הממשק נפתח **בשפת המכשיר/הדפדפן**: מכשיר בעברית ← עברית (מימין לשמאל); כל שפה אחרת ← אנגלית, אלא אם אותה שפה קיימת בקובץ.
- **בורר שפה** בפינת הכותרת מחליף שפה מיידית. הבחירה נרשמת רק בכתובת (`#lang=he` / `#lang=en`) – בלי אחסון מקומי. קישור או סימנייה עם `#lang=xx` תמיד ייפתחו בשפה הזו.
- **שורת שינוי השם** (File name / Save) נשארת אנגלית, LTR ומוצמדת לשמאל בכל שפת ממשק – כדי שעריכת שמות קבצים תהיה נוחה.
- **הוספת שפה** (כל שפה): בקובץ, בתוך `const T = { ... }`, מעתיקים בלוק שלם (למשל את `en`), נותנים לו קוד של שתי אותיות (`fr`, `ru`, `es`, `ar`...), מתרגמים את המחרוזות, ובשפות מימין לשמאל מגדירים `dir: 'rtl'`. השפה תופיע בבורר ותיבחר אוטומטית במכשירים שזו שפתם.

---

## 3. הרשאות – מה בדיוק מאושר

- ההרשאה היא **לתיקייה אחת שבחרת** (כולל תתי־התיקיות שלה). לא לכונן, לא למחשב.
- ההרשאה **זמנית** – נמחקת עם סגירת הלשונית או רענון.
- הפעולה היחידה שכותבת לדיסק היא שינוי שם קובץ בתוך התיקייה הזו. הקובץ לא מוחק תמונות, לא מעתיק אותן למקום אחר ולא יוצר קבצים חדשים (חוץ מהקובץ המשונה).
- לא נדרשת **שום** הרשאה ברמת מערכת ההפעלה, שום התקנה, שום הרשאת רשת או אינטרנט.
- אם הדפדפן מסרב לתיקייה מסוימת ("תיקייה זו מכילה קבצי מערכת") – בחר תת־תיקייה.

---

## 4. אבטחה ופרטיות – מה אומת בקוד

נבדק על הקובץ המצורף (גרסה עם שינוי שם, שורת עריכה LTR):

| בדיקה | תוצאה |
|---|---|
| כתובות `http://` / `https://` בקובץ | **0** |
| סקריפטים, גופנים או CSS חיצוניים (`<script src>`, `<link>`) | **0** |
| `fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon` | **0** |
| `localStorage`, `IndexedDB`, cookies | **0** |
| מקורות תמונה (`img.src`) | רק `blob:` – כתובת זיכרון פנימית של הדפדפן |

משמעות:
- **שום בייט לא יוצא מהמכשיר.** הדף לא יודע לדבר עם רשת – אין לו קוד לזה.
- התמונות נטענות לזיכרון הדפדפן בלבד ומשוחררות ברענון.
- הקובץ עובד **גם בלי אינטרנט** – אפשר לנתק את הרשת ולבדוק.
- הדף לא שומר שום דבר בין הפעלות: לא רשימה, לא היסטוריה, לא שמות.

איך לוודא לבד (מומלץ לכל מי שמקבל את הקובץ):
1. פתח את הקובץ בעורך טקסט וחפש `http` – 0 תוצאות.
2. פתח את הדף, לחץ F12 ← לשונית **Network**, ואז בחר תיקייה ושנה שם לקובץ. הרשימה תישאר ריקה – שום בקשה לא יוצאת.
3. נתק את האינטרנט והשתמש בקובץ – הכול עובד זהה.

הערה אחת לדיוק: הקובץ עצמו לא שולח דבר. מה שהדפדפן עושה מטעם עצמו (למשל Safe Browsing, סנכרון) נשלט בהגדרות הדפדפן, לא בקובץ הזה.

---

## 5. שמירה ב־Git ושיתוף עם כולם

**הכלל:** הריפו מכיל את **הכלי בלבד** – `LocalPictureGallery.html`, `README.md`, `.gitignore`, ושני סקריפטי הבדיקה (`security-check.sh`, `runtime-check.js`) עם ה־workflow ב־`.github/workflows/`.
תמונות לעולם לא נכנסות ל־Git. קובץ `.gitignore` המצורף חוסם את כל סוגי התמונות.

### יצירת הריפו (פעם אחת)

```bash
mkdir LocalPictureGallery && cd LocalPictureGallery
# העתק לכאן את שלושת הקבצים: LocalPictureGallery.html, README.md, .gitignore
git init
git add .
git status          # ודא שרק שלושת הקבצים מופיעים, בלי תמונות
git commit -m "LocalPictureGallery – local image viewer with rename"
```

ב־GitHub: **New repository** ← שם `LocalPictureGallery` ← **Private** ← בלי README/gitignore אוטומטיים ← Create.

```bash
git branch -M main
git remote add origin https://github.com/BacharGroup/LocalPictureGallery.git
git push -u origin main
```

### מתן גישה
Settings ← **Collaborators** ← Add people ← כתובת מייל או שם משתמש של כל אחד.
(בארגון: Settings ← Collaborators and teams ← הוסף צוות.)

### איך כל אחד מקבל את הקובץ
1. פותח את הריפו ← לוחץ על `LocalPictureGallery.html` ← **Download raw file** (האייקון ⤓).
2. שומר במחשב ופועל לפי סעיף 2.
או: `git clone https://github.com/BacharGroup/LocalPictureGallery.git`

### עדכון גרסה
```bash
# אחרי שינוי בקובץ
git add LocalPictureGallery.html
git commit -m "תיאור השינוי"
git push
```
כל אחד מוריד מחדש / מריץ `git pull`.

### אופציונלי – פתיחה בקישור במקום הורדה (GitHub Pages)
Settings ← Pages ← Source: Deploy from a branch ← `main` / root ← Save.
הקובץ יהיה זמין ב־`https://bachargroup.github.io/LocalPictureGallery/LocalPictureGallery.html`.
שים לב: בחשבון חינמי Pages עובד רק על ריפו **ציבורי**, והדף יהיה נגיש לכל מי שיש לו את הקישור (הכלי בלבד – התמונות לעולם לא עולות). גם במצב הזה הדף לא שולח דבר החוצה; הוא רק נטען מהשרת של GitHub במקום מהדיסק. לגרסה "100% מקומית" – לפתוח מהדיסק.

---

## 6. הסתייגויות ומגבלות ידועות

- **שינוי שם משנה תאריכי קובץ.** הקוד מנסה קודם `move()` (שינוי שם אמיתי). אם הדפדפן לא תומך בזה לקבצים מקומיים – והיום זה המצב ברוב הגרסאות – הוא מעתיק את הקובץ לשם החדש, מוודא שהגודל זהה, ורק אז מוחק את המקורי. התוכן זהה בייט־לבייט (כולל EXIF), אבל תאריכי "נוצר" ו"שונה" של הקובץ במערכת יהיו של רגע השינוי.
- **אין ביטול.** שינוי שם לא נשמר בהיסטוריה; כדי להחזיר – משנים שם בחזרה.
- **שינוי אותיות גדולות/קטנות בלבד** (`photo` ← `Photo`) ייחסם ב־Windows וב־macOS, כי המערכת רואה בזה את אותו קובץ והבדיקה מדווחת "כבר קיים".
- **HEIC/HEIF (צילומי iPhone) לא מוצגים.** הדפדפן לא יודע לרנדר אותם, ולכן הם לא נכללים ברשימה. נתמכים: jpg, jpeg, png, gif, webp, bmp, avif.
- **תתי־תיקיות נסרקות אוטומטית** וכל התמונות שבהן מופיעות ברשימה, עם הנתיב היחסי בשם. הסינון מחפש גם בנתיב.
- **תיקיות גדולות מאוד** (אלפי תמונות) – הסריקה הראשונית של התיקייה לוקחת כמה שניות. הרשת נבנית ב־100 כרטיסים בכל פעם, ו־100 נוספים נטענים אוטומטית כשמגיעים לתחתית (שורת "מוצגות X מתוך Y" מציינת את המצב). הסינון עובד תמיד על כל התמונות, לא רק על המוצגות.
- **שפת הממשק לא נשמרת** מעבר לכתובת: החלפת שפה בבורר מוסיפה `#lang=xx` לכתובת, ופתיחה חדשה של הקובץ חוזרת לשפת המכשיר. זה מכוון – אין אחסון מקומי בקובץ.
- **ההרשאה לא נשמרת.** כל רענון או פתיחה מחדש = בחירת תיקייה ואישור מחדש. אין דרך "לזכור" תיקייה בלי להוסיף אחסון, וזה הושאר בכוונה בחוץ.
- **בטלפון ובדפדפנים שאינם Chromium** הקובץ עובד במצב צפייה בלבד דרך "בחר קבצים"; כפתור "בחר תיקייה" מפנה לאותו מצב, בלי שינוי שם.
- **הקובץ לא שולח דבר, אבל הוא לא שולט בדפדפן.** Safe Browsing, סנכרון חשבון, תוספים מותקנים – כל אלה פועלים לפי הגדרות הדפדפן של כל משתמש, ולא לפי הקובץ.

---

## 7. ניהול גרסאות

המספר מופיע בשלושה מקומות שצריכים להיות זהים: `const VERSION` בראש הסקריפט (מוצג ליד הכותרת), שורת `<!-- LocalPictureGallery vX.Y.Z -->` בראש הקובץ, והתג ב-Git.
מספור: `MAJOR.MINOR.PATCH` – תיקון באג = PATCH (1.0.1), יכולת חדשה = MINOR (1.1.0), שינוי שמשנה את אופן השימוש = MAJOR (2.0.0).

### סימון הגרסה הראשונה 1.0.0

**דרך הדפדפן:** בעמוד הריפו ← **Releases** (בעמודה הימנית) ← **Create a new release** ← Choose a tag: הקלד `v1.0.0` ← **Create new tag: v1.0.0 on publish** ← Release title: `LocalPictureGallery 1.0.0` ← בתיאור: מה הגרסה כוללת ← גרור את `LocalPictureGallery.html` לאזור "Attach binaries" (כך יש קובץ להורדה ישירה מעמוד הגרסה) ← **Publish release**.

**שורת פקודה:**
```bash
git tag -a v1.0.0 -m "LocalPictureGallery 1.0.0"
git push origin v1.0.0
```
ואז ב-GitHub: Releases ← Draft a new release ← בחר את התג `v1.0.0` ← כותרת ותיאור ← צרף את `LocalPictureGallery.html` ← Publish.

### גרסה הבאה
1. לעדכן את `VERSION` ואת ההערה בראש `LocalPictureGallery.html`, ואת "גרסה נוכחית" כאן.
2. `git commit` רגיל עם תיאור השינוי.
3. תג ו-Release חדשים באותו אופן (`v1.0.1`, `v1.1.0`...).

הורדת גרסה ספציפית: עמוד Releases ← הגרסה הרצויה ← הקובץ המצורף. הקישור `.../releases/latest` תמיד מוביל לגרסה האחרונה.

---

## 8. אימות אבטחה אוטומטי

התג **Security check** בראש הקובץ משקף תוצאה חיה, לא הצהרה: GitHub מריץ את הבדיקות בכל `push` ל־`main`, בכל Pull Request ובכל גרסה שמתפרסמת. ירוק = ה־commit האחרון עבר; אדום = משהו נשבר. לחיצה על התג פותחת את לוג הריצה, שורה־שורה.

מה נבדק (הקבצים `security-check.sh` ו־`runtime-check.js` בריפו – כל אחד יכול לקרוא ולהריץ אותם):

| בדיקה | איך |
|---|---|
| אין כתובות `http://` / `https://` | סריקה סטטית של הקובץ |
| אין סקריפטים, CSS, iframe או embed חיצוניים | סריקה סטטית |
| אין `fetch` / `XMLHttpRequest` / `WebSocket` / `sendBeacon` / `EventSource` | סריקה סטטית |
| אין `eval` / `new Function` / `import()` | סריקה סטטית |
| אין `localStorage` / `sessionStorage` / `IndexedDB` / cookies / Service Worker | סריקה סטטית |
| אין טפסים או `submit` | סריקה סטטית |
| מקורות תמונה הם `blob:` בלבד | סריקה סטטית |
| קובץ יחיד: בדיוק `<script>` אחד ו־`<style>` אחד, פנימיים | סריקה סטטית |
| הדף נטען בדפדפן ללא ממשק (jsdom) עם סקריפטים פעילים ומבצע **0 בקשות רשת** | בדיקת ריצה |
| שלוש חותמות הגרסה זהות, ובגרסה מתויגת – זהות לתג | בדיקת ריצה |
| בריפו אין קובצי תמונה | `git ls-files` |

**להריץ מקומית** (Git Bash / WSL / macOS / Linux; Node לבדיקת הריצה):

```bash
bash security-check.sh LocalPictureGallery.html
```

```bash
npm install jsdom && node runtime-check.js LocalPictureGallery.html
```

**מה הבדיקה לא מכסה:** היא מאמתת שהקובץ *לא יכול* לדבר עם רשת ולא שומר דבר – לא שהוא חף מבאגים. היא גם לא בודקת את הדפדפן עצמו (ראה סעיף 6). מי שרוצה ביקורת עצמאית – הקוד כולו בקובץ אחד, ~300 שורות.

---

<a name="english"></a>

# LocalPictureGallery – Local Image Viewer (`LocalPictureGallery.html`)

[עברית](#he) · English · [github.com/BacharGroup/LocalPictureGallery](https://github.com/BacharGroup/LocalPictureGallery)

**Current version: 1.0.0**

[![Security check](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml/badge.svg)](https://github.com/BacharGroup/LocalPictureGallery/actions/workflows/security-check.yml)

A single HTML file that displays images from a folder on your computer, with filtering by file name, full-size view, and file renaming (the extension is preserved).
Everything runs inside the browser, on the device only. No server, no installation, no network.

---

## 1. Requirements

| What | View only | Rename files |
|---|---|---|
| Chrome / Edge on desktop (Windows, macOS, Linux) | ✔ | ✔ |
| Firefox / Safari on desktop | ✔ ("Choose files") | ✖ |
| Phone (Android / iPhone) | ✔ ("Choose files") | ✖ |

Renaming requires the File System Access API, which exists only in Chromium-based desktop browsers.
In every other case the file automatically works in view-only mode.

---

## 2. How to use – step by step

1. **Download** `LocalPictureGallery.html` and save it on your computer (for example in Documents).
2. **Open** it with a double-click. If it opens in another browser – right-click → "Open with" → Chrome or Edge.
   The address bar will show an address starting with `file:///` – that is correct; it is the local mode.
3. Click **"Choose folder"**. The operating system's folder picker opens.
   Pick a specific image folder (not a drive root and not a system folder – the browser blocks those).
4. **Permission prompt** (the only approval you will be asked for):
   Chrome shows a dialog like *"Let LocalPictureGallery.html view and edit files in folder X?"* → click **Allow / Edit files**.
   If you click "Block" – the page simply stays empty. There is no way to reach the folder without this approval.
5. The images are shown in a grid. The **filter box** filters by file name as you type (works in Hebrew, Arabic and English).
6. **Clicking an image** opens it full-size. Navigation: on-screen arrows, the ← → keys, or a finger swipe. Close: ✕, Esc, or a click on the background.
7. **Rename**: in the full-size view, in the **File name** row – type the new name and click **Save** (or Enter).
   The extension is shown next to the field and cannot be changed. The file is renamed **on disk itself**, and the list updates immediately.
   Checked automatically: empty name, forbidden characters (`\ / : * ? " < > |`), and a clash with an existing file.
8. **Refreshing or closing the tab** revokes the permission. Next time you need to choose the folder and approve again. This is intentional – the browser does not keep permanent access.

**View only** (any browser and on phones): click "Choose files" and select the images you want. In this mode the rename row is not shown.

---

## 2a. Interface language

- The interface opens **in the device/browser language**: a Hebrew device → Hebrew (right-to-left); any other language → English, unless that language exists in the file.
- The **language selector** in the header switches the language immediately. The choice is written only to the address (`#lang=he` / `#lang=en`) – no local storage. A link or bookmark with `#lang=xx` always opens in that language.
- The **rename row** (File name / Save) stays in English, LTR and left-aligned in every interface language – so editing file names is convenient.
- **Adding a language** (any language): in the file, inside `const T = { ... }`, copy a whole block (for example `en`), give it a two-letter code (`fr`, `ru`, `es`, `ar`...), translate the strings, and for right-to-left languages set `dir: 'rtl'`. The language appears in the selector and is chosen automatically on devices set to it.

---

## 3. Permissions – exactly what is approved

- The permission is **for the one folder you chose** (including its subfolders). Not the drive, not the computer.
- The permission is **temporary** – it is cleared when the tab is closed or refreshed.
- The only action that writes to disk is renaming a file inside that folder. The file does not delete images, does not copy them elsewhere and does not create new files (apart from the renamed file).
- **No** operating-system-level permission, no installation, no network or internet permission is required.
- If the browser refuses a particular folder ("this folder contains system files") – choose a subfolder.

---

## 4. Security and privacy – what was verified in the code

Checked on the attached file (version with rename, LTR edit row):

| Check | Result |
|---|---|
| `http://` / `https://` addresses in the file | **0** |
| External scripts, fonts or CSS (`<script src>`, `<link>`) | **0** |
| `fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon` | **0** |
| `localStorage`, `IndexedDB`, cookies | **0** |
| Image sources (`img.src`) | only `blob:` – an internal memory address of the browser |

What this means:
- **Not a single byte leaves the device.** The page cannot talk to a network – it has no code for that.
- Images are loaded into browser memory only and released on refresh.
- The file works **without internet too** – disconnect the network and check.
- The page keeps nothing between sessions: no list, no history, no names.

How to verify yourself (recommended for anyone who receives the file):
1. Open the file in a text editor and search for `http` – 0 results.
2. Open the page, press F12 → **Network** tab, then choose a folder and rename a file. The list stays empty – no request goes out.
3. Disconnect the internet and use the file – everything works the same.

One note for accuracy: the file itself sends nothing. What the browser does on its own behalf (for example Safe Browsing, sync) is controlled by the browser settings, not by this file.

---

## 5. Keeping it in Git and sharing with everyone

**The rule:** the repo contains **the tool only** – `LocalPictureGallery.html`, `README.md`, `.gitignore`, and the two check scripts (`security-check.sh`, `runtime-check.js`) with the workflow in `.github/workflows/`.
Images never go into Git. The attached `.gitignore` blocks every image type.

### Creating the repo (once)

```bash
mkdir LocalPictureGallery && cd LocalPictureGallery
# copy the three files here: LocalPictureGallery.html, README.md, .gitignore
git init
git add .
git status          # make sure only the three files appear, no images
git commit -m "LocalPictureGallery – local image viewer with rename"
```

On GitHub: **New repository** → name `LocalPictureGallery` → **Private** → without automatic README/gitignore → Create.

```bash
git branch -M main
git remote add origin https://github.com/BacharGroup/LocalPictureGallery.git
git push -u origin main
```

### Granting access
Settings → **Collaborators** → Add people → each person's email or username.
(In an organization: Settings → Collaborators and teams → add a team.)

### How each person gets the file
1. Opens the repo → clicks `LocalPictureGallery.html` → **Download raw file** (the ⤓ icon).
2. Saves it on the computer and follows section 2.
Or: `git clone https://github.com/BacharGroup/LocalPictureGallery.git`

### Updating a version
```bash
# after changing the file
git add LocalPictureGallery.html
git commit -m "description of the change"
git push
```
Everyone downloads again / runs `git pull`.

### Optional – open by link instead of download (GitHub Pages)
Settings → Pages → Source: Deploy from a branch → `main` / root → Save.
The file will be available at `https://bachargroup.github.io/LocalPictureGallery/LocalPictureGallery.html`.
Note: on a free account Pages works only on a **public** repo, and the page is reachable by anyone with the link (the tool only – images are never uploaded). In this mode too the page sends nothing out; it is only loaded from GitHub's server instead of from disk. For the "100% local" version – open from disk.

---

## 6. Caveats and known limitations

- **Renaming changes file dates.** The code first tries `move()` (a true rename). If the browser does not support it for local files – which today is the case in most versions – it copies the file to the new name, verifies the size is identical, and only then deletes the original. The content is identical byte-for-byte (including EXIF), but the file's "created" and "modified" dates in the system will be the moment of the rename.
- **No undo.** A rename is not kept in a history; to revert – rename back.
- **Changing letter case only** (`photo` → `Photo`) is blocked on Windows and macOS, because the system treats it as the same file and the check reports "already exists".
- **HEIC/HEIF (iPhone photos) are not shown.** The browser cannot render them, so they are not included in the list. Supported: jpg, jpeg, png, gif, webp, bmp, avif.
- **Subfolders are scanned automatically** and all the images in them appear in the list, with the relative path in the name. The filter searches the path too.
- **Very large folders** (thousands of images) – the initial scan of the folder takes a few seconds. The grid is built 100 cards at a time, and 100 more load automatically when you reach the bottom (the "Showing X of Y" line indicates the state). The filter always works on all the images, not just the displayed ones.
- **The interface language is not kept** beyond the address: switching the language in the selector adds `#lang=xx` to the address, and opening the file afresh returns to the device language. This is intentional – there is no local storage in the file.
- **The permission is not kept.** Every refresh or reopen = choose the folder and approve again. There is no way to "remember" a folder without adding storage, and that was deliberately left out.
- **On phones and in non-Chromium browsers** the file works in view-only mode via "Choose files"; the "Choose folder" button leads to the same mode, without rename.
- **The file sends nothing, but it does not control the browser.** Safe Browsing, account sync, installed extensions – all of these act according to each user's browser settings, not the file.

---

## 7. Version management

The number appears in three places that must match: `const VERSION` at the top of the script (shown next to the title), the `<!-- LocalPictureGallery vX.Y.Z -->` line at the top of the file, and the tag in Git.
Numbering: `MAJOR.MINOR.PATCH` – bug fix = PATCH (1.0.1), new capability = MINOR (1.1.0), a change that alters how it is used = MAJOR (2.0.0).

### Marking the first version 1.0.0

**Via the browser:** on the repo page → **Releases** (right column) → **Create a new release** → Choose a tag: type `v1.0.0` → **Create new tag: v1.0.0 on publish** → Release title: `LocalPictureGallery 1.0.0` → in the description: what the version includes → drag `LocalPictureGallery.html` into the "Attach binaries" area (so there is a file for direct download from the release page) → **Publish release**.

**Command line:**
```bash
git tag -a v1.0.0 -m "LocalPictureGallery 1.0.0"
git push origin v1.0.0
```
Then on GitHub: Releases → Draft a new release → choose the `v1.0.0` tag → title and description → attach `LocalPictureGallery.html` → Publish.

### Next version
1. Update `VERSION` and the comment at the top of `LocalPictureGallery.html`, and "Current version" here.
2. A normal `git commit` with a description of the change.
3. New tag and Release in the same way (`v1.0.1`, `v1.1.0`...).

Downloading a specific version: Releases page → the version you want → the attached file. The link `.../releases/latest` always leads to the latest version.

---

## 8. Automated security verification

The **Security check** badge at the top reflects a live result, not a statement: GitHub runs the checks on every `push` to `main`, every pull request and every published release. Green = the latest commit passed; red = something broke. Clicking the badge opens the run log, line by line.

What is checked (the files `security-check.sh` and `runtime-check.js` in the repo – anyone can read and run them):

| Check | How |
|---|---|
| No `http://` / `https://` addresses | static scan of the file |
| No external scripts, CSS, iframes or embeds | static scan |
| No `fetch` / `XMLHttpRequest` / `WebSocket` / `sendBeacon` / `EventSource` | static scan |
| No `eval` / `new Function` / `import()` | static scan |
| No `localStorage` / `sessionStorage` / `IndexedDB` / cookies / Service Worker | static scan |
| No forms or `submit` | static scan |
| Image sources are `blob:` only | static scan |
| Single file: exactly one `<script>` and one `<style>`, both inline | static scan |
| The page loads in a headless browser (jsdom) with scripts enabled and makes **0 network requests** | runtime check |
| The three version stamps match, and on a tagged release match the tag | runtime check |
| No image files in the repository | `git ls-files` |

**Run locally** (Git Bash / WSL / macOS / Linux; Node for the runtime check):

```bash
bash security-check.sh LocalPictureGallery.html
```

```bash
npm install jsdom && node runtime-check.js LocalPictureGallery.html
```

**What the check does not cover:** it verifies that the file *cannot* talk to a network and stores nothing – not that it is bug-free. It also does not check the browser itself (see section 6). For an independent audit – the whole code is one file, ~300 lines.
