import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './HeroSection.css'
import profileImage from '../../assets/Images/Gonzalo-Cardozo.JPEG'
import SmoothWavyCanvas from './WaveBG'

const HeroSection = () => {
  const heroRef = useRef(null)
  const textRef = useRef(null)
  const imageRef = useRef(null)
  const boxRef = useRef(null)

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
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section className='hero-section' ref={heroRef}>
      <div className='delicate-dots-background'>
        <SmoothWavyCanvas />
      </div>
      <div className='hero-container' ref={boxRef}>
        <div className='hero-content'>
          <div className='hero-text' ref={textRef}>
            <h1 className="hero-title">
              Hi, I'm Gonzalo Cardozo
            </h1>
            <h2 className="hero-subtitle">
              Full Stack Developer
            </h2>
            <p className='hero-description'>
              I build end-to-end digital solutions
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
    </section>
  )
}

export default HeroSection