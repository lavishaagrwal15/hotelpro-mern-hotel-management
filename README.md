# 🎬 IMovies - Movie Ticket Booking Made Simple (MERN Stack)

> The IMovies is a seamless online platform that enhances the cinema experience by allowing users to browse movies, select showtimes, and reserve seats with real-time availability tracking. Built with Express.js and MongoDB, it leverages a robust client-server architecture to ensure efficient data management and smooth performance. Key features include secure user authentication, booking management, and an intuitive interface that makes ticket reservations convenient and personalized.

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.0-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com)
[![Express](https://img.shields.io/badge/Express.js-Backend-black.svg?logo=express)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🌟 Key Features

1. **Movie Catalog & 4K Trailers**: Explore trending blockbusters, ratings, synopsis, and filter across formats (IMAX 3D, Dolby Atmos, 4DX, Standard 2D).
2. **Multi-Cinema & Showtime Engine**: Dynamic theater picker with date filters and morning, matinee, evening, and night slots.
3. **Interactive Visual Seat Matrix**: Real-time seat availability with tiered pricing (VIP Recliner, Prime Club, Classic) and curved screen geometry.
4. **F&B Concessions Upsell**: Add gourmet popcorn, loaded nachos, and drink combos with dynamic bundle pricing.
5. **Secure Checkout & Coupon Engine**: Built-in promo coupons (`IMOVIE20`, `SKILLWALLET`), taxes, and convenience fee calculation.
6. **Instant Digital E-Ticket**: High-contrast scannable QR Code generation, printable pass, download receipt, and booking ID tracking.
7. **User Booking Management**: Persistent booking history with upcoming/past status and cancellation workflow.
8. **Interactive Evaluation Demo**: Built-in 6-chapter guided video tour and presentation for mentor evaluation.

---

## 🏗️ Project Architecture (All 6 Epics Completed)

```
imovies-mern-ticket-booking/
├── src/
│   ├── components/
│   │   ├── Header.tsx              # Cinema top navigation & search
│   │   ├── HeroBanner.tsx          # Featured premiere banner
│   │   ├── MovieCatalog.tsx        # Movie cards & format/genre filters
│   │   ├── BookingModal.tsx        # 4-step booking flow (Time -> Seats -> Snacks -> Pay)
│   │   ├── ETicketModal.tsx        # High-contrast scannable QR e-ticket pass
│   │   ├── DemoVideoModal.tsx      # 6-chapter interactive video walkthrough
│   │   ├── GitHubRepoModal.tsx     # Source code & Git deployment assistant
│   │   ├── SkillWalletBanner.tsx   # SkillWallet submission banner
│   │   ├── SkillWalletModal.tsx    # Mentor evaluation checklist & links
│   │   ├── MyBookingsView.tsx      # Booking history & cancellation manager
│   │   ├── CinemasView.tsx         # Partner theaters & amenities
│   │   └── Footer.tsx              # Application footer
│   ├── data/
│   │   └── moviesData.ts           # Movies, theaters, showtimes, concessions data
│   ├── types/
│   │   └── index.ts                # TypeScript domain models
│   ├── App.tsx                     # Root state & router orchestration
│   ├── main.tsx                    # React 19 entry
│   └── index.css                   # Tailwind CSS layers & styling
├── public/                         # Public assets & screenshots
├── index.html                      # HTML entry with SEO metadata
├── metadata.json                   # Applet metadata
├── package.json                    # Scripts and dependencies
├── tsconfig.json                   # TypeScript configuration
└── vite.config.ts                  # Vite build configuration
```

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or above)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/lavishaagrwal15/hotelpro-mern-hotel-management.git
cd hotelpro-mern-hotel-management
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📋 SkillWallet Submission Guide

- **Live Demo Link**: `https://ais-pre-crsezy7gi24xgpbymtrhkw-987524342274.asia-east1.run.app`
- **Module**: Full Stack Development - MERN Stack
- **Project**: IMovies - Movie ticket booking made simple
