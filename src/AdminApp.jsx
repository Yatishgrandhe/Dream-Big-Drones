import { ArrowLeft, ChevronDown, LogOut, Search, X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from './lib/supabase'
import './AdminApp.css'

const statuses = ['new', 'read', 'replied', 'archived']

export default function AdminApp({ setupMode = false }) {
  const [session, setSession] = useState(undefined)

  useEffect(() => {
    if (!supabase) { setSession(null); return undefined }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  if (!supabase) return <main className="admin-shell"><p>Administrator access is not configured yet.</p></main>
  if (session === undefined) return <main className="admin-shell"><p>Loading secure studio...</p></main>
  return session ? <Dashboard session={session} /> : <AdminLogin setupMode={setupMode} />
}

function AdminLogin({ setupMode }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    setNotice('')
    const request = setupMode
      ? supabase.auth.signUp({ email, password })
      : supabase.auth.signInWithPassword({ email, password })
    const { data, error: authError } = await request
    if (authError) setError('Those administrator credentials were not accepted.')
    else if (setupMode && !data.session) setNotice('Check your email to confirm the new administrator account, then sign in here.')
    setLoading(false)
  }

  return <main className="admin-login"><a href="/" className="admin-logo"><img src="/dream-big-drones-logo.png" alt="Dream Big Drones by RLM" /></a><form onSubmit={submit}><p className="admin-eyebrow">Private studio access</p><h1>{setupMode ? 'Set up access.' : 'Welcome back.'}</h1><label>Email<input type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label>Password<input type="password" autoComplete={setupMode ? 'new-password' : 'current-password'} required value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p className="admin-error" role="alert">{error}</p>}{notice && <p className="admin-notice" role="status">{notice}</p>}<button type="submit" disabled={loading}>{loading ? 'Checking access...' : setupMode ? 'Create studio access' : 'Enter studio'}</button></form></main>
}

function Dashboard({ session }) {
  const [status, setStatus] = useState('')
  const [email, setEmail] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [selected, setSelected] = useState(null)
  const [rows, setRows] = useState([])
  const [metrics, setMetrics] = useState({ total: 0, newCount: 0, today: 0 })
  const [error, setError] = useState('')
  const query = useMemo(() => new URLSearchParams({ ...(status ? { status } : {}), ...(searchEmail ? { email: searchEmail } : {}) }), [status, searchEmail])

  const load = useCallback(async () => {
    const response = await fetch(`/api/admin/inquiries?${query}`, { headers: { Authorization: `Bearer ${session.access_token}` } })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) throw new Error(result.error || 'Unable to load inquiries.')
    setRows(result.rows || [])
    setMetrics(result.metrics || { total: 0, newCount: 0, today: 0 })
  }, [query, session.access_token])

  useEffect(() => { const timer = window.setTimeout(() => setSearchEmail(email.trim().toLowerCase()), 350); return () => window.clearTimeout(timer) }, [email])
  useEffect(() => { load().catch((loadError) => setError(loadError.message)) }, [load])

  const updateInquiry = async (id, changes) => {
    const response = await fetch('/api/admin/inquiries', { method: 'PATCH', headers: { Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ id, ...changes }) })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) { setError(result.error || 'Unable to update inquiry.'); return null }
    setRows((current) => current.map((row) => row.id === id ? result.inquiry : row))
    setSelected((current) => current?.id === id ? result.inquiry : current)
    return result.inquiry
  }

  const openInquiry = (row) => {
    setSelected(row)
    if (!row.viewed) void updateInquiry(row.id, { viewed: true })
  }

  return <main className="admin-shell"><header className="admin-header"><a href="/" aria-label="Back to site"><img src="/dream-big-drones-logo.png" alt="Dream Big Drones by RLM" /></a><button className="admin-logout" onClick={() => supabase.auth.signOut()}><LogOut size={16} /> Log out</button></header><div className="admin-title"><div><p className="admin-eyebrow">Private studio</p><h1>Project inquiries</h1></div><a href="/" className="admin-return"><ArrowLeft size={16} /> View site</a></div><section className="admin-metrics" aria-label="Submission summary"><Metric value={metrics.total} label="Total submissions" /><Metric value={metrics.newCount} label="New submissions" /><Metric value={metrics.today} label="Today" /></section><section className="admin-list"><div className="admin-toolbar"><label className="admin-search"><Search size={16} /><span className="sr-only">Search by email</span><input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Search email" /></label><label className="admin-select"><span className="sr-only">Filter status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{title(item)}</option>)}</select><ChevronDown size={16} /></label></div>{error && <p className="admin-error" role="alert">{error}</p>}<div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Project</th><th>Location</th><th>Status</th><th>Viewed</th><th>Received</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} tabIndex="0" onClick={() => openInquiry(row)} onKeyDown={(event) => event.key === 'Enter' && openInquiry(row)}><td><strong>{row.first_name} {row.last_name}</strong><small>{row.email}</small></td><td>{row.project_type}</td><td>{row.state}</td><td><StatusSelect row={row} updateStatus={(next) => updateInquiry(row.id, { status: next })} /></td><td>{row.viewed ? 'Viewed' : 'New'}</td><td>{formatDate(row.created_at)}</td></tr>)}</tbody></table></div><div className="admin-cards">{rows.map((row) => <article key={row.id} onClick={() => openInquiry(row)}><div><p>{row.project_type}</p><h2>{row.first_name} {row.last_name}</h2><span>{row.email}</span></div><StatusSelect row={row} updateStatus={(next) => updateInquiry(row.id, { status: next })} /><p>{row.state} · {row.viewed ? 'Viewed' : 'New'}</p></article>)}</div>{rows.length === 0 ? <p className="admin-empty">No inquiries match this view.</p> : null}</section>{selected ? <SubmissionDrawer row={selected} close={() => setSelected(null)} updateStatus={(next) => updateInquiry(selected.id, { status: next })} /> : null}</main>
}

