/**
 * FICAN Google Apps Script Web App Template
 * -----------------------------------------
 * Instructions:
 * 1. Open your Google Sheet (e.g. "FICAN 2026 Members Registration")
 * 2. Click "Extensions" > "Apps Script"
 * 3. Replace all code in Code.gs with this script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone" (CRITICAL for receiving submissions without Google login)
 * 8. Copy the Web App URL and paste it into your .env.local file as:
 *    VITE_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Set headers if this is a fresh sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submission Timestamp",
        "Full Name",
        "Email Address",
        "Date of Birth",
        "Marital Status",
        "State of Origin",
        "Phone Number",
        "Alternative Phone",
        "Religion",
        "Organisation / Media House",
        "Organisation Address",
        "Assigned Beats / Fields",
        "Beats Count",
        "Bank Name",
        "Account Name",
        "Account Number (NUBAN)",
        "Next of Kin 1 Full Name",
        "Next of Kin 1 Phone",
        "Next of Kin 1 Address",
        "Next of Kin 2 Full Name",
        "Next of Kin 2 Phone",
        "Next of Kin 2 Address"
      ]);
      // Format header row
      sheet.getRange(1, 1, 1, 22).setFontWeight("bold").setBackground("#004D28").setFontColor("#FFFFFF");
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString(),
      data.fullName || "",
      data.email || "",
      data.dob || "",
      data.maritalStatus || "",
      data.stateOrigin || "",
      data.phone || "",
      data.altPhone || "",
      data.religion || "",
      data.organisation || "",
      data.orgAddress || "",
      data.beats || "",
      data.beatsCount || "",
      data.bankName || "",
      data.accountName || "",
      "'" + (data.accountNumber || ""), // Prefix with quote so leading zeros are preserved in Google Sheets
      data.nok1Name || "",
      data.nok1Phone || "",
      data.nok1Address || "",
      data.nok2Name || "",
      data.nok2Phone || "",
      data.nok2Address || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
