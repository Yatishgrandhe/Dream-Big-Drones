import { contactInput, inquiryRecord, respond, sendResend, sendSheetEvent, serviceClient } from '../server/inquiries.js'

export default async function handler(request, response) {
  if (request.method !== 'POST') return respond(response, 405, { error: 'Method not allowed.' })
  try {
    const values = contactInput(request.body)
    if (values.honeypot) return respond(response, 201, { ok: true })
    const database = serviceClient()
    const record = inquiryRecord(values)
    const cutoff = new Date(Date.now() - 10 * 60 * 1000).toISOString()
    const { count, error: rateError } = await database.from('inquiries').select('id', { count: 'exact', head: true }).eq('email', record.email).gte('created_at', cutoff)
    if (rateError) throw rateError
    if ((count ?? 0) >= 3) return respond(response, 429, { error: 'Please wait a few minutes before sending another inquiry.' })
    const { data: inquiry, error: insertError } = await database.from('inquiries').insert(record).select().single()
    if (insertError) throw insertError
    const [delivery, sheetSynced] = await Promise.all([
      sendResend(inquiry),
      sendSheetEvent('upsert', inquiry).catch(() => false),
    ])
    const notificationSent = delivery.sent === true
    const { error: deliveryUpdateError } = await database.from('inquiries').update({ notification_sent: notificationSent, sheet_synced: sheetSynced }).eq('id', inquiry.id)
    if (deliveryUpdateError) throw deliveryUpdateError
    return respond(response, notificationSent ? 201 : 202, {
      ok: true,
      id: inquiry.id,
      notificationSent,
      message: notificationSent ? undefined : 'Your inquiry was saved, but the owner notification needs attention.',
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'We could not send your inquiry. Please try again.'
    const isValidationError = /required|valid|long/i.test(message)
    return respond(response, isValidationError ? 400 : 500, { error: isValidationError ? message : 'We could not send your inquiry. Please try again.' })
  }
}
