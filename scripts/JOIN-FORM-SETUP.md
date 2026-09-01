# Setting up the "Interested in Joining?" sign-up form

The sign-up form on the home page and rush page (built by
[`../js/join-form.js`](../js/join-form.js)) needs a one-time setup before it can
actually save anything — this connects it to a Google Sheet. Takes about 10
minutes, no coding beyond copy-pasting.

## Step 1 — Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank
   spreadsheet. Name it something like "KHK Interest Sign-Ups".
2. In row 1, add these column headers (so the sheet is easy to read later):

   | A | B | C | D |
   |---|---|---|---|
   | Timestamp | Name | Email | Semester |

## Step 2 — Add the script

1. In the Sheet, go to **Extensions → Apps Script**. This opens a code editor
   in a new tab.
2. Delete whatever's in the default `Code.gs` file, and paste in the contents
   of [`join-form-apps-script.js`](join-form-apps-script.js) (in this same
   folder).
3. Click the save icon (or Ctrl+S / Cmd+S). Give the project any name when
   prompted, e.g. "Join Form Handler".

## Step 3 — Deploy it as a Web App

1. Click **Deploy → New deployment** (top right).
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Fill in:
   - **Execute as**: Me (your account)
   - **Who has access**: **Anyone**
     (This has to be "Anyone" for the public website to be able to submit to
     it — it does NOT give anyone access to view your Sheet, only permission
     to run this one script, which only appends a row.)
4. Click **Deploy**. Google will ask you to authorize the script the first
   time — click through the "Google hasn't verified this app" warning (this
   is normal for your own scripts): **Advanced → Go to \[project name] (unsafe)
   → Allow**.
5. Copy the **Web app URL** it gives you — looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## Step 4 — Connect the site to it

1. Open [`../js/join-form.js`](../js/join-form.js).
2. Find this line near the top:
   ```js
   const APPS_SCRIPT_URL = "";
   ```
3. Paste your Web app URL between the quotes:
   ```js
   const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycb.../exec";
   ```
4. Save the file.

## Step 5 — Test it

Open the site (home page or rush page), fill out the sign-up form with a test
entry, and submit it. Check your Google Sheet — a new row should appear within
a few seconds, with the current date/time in column A. If it doesn't show up,
double-check the deployment's access is set to "Anyone" (Step 3) and that the
URL was copied in full (Step 4).

## If you ever change the form's fields

If you add/remove/rename a field in `js/join-form.js`, update
`join-form-apps-script.js` to match (both the column headers in the Sheet and
the `data.___` fields it reads), then re-deploy: **Deploy → Manage deployments
→ (pencil/edit icon) → New version → Deploy**. Editing the script alone isn't
enough — Apps Script Web Apps only pick up changes after you deploy a new
version.
