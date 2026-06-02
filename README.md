# ✈ Roamly — AI Travel Planner

Your personal AI travel agent. Enter your budget, travel style, and departure airport — Roamly finds flights, picks hotels, and builds a full day-by-day itinerary.

**Powered by Claude AI (Anthropic)**

---

## 🚀 Quick Start (5 minutes)

### 1. Install dependencies

Make sure you have [Node.js 18+](https://nodejs.org) installed, then:

```bash
npm install
```

### 2. Set up your API keys

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Then open `.env.local` and add your **Anthropic API key** (required):

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your key at: https://console.anthropic.com

> The other API keys (Amadeus, Google Maps, etc.) are optional for now —
> the app works fully with just the Anthropic key using AI-generated estimates.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app is running!

---

## 🌍 Deploy to the world (Vercel — free)

### Step 1: Push to GitHub

Create a new repo at https://github.com/new, then:

```bash
git init
git add .
git commit -m "Initial Roamly commit"
git remote add origin https://github.com/YOUR_USERNAME/roamly.git
git push -u origin main
```

### Step 2: Deploy on Vercel

1. Go to https://vercel.com and sign up (free)
2. Click "Add New Project"
3. Import your GitHub repo
4. Add your environment variables:
   - `ANTHROPIC_API_KEY` = your key
5. Click **Deploy**

Your app will be live at `https://roamly-yourname.vercel.app` in ~2 minutes! 🎉

### Step 3: Custom domain (optional)

In Vercel → your project → Settings → Domains:
- Add `roamly.com` (or whatever domain you buy)
- Follow DNS instructions

---

## 🔧 Adding real API integrations (optional upgrades)

### Flights — Amadeus API (free sandbox)
1. Sign up at https://developers.amadeus.com
2. Create an app → get `AMADEUS_API_KEY` and `AMADEUS_API_SECRET`
3. Add to `.env.local`

### Hotels — RapidAPI
1. Sign up at https://rapidapi.com
2. Subscribe to "Hotels" API (free tier)
3. Add `RAPIDAPI_KEY` to `.env.local`

### Maps — Google Maps
1. Go to https://console.cloud.google.com
2. Enable Maps JavaScript API
3. Add `NEXT_PUBLIC_GOOGLE_MAPS_KEY` to `.env.local`

---

## 📁 Project structure

```
roamly/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Homepage with search form
│   │   ├── trip/page.tsx     # Results page
│   │   ├── api/trip/         # AI agent API endpoint
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── SearchForm.tsx    # Main search inputs
│   │   ├── TripSummary.tsx   # Cost breakdown cards
│   │   ├── ItineraryDay.tsx  # Expandable day cards
│   │   ├── LoadingTrip.tsx   # Loading animation
│   │   ├── Features.tsx
│   │   └── Footer.tsx
│   ├── lib/
│   │   ├── agent.ts          # Claude AI travel agent brain
│   │   └── types.ts          # TypeScript interfaces
│   └── styles/
│       └── globals.css
├── .env.local.example        # Copy to .env.local
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 💡 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + custom CSS variables |
| AI | Anthropic Claude (claude-opus-4-5) |
| Deployment | Vercel |
| Language | TypeScript |

---

Made with ❤️ and Claude AI.
