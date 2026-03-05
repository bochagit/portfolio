import { useEffect } from 'react'
import gsap from 'gsap'
import './CursorGlow.css'

const CursorGlow = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor-glow')
    const move = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 150,
        y: e.clientY - 150,
        duration: 0.3,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div className='cursor-glow' />
}

export default CursorGlow