import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger )

const Projects = () => {
  const { t } = useTranslation()
  const projectsRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const context = gsap.context(() => {
      ScrollTrigger.create({
        trigger: projectsRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1
      })

      cardsRef.current.forEach((card, index) => {
        if (index === 0){
          gsap.set(card, { opacity: 1, scale: 1, zIndex: 2 })
        } else {
          gsap.set(card, { opacity: 0, scale: .8, zIndex: 1 })
        }

        gsap.to(card, {
          scrollTrigger: {
            trigger: projectsRef.current,
            start: `top+=${index * 150}% top`,
            end: `top+=${(index + 1) * 150}% top`,
            scrub: 1
          },
          opacity: index === cardsRef.current.length - 1 ? 1 : 0,
          scale: index === cardsRef.current.length - 1 ? 1 : .8,
          ease: 'power2.inOut'
        })

        if (index < cardsRef.current.length - 1){
          gsap.fromTo(
            cardsRef.current[index + 1],
            { opacity: 0, scale: .8 },
            {
              scrollTrigger: {
                trigger: projectsRef.current,
                start: `top+=${index * 150}% top`,
                end: `top+=${(index + 1) * 150}% top`,
                scrub: 1
              },
              opacity: 1,
              scale: 1,
              zIndex: 2,
              ease: 'power2.inOut'
            }
          )
        }
      })
    }, projectsRef)

    return () => context.revert()
  }, [])

  const projects = [
    {
      id: 1,
      title: 'CIEPA',
      shortDesc: t('projects.ciepa.shortDesc'),
      image: 'ciepa.jpg',
      tech: ['React', 'Node.js', 'MongoDB'],
      fullDesc: t('projects.ciepa.fullDesc'),
      features: [
        t('projects.ciepa.feature1'),
        t('projects.ciepa.feature2'),
        t('projects.ciepa.feature3')
      ],
      github: 'https://github.com/...',
      demo: 'https://ciepa.agro.uba.ar'
    },
    {
      id: 2,
      title: 'ArkenGames',
      shortDesc: t('projects.arken.shortDesc'),
      image: 'arken.jpg',
      tech: ['HTML', 'CSS', 'JavaScript'],
      fullDesc: t('projects.arken.fullDesc'),
      features: [
        t('projects.arken.feature1'),
        t('projects.arken.feature2'),
        t('projects.arken.feature3')
      ],
      github: 'https://github.com/...',
      demo: 'https://arkengames.com.ar'
    }
  ]

  return (
    <section className='projects-section' ref={projectsRef}>
      <div className='projects-container'>
        <h2 className='projects-title'>{t('projects.title')}</h2>
        <div className='projects-card-wrapper'>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className='project-card'
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className='card-inner'>
                <div className='card-front'>
                  <div className='project-image'>
                    <img src={project.image} alt={project.title} />
                  </div>
                  <div className='project-front-content'>
                    <h3 className='project-title'>{project.title}</h3>
                    <p className='project-short-desc'>{project.shortDesc}</p>
                    <div className='project-tech-tags'>
                      {project.tech.map((tech, i) => (
                        <span key={i} className='tech-tag'>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className='hover-hint'>{t('projects.hoverHint')}</p>
                  </div>
                </div>
                <div className='card-back'>
                  <div className='project-back-content'>
                    <h3 className='project-title'>{project.title}</h3>
                    <p className='project-full-desc'>{project.fullDesc}</p>
                    <div className='project-features'>
                      <h4>{t('projects.featuresTitle')}</h4>
                      <ul>
                        {project.features.map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    <div className='project-tech-stack'>
                      <h4>{t('projects.techStackTitle')}</h4>
                      <div className='tech-tags-back'>
                        {project.tech.map((tech, i) => (
                          <span key={i} className='tech-tag'>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className='project-links'>
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='project-link'  
                      >
                        {t('projects.viewCode')}
                      </a>
                      <a
                        href={project.demo}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='project-link primary'
                      >
                        {t('projects.viewDemo')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects