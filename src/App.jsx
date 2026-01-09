import './App.css'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator'
import SmoothWavyCanvas from './components/HeroSection/WaveBG'
import AboutMe from './components/AboutSection/AboutMe'

function App() {
  return (
    <div className='app'>
      <div className='delicate-dots-background'>
        <SmoothWavyCanvas />
      </div>
      <div className='content-wrapper'>
        <Navbar />
        <HeroSection />
        <ScrollIndicator />
        <AboutMe />
      </div>
    </div>
  )
}

export default App
