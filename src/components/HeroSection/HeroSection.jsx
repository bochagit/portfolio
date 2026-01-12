import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HeroSection.css'
import profileImage from '../../assets/Images/Gonzalo-Cardozo.JPEG'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const { t } = useTranslation()
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const boxRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(boxRef.current, {
        scale: 0,
        duration: 1,
        ease: 'power3.out'
      })

      gsap.from(textRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: .2,
        ease: 'power3.out',
        delay: .5
      })

      gsap.from(imageRef.current, {
        scale: 0,
        rotation: 180,
        duration: 1,
        ease: 'back.out(1.7)',
        delay: .8
      })

      gsap.to(contentRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=100%',
          scrub: .5,
          pin: true,
          pinSpacing: false,
          immediateRender: false
        },
        x: window.innerWidth,
        opacity: 0,
        ease: 'none'
      })
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section className='hero-section' ref={heroRef}>
      <div className='hero-content-container' ref={contentRef}>
        <div className='hero-container' ref={boxRef}>
          <div className='hero-content'>
            <div className='hero-text' ref={textRef}>
              <h1 className="hero-title">
                {t('hero.greeting')}
              </h1>
              <h2 className="hero-subtitle">
                {t('hero.title')}
              </h2>
              <p className='hero-description'>
                {t('hero.description')}
              </p>
            </div>
            <div className="hero-image-wrapper">
              <img
                ref={imageRef}
                src={profileImage}
                alt='Gonzalo Cardozo'
                className='hero-image'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection