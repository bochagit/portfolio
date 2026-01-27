import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher'
import './Navbar.css'
import { Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <Menu aria-label='Menu' className='menu-toggle' color='#e5e7eb' />
        <LanguageSwitcher />
      </div>
    </nav>
  )
}

export default Navbar