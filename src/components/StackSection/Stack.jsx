import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code, Database, GitGraph } from 'lucide-react'
import './Stack.css'

gsap.registerPlugin(ScrollTrigger)

const Stack = () => {
  const { t } = useTranslation()
  const stackRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: stackRef.current,
        start: 'top 120%',
        end: 'top 20%',
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
            trigger: stackRef.current,
            start: 'top 120%',
            end: 'top 20%',
            scrub: .5,
            immediateRender: false
          },
          x: 0,
          opacity: 1,
          ease: 'none'
        }
      )
    }, stackRef)

    return () => context.revert()
  }, [])

  const techStack = {
    core: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'Node.js' },
      { name: 'HTML/CSS' }
    ],
    databases: [
      { name: 'SQL' },
      { name: 'MongoDB' },
      { name: 'C' }
    ],
    tools: [
      { name: 'VS Code' },
      { name: 'Git' },
      { name: 'Docker' },
      { name: 'Figma' },
      { name: 'Excel' }
    ]
  }

  return (
    <section className='stack-section' ref={stackRef}>
      <div className='stack-container' ref={contentRef}>
        <h2 className='stack-title'>{t('stack.title')}</h2>
        <p className='stack-description'>{t('stack.description')}</p>

        <div className='stack-categories'>
          <div className='stack-category'>
            <div className='stack-iconTitle'>
              <Code color="#38BDF8" strokeWidth={2} />
              <h3 className='category-title'>{t('stack.coreTitle')}</h3>
            </div>
            <div className='tech-grid'>
              {techStack.core.map((tech, index) => (
                <div key={index} className='tech-item'>
                  <span className='tech-name'>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='stack-category'>
            <div className='stack-iconTitle'>
              <Database color="#38BDF8" strokeWidth={2} />
              <h3 className='category-title'>{t('stack.databasesTitle')}</h3>
            </div>
            <div className='tech-grid'>
              {techStack.databases.map((tech, index) => (
                <div key={index} className='tech-item'>
                  <span className='tech-name'>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className='stack-category'>
            <div className='stack-iconTitle'>
              <GitGraph color="#38BDF8" strokeWidth={1} />
              <h3 className='category-title'>{t('stack.toolsTitle')}</h3>
            </div>
            <div className='tech-grid'>
              {techStack.tools.map((tech, index) => (
                <div key={index} className='tech-item'>
                  <span className='tech-name'>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stack