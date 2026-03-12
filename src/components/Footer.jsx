import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER } from '../constants'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d0d1a', borderTop: '2px solid #003087' }} className="mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🎮</span>
              <span className="text-lg font-black" style={{ color: '#FFD700' }}>1UP Gaming</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#a0a0a0' }}>
              Your go-to PS5 rental service in Arunachal Pradesh. Affordable gaming, KYC verified.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3 text-sm uppercase tracking-widest" style={{ color: '#FFD700' }}>Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/library', 'Games Library'], ['/booking', 'Book Now']].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="no-underline transition-colors duration-200 hover:text-yellow-400"
                    style={{ color: '#a0a0a0' }}
                    onMouseEnter={e => e.target.style.color = '#FFD700'}
                    onMouseLeave={e => e.target.style.color = '#a0a0a0'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3 text-sm uppercase tracking-widest" style={{ color: '#FFD700' }}>Contact & Location</h3>
            <p className="text-sm mb-1" style={{ color: '#a0a0a0' }}>📍 Itanagar, Naharlagun &amp; Nirjuli</p>
            <p className="text-sm mb-4" style={{ color: '#a0a0a0' }}>Arunachal Pradesh, India</p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #1a1a2e' }}>
          <p className="text-xs" style={{ color: '#555' }}>
            &copy; {new Date().getFullYear()} 1UP Gaming. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#555' }}>
            🎮 Powered by passion for gaming — Arunachal Pradesh
          </p>
        </div>
      </div>
    </footer>
  )
}
