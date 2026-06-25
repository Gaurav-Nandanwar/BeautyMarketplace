# Mumbai Beauty Marketplace

> **Discover, Compare and Book the Best Beauty Services Near You.**

AI-powered city-based beauty salon marketplace built for the **SuperXgen AI Startup Buildathon 2026**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| UI | shadcn/ui, Framer Motion, Lucide Icons |
| Backend | Next.js API Routes |
| Auth & DB | Firebase Auth, Firestore (Free Tier — no Storage required) |
| Maps | OpenStreetMap + Leaflet.js |
| Hosting | Vercel (Free Tier) |
| AI | Hugging Face Free API, Gemini Free API, Rule-based fallback |

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm
- Firebase project (free tier)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd beautysalonmarketplace

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Verify Setup

```bash
# Health check
curl http://localhost:3000/api/health

# Production build
npm run build
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login, signup, forgot password
│   ├── (customer)/         # Home, search, salon, booking, profile
│   ├── (salon)/            # Salon owner dashboard
│   ├── (admin)/            # Admin dashboard
│   └── api/                # API routes
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── shared/             # Reusable shared components
│   ├── layout/             # Navbar, footer, sidebar
│   └── providers/          # Theme, auth providers
├── config/                 # Site & city configuration
├── constants/              # Services, localities, categories
├── hooks/                  # Custom React hooks
├── lib/
│   ├── firebase/           # Firebase config, auth, firestore, storage
│   ├── format.ts           # Formatting utilities
│   └── validators.ts       # Zod schemas
└── types/                  # TypeScript interfaces
```

## Database Schema (Firestore)

| Collection | Description |
|-----------|-------------|
| `users` | Customer, salon owner, admin profiles |
| `salons` | Salon listings with location, ratings, images |
| `services` | Services offered by each salon |
| `bookings` | Appointment bookings |
| `reviews` | Customer reviews with photos |
| `favorites` | User wishlist |
| `offers` | Promotions and discounts |
| `staff` | Salon employees |
| `notifications` | Push/in-app notifications |
| `admins` | Admin access control |
| `availability` | Time slot availability |
| `transactions` | Payment records |

## Configurable Cities

Set `NEXT_PUBLIC_DEFAULT_CITY` to switch markets:

- `mumbai` — Mumbai Beauty Marketplace (default)
- `bangalore` — Bangalore Luxury Salon Finder
- `delhi` — Delhi Bridal Beauty Booking
- `pune` — Pune Home Salon Service
- `hyderabad` — Hyderabad Grooming Platform

## Build Phases

| Phase | Status | Description |
|-------|--------|-------------|
| 1 | ✅ Complete | Project setup, architecture, Firebase config |
| 2 | 🔜 Next | Authentication (Email, Google) |
| 3 | Pending | Landing page with hero, categories, testimonials |
| 4 | Pending | Salon listing with search & filters |
| 5 | Pending | Salon detail page with map & reviews |
| 6 | Pending | Booking flow |
| 7 | Pending | Customer, salon & admin dashboards |
| 8 | Pending | AI features (recommendations, chatbot) |
| 9 | Pending | Admin panel |
| 10 | Pending | Testing |
| 11 | Pending | Optimization |
| 12 | Pending | Deployment |

## Firebase Setup Guide

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Add a Web app and copy the config to `.env.local`
4. Enable Authentication → Email/Password + Google
5. Create Firestore Database
6. Set Firestore security rules (see `firestore.rules`)

**Skip Firebase Storage** — it requires billing. This app stores image URLs in Firestore instead.

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Connect GitHub repo for auto-deployments
```

## License

MIT — Built for SuperXgen AI Startup Buildathon 2026
