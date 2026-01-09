import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './AboutMe.css'

gsap.registerPlugin(ScrollTrigger)

const AboutMe = () => {
  const aboutRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: aboutRef.current,
        start: 'top top',
        end: '+=100%',
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
            scrub: .5,
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

  return (
    <section className='about-section' ref={aboutRef}>
      <div className='about-container' ref={contentRef}>
        <h1 className='about-title'>About Me</h1>
        <p className='about-text'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure laudantium eos inventore vero pariatur voluptas vitae, obcaecati excepturi aut sapiente molestiae voluptatibus qui! Aut eligendi impedit maiores dolores modi ab.
        </p>
      </div>
    </section>
  )
}

export default AboutMe