function Metric({ value, label }) { return <article><strong>{value}</strong><span>{label}</span></article> }
function StatusSelect({ row, updateStatus }) { return <select className={`status-pill status-${row.status}`} value={row.status} onClick={(event) => event.stopPropagation()} onChange={(event) => updateStatus(event.target.value)} aria-label={`Update ${row.first_name}'s status`}>{statuses.map((item) => <option key={item} value={item}>{title(item)}</option>)}</select> }
function title(value) { return value.charAt(0).toUpperCase() + value.slice(1) }
function formatDate(value) { return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value)) }
function SubmissionDrawer({ row, close, updateStatus }) { return <aside className="submission-drawer" role="dialog" aria-modal="true" aria-label={`Submission from ${row.first_name} ${row.last_name}`}><button className="drawer-close" onClick={close} aria-label="Close details"><X size={20} /></button><p className="admin-eyebrow">Project inquiry</p><h2>{row.first_name} {row.last_name}</h2><a href={`mailto:${row.email}`}>{row.email}</a>{row.phone ? <a href={`tel:${row.phone}`}>{row.phone}</a> : null}<dl><div><dt>Company</dt><dd>{row.company}</dd></div><div><dt>Project type</dt><dd>{row.project_type}</dd></div><div><dt>Location</dt><dd>{row.state}</dd></div><div><dt>Timeline</dt><dd>{row.timeline}</dd></div><div><dt>Viewed</dt><dd>{row.viewed ? 'Viewed' : 'Not viewed yet'}</dd></div><div><dt>Received</dt><dd>{formatDate(row.created_at)}</dd></div></dl><h3>Project details</h3><p>{row.help}</p><p>{row.description}</p><label className="drawer-status">Status<StatusSelect row={row} updateStatus={updateStatus} /></label></aside> }
