import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const UKFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40">
    <clipPath id="uk-rect-clip">
      <rect width="60" height="40" rx="6"/>
    </clipPath>
    <g clipPath="url(#uk-rect-clip)">
      <rect width="60" height="40" fill="#012169"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="10"/>
      <path d="M0,0 L60,40 M60,0 L0,40" stroke="#C8102E" strokeWidth="6"/>
      <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="5"/>
    </g>
  </svg>
)

const ArgentinaFlag = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40">
    <clipPath id="arg-rect-clip">
      <rect width="60" height="40" rx="6"/>
    </clipPath>
    <g clipPath="url(#arg-rect-clip)">
      <rect width="60" height="40" fill="#74ACDF"/>
      <rect width="60" height="13.3" y="13.3" fill="#fff"/>
      <g transform="translate(30,20)">
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <polygon points="0,-8 1.5,-5 -1.5,-5" fill="#F6B40E"/>
          </g>
        ))}
        <circle r="4" fill="#F6B40E"/>
        <circle cx="-1.5" cy="-1" r="0.8" fill="#85340A"/>
        <circle cx="1.5" cy="-1" r="0.8" fill="#85340A"/>
        <path d="M-1.5,1 Q0,2.5 1.5,1" fill="none" stroke="#85340A" strokeWidth="0.5"/>
      </g>
    </g>
  </svg>
)

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
          <UKFlag />
        </div>
      </button>
      <button 
        className={`language-switcher-button ${i18n.language === 'es' ? 'active' : ''}`}
        onClick={() => changeLanguage('es')}
        title='Español'
      >
        <div className='language-flag'>
          <ArgentinaFlag />
        </div>
      </button>
    </div>
  )
}

export default LanguageSwitcher