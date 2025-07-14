# Dynamic Near-Expiry Product Redistribution System

A B2B portal for Walmart to dynamically detect, price, and offer near-expiry items to high-volume buyers like restaurants, vendors, and NGOs.

## Features
- Real-time near-expiry inventory tracking
- Admin dashboard with stats, inventory upload, AI buyer matching, discount engine, and notifications
- Buyer portal with deals, cart, checkout, and order history
- Mock AI modules for buyer matching and dynamic discounting
- Responsive design (mobile/tablet-friendly)
- Toast notifications for all major actions

## Tech Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS
- React Query
- Context API for cart, orders, and toasts
- Mock API routes (can connect to real backend)

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open the app:**
   Visit [http://localhost:3000](http://localhost:3000)

## Folder Structure
- `src/app/admin` — Admin dashboard and tools
- `src/app/buyer` — Buyer portal
- `src/components` — Shared UI and logic components
- `src/app/api` — Mock API routes

## Customization
- Replace mock data/API with real backend as needed
- Integrate real AI models via API routes or external services
- Connect to Firebase/MongoDB/Supabase for persistent storage

## License
MIT
