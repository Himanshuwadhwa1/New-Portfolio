import { useState, useEffect, useRef } from 'react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SectionHeading } from '../../components/ui/SectionHeading'
import githubIconDark from '../../assets/icons/github-dark.svg'
import linkedinIcon from '../../assets/icons/linkedin.svg'
import gmailIcon from '../../assets/icons/gmail.svg'
import githubIcon from '../../assets/icons/github-light.svg'
import linkedinIconDark from '../../assets/icons/linkedin-dark.svg'
import xIconDark from '../../assets/icons/x-dark.svg'
import xIcon from '../../assets/icons/x-light.svg'
import youtubeIconDark from '../../assets/icons/youtube-dark.svg'
import youtubeIcon from '../../assets/icons/youtube-light.svg'
import leetcodeIcon from '../../assets/icons/leetcode-light.svg'
import leetcodeIconDark from '../../assets/icons/leetcode-dark.svg'
import { useTheme } from '../../hooks/useTheme'


interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function Contact() {
  const {theme} = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const messageRef = useRef<HTMLTextAreaElement>(null)

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required'
        if (value.trim().length < 2) return 'Name must be at least 2 characters'
        if (value.trim().startsWith(' ')) return 'Name cannot start with a space'
        if (/^\d/.test(value.trim())) return 'Name cannot start with Number'
        return undefined
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(value)) return 'Please enter a valid email address'
        return undefined
      case 'message':
        if (!value.trim()) return 'Message is required'
        if (value.trim().length < 10) return 'Message must be at least 10 characters'
        return undefined
      default:
        return undefined
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData])
      if (error) {
        newErrors[key as keyof FormErrors] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleKeyDown = (e: React.KeyboardEvent, fieldName: string) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault()
      
      const isFieldValid = !validateField(fieldName, formData[fieldName as keyof typeof formData])
      
      if (isFieldValid) {
        switch (fieldName) {
          case 'name':
            emailRef.current?.focus()
            break
          case 'email':
            messageRef.current?.focus()
            break
          case 'message':
            if (validateForm()) {
              handleSubmit(e as any)
            }
            break
        }
      } else {
        setErrors(prev => ({
          ...prev,
          [fieldName]: validateField(fieldName, formData[fieldName as keyof typeof formData])
        }))
      }
    }
  }

  const handleBlur = (fieldName: string) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }))
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData])
    setErrors(prev => ({ ...prev, [fieldName]: error }))
  }

  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      const timer = setTimeout(() => {
        setSubmitStatus('idle')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [submitStatus])

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    
    // Validate all fields before submission
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('https://formspree.io/f/xeajzrrz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Himanshuwadhwa1',
      icon: theme === 'dark' ? githubIconDark : githubIcon,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/himanshu-wadhwa-81671022a',
      icon: theme === 'dark' ? linkedinIconDark : linkedinIcon,
    },
    {
      name: 'Email',
      href: 'mailto:usernamehimanshu999@gmail.com',
      icon: gmailIcon,
    },
    {
      name: 'X',
      href: 'https://x.com/Himansh27262483',
      icon: theme === 'dark' ? xIconDark : xIcon,
    },
    {
      name: 'Youtube',
      href: 'https://www.youtube.com/@Just-Himanshu-things',
      icon: theme === 'dark' ? youtubeIconDark : youtubeIcon,
    },
    {
      name: 'LeetCode',
      href: 'https://leetcode.com/u/Legend--Daryy/',
      icon: theme === 'dark' ? leetcodeIconDark : leetcodeIcon,
    },
  ]

  return (
    <div className="mx-auto max-w-6xl">
      <SectionHeading
        title="Contact"
        eyebrow="Get in touch"
        description="Have a project in mind or just want to chat? Drop me a message."
      />

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block font-[JetBrainsMono] text-sm text-[var(--muted)]">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                ref={nameRef}
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={() => handleBlur('name')}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                className={`w-full rounded-lg border px-4 py-3 text-[var(--text)] transition-colors focus:outline-none focus:ring-2 resize-none ${
                  errors.name && touched.name
                    ? 'border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-[color:var(--accent)]/20 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
                }`}
                placeholder="Your name"
              />
              {errors.name && touched.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block font-[JetBrainsMono] text-sm text-[var(--muted)]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur('email')}
                onKeyDown={(e) => handleKeyDown(e, 'email')}
                className={`w-full rounded-lg border px-4 py-3 text-[var(--text)] transition-colors focus:outline-none focus:ring-2 resize-none ${
                  errors.email && touched.email
                    ? 'border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-[color:var(--accent)]/20 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && touched.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block font-[JetBrainsMono] text-sm text-[var(--muted)]">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                ref={messageRef}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={() => handleBlur('message')}
                onKeyDown={(e) => handleKeyDown(e, 'message')}
                rows={5}
                className={`w-full rounded-lg border px-4 py-3 text-[var(--text)] transition-colors focus:outline-none focus:ring-2 resize-none ${
                  errors.message && touched.message
                    ? 'border-red-500/50 bg-red-500/5 focus:border-red-500 focus:ring-red-500/20'
                    : 'border-[color:var(--accent)]/20 bg-[var(--surface)] focus:border-[var(--primary)] focus:ring-[var(--primary)]/20'
                }`}
                placeholder="Your message..."
              />
              {errors.message && touched.message && (
                <p className="mt-1 text-xs text-red-500">{errors.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
            
            <p className="text-center text-xs text-[var(--muted)]">
              Tip: Press Ctrl+Enter to move to next field or submit
            </p>

            {submitStatus === 'success' && (
              <div className="rounded-lg bg-green-500/10 border border-green-500/20 px-4 py-3 text-sm text-green-600 dark:text-green-400">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                Something went wrong. Please try again or email me directly.
              </div>
            )}
          </form>
        </Card>

        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h3 className="mb-4 font-[Bangers] text-2xl text-[var(--primary)]">
              Let's connect
            </h3>
            <p className="text-[var(--muted)] leading-7">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-[JetBrainsMono] text-sm uppercase tracking-[0.24em] text-[var(--primary)]">
              Social links
            </h4>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center rounded-full border border-[color:var(--accent)]/40 bg-[var(--secondary)] p-2.5 sm:p-3 transition-all duration-300 hover:border-[var(--primary)] hover:bg-[var(--primary)]/10 hover:shadow-lg hover:shadow-[var(--primary)]/30"
                  aria-label={link.name}
                >
                  <img 
                    src={link.icon as string} 
                    alt={link.name}
                    className="h-5 w-5 sm:h-6 sm:w-6 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[color:var(--accent)]/20 bg-[var(--surface)] p-6">
            <h4 className="mb-2 font-[JetBrainsMono] text-sm text-[var(--primary)]">
              Response time
            </h4>
            <p className="text-sm text-[var(--muted)]">
              I typically respond within 24-48 hours. For urgent matters, reach out via LinkedIn, whatsapp or email directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
