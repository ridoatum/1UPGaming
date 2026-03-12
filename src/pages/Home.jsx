import { Link } from 'react-router-dom'
import GameCard from '../components/GameCard'
import { games } from '../data/games'
import { WHATSAPP_NUMBER } from '../constants'

const FEATURES = [
  {
    icon: '⚡',
    title: 'Quick Booking',
    desc: 'Book your PS5 game in minutes via WhatsApp. Same-day delivery available.',
  },
  {
    icon: '🔒',
    title: 'KYC Verified',
    desc: 'Secure rentals with Aadhaar & PAN verification for your safety.',
  },
  {
    icon: '💬',
    title: 'WhatsApp Support',
    desc: "24/7 support on WhatsApp. We're always a message away.",
  },
]

const STEPS = [
  { num: '01', title: 'Browse', desc: 'Explore our library of 30+ PS5 titles across all genres.' },
  { num: '02', title: 'Book', desc: 'Fill the booking form with your details and preferred dates.' },
  { num: '03', title: 'Verify KYC', desc: 'Submit Aadhaar & PAN for secure identity verification.' },
  { num: '04', title: 'Play!', desc: 'Get the game delivered and start playing the same day.' },
]

const AREAS = [
  { name: 'Itanagar', desc: 'State Capital — fast delivery across all localities' },
  { name: 'Naharlagun', desc: 'Full coverage including New Colony & IG Park area' },
  { name: 'Nirjuli', desc: 'Quick service to Nirjuli town and surrounding areas' },
]

export default function Home() {
  const featuredGames = games.slice(0, 6)

  return (
    <div>
      {/* Hero */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-4 py-24 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #0d0d2e 50%, #0a0a0a 100%)',
        }}
      >
        {/* Background decorative glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(circle at 50% 50%, #003087 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 text-6xl">🎮</div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4">
            <span style={{ color: '#FFD700' }}>Rent PS5 Games</span>
            <br />
            <span className="text-white">in Arunachal Pradesh</span>
          </h1>
          <p className="text-lg md:text-xl mb-8" style={{ color: '#a0a0a0' }}>
            Premium PS5 game rentals in Itanagar, Naharlagun &amp; Nirjuli.
            Starting at <span style={{ color: '#FFD700' }} className="font-bold">₹200/day</span> — KYC verified &amp; secure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/library"
              className="px-8 py-3.5 rounded-full font-bold text-white text-lg no-underline transition-opacity duration-200 hover:opacity-85"
              style={{ backgroundColor: '#003087' }}
            >
              🕹️ Browse Games
            </Link>
            <Link
              to="/booking"
              className="px-8 py-3.5 rounded-full font-bold text-lg no-underline transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: '#FFD700', color: '#0a0a0a' }}
            >
              📋 Book Now
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Banner */}
      <section style={{ backgroundColor: '#003087' }} className="py-4 px-4 text-center">
        <p className="text-white font-semibold">
          💰 Starting at <span style={{ color: '#FFD700' }} className="font-black text-lg">₹200/day</span>
          &nbsp;·&nbsp; Weekly rentals from <span style={{ color: '#FFD700' }} className="font-black">₹800</span>
          &nbsp;·&nbsp; Free delivery in Itanagar
        </p>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-10">
          Why <span style={{ color: '#FFD700' }}>1UP Gaming?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-6 text-center transition-transform duration-200 hover:-translate-y-1"
              style={{ backgroundColor: '#1a1a2e', border: '1px solid #003087' }}
            >
              <div className="text-5xl mb-4">{icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#FFD700' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#a0a0a0' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-black">
            🔥 <span style={{ color: '#FFD700' }}>Featured Games</span>
          </h2>
          <Link
            to="/library"
            className="text-sm font-semibold no-underline transition-colors duration-200"
            style={{ color: '#003087' }}
            onMouseEnter={e => e.target.style.color = '#FFD700'}
            onMouseLeave={e => e.target.style.color = '#003087'}
          >
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredGames.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4" style={{ backgroundColor: '#0d0d1a' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10">
            How It <span style={{ color: '#FFD700' }}>Works</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(({ num, title, desc }) => (
              <div key={num} className="text-center p-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black mx-auto mb-4"
                  style={{ backgroundColor: '#003087', color: '#FFD700' }}
                >
                  {num}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#a0a0a0' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas We Serve */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-10">
          📍 Areas We <span style={{ color: '#FFD700' }}>Serve</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AREAS.map(({ name, desc }) => (
            <div
              key={name}
              className="rounded-xl p-6 text-center"
              style={{ backgroundColor: '#1a1a2e', border: '1px solid #FFD700' }}
            >
              <div className="text-4xl mb-3">📍</div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#FFD700' }}>{name}</h3>
              <p className="text-sm" style={{ color: '#a0a0a0' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section
        className="py-16 px-4 text-center"
        style={{ background: 'linear-gradient(135deg, #0d0d1a, #001a4d)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-4 text-white">Ready to Play?</h2>
          <p className="mb-8 text-lg" style={{ color: '#a0a0a0' }}>
            Contact us on WhatsApp for instant booking and support.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hi%201UP%20Gaming!%20I%20want%20to%20rent%20a%20PS5%20game.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-lg transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: '#25D366' }}
          >
            💬 Chat on WhatsApp
          </a>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg z-50 transition-transform duration-200 hover:scale-110"
        style={{ backgroundColor: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        💬
      </a>
    </div>
  )
}
