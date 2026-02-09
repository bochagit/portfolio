import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, User, Phone, MessageSquare, Send, CheckCircle, XCircle, Loader } from 'lucide-react'
import emailjs from '@emailjs/browser'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const { t } = useTranslation()
  const contactRef = useRef(null)
  const contentRef = useRef(null)
  const formRef = useRef(null)
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    emailjs.init('2qVuwCllU6SXRn_BG')

    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      })

      gsap.fromTo(
        contentRef.current,
        {
          x: window.innerWidth,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: contactRef.current,
            start: 'top top',
            end: '+=100%',
            scrub: 1,
            immediateRender: false
          },
          x: 0,
          opacity: 1,
          ease: 'none'
        }
      )
    }, contentRef)

    return () => context.revert()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      await emailjs.send(
        'service_rj1cnrd', 
        'template_633uzvf',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          to_email: 'gonzalocardozo.dev@gmail.com'
        }
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      
    } catch (error) {
      console.error('Error enviando email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus(null), 5000)
    }
  }

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: (
        <svg className="social-icon" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
          <title>LinkedIn</title>
          <path fill="#0076b2" d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"/>
          <path fill="#fff" d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"/>
        </svg>
      ),
      url: 'https://www.linkedin.com/in/gonzalo-cardozo-4490992a3/',
      color: '#0A66C2'
    },
    {
      name: 'GitHub',
      icon: (
        <svg className="social-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>GitHub</title>
          <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
      url: 'https://github.com/bochagit',
      color: '#E5E7EB'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="social-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <title>Instagram</title>
          <path fill="currentColor" d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077"/>
        </svg>
      ),
      url: 'https://www.instagram.com/gonzaa_c_/',
      color: '#E4405F'
    },
    {
      name: 'WhatsApp',
      icon: <svg className='social-icon' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>WhatsApp</title><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>,
      url: 'https://wa.me/+5491136661276',
      color: '#25D366'
    }
  ]

  return (
    <section className='contact-section' ref={contactRef}>
      <div className='contact-container' ref={contentRef}>
        <h2 className='contact-title'>{t('contact.title')}</h2>
        <div className='contact-box'>
          <div className='contact-form-wrapper'>
            <h3 className='form-subtitle'>{t('contact.formTitle')}</h3>
            <form 
              className='contact-form' 
              ref={formRef}
              onSubmit={handleSubmit}
              onKeyDown={handleKeyDown}
            >
              <div className='form-group'>
                <label htmlFor='name' className='form-label'>
                  <User size={18} />
                  <span>{t('contact.name')}</span>
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='form-input'
                  placeholder={t('contact.namePlaceholder')}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email' className='form-label'>
                  <Mail size={18} />
                  <span>{t('contact.email')}</span>
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  className='form-input'
                  placeholder={t('contact.emailPlaceholder')}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className='form-group'>
                <label htmlFor='phone' className='form-label'>
                  <Phone size={18} />
                  <span>{t('contact.phone')}</span>
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  className='form-input'
                  placeholder={t('contact.phonePlaceholder')}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='message' className='form-label'>
                  <MessageSquare size={18} />
                  <span>{t('contact.message')}</span>
                </label>
                <textarea
                  id='message'
                  name='message'
                  className='form-textarea'
                  rows='4'
                  placeholder={t('contact.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {submitStatus && (
                <div className={`status-message ${submitStatus}`}>
                  {submitStatus === 'success' && (
                    <>
                      <CheckCircle size={18} />
                      <span>{t('contact.successMessage')}</span>
                    </>
                  )}
                  {submitStatus === 'error' && (
                    <>
                      <XCircle size={18} />
                      <span>{t('contact.errorMessage')}</span>
                    </>
                  )}
                </div>
              )}

              <button 
                type='submit' 
                className='form-button'
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader size={18} className="spinner" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </div>

          <div className='contact-divider' />

          <div className='contact-social'>
            <h3 className='social-subtitle'>{t('contact.socialTitle')}</h3>
            <p className='social-description'>{t('contact.socialDescription')}</p>
            <div className='social-links'>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='social-link'
                  style={{ '--hover-color': social.color }}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact