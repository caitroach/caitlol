# cait.lol

Clean Y2K-aesthetic personal site. React + Vite, no heavy dependencies.

## Getting started

```bash
npm install
npm run dev
```

## Customising

All your personal content lives in clearly marked `// ── EDIT THESE ──` blocks:

- **Hero.jsx** — update `CURRENTLY_READING` and `NOW_PLAYING` whenever they change
- **About.jsx** — update `BIO` and `LINKS`
- **Guestbook.jsx** — paste your Apps Script URL into `APPS_SCRIPT_URL`

## Guestbook setup (Google Sheets backend)

1. Create a new Google Sheet with columns: `timestamp`, `name`, `message`
2. Go to **Extensions → Apps Script** and paste this code:

```javascript
const SHEET_ID = "YOUR_SHEET_ID_HERE";
const SHEET_NAME = "Sheet1";

function doGet(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  const rows = sheet.getDataRange().getValues().slice(1);
  const messages = rows.map(r => ({
    timestamp: r[0], name: r[1], message: r[2]
  }));
  return ContentService
    .createTextOutput(JSON.stringify({ messages }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);
  sheet.appendRow([data.timestamp, data.name, data.message]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Deploy → New deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the Web App URL and paste it into `APPS_SCRIPT_URL` in `Guestbook.jsx`

## Deploying

Works great on **Vercel** or **Netlify** — just connect your repo and it auto-deploys.

For Vercel: `npm i -g vercel && vercel`
