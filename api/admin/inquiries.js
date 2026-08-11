import { requireAdmin, respond, sendSheetEvent, serviceClient } from '../../server/inquiries.js'

const statuses = new Set(['new', 'read', 'replied', 'archived'])

export default async function handler(request, response) {
  const admin = await requireAdmin(request)
  if (!admin) return respond(response, 401, { error: 'Administrator access is required.' })
  const database = serviceClient()
  if (request.method === 'GET') {
    const status = typeof request.query.status === 'string' && statuses.has(request.query.status) ? request.query.status : null
    const email = typeof request.query.email === 'string' ? request.query.email.trim().slice(0, 320) : ''
    let query = database.from('inquiries').select('*').order('created_at', { ascending: false }).limit(100)
    if (status) query = query.eq('status', status)
    if (email) query = query.ilike('email', `%${email}%`)
    const [{ data: rows, error }, { count: total }, { count: newCount }, { count: today }] = await Promise.all([
      query,
      database.from('inquiries').select('id', { count: 'exact', head: true }),
      database.from('inquiries').select('id', { count: 'exact', head: true }).eq('status', 'new'),
      database.from('inquiries').select('id', { count: 'exact', head: true }).gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
    ])
    if (error) return respond(response, 500, { error: 'Unable to load inquiries.' })
    return respond(response, 200, { rows, metrics: { total: total ?? 0, newCount: newCount ?? 0, today: today ?? 0 } })
  }
  if (request.method === 'PATCH') {
    const { id, status, viewed } = request.body ?? {}
    if (!/^[0-9a-f-]{36}$/i.test(String(id))) return respond(response, 400, { error: 'Invalid inquiry.' })
    const changes = {}
    if (statuses.has(status)) changes.status = status
    if (typeof viewed === 'boolean') {
      changes.viewed = viewed
      changes.viewed_at = viewed ? new Date().toISOString() : null
    }
    if (!Object.keys(changes).length) return respond(response, 400, { error: 'No update supplied.' })
    const { data: inquiry, error } = await database.from('inquiries').update(changes).eq('id', id).select().single()
    if (error) return respond(response, 500, { error: 'Unable to update inquiry.' })
    const sheetSynced = await sendSheetEvent('upsert', inquiry).catch(() => false)
    if (sheetSynced && !inquiry.sheet_synced) await database.from('inquiries').update({ sheet_synced: true }).eq('id', inquiry.id)
    return respond(response, 200, { inquiry: { ...inquiry, sheet_synced: inquiry.sheet_synced || sheetSynced } })
  }
  return respond(response, 405, { error: 'Method not allowed.' })
}
