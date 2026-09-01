/*
  Reference copy of the Google Apps Script code for the "Interested in
  Joining?" sign-up form. This file is NOT loaded by the website —
  it runs on Google's servers, inside the Google Sheet you create.

  See JOIN-FORM-SETUP.md in this same folder for exact setup steps.

  What it does: every time the sign-up form on the site is submitted,
  this receives the data and appends one row to the Sheet it's bound
  to: [Timestamp, Name, School Email, Semester]. The timestamp is
  added automatically with new Date() — you don't need to send one
  from the site.
*/
function doPost(e) {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
        new Date(),
        data.name,
        data.email,
        data.semester
    ]);

    return ContentService
        .createTextOutput(JSON.stringify({ result: "success" }))
        .setMimeType(ContentService.MimeType.JSON);
}
