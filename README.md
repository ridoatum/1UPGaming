# 1UP Gaming — PS5 Rental App

A web app for **1UP Gaming**, a PS5 game rental service operating in **Itanagar, Naharlagun & Nirjuli, Arunachal Pradesh, India**.

## Features

- 🎮 **Games Library** — 32 PS5 titles across 8 genres (Action, Adventure, RPG, Sports, Racing, Horror, Fighting, Thriller) with search and genre filters
- 📋 **Online Booking** — Simple booking form with rental duration and start date selection
- 🔒 **KYC Verification** — Aadhaar card number + PAN card number validation with photo upload
- 📍 **Location Sharing** — Share live GPS location via WhatsApp for easy delivery coordination
- 💬 **WhatsApp Integration** — Bookings are submitted directly as a WhatsApp message (no backend needed)
- 📱 **Mobile-First** — Fully responsive design optimised for smartphones

## Tech Stack

- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) for client-side routing
- [Tailwind CSS v4](https://tailwindcss.com/) for styling

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Configuration

Before going live, update your WhatsApp number in **`src/constants.js`**:

```js
// Replace with your actual number (country code + number, no spaces or dashes)
export const WHATSAPP_NUMBER = '919876543210'  // Example: +91 98765 43210
```

## Build for Production

```bash
npm run build
```

The optimised output will be in the `dist/` folder. Deploy it to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Areas Served

- **Itanagar** — State Capital
- **Naharlagun** — Including New Colony & IG Park area
- **Nirjuli** — Town and surrounding areas

## Pricing (configurable in `src/data/games.js`)

| Duration | Price |
|----------|-------|
| 1 Day    | ₹200  |
| 2 Days   | ₹350  |
| 3 Days   | ₹500  |
| 1 Week   | ₹800  |

