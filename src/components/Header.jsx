import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../constants'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/library', label: 'Games' },
    { to: '/booking', label: 'Book Now' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <header style={{ backgroundColor: '#0d0d1a', borderBottom: '2px solid #003087' }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <span className="text-3xl">🎮</span>
          <div>
            <span className="text-xl font-black tracking-tight" style={{ color: '#FFD700' }}>1UP</span>
            <span className="text-xl font-black tracking-tight text-white"> Gaming</span>
            <p className="text-xs leading-none" style={{ color: '#a0a0a0' }}>PS5 Rentals</p>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="font-semibold transition-colors duration-200 no-underline"
              style={{ color: isActive(to) ? '#FFD700' : '#ffffff' }}
              onMouseEnter={e => { if (!isActive(to)) e.target.style.color = '#FFD700' }}
              onMouseLeave={e => { if (!isActive(to)) e.target.style.color = '#ffffff' }}
            >
              {label}
            </Link>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-white text-sm transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            <span>💬</span> WhatsApp
          </a>
        </nav>

        {/* Mobile: WhatsApp + Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-full text-white"
            style={{ backgroundColor: '#25D366' }}
          >
            💬
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-200" style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }}></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-200" style={{ opacity: menuOpen ? 0 : 1 }}></span>
            <span className="block w-6 h-0.5 bg-white transition-all duration-200" style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: '#0d0d1a', borderTop: '1px solid #1a1a2e' }} className="md:hidden px-4 pb-4">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 font-semibold no-underline border-b"
              style={{ color: isActive(to) ? '#FFD700' : '#ffffff', borderColor: '#1a1a2e' }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
