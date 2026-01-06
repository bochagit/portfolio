import './Navbar.css'
import { Menu } from 'lucide-react'

const Navbar = () => {
  return (
    <nav className='navbar'>
      <Menu aria-label='Menu' className='menu-toggle' color='#e5e7eb' />
    </nav>
  )
}

export default Navbar