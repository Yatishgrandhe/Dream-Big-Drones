const SHEET_NAME = 'Inquiries'

const COLUMNS = [
  'Inquiry ID', 'Received', 'First Name', 'Last Name', 'Email', 'Phone',
  'Company', 'State', 'Industry', 'Assistance', 'How Can We Help?',
  'Project Type', 'Timeline', 'Project Description', 'Status', 'Viewed',
  'Viewed At', 'Email Sent', 'Sheet Synced',
]

function doPost(event) {
  const payload = JSON.parse(event.postData.contents)
  const expectedSecret = PropertiesService.getScriptProperties().getProperty('WEBHOOK_SECRET')
  if (expectedSecret && payload.secret !== expectedSecret) return json({ ok: false, error: 'Unauthorized' })
  if (!payload.inquiry?.id) return json({ ok: false, error: 'Missing inquiry' })

  const sheet = getSheet()
  const record = payload.inquiry
  const row = [
    record.id, record.created_at, record.first_name, record.last_name, record.email,
    record.phone, record.company, record.state, record.industry, record.assistance,
    record.help, record.project_type, record.timeline, record.description,
    record.status, record.viewed ? 'Viewed' : 'Not viewed', record.viewed_at,
    record.notification_sent ? 'Yes' : 'No', record.sheet_synced ? 'Yes' : 'No',
  ]
  const idColumn = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 1), 1).getValues().flat()
  const existingIndex = idColumn.indexOf(record.id)
  if (existingIndex === -1) sheet.appendRow(row)
  else sheet.getRange(existingIndex + 2, 1, 1, COLUMNS.length).setValues([row])
  return json({ ok: true })
}

function getSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = spreadsheet.getSheetByName(SHEET_NAME)
  if (!sheet) sheet = spreadsheet.insertSheet(SHEET_NAME)
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS)
    sheet.setFrozenRows(1)
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold')
  }
  return sheet
}

function json(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON)
}
