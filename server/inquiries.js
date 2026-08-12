import { createClient } from '@supabase/supabase-js'

const contactFields = [
  'firstName', 'lastName', 'email', 'phone', 'state', 'company', 'industry',
  'assist', 'help', 'projectType', 'timeline', 'description', 'honeypot',
]

const limits = {
  firstName: 15, lastName: 15, email: 320, phone: 40, state: 32,
  company: 40, industry: 100, assist: 100, help: 500, projectType: 120,
  timeline: 100, description: 1500,
}

export function serviceClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Database configuration is unavailable.')
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
}

export function contactInput(body) {
  const values = Object.fromEntries(contactFields.map((field) => [field, String(body?.[field] ?? '').trim()]))
  const required = ['firstName', 'lastName', 'email', 'phone', 'state', 'company', 'help', 'projectType', 'timeline']
  if (required.some((field) => !values[field]) || !values.description) throw new Error('Please complete the required project details.')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) throw new Error('Enter a valid email address.')
  if (!/[0-9]{7,}/.test(values.phone.replace(/\D/g, ''))) throw new Error('Enter a valid phone number.')
  if (Object.entries(limits).some(([field, limit]) => values[field].length > limit)) throw new Error('One or more fields are too long.')
  return values
}

export function inquiryRecord(values) {
  return {
    first_name: values.firstName,
    last_name: values.lastName,
    email: values.email.toLowerCase(),
    phone: values.phone,
    state: values.state,
    company: values.company,
    industry: values.industry || null,
    assistance: values.assist,
    help: values.help,
    project_type: values.projectType,
    timeline: values.timeline,
    description: values.description,
  }
}

export function html(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character])
}

export async function sendResend(inquiry) {
  const apiKey = process.env.RESEND_API_KEY
  const recipient = process.env.NOTIFICATION_TO_EMAIL
  if (!apiKey || !recipient) return { sent: false, error: 'Email delivery is not configured.' }
  const details = [
    ['Contact', `${inquiry.first_name} ${inquiry.last_name}`],
    ['Email', inquiry.email],
    ['Phone', inquiry.phone],
    ['Company', inquiry.company],
    ['Service state', inquiry.state],
    ['Industry', inquiry.industry || 'Not specified'],
    ['Assistance requested', inquiry.assistance],
    ['Project type', inquiry.project_type],
    ['Project timeline', inquiry.timeline],
  ].map(([label, value]) => `<tr><th align="left" style="width:42%;padding:11px 16px 11px 0;border-bottom:1px solid #E6E8EA;color:#526373;font-size:13px;font-weight:700">${html(label)}</th><td style="padding:11px 0;border-bottom:1px solid #E6E8EA;color:#102C46;font-size:14px;line-height:1.45">${html(value)}</td></tr>`).join('')
  const contactName = `${inquiry.first_name} ${inquiry.last_name}`
  const replyUrl = `mailto:${encodeURIComponent(inquiry.email)}`
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || 'Dream Big Drones <onboarding@resend.dev>',
        to: [recipient],
        reply_to: inquiry.email,
        subject: `New inquiry: ${contactName} | ${inquiry.project_type}`,
        html: `<!doctype html><html><body style="margin:0;padding:0;background:#F4F0E8;color:#102C46;font-family:Arial,sans-serif"><span style="display:none!important;visibility:hidden;opacity:0;color:transparent;height:0;width:0;overflow:hidden">New project inquiry from ${html(contactName)}.</span><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:28px 12px;background:#F4F0E8"><tr><td align="center"><table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;overflow:hidden;background:#FFFFFF;border:1px solid #D9D1C5;border-radius:16px"><tr><td style="padding:30px 34px;background:#102C46"><p style="margin:0 0 10px;color:#E7B264;font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase">Dream Big Drones by RLM</p><h1 style="margin:0;color:#FFFFFF;font-family:Georgia,serif;font-size:32px;font-weight:400;line-height:1.15">New project inquiry</h1></td></tr><tr><td style="padding:32px 34px 12px"><p style="margin:0 0 8px;color:#526373;font-size:13px;font-weight:700;letter-spacing:1.1px;text-transform:uppercase">Contact</p><h2 style="margin:0 0 8px;color:#102C46;font-family:Georgia,serif;font-size:28px;font-weight:400;line-height:1.2">${html(contactName)}</h2><p style="margin:0;color:#526373;font-size:15px;line-height:1.6">${html(inquiry.company)} · ${html(inquiry.state)}</p><p style="margin:22px 0 0"><a href="${replyUrl}" style="display:inline-block;padding:13px 18px;border-radius:999px;background:#102C46;color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none">Reply to ${html(inquiry.first_name)}</a></p></td></tr><tr><td style="padding:20px 34px 12px"><h3 style="margin:0 0 14px;color:#102C46;font-size:17px">Inquiry overview</h3><table role="presentation" width="100%" cellspacing="0" cellpadding="0">${details}</table></td></tr><tr><td style="padding:20px 34px"><div style="padding:22px 24px;background:#F7F4EE;border-left:4px solid #D99027"><p style="margin:0 0 7px;color:#526373;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase">How can we help?</p><p style="margin:0;color:#102C46;font-size:16px;font-weight:700;line-height:1.55">${html(inquiry.help)}</p></div></td></tr><tr><td style="padding:8px 34px 34px"><h3 style="margin:0 0 12px;color:#102C46;font-size:17px">Project description</h3><p style="margin:0;color:#334C5A;font-size:15px;line-height:1.7;white-space:pre-wrap">${html(inquiry.description)}</p></td></tr><tr><td style="padding:20px 34px;background:#F7F4EE;border-top:1px solid #E6E8EA"><p style="margin:0;color:#526373;font-size:12px;line-height:1.55">This inquiry was submitted through the Dream Big Drones website. Reply directly to this email to contact ${html(contactName)}.</p></td></tr></table></td></tr></table></body></html>`,
      }),
    })
    const body = await response.json().catch(() => ({}))
    if (!response.ok) return { sent: false, error: 'The email provider could not accept this inquiry.' }
    return { sent: true, id: typeof body.id === 'string' ? body.id : null }
  } catch {
    return { sent: false, error: 'The email provider could not be reached.' }
  }
}

export async function sendSheetEvent(event, inquiry) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL
  if (!url) return false
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, inquiry, secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || undefined }),
  })
  return response.ok
}

export async function requireAdmin(request) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, '')
  if (!token) return null
  const client = serviceClient()
  const { data, error } = await client.auth.getUser(token)
  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  if (error || !data.user?.email || !allowedEmail || data.user.email.toLowerCase() !== allowedEmail) return null
  return data.user
}

export function respond(response, status, body) {
  response.setHeader('Cache-Control', 'no-store')
  response.status(status).json(body)
}
