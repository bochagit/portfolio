import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Stack.css'

gsap.registerPlugin(ScrollTrigger)

const Stack = () => {
  const { t } = useTranslation()
  const stackRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          scrollTrigger: {
            trigger: stackRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1
          },
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power2.out'
        }
      )
    }, stackRef)

    return () => context.revert()
  }, [])

  const technologies = [
    { name: 'JavaScript', category: 'stack' },
    { name: 'TypeScript', category: 'stack' },
    { name: 'React', category: 'stack' },
    { name: 'Node.js', category: 'stack' },
    { name: 'HTML/CSS', category: 'stack' },
    { name: 'MongoDB', category: 'stack' },
    { name: 'SQL', category: 'stack' },
    { name: 'C', category: 'stack' }
  ]

  const tools = [
    { name: 'Excel', category: 'tools' },
    { name: 'Office', category: 'tools' },
    { name: 'VS Code', category: 'tools' },
    { name: 'Figma', category: 'tools' }
  ]

  return (
    <section className='stack-section' ref={stackRef}>
      <div className='stack-container'>
        <h2 className='stack-title'>{t('stack.title')}</h2>
        
        <div className='stack-category'>
          <h3 className='stack-category-title'>{t('stack.technologies')}</h3>
          <div className='stack-grid'>
            {technologies.map((tech, index) => (
              <div
                key={tech.name}
                className='stack-card'
                ref={el => cardsRef.current[index] = el}
              >
                <span className='stack-card-name'>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='stack-category'>
          <h3 className='stack-category-title'>{t('stack.tools')}</h3>
          <div className='stack-grid'>
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className='stack-card'
                ref={el => cardsRef.current[technologies.length + index] = el}
              >
                <span className='stack-card-name'>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stack