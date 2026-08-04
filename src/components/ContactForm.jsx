import { ArrowDownRight, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'

const initialValues = { name: '', email: '', phone: '', location: '', shootType: '', preferredDate: '', projectDetails: '', consent: false, honeypot: '' }
const labels = { name: 'Full name', email: 'Email address', location: 'Project location', shootType: 'Shoot type', projectDetails: 'Project details', consent: 'Consent' }

function validate(values) {
  const errors = {}
  if (values.name.trim().length < 2) errors.name = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (values.location.trim().length < 2) errors.location = 'Please tell us where the project is located.'
  if (!values.shootType) errors.shootType = 'Choose the type of shoot you have in mind.'
  if (values.projectDetails.trim().length < 12) errors.projectDetails = 'A little more detail will help us plan the right approach.'
  if (!values.consent) errors.consent = 'Please agree before sending your details.'
  return errors
}

export function ContactForm() {
  const submit = useMutation(api.contacts.submit)
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [serverError, setServerError] = useState('')

  const update = (event) => {
    const { name, value, type, checked } = event.target
    setValues((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
    setServerError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    setSending(true)
    setServerError('')
    try {
      await submit({ ...values, sourcePage: window.location.pathname || '/' })
      setValues(initialValues)
      setSent(true)
    } catch (error) {
      setServerError(error?.data ?? error?.message ?? 'We could not send your details. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (sent) return (
    <div className="contact-success" role="status" aria-live="polite">
      <CheckCircle2 size={28} aria-hidden="true" />
      <p className="kicker kicker--clean">Message received</p>
      <h3>Your project details are on their way.</h3>
      <p>We’ll be in touch soon.</p>
      <button type="button" className="text-action" onClick={() => setSent(false)}>Send another inquiry <ArrowDownRight size={16} /></button>
    </div>
  )

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="contact-flight-path" aria-hidden="true"><span /></div>
      <div className="form-grid">
        <Field label={labels.name} error={errors.name}><input name="name" autoComplete="name" value={values.name} onChange={update} aria-invalid={Boolean(errors.name)} /></Field>
        <Field label={labels.email} error={errors.email}><input name="email" type="email" autoComplete="email" value={values.email} onChange={update} aria-invalid={Boolean(errors.email)} /></Field>
        <Field label="Phone number (optional)"><input name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update} /></Field>
        <Field label={labels.location} error={errors.location}><input name="location" autoComplete="address-level2" value={values.location} onChange={update} aria-invalid={Boolean(errors.location)} /></Field>
        <Field label={labels.shootType} error={errors.shootType} className="form-field--full">
          <select name="shootType" value={values.shootType} onChange={update} aria-invalid={Boolean(errors.shootType)}><option value="">Select one</option><option>Property or place</option><option>Event or gathering</option><option>Brand story or campaign</option><option>Something else</option></select>
        </Field>
        <Field label="Preferred flight date (optional)" className="form-field--full"><input name="preferredDate" type="date" value={values.preferredDate} onChange={update} /></Field>
        <Field label={labels.projectDetails} error={errors.projectDetails} className="form-field--full"><textarea name="projectDetails" rows="5" value={values.projectDetails} onChange={update} aria-invalid={Boolean(errors.projectDetails)} /></Field>
      </div>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="honeypot" tabIndex="-1" autoComplete="off" value={values.honeypot} onChange={update} /></label></div>
      <label className="consent-field"><input name="consent" type="checkbox" checked={values.consent} onChange={update} aria-invalid={Boolean(errors.consent)} /><span>I agree to be contacted about this project.</span></label>
      {errors.consent ? <p className="field-error" role="alert">{errors.consent}</p> : null}
      {serverError ? <p className="form-error" role="alert">{serverError}</p> : null}
      <button className="flight-button" type="submit" disabled={sending}>{sending ? 'Sending project details…' : <>Send project details <ArrowDownRight size={17} /></>}</button>
    </form>
  )
}

function Field({ label, error, className = '', children }) {
  return <label className={`form-field ${className}`}><span>{label}</span>{children}{error ? <em className="field-error" role="alert">{error}</em> : null}</label>
}
