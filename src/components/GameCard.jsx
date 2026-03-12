import { Link } from 'react-router-dom'

const GENRE_COLORS = {
  Action:    { bg: '#7c1d1d', text: '#fca5a5' },
  Adventure: { bg: '#1d3a7c', text: '#93c5fd' },
  RPG:       { bg: '#4a1d7c', text: '#d8b4fe' },
  Sports:    { bg: '#1d5c1d', text: '#86efac' },
  Racing:    { bg: '#7c4a1d', text: '#fdba74' },
  Horror:    { bg: '#2d1d3a', text: '#c4b5fd' },
  Fighting:  { bg: '#7c1d4a', text: '#f9a8d4' },
  Thriller:  { bg: '#1d3a3a', text: '#6ee7b7' },
}

export default function GameCard({ game }) {
  const genreStyle = GENRE_COLORS[game.genre] || { bg: '#1a1a2e', text: '#a0a0a0' }

  const handleImgError = (e) => {
    e.target.style.display = 'none'
    e.target.nextSibling.style.display = 'flex'
  }

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1"
      style={{ backgroundColor: '#1a1a2e', border: '1px solid #003087', boxShadow: '0 4px 20px rgba(0,48,135,0.2)' }}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3/4' }}>
        <img
          src={game.image}
          alt={game.title}
          onError={handleImgError}
          className="w-full h-full object-cover"
        />
        {/* Fallback placeholder */}
        <div
          className="absolute inset-0 items-center justify-center flex-col gap-2 p-4 text-center"
          style={{ display: 'none', backgroundColor: '#0a0a1a' }}
        >
          <span className="text-5xl">🎮</span>
          <p className="font-bold text-sm" style={{ color: '#FFD700' }}>{game.title}</p>
        </div>

        {/* Rating badge */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-xs font-bold"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#FFD700', border: '1px solid #FFD700' }}
        >
          ⭐ {game.rating}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span
          className="self-start text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: genreStyle.bg, color: genreStyle.text }}
        >
          {game.genre}
        </span>
        <h3 className="font-bold text-sm leading-snug text-white line-clamp-2">{game.title}</h3>
        <p className="text-xs leading-relaxed flex-1 line-clamp-2" style={{ color: '#a0a0a0' }}>{game.description}</p>
        <Link
          to={`/booking?game=${encodeURIComponent(game.title)}`}
          className="mt-2 block text-center py-2 rounded-lg text-sm font-bold text-white transition-opacity duration-200 hover:opacity-85 no-underline"
          style={{ backgroundColor: '#003087' }}
        >
          🎮 Book Now
        </Link>
      </div>
    </div>
  )
}
