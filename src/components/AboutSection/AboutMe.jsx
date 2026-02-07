import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './AboutMe.css'

gsap.registerPlugin(ScrollTrigger)

const AboutMe = () => {
  const { t } = useTranslation()
  const aboutRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      })

      gsap.fromTo(
        contentRef.current,
        {
          x: -window.innerWidth,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: aboutRef.current,
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
    }, aboutRef)

    return () => context.revert()
  }, [])

  const scrollToContact = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    })
  }

  return (
    <section className='about-section' ref={aboutRef}>
      <div className='about-container' ref={contentRef}>
        <h1 className='about-title'>{t('about.title')}</h1>
        <p className='about-text'>{t('about.paragraph1')}</p>
        <p className='about-text'>{t('about.paragraph2')}</p>
        <p className='about-text'>{t('about.paragraph3')}</p>
        <button className='about-button' onClick={scrollToContact}>{t('about.button')}</button>
      </div>
    </section>
  )
}

export default AboutMe