import { useState, type FormEvent } from 'react'
import { supabase } from '@/lib/supabase'
import type { NewsletterFormState } from '@/types'
import iconSuccess from '@/assets/images/icon-success.svg'
import iconError from '@/assets/images/icon-error.svg'

function validateEmail(email: string): string | null {
  if (!email.trim()) return 'This field is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Valid email required'
  return null
}

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [formState, setFormState] = useState<NewsletterFormState>({
    status: 'idle',
    message: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const error = validateEmail(email)
    if (error) {
      setFieldError(error)
      return
    }
    setFieldError(null)
    setFormState({ status: 'loading', message: '' })

    const { data, error: rpcError } = await supabase.rpc('subscribe_newsletter', {
      p_email: email,
    })

    if (rpcError) {
      setFormState({ status: 'error', message: 'Something went wrong. Please try again.' })
      return
    }

    const result = data as { success: boolean; error?: string }
    if (result.success) {
      setFormState({ status: 'success', message: "You're subscribed! Thanks for signing up." })
      setEmail('')
    } else {
      setFormState({ status: 'error', message: result.error ?? 'Something went wrong.' })
    }
  }

  if (formState.status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <img src={iconSuccess} alt="Success" className="w-12 h-12" />
        <p className="text-preset-6 text-text-primary font-medium">{formState.message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-preset-9 font-medium text-text-primary">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (fieldError) setFieldError(null)
          }}
          placeholder="your@email.com"
          aria-describedby={fieldError ? 'email-error' : undefined}
          className={`
            px-4 py-3 rounded-lg border text-preset-8 text-text-primary
            bg-bg placeholder:text-text-secondary/60
            outline-none transition-colors
            focus:border-accent focus:ring-2 focus:ring-accent/20
            ${fieldError ? 'border-red-400' : 'border-border'}
          `}
        />
        {fieldError && (
          <p id="email-error" className="flex items-center gap-1.5 text-preset-9 text-red-500">
            <img src={iconError} alt="" className="w-4 h-4" />
            {fieldError}
          </p>
        )}
      </div>

      {formState.status === 'error' && (
        <p className="flex items-center gap-1.5 text-preset-9 text-red-500">
          <img src={iconError} alt="" className="w-4 h-4" />
          {formState.message}
        </p>
      )}

      <button
        type="submit"
        disabled={formState.status === 'loading'}
        className="
          w-full px-6 py-3 rounded-lg
          bg-text-primary text-bg
          text-preset-8 font-semibold
          hover:opacity-90 active:opacity-80
          disabled:opacity-60
          transition-opacity
        "
      >
        {formState.status === 'loading' ? 'Subscribing…' : 'Stay updated'}
      </button>

      <p className="text-preset-9 text-text-secondary text-center">
        Unsubscribe anytime. No spam, I promise 🙂
      </p>
    </form>
  )
}
