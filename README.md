# FICAN Membership Portal

Official digital membership registration and data collection portal for the **Finance Correspondents Association of Nigeria (FICAN)**.

---

## Overview

A responsive web portal designed to capture, verify, and store membership information for accredited finance correspondents across Nigeria. All submissions are automatically recorded in real-time into the official FICAN Google Sheet.

---

## Key Features

- **Responsive Design**: Adapts seamlessly to all devices (phones, tablets, and desktop computers).
- **Comprehensive Member Profiles**: Captures personal information, media house affiliation, bank details, and next-of-kin contacts.
- **Beat Management**: Allows correspondents to add up to 3 covered beats/fields.
- **Instant Google Sheets Sync**: Submissions automatically create new entries in your spreadsheet without manual data entry.
- **Registration Receipt**: Members can download a summary confirmation receipt immediately upon submission.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the local portal
npm run dev

# 3. Build for deployment
npm run build
```

---

## Connecting Your Google Sheet

To connect the registration form to your Google Sheet:

1. Open your target Google Sheet.
2. In the top menu, go to **Extensions** → **Apps Script**.
3. Copy the code from `google-apps-script-template.js` and paste it into the editor.
4. Click **Deploy** → **New deployment**:
   - Select type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the generated Web App URL and add it to your `.env.local` (or Vercel Environment Variables):
   ```env
   VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
