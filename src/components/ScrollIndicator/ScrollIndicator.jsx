import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './ScrollIndicator.css'
import { Mouse } from 'lucide-react'

const ScrollIndicator = () => {
  const arrowRef = useRef(null)

  useEffect(() => {
    gsap.to(arrowRef.current, {
      y: 15,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    })
  }, [])

  return (
    <div className='scroll-indicator'>
      <div className='scroll-arrow' ref={arrowRef}>
        <Mouse color='#E5E7EB' />
      </div>
    </div>
  )
}

export default ScrollIndicator