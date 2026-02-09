import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import './Navbar.css'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionClass) => {
    let scrollPosition = 0

    switch (sectionClass) {
    case 'hero-section':
      scrollPosition = 0
      break
    case 'about-section':
      scrollPosition = window.innerHeight * 2
      break
    case 'stack-section':
      scrollPosition = window.innerHeight * 3.5
      break
    case 'projects-section':
      scrollPosition = window.innerHeight * 5
      break
    case 'contact-section':
      scrollPosition = document.documentElement.scrollHeight
      break
    default:
      scrollPosition = 0
    }

    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    })
    
    setIsMenuOpen(false)
  }

  const menuItems = [
    { key: 'home', label: t('navbar.home'), section: 'hero-section' },
    { key: 'about', label: t('navbar.about'), section: 'about-section' },
    { key: 'stack', label: t('navbar.stack'), section: 'stack-section' },
    { key: 'projects', label: t('navbar.projects'), section: 'projects-section' },
    { key: 'contact', label: t('navbar.contact'), section: 'contact-section' }
  ]
  return (
    <nav className='navbar'>
      <div className='container'>
        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <div className="menu-icon">
            <Menu className={`menu-burger ${isMenuOpen ? 'hidden' : 'visible'}`} color='#e5e7eb' />
            <X className={`menu-close ${isMenuOpen ? 'visible' : 'hidden'}`} color='#e5e7eb' />
          </div>
        </button>
        
        <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}></div>
        
        <div className={`menu-content ${isMenuOpen ? 'open' : ''}`}>
          <ul className='menu-list'>
            {menuItems.map((item) => (
              <li key={item.key} className='menu-item'>
                <button 
                  className='menu-link'
                  onClick={() => scrollToSection(item.section)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

export default Navbar