import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const LanguageSwitcher = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('i18nextLng', lang)
  }

  return (
    <div className='language-switcher'>
      <button 
        className={`language-switcher-button ${i18n.language === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
        title='English'
      >
        <div className='language-flag'>              
          <a title="See page for author, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Flag_of_the_United_Kingdom_(3-5).svg"><img width="200" alt="Flag of the United Kingdom" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/256px-Flag_of_the_United_Kingdom_%283-5%29.svg.png?20250726143817" /></a>
        </div>
      </button>
      <button 
        className={`language-switcher-button ${i18n.language === 'es' ? 'active' : ''}`}
        onClick={() => changeLanguage('es')}
        title='Español'
      >
        <div className='language-flag'>
          <a title="See File history below for details., Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Flag_of_Argentina.svg"><img width="200" alt="Flag of Argentina" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_Argentina.svg/256px-Flag_of_Argentina.svg.png?20120912082242" /></a>
        </div>
      </button>
    </div>
  )
}

export default LanguageSwitcher