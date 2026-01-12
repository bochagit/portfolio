import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import './LanguageSelector.css'

const LanguageSelector = ({ onLanguageSelect }) => {
  const { i18n } = useTranslation()
  const selectorRef = useRef(null)

  useEffect(() => {
    if (selectorRef.current){
      gsap.fromTo(
        selectorRef.current,
        { opacity: 0, scale: .8 },
        { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.7)' }
      )
    }
  }, [])

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('i18nextLng', lang)

    gsap.to(selectorRef.current, {
      opacity: 0,
      scale: .8,
      duration: .3,
      ease: 'power2.in',
      onComplete: () => {
        if (onLanguageSelect) onLanguageSelect()
      }
    })
  }

  return (
    <div className='language-selector-overlay'>
      <div className='language-selector' ref={selectorRef}>
        <h2 className='language-title'>Language / Idioma</h2>
        <div className='language-subtitle'>
          <p>Select your preferred language</p>
          <p>Seleccioná el idioma de tu preferencia</p>
        </div>
        <div className='language-buttons'>
          <button className='language-button' onClick={() => handleLanguageSelect('en')}>
            <div className='language-flag'>              
              <a title="See page for author, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Flag_of_the_United_Kingdom_(3-5).svg"><img width="200" alt="Flag of the United Kingdom" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/256px-Flag_of_the_United_Kingdom_%283-5%29.svg.png?20250726143817" /></a>
            </div>
            <span className='language-name'>English</span>
          </button>
          <button className='language-button' onClick={() => handleLanguageSelect('es')}>
            <div className='language-flag'>
              <a title="See File history below for details., Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Flag_of_Argentina.svg"><img width="200" alt="Flag of Argentina" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/256px-Flag_of_Argentina.svg.png?20120912082242" /></a>
            </div>
            <span className='language-name'>Español</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector