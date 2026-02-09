import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ScrollIndicator.css'
import { Mouse } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ScrollIndicator = () => {
  const arrowRef = useRef(null)
  const circleRef = useRef(null)
  const percentageRef = useRef(null)
  const progressRef = useRef(null)
  const progressRingRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    const mouseAnimation = gsap.to(arrowRef.current, {
      y: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min((scrollTop / docHeight) * 100, 100)

      setScrollProgress(Math.round(progress))
      setIsScrolling(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)

    gsap.to(circleRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: '25% top',
        end: '+=80%',
        scrub: true
      },
      x: '45vw',
      scale: .8,
      ease: 'none'
    })

    gsap.to(arrowRef.current, {
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: '+=50',
        scrub: true
      },
      scale: 0,
      opacity: 0,
      ease: 'power2.out'
    })

    gsap.fromTo(
      progressRingRef.current,
      {
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=50',
          scrub: true
        },
        opacity: 1,
        ease: 'power2.out'
      }
    )

    gsap.fromTo(
      percentageRef.current,
      {
        scale: 0,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: '+=50',
          scrub: true
        },
        scale: 1,
        opacity: 1,
        ease: 'power2.out'
      }
    )

    return () => {
      window.removeEventListener('scroll', handleScroll)
      mouseAnimation.kill()
    }
  }, [])

  useEffect(() => {
    if (progressRef.current){
      const circumference = 2 * Math.PI * 35
      const offset = circumference - (scrollProgress / 100) * circumference
      progressRef.current.style.strokeDashoffset = offset
    }
  }, [scrollProgress])

  return (
    <div className='scroll-indicator' ref={circleRef}>
      <svg className='progress-ring' width="80" height="80" ref={progressRingRef}>
        <circle
          className='progress-ring-background'
          cx="40"
          cy="40"
          r="35"
        />
        <circle
          ref={progressRef}
          className='progress-ring-circle'
          cx="40"
          cy="40"
          r="35"
        />
      </svg>
      <div className='scroll-content'>
        <div className='scroll-arrow' ref={arrowRef}>
          <Mouse color='#E5E7EB' />
        </div>
        <div className='scroll-percentage' ref={percentageRef}>
          {scrollProgress}%
        </div>
      </div>
    </div>
  )
}

export default ScrollIndicator