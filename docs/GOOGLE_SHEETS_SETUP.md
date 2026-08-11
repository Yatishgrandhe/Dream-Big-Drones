# Google Sheets inquiry sync

The website posts each new inquiry and each admin status or Viewed update to a Google Apps Script web app. The script upserts rows by `Inquiry ID`, so duplicate submissions do not create duplicate rows.

1. Create a blank Google Sheet named `Dream Big Drones inquiries`.
2. Open **Extensions → Apps Script**.
3. Replace the starter code with [`google-sheets-apps-script.js`](./google-sheets-apps-script.js).
4. In **Project Settings → Script Properties**, add `WEBHOOK_SECRET` with a long random value.
5. Deploy as **Web app**. Execute as **Me** and give access to **Anyone**. Copy the web app URL.
6. In Vercel, add these production environment variables and redeploy:

```text
GOOGLE_SHEETS_WEBHOOK_URL=<the Apps Script web app URL>
GOOGLE_SHEETS_WEBHOOK_SECRET=<the same Script Property value>
```

The sheet automatically creates an `Inquiries` tab with a `Viewed` column. It changes to `Viewed` when the protected studio dashboard opens an inquiry.

Prompt for the Google Sheets setup assistant:

```text
Create a Google Apps Script web app for this Dream Big Drones inquiry sheet. Use the script from google-sheets-apps-script.js, set a Script Property called WEBHOOK_SECRET, deploy it as a web app that executes as me, and return the deployment URL. Do not change the Inquiry ID, Status, or Viewed columns because the website uses them to update existing rows.
```
