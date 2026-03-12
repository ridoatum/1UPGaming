import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Library from './pages/Library'
import Booking from './pages/Booking'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0a0a0a', color: '#ffffff'}}>
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
