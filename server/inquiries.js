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
  if (!apiKey || !recipient) return false
  const details = [
    ['Name', `${inquiry.first_name} ${inquiry.last_name}`], ['Email', inquiry.email], ['Phone', inquiry.phone],
    ['Company', inquiry.company], ['State', inquiry.state], ['Project type', inquiry.project_type], ['Timeline', inquiry.timeline],
  ].map(([label, value]) => `<tr><th align="left" style="padding:6px 18px 6px 0;color:#526373">${html(label)}</th><td style="padding:6px 0">${html(value)}</td></tr>`).join('')
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || 'Dream Big Drones <onboarding@resend.dev>',
      to: [recipient],
      reply_to: inquiry.email,
      subject: `New Dream Big Drones inquiry: ${inquiry.first_name} ${inquiry.last_name}`,
      html: `<main style="font-family:Arial,sans-serif;padding:32px;max-width:640px"><p style="color:#D99027;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">New project inquiry</p><h1 style="color:#102C46;font-size:30px">${html(inquiry.first_name)} wants to talk about a view.</h1><table style="border-collapse:collapse;margin:24px 0">${details}</table><h2 style="color:#102C46;font-size:18px">Project details</h2><p style="color:#102C46;line-height:1.7;white-space:pre-wrap">${html(inquiry.description)}</p></main>`,
    }),
  })
  return response.ok
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
