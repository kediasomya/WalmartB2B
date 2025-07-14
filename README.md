# Dynamic Near-Expiry Product Redistribution System

A B2B portal for Walmart to dynamically detect, price, and offer near-expiry items to high-volume buyers like restaurants, vendors, and NGOs.
It tracks near-expiry stock, uses AI to match these products with bulk buyers like restaurants and NGOs, and offers dynamic discounts in real time. Buyers get instant notifications, place orders through the Walmart app, and choose delivery or pickup—helping Walmart cut waste, recover revenue, and build a smarter, sustainable supply chain."

## Features
- Real-time near-expiry inventory tracking
- Admin dashboard with stats, inventory upload, AI buyer matching, discount engine, and notifications
- Buyer portal with deals, cart, checkout, and order history
- Mock AI modules for buyer matching and dynamic discounting
- Responsive design (mobile/tablet-friendly)
- Toast notifications for all major actions

  How It Works:
1️⃣ Detect Near-Expiry Products using Walmart’s ERP and POS data.
2️⃣ Match Bulk Buyers via AI based on past purchase behavior or business sign-ups.
3️⃣ Apply Dynamic Discounts—the closer to expiry, the bigger the deal.
4️⃣ Enable Quick B2B Orders through Walmart’s app or portal.
5️⃣ Deliver Fast using Walmart GoLocal or offer in-store pickup.


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
