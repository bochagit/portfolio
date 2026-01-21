import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator'
import SmoothWavyCanvas from './components/HeroSection/WaveBG'
import AboutMe from './components/AboutSection/AboutMe'
import LanguageSelector from './components/LanguageSelector/LanguageSelector'
import LanguageSwitcher from './components/LanguageSwitcher/LanguageSwitcher'
import Stack from './components/StackSection/Stack'

function App() {
  const [showLanguageSelector, setShowLanguageSelector] = useState(false)

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('i18nextLng')
    if (!hasSelectedLanguage){
      setShowLanguageSelector(true)
    }
  }, [])

  return (
    <div className='app'>
      {showLanguageSelector && (
        <LanguageSelector onLanguageSelect={() => setShowLanguageSelector(false)} />
      )}
      <LanguageSwitcher />
      <div className='delicate-dots-background'>
        <SmoothWavyCanvas />
      </div>
      <div className='content-wrapper'>
        <Navbar />
        <HeroSection />
        <ScrollIndicator />
        <AboutMe />
        <Stack />
      </div>
    </div>
  )
}

export default App
