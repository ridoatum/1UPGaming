import { useState, useMemo } from 'react'
import GameCard from '../components/GameCard'
import { games, genres } from '../data/games'

export default function Library() {
  const [activeGenre, setActiveGenre] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    return games.filter(g => {
      const matchGenre = activeGenre === 'All' || g.genre === activeGenre
      const matchSearch = g.title.toLowerCase().includes(search.toLowerCase())
      return matchGenre && matchSearch
    })
  }, [activeGenre, search])

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-2">
          🕹️ <span style={{ color: '#FFD700' }}>Games Library</span>
        </h1>
        <p style={{ color: '#a0a0a0' }}>Browse our full collection of PS5 titles available for rent</p>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
            style={{
              backgroundColor: '#1a1a2e',
              border: '1px solid #003087',
            }}
          />
        </div>
      </div>

      {/* Genre Tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {genres.map(genre => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={
              activeGenre === genre
                ? { backgroundColor: '#FFD700', color: '#0a0a0a' }
                : { backgroundColor: '#1a1a2e', color: '#a0a0a0', border: '1px solid #003087' }
            }
          >
            {genre}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm mb-6" style={{ color: '#a0a0a0' }}>
        Showing <span style={{ color: '#FFD700' }} className="font-bold">{filtered.length}</span> game{filtered.length !== 1 ? 's' : ''}
        {activeGenre !== 'All' && <span> in <span style={{ color: '#FFD700' }}>{activeGenre}</span></span>}
        {search && <span> matching "<span style={{ color: '#FFD700' }}>{search}</span>"</span>}
      </p>

      {/* Games Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-xl font-bold text-white mb-2">No games found</p>
          <p style={{ color: '#a0a0a0' }}>Try a different search or genre filter</p>
        </div>
      )}
    </div>
  )
}
