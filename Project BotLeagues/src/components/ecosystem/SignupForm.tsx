import { useEffect, useState } from 'react'
import type { EcosystemRole, SignupFormData } from '../../types'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormErrors = Partial<Record<keyof SignupFormData, string>>

const emptyForm: SignupFormData = { name: '', location: '', email: '' }

export default function SignupForm({ role }: { role: EcosystemRole }) {
  const [formData, setFormData] = useState<SignupFormData>(emptyForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  // Auto-dismiss the success message after a few seconds.
  useEffect(() => {
    if (!submitted) return
    const timer = setTimeout(() => setSubmitted(false), 4000)
    return () => clearTimeout(timer)
  }, [submitted])

  const validate = (data: SignupFormData): FormErrors => {
    const next: FormErrors = {}
    if (!data.name.trim()) next.name = 'Name is required.'
    if (!data.location.trim()) next.location = 'Location is required.'
    if (!data.email.trim()) {
      next.email = 'Email is required.'
    } else if (!EMAIL_PATTERN.test(data.email.trim())) {
      next.email = 'Enter a valid email address.'
    }
    return next
  }

  const handleChange =
    (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    // No backend wired up yet — log the signup and show a confirmation.
    console.log(`${role} signup:`, formData)
    setSubmitted(true)
    setFormData(emptyForm)
  }

  const inputClasses = (field: keyof SignupFormData) =>
    `w-full bg-bg-1 border rounded-md px-4 py-[13px] text-[13px] text-white placeholder:text-white/40 focus:border-brand-red/50 outline-none transition-colors ${
      errors[field] ? 'border-brand-red/70' : 'border-white/10'
    }`

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange('name')}
          className={inputClasses('name')}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name && <p className="text-[11px] text-brand-red mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange('location')}
          className={inputClasses('location')}
          aria-invalid={Boolean(errors.location)}
        />
        {errors.location && <p className="text-[11px] text-brand-red mt-1">{errors.location}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange('email')}
          className={inputClasses('email')}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email && <p className="text-[11px] text-brand-red mt-1">{errors.email}</p>}
      </div>

      <button type="submit" className="btn btn-fill w-full mt-1.5 border-none">
        Sign Up
      </button>

      {submitted && (
        <p className="text-[12px] text-[#4dff8a] mt-1" role="status">
          Thanks — we&apos;ll be in touch.
        </p>
      )}
    </form>
  )
}
