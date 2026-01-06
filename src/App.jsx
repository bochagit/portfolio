import './App.css'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import ScrollIndicator from './components/ScrollIndicator/ScrollIndicator'

function App() {
  return (
    <div className='app'>
      <Navbar />
      <HeroSection />
      <ScrollIndicator />
    </div>
  )
}

export default App
