import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger )

const Projects = () => {
  const { t } = useTranslation()
  const projectsRef = useRef(null)
  const cardsRef = useRef([])
  const [flippedCards, setFlippedCards] = useState({})

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

  const handleCardClick = (projectId) => {
    setFlippedCards(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }))
  }

  const projects = [
    {
      id: 1,
      title: 'CIEPA',
      shortDesc: t('projects.ciepa.shortDesc'),
      image: 'assets/Images/CIEPA.jpg',
      tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
      fullDesc: t('projects.ciepa.fullDesc'),
      features: [
        t('projects.ciepa.feature1'),
        t('projects.ciepa.feature2'),
        t('projects.ciepa.feature3'),
        t('projects.ciepa.feature4')
      ],
      github: 'https://github.com/bochagit/CIEPA',
      demo: 'https://ciepa.agro.uba.ar'
    },
    {
      id: 2,
      title: 'ArkenGames',
      shortDesc: t('projects.arken.shortDesc'),
      image: 'assets/Images/Arken.jpg',
      tech: ['HTML', 'CSS', 'JavaScript'],
      fullDesc: t('projects.arken.fullDesc'),
      features: [
        t('projects.arken.feature1'),
        t('projects.arken.feature2'),
        t('projects.arken.feature3')
      ],
      github: 'https://github.com/bochagit/ArkenGames',
      demo: 'https://arkengames.com.ar'
    }
  ]

  return (
    <section className='projects-section' ref={projectsRef}>
      <div className='projects-container'>
        <h2 className='projects-title'>{t('projects.title')}</h2>
        <div className='projects-cards-wrapper'>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className='project-card'
              ref={(el) => (cardsRef.current[index] = el)}
              onClick={() => handleCardClick(project.id)}
            >
              <div className={`card-inner ${flippedCards[project.id] ? 'flipped' : ''}`}>
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
                    <p className='hover-hint desktop-hint'>{t('projects.hoverHint')}</p>
                    <p className='hover-hint mobile-hint'>{t('projects.tapHint')}</p>
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
                        <svg viewBox="0 0 128 100" width="40" height="40">
                          <g fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M64 1.512c-23.493 0-42.545 19.047-42.545 42.545 0 18.797 12.19 34.745 29.095 40.37 2.126.394 2.907-.923 2.907-2.047 0-1.014-.04-4.366-.058-7.92-11.837 2.573-14.334-5.02-14.334-5.02-1.935-4.918-4.724-6.226-4.724-6.226-3.86-2.64.29-2.586.29-2.586 4.273.3 6.523 4.385 6.523 4.385 3.794 6.504 9.953 4.623 12.38 3.536.383-2.75 1.485-4.628 2.702-5.69-9.45-1.075-19.384-4.724-19.384-21.026 0-4.645 1.662-8.44 4.384-11.42-.442-1.072-1.898-5.4.412-11.26 0 0 3.572-1.142 11.7 4.363 3.395-.943 7.035-1.416 10.65-1.432 3.616.017 7.258.49 10.658 1.432 8.12-5.504 11.688-4.362 11.688-4.362 2.316 5.86.86 10.187.418 11.26 2.728 2.978 4.378 6.774 4.378 11.42 0 16.34-9.953 19.938-19.427 20.99 1.526 1.32 2.886 3.91 2.886 7.88 0 5.692-.048 10.273-.048 11.674 0 1.13.766 2.458 2.922 2.04 16.896-5.632 29.07-21.574 29.07-40.365C106.545 20.56 87.497 1.512 64 1.512z"></path>
                            <path d="M37.57 62.596c-.095.212-.428.275-.73.13-.31-.14-.482-.427-.382-.64.09-.216.424-.277.733-.132.31.14.486.43.38.642zM39.293 64.52c-.203.187-.6.1-.87-.198-.278-.297-.33-.694-.124-.884.208-.188.593-.1.87.197.28.3.335.693.123.884zm1.677 2.448c-.26.182-.687.012-.95-.367-.262-.377-.262-.83.005-1.013.264-.182.684-.018.95.357.262.385.262.84-.005 1.024zm2.298 2.368c-.233.257-.73.188-1.093-.163-.372-.343-.475-.83-.242-1.087.237-.257.736-.185 1.102.163.37.342.482.83.233 1.086zm3.172 1.374c-.104.334-.582.485-1.064.344-.482-.146-.796-.536-.7-.872.1-.336.582-.493 1.067-.342.48.144.795.53.696.87zm3.48.255c.013.35-.396.642-.902.648-.508.012-.92-.272-.926-.618 0-.354.4-.642.908-.65.506-.01.92.272.92.62zm3.24-.551c.06.342-.29.694-.793.787-.494.092-.95-.12-1.014-.46-.06-.35.297-.7.79-.792.503-.088.953.118 1.017.466zm0 0"></path>
                          </g>
                        </svg>
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