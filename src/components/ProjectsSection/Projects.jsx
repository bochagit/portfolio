import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import './Projects.css'

const Projects = () => {
  const { t } = useTranslation()

  return (
    <section className='projects-section'>
      <div className='projects-container'>
        <h2 className='projects-title'>
          {t('projects.title')}
        </h2>
      </div>
    </section>
  )
}

export default Projects