import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { games } from '../data/games'
import { WHATSAPP_NUMBER } from '../constants'

const DURATIONS = [
  { value: '1', label: '1 Day — ₹200' },
  { value: '2', label: '2 Days — ₹350' },
  { value: '3', label: '3 Days — ₹500' },
  { value: '7', label: '1 Week — ₹800' },
]

const LOCATIONS = ['Itanagar', 'Naharlagun', 'Nirjuli']

const AADHAAR_RE = /^\d{12}$/
const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/

function InputField({ label, required, error, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5 text-white">
        {label} {required && <span style={{ color: '#FFD700' }}>*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs" style={{ color: '#f87171' }}>{error}</p>}
    </div>
  )
}

const inputClass = "w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-blue-600"
const inputStyle = { backgroundColor: '#0d0d1a', border: '1px solid #003087' }

export default function Booking() {
  const [searchParams] = useSearchParams()
  const preselectedGame = searchParams.get('game') || ''

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    game: preselectedGame,
    duration: '1',
    startDate: '',
    aadhaar: '',
    pan: '',
    aadhaarFile: null,
    panFile: null,
    selfieFile: null,
  })

  const [errors, setErrors] = useState({})
  const [locationLoading, setLocationLoading] = useState(false)

  useEffect(() => {
    if (preselectedGame) setForm(f => ({ ...f, game: preselectedGame }))
  }, [preselectedGame])

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.location) e.location = 'Select your location'
    if (!form.game) e.game = 'Select a game'
    if (!form.startDate) e.startDate = 'Select a start date'
    if (!AADHAAR_RE.test(form.aadhaar)) e.aadhaar = 'Aadhaar must be exactly 12 digits'
    if (!PAN_RE.test(form.pan.toUpperCase())) e.pan = 'PAN format: ABCDE1234F'
    if (!form.aadhaarFile) e.aadhaarFile = 'Upload Aadhaar card photo'
    if (!form.panFile) e.panFile = 'Upload PAN card photo'
    if (!form.selfieFile) e.selfieFile = 'Upload selfie with Aadhaar'
    return e
  }

  const getDurationLabel = () => DURATIONS.find(d => d.value === form.duration)?.label || ''

  const buildWhatsAppMessage = (lat, lng) => {
    const durLabel = getDurationLabel()
    let msg = `🎮 *1UP Gaming — Booking Request*\n\n`
    msg += `*Name:* ${form.name}\n`
    msg += `*Phone:* ${form.phone}\n`
    if (form.email) msg += `*Email:* ${form.email}\n`
    msg += `*Location:* ${form.location}\n`
    msg += `*Game:* ${form.game}\n`
    msg += `*Duration:* ${durLabel}\n`
    msg += `*Start Date:* ${form.startDate}\n\n`
    msg += `*KYC Details:*\n`
    msg += `• Aadhaar: XXXX-XXXX-${form.aadhaar.slice(-4)}\n`
    msg += `• PAN: ${form.pan.toUpperCase()}\n\n`
    if (lat && lng) {
      msg += `📍 *My Location:* https://maps.google.com/?q=${lat},${lng}\n\n`
    }
    msg += `Please confirm my booking. Thank you!`
    return encodeURIComponent(msg)
  }

  const handleShareLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    setLocationLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationLoading(false)
        const { latitude, longitude } = pos.coords
        const gameText = form.game || 'a PS5 game'
        const msg = encodeURIComponent(
          `Hi 1UP Gaming! I want to rent ${gameText}. My location: https://maps.google.com/?q=${latitude},${longitude}`
        )
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
      },
      () => {
        setLocationLoading(false)
        alert('Unable to get your location. Please allow location access.')
      }
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      const firstErrEl = document.querySelector('[data-field-error]')
      if (firstErrEl) firstErrEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    const msg = buildWhatsAppMessage(null, null)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank')
  }

  const cardStyle = { backgroundColor: '#1a1a2e', border: '1px solid #003087', borderRadius: '0.75rem' }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black mb-2">
          📋 <span style={{ color: '#FFD700' }}>Book a Game</span>
        </h1>
        <p style={{ color: '#a0a0a0' }}>Fill in your details and we'll confirm via WhatsApp</p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* Personal Details */}
        <div className="p-6 space-y-5" style={cardStyle}>
          <h2 className="text-lg font-bold" style={{ color: '#FFD700' }}>👤 Personal Details</h2>

          <InputField label="Full Name" required error={errors.name}>
            <input
              data-field-error={errors.name ? true : undefined}
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              className={inputClass}
              style={{ ...inputStyle, borderColor: errors.name ? '#f87171' : '#003087' }}
            />
          </InputField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Phone Number" required error={errors.phone}>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={e => set('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                className={inputClass}
                style={{ ...inputStyle, borderColor: errors.phone ? '#f87171' : '#003087' }}
              />
            </InputField>

            <InputField label="Email Address" error={errors.email}>
              <input
                type="email"
                placeholder="Optional"
                value={form.email}
                onChange={e => set('email', e.target.value)}
                className={inputClass}
                style={{ ...inputStyle, borderColor: errors.email ? '#f87171' : '#003087' }}
              />
            </InputField>
          </div>

          <InputField label="Your Location" required error={errors.location}>
            <select
              value={form.location}
              onChange={e => set('location', e.target.value)}
              className={inputClass}
              style={{ ...inputStyle, borderColor: errors.location ? '#f87171' : '#003087' }}
            >
              <option value="">Select your area</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </InputField>
        </div>

        {/* Rental Details */}
        <div className="p-6 space-y-5" style={cardStyle}>
          <h2 className="text-lg font-bold" style={{ color: '#FFD700' }}>🎮 Rental Details</h2>

          <InputField label="Select Game" required error={errors.game}>
            <select
              value={form.game}
              onChange={e => set('game', e.target.value)}
              className={inputClass}
              style={{ ...inputStyle, borderColor: errors.game ? '#f87171' : '#003087' }}
            >
              <option value="">Choose a game</option>
              {games.map(g => (
                <option key={g.id} value={g.title}>{g.title} ({g.genre})</option>
              ))}
            </select>
          </InputField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Rental Duration" required>
              <select
                value={form.duration}
                onChange={e => set('duration', e.target.value)}
                className={inputClass}
                style={inputStyle}
              >
                {DURATIONS.map(d => (
                  <option key={d.value} value={d.value}>{d.label}</option>
                ))}
              </select>
            </InputField>

            <InputField label="Start Date" required error={errors.startDate}>
              <input
                type="date"
                value={form.startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={e => set('startDate', e.target.value)}
                className={inputClass}
                style={{ ...inputStyle, colorScheme: 'dark', borderColor: errors.startDate ? '#f87171' : '#003087' }}
              />
            </InputField>
          </div>
        </div>

        {/* KYC Section */}
        <div className="p-6 space-y-5" style={cardStyle}>
          <div>
            <h2 className="text-lg font-bold mb-1" style={{ color: '#FFD700' }}>🔒 KYC Verification</h2>
            <p className="text-xs" style={{ color: '#a0a0a0' }}>
              Required for secure rental. Your data is kept confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InputField label="Aadhaar Card Number" required error={errors.aadhaar}>
              <input
                type="text"
                placeholder="12-digit Aadhaar number"
                value={form.aadhaar}
                onChange={e => set('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))}
                maxLength={12}
                className={inputClass}
                style={{ ...inputStyle, letterSpacing: '0.1em', borderColor: errors.aadhaar ? '#f87171' : '#003087' }}
              />
            </InputField>

            <InputField label="PAN Card Number" required error={errors.pan}>
              <input
                type="text"
                placeholder="ABCDE1234F"
                value={form.pan}
                onChange={e => set('pan', e.target.value.toUpperCase().slice(0, 10))}
                maxLength={10}
                className={inputClass}
                style={{ ...inputStyle, letterSpacing: '0.15em', borderColor: errors.pan ? '#f87171' : '#003087' }}
              />
            </InputField>
          </div>

          {/* File Uploads */}
          <div className="space-y-4">
            {[
              { key: 'aadhaarFile', label: 'Upload Aadhaar Card Photo', icon: '🪪' },
              { key: 'panFile', label: 'Upload PAN Card Photo', icon: '📄' },
              { key: 'selfieFile', label: 'Upload Selfie with Aadhaar', icon: '🤳' },
            ].map(({ key, label, icon }) => (
              <InputField key={key} label={`${icon} ${label}`} required error={errors[key]}>
                <div
                  className="rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  style={{ backgroundColor: '#0d0d1a', border: `1px dashed ${errors[key] ? '#f87171' : '#003087'}` }}
                >
                  <label className="cursor-pointer">
                    <span
                      className="inline-block px-4 py-2 rounded-lg text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                      style={{ backgroundColor: '#003087' }}
                    >
                      Choose File
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={e => set(key, e.target.files[0] || null)}
                    />
                  </label>
                  <span className="text-sm" style={{ color: form[key] ? '#86efac' : '#a0a0a0' }}>
                    {form[key] ? `✅ ${form[key].name}` : 'No file chosen'}
                  </span>
                </div>
              </InputField>
            ))}
          </div>
        </div>

        {/* Location & Submit */}
        <div className="p-6 space-y-4" style={cardStyle}>
          <h2 className="text-lg font-bold" style={{ color: '#FFD700' }}>📍 Share Location &amp; Submit</h2>
          <p className="text-sm" style={{ color: '#a0a0a0' }}>
            Share your live location via WhatsApp for easier delivery coordination.
          </p>

          <button
            type="button"
            onClick={handleShareLocation}
            disabled={locationLoading}
            className="w-full py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: '#25D366' }}
          >
            {locationLoading ? '📡 Getting Location...' : '📍 Share Location via WhatsApp'}
          </button>

          <button
            type="submit"
            className="w-full py-4 rounded-lg font-black text-lg flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-90"
            style={{ backgroundColor: '#003087', color: '#FFD700' }}
          >
            🎮 Submit Booking via WhatsApp
          </button>

          <p className="text-xs text-center" style={{ color: '#a0a0a0' }}>
            Tapping submit will open WhatsApp with your booking details pre-filled.
          </p>
        </div>
      </form>
    </div>
  )
}
