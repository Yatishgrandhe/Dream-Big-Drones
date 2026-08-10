import { ArrowLeft, ChevronDown, LogOut, Search, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useMutation, usePaginatedQuery, useQuery } from 'convex/react'
import { useAuthActions, useConvexAuth } from '@convex-dev/auth/react'
import { api } from '../convex/_generated/api'
import './AdminApp.css'

const statuses = ['new', 'read', 'replied', 'archived']

export default function AdminApp({ setupMode = false }) {
  const { isLoading, isAuthenticated } = useConvexAuth()
  if (isLoading) return <main className="admin-shell"><p>Loading secure studio…</p></main>
  return isAuthenticated ? <Dashboard /> : <AdminLogin setupMode={setupMode} />
}

function AdminLogin({ setupMode }) {
  const { signIn } = useAuthActions()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const submit = async (event) => {
    event.preventDefault(); setLoading(true); setError('')
    try { await signIn('password', { flow: setupMode ? 'signUp' : 'signIn', email, password }) }
    catch { setError('Those administrator credentials were not accepted.') }
    finally { setLoading(false) }
  }
  return <main className="admin-login"><a href="/" className="admin-logo"><img src="/dream-big-drones-logo.png" alt="Dream Big Drones by RLM" /></a><form onSubmit={submit}><p className="admin-eyebrow">Private studio access</p><h1>{setupMode ? 'Set up access.' : 'Welcome back.'}</h1><label>Email<input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" autoComplete={setupMode ? 'new-password' : 'current-password'} required value={password} onChange={(e) => setPassword(e.target.value)} /></label>{error && <p className="admin-error" role="alert">{error}</p>}<button type="submit" disabled={loading}>{loading ? 'Checking access…' : setupMode ? 'Create studio access' : 'Enter studio'}</button></form></main>
}

function Dashboard() {
  const { signOut } = useAuthActions(); const [status, setStatus] = useState(''); const [email, setEmail] = useState(''); const [searchEmail, setSearchEmail] = useState(''); const [selected, setSelected] = useState(null)
  const metrics = useQuery(api.contacts.metricsForAdmin, {})
  const args = useMemo(() => ({ ...(status ? { status } : {}), ...(searchEmail ? { email: searchEmail } : {}) }), [status, searchEmail])
  const { results, status: paginationStatus, loadMore } = usePaginatedQuery(api.contacts.listForAdmin, args, { initialNumItems: 12 })
  const updateStatus = useMutation(api.contacts.updateStatus)
  useEffect(() => { const timer = window.setTimeout(() => setSearchEmail(email.trim().toLowerCase()), 350); return () => window.clearTimeout(timer) }, [email])
  return <main className="admin-shell"><header className="admin-header"><a href="/" aria-label="Back to site"><img src="/dream-big-drones-logo.png" alt="Dream Big Drones by RLM" /></a><button className="admin-logout" onClick={() => signOut()}><LogOut size={16} /> Log out</button></header><div className="admin-title"><div><p className="admin-eyebrow">Private studio</p><h1>Project inquiries</h1></div><a href="/" className="admin-return"><ArrowLeft size={16} /> View site</a></div><section className="admin-metrics" aria-label="Submission summary"><Metric value={metrics?.total} label="Total submissions" /><Metric value={metrics?.newCount} label="New submissions" /><Metric value={metrics?.today} label="Today" /></section><section className="admin-list"><div className="admin-toolbar"><label className="admin-search"><Search size={16} /><span className="sr-only">Search by email</span><input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Search exact email" /></label><label className="admin-select"><span className="sr-only">Filter status</span><select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">All statuses</option>{statuses.map((item) => <option key={item} value={item}>{title(item)}</option>)}</select><ChevronDown size={16} /></label></div><div className="admin-table-wrap"><table><thead><tr><th>Name</th><th>Project</th><th>Location</th><th>Date</th><th>Status</th><th>Received</th></tr></thead><tbody>{results.map((row) => <tr key={row._id} tabIndex="0" onClick={() => setSelected(row)} onKeyDown={(event) => event.key === 'Enter' && setSelected(row)}><td><strong>{row.name}</strong><small>{row.email}</small></td><td>{row.shootType}</td><td>{row.location}</td><td>{row.preferredDate || 'Flexible'}</td><td><StatusSelect row={row} updateStatus={updateStatus} /></td><td>{new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(row.createdAt)}</td></tr>)}</tbody></table></div><div className="admin-cards">{results.map((row) => <article key={row._id} onClick={() => setSelected(row)}><div><p>{row.shootType}</p><h2>{row.name}</h2><span>{row.email}</span></div><StatusSelect row={row} updateStatus={updateStatus} /><p>{row.location} · {row.preferredDate || 'Flexible'}</p></article>)}</div>{paginationStatus === 'CanLoadMore' && <button className="admin-more" onClick={() => loadMore(12)}>Load more inquiries</button>}{results.length === 0 && paginationStatus !== 'LoadingFirstPage' ? <p className="admin-empty">No inquiries match this view.</p> : null}</section>{selected ? <SubmissionDrawer row={selected} close={() => setSelected(null)} updateStatus={updateStatus} /> : null}</main>
}

function Metric({ value, label }) { return <article><strong>{value ?? 'N/A'}</strong><span>{label}</span></article> }
function StatusSelect({ row, updateStatus }) { return <select className={`status-pill status-${row.status}`} value={row.status} onClick={(event) => event.stopPropagation()} onChange={(event) => updateStatus({ id: row._id, status: event.target.value })} aria-label={`Update ${row.name}'s status`}>{statuses.map((item) => <option key={item} value={item}>{title(item)}</option>)}</select> }
function title(value) { return value.charAt(0).toUpperCase() + value.slice(1) }
function SubmissionDrawer({ row, close, updateStatus }) { return <aside className="submission-drawer" role="dialog" aria-modal="true" aria-label={`Submission from ${row.name}`}><button className="drawer-close" onClick={close} aria-label="Close details"><X size={20} /></button><p className="admin-eyebrow">Project inquiry</p><h2>{row.name}</h2><a href={`mailto:${row.email}`}>{row.email}</a>{row.phone ? <a href={`tel:${row.phone}`}>{row.phone}</a> : null}<dl><div><dt>Shoot type</dt><dd>{row.shootType}</dd></div><div><dt>Location</dt><dd>{row.location}</dd></div><div><dt>Flight date</dt><dd>{row.preferredDate || 'Flexible'}</dd></div><div><dt>Received</dt><dd>{new Intl.DateTimeFormat(undefined, { dateStyle: 'full', timeStyle: 'short' }).format(row.createdAt)}</dd></div></dl><h3>Project details</h3><p>{row.projectDetails}</p><label className="drawer-status">Status<StatusSelect row={row} updateStatus={updateStatus} /></label></aside> }
