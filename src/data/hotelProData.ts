import { Room, HotelReservation, HotelAddOn } from '../types/hotel';
import { DemoChapter } from '../types';

export const HOTEL_ROOMS: Room[] = [
  {
    id: 'room-1',
    name: 'Azure Grand Executive Suite',
    type: 'Executive Ocean View',
    pricePerNight: 240,
    capacity: { adults: 2, children: 1 },
    bedType: 'King Size Plush Bed',
    size: '54 m² / 580 ft²',
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Breathtaking panoramic floor-to-ceiling ocean vistas with private sunset balcony, marble en-suite bathroom with soaking jacuzzi, and dedicated executive workspace.',
    amenities: ['Oceanfront Balcony', 'Soaking Jacuzzi', 'High-Speed Wi-Fi', 'Espresso Bar', 'Smart Climate Control', 'Complimentary Minibar'],
    totalRooms: 12,
    availableRooms: 4,
    floor: 14,
    featured: true
  },
  {
    id: 'room-2',
    name: 'Royal Presidential Penthouse',
    type: 'Presidential Penthouse',
    pricePerNight: 480,
    capacity: { adults: 4, children: 2 },
    bedType: '2 California King Beds',
    size: '110 m² / 1,184 ft²',
    rating: 5.0,
    reviewCount: 148,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The pinnacle of luxury hospitality. Private rooftop plunge pool, dedicated 24/7 personal butler service, full chef kitchen, wine cellar, and master suite.',
    amenities: ['Private Rooftop Plunge Pool', '24/7 Personal Butler', 'Chef Kitchen', 'Wine Cellar', 'Designer Toiletries', 'VIP Airport Transfer'],
    totalRooms: 3,
    availableRooms: 1,
    floor: 22,
    featured: true
  },
  {
    id: 'room-3',
    name: 'Serenity Garden Villa',
    type: 'Luxury Garden Villa',
    pricePerNight: 320,
    capacity: { adults: 3, children: 2 },
    bedType: '1 King Bed + 1 Daybed',
    size: '78 m² / 840 ft²',
    rating: 4.8,
    reviewCount: 225,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Secluded tropical sanctuary surrounded by curated zen flora, outdoor rain shower, private sun deck loungers, and tranquil water feature.',
    amenities: ['Private Zen Garden', 'Outdoor Rain Shower', 'Sun Deck Loungers', 'Free Breakfast', 'Yoga Mats', 'Herbal Tea Station'],
    totalRooms: 8,
    availableRooms: 3,
    floor: 1
  },
  {
    id: 'room-4',
    name: 'Deluxe City Skyline King',
    type: 'Deluxe King Suite',
    pricePerNight: 165,
    capacity: { adults: 2, children: 0 },
    bedType: 'King Size Posturepedic',
    size: '42 m² / 452 ft²',
    rating: 4.7,
    reviewCount: 480,
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Contemporary minimalist elegance with stunning city skyline views, blackout soundproof drapery, ergonomic workstation, and premium rain shower.',
    amenities: ['Skyline View', 'Ergonomic Workstation', 'High-Speed Wi-Fi', 'Soundproof Glass', 'Rain Shower', 'Room Service'],
    totalRooms: 24,
    availableRooms: 9,
    floor: 8
  }
];

export const HOTEL_ADDONS: HotelAddOn[] = [
  {
    id: 'add-1',
    name: 'Gourmet Artisanal Buffet Breakfast',
    price: 28,
    description: 'Daily fresh bakery, made-to-order organic omelets, fresh tropical juices, and specialty barista coffee.',
    iconName: 'Coffee'
  },
  {
    id: 'add-2',
    name: 'Private Luxury Mercedes Airport Transfer',
    price: 65,
    description: 'Chauffeured meet-and-greet curbside airport pickup with luggage handling.',
    iconName: 'Car'
  },
  {
    id: 'add-3',
    name: 'Thermal Spa & Hydrotherapy Day Pass',
    price: 45,
    description: 'Access to Himalayan salt sauna, cedar steam room, and vitality whirlpools.',
    iconName: 'Sparkles'
  },
  {
    id: 'add-4',
    name: 'Guaranteed 3:00 PM Late Checkout',
    price: 35,
    description: 'Extend your relaxation without morning rush. Subject to priority confirmation.',
    iconName: 'Clock'
  }
];

export const INITIAL_RESERVATIONS: HotelReservation[] = [
  {
    id: 'HTL-72910-AZ',
    guestName: 'Eleanor Vance',
    guestEmail: 'eleanor.vance@example.com',
    guestPhone: '+1 (555) 782-9912',
    roomId: 'room-1',
    roomName: 'Azure Grand Executive Suite',
    roomType: 'Executive Ocean View',
    roomPrice: 240,
    checkInDate: '2026-10-28',
    checkOutDate: '2026-10-31',
    nights: 3,
    adults: 2,
    children: 0,
    addOns: [
      { name: 'Gourmet Artisanal Buffet Breakfast', price: 28 }
    ],
    subtotal: 748,
    tax: 59.84,
    totalAmount: 807.84,
    status: 'confirmed',
    bookingDate: '2026-10-25T14:32:00Z',
    qrCodeData: 'HOTELPRO-VERIFIED-HTL-72910-AZ-Eleanor-Vance-Room1'
  },
  {
    id: 'HTL-83941-RY',
    guestName: 'Marcus Sterling',
    guestEmail: 'marcus.s@luxuryholdings.com',
    guestPhone: '+1 (555) 301-4489',
    roomId: 'room-2',
    roomName: 'Royal Presidential Penthouse',
    roomType: 'Presidential Penthouse',
    roomPrice: 480,
    checkInDate: '2026-10-29',
    checkOutDate: '2026-11-02',
    nights: 4,
    adults: 2,
    children: 1,
    addOns: [
      { name: 'Private Luxury Mercedes Airport Transfer', price: 65 },
      { name: 'Thermal Spa & Hydrotherapy Day Pass', price: 45 }
    ],
    subtotal: 2030,
    tax: 162.40,
    totalAmount: 2192.40,
    status: 'confirmed',
    bookingDate: '2026-10-26T09:15:00Z',
    qrCodeData: 'HOTELPRO-VERIFIED-HTL-83941-RY-Marcus-Sterling-Room2'
  },
  {
    id: 'HTL-61923-SG',
    guestName: 'Dr. Sophia Ramirez',
    guestEmail: 'sophia.ramirez@medtech.org',
    guestPhone: '+1 (555) 902-1134',
    roomId: 'room-3',
    roomName: 'Serenity Garden Villa',
    roomType: 'Luxury Garden Villa',
    roomPrice: 320,
    checkInDate: '2026-10-27',
    checkOutDate: '2026-10-30',
    nights: 3,
    adults: 2,
    children: 2,
    addOns: [],
    subtotal: 960,
    tax: 76.80,
    totalAmount: 1036.80,
    status: 'checked-in',
    bookingDate: '2026-10-24T18:40:00Z',
    qrCodeData: 'HOTELPRO-VERIFIED-HTL-61923-SG-Sophia-Ramirez-Room3'
  }
];

export const HOTEL_DEMO_CHAPTERS: DemoChapter[] = [
  {
    id: 'htl-ch-1',
    title: 'HotelPro Overview & Room Inventory',
    timestamp: '00:00',
    seconds: 0,
    description: 'Explore luxury room inventory, floor-to-ceiling galleries, real-time availability counters, and guest capacities.',
    featureKey: 'rooms',
    narration: 'Welcome to HotelPro! Modern MERN stack hospitality management: browse executive suites, presidential penthouses, and garden villas with live room availability tracking.'
  },
  {
    id: 'htl-ch-2',
    title: 'Smart Date Range & Night Calculation',
    timestamp: '00:18',
    seconds: 18,
    description: 'Select check-in and check-out dates, guest party counts, and automatic total stay computation.',
    featureKey: 'calendar',
    narration: 'Interactive calendar booking lets guests choose their check-in and check-out dates, automatically computes stay length and validates room capacity in real-time.'
  },
  {
    id: 'htl-ch-3',
    title: 'Luxury Add-ons & Hospitality Services',
    timestamp: '00:36',
    seconds: 36,
    description: 'Personalize guest experience with gourmet buffet breakfasts, Mercedes airport transfers, and spa day passes.',
    featureKey: 'addons',
    narration: 'Add concierge amenities like gourmet breakfast, luxury airport chauffeur pickup, and spa packages directly to the reservation invoice.'
  },
  {
    id: 'htl-ch-4',
    title: 'Secure Checkout & Instant Digital Voucher',
    timestamp: '00:54',
    seconds: 54,
    description: 'Calculate stay subtotal, taxes, and process payment simulation to issue a verified digital check-in QR pass.',
    featureKey: 'checkout',
    narration: 'Automated tax calculations, transparent invoice breakdowns, and encrypted checkout generate a scannable digital hotel check-in voucher instantly.'
  },
  {
    id: 'htl-ch-5',
    title: 'Staff Hotel Operations & Occupancy Hub',
    timestamp: '01:12',
    seconds: 72,
    description: 'Real-time hotel management dashboard for staff: track occupancy rates, room status, guest check-in/out workflows.',
    featureKey: 'admin',
    narration: 'Hotel staff can manage reservations, monitor room occupancy rates (82%), update check-in and check-out states, and manage housekeeping status.'
  },
  {
    id: 'htl-ch-6',
    title: 'MERN Backend Architecture & MongoDB Schema',
    timestamp: '01:30',
    seconds: 90,
    description: 'Review Express REST endpoints, MongoDB Mongoose data models, JWT authentication, and zero-error codebase.',
    featureKey: 'backend',
    narration: 'Robust MERN architecture: Express REST API routes, MongoDB Room, Reservation, and Guest schemas, and verified JWT authentication ready for mentor review.'
  }
];

export const HOTELPRO_REPO_DATA = {
  repoName: 'hotelpro-mern-hotel-management',
  repoOwner: 'lavishaagrwal15',
  defaultBranch: 'main',
  fullUrl: 'https://github.com/lavishaagrwal15/hotelpro-mern-hotel-management',
  files: [
    {
      name: 'README.md',
      path: 'README.md',
      type: 'file' as const,
      size: '5.2 KB',
      content: `# 🏨 HotelPro - Complete Hotel Booking & Management Solution (MERN Stack)

> "Your ultimate hotel management solution! Our system streamlines hotel operations with a secure, scalable backend, ensuring efficient booking, guest management, and payment processing. With intuitive interfaces and robust authentication."

[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248.svg)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000.svg)](https://expressjs.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Key Modules & Features

1. **Room Inventory & Availability Engine**: Real-time room status tracking, capacity checks, and tier classifications (Executive, Penthouse, Villa).
2. **Interactive Date Range & Reservation Flow**: Calendar date picker with automatic night calculation, guest party limits, and pricing.
3. **Hospitality Concierge Add-ons**: Artisanal breakfast buffet, airport transfers, spa day passes, and late check-outs.
4. **Secure Checkout & Digital QR Voucher**: High-contrast QR code check-in pass for reception scanning and printable vouchers.
5. **Staff Hotel Operations Dashboard**: Occupancy tracking, guest check-in/out workflows, and live reservation management.
6. **Robust MERN Backend**: RESTful APIs for rooms, bookings, authentication, and MongoDB schema validation.

---

## 🏗️ Architecture & Technology Stack

\`\`\`
hotelpro-mern-stack/
├── client/                     # React 19 Frontend
│   ├── src/
│   │   ├── components/         # RoomCatalog, BookingModal, AdminDashboard, Voucher
│   │   ├── types/              # Room, Reservation, Guest interfaces
│   │   └── App.tsx
├── server/                     # Express.js REST API
│   ├── config/db.js            # MongoDB Mongoose connection
│   ├── controllers/            # roomController, bookingController, authController
│   ├── models/                 # Room.js, Reservation.js, Guest.js
│   ├── routes/                 # roomRoutes.js, bookingRoutes.js, authRoutes.js
│   └── server.js               # Entry point
└── README.md
\`\`\`

---

## 🚀 Quick Setup & Installation

\`\`\`bash
git clone https://github.com/en24cs3010588/hotelpro-mern-hotel-management.git
cd hotelpro-mern-hotel-management
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view HotelPro in your browser!
`
    },
    {
      name: 'Reservation.js',
      path: 'server/models/Reservation.js',
      type: 'file' as const,
      size: '1.6 KB',
      content: `const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  reservationId: { type: String, required: true, unique: true },
  guest: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }
  },
  room: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerNight: { type: Number, required: true }
  },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  nights: { type: Number, required: true },
  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  addOns: [{
    name: String,
    price: Number
  }],
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['confirmed', 'checked-in', 'checked-out', 'cancelled'],
    default: 'confirmed'
  },
  qrCodeData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);`
    },
    {
      name: 'Room.js',
      path: 'server/models/Room.js',
      type: 'file' as const,
      size: '1.2 KB',
      content: `const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  capacity: {
    adults: { type: Number, required: true },
    children: { type: Number, default: 0 }
  },
  bedType: { type: String, required: true },
  size: { type: String },
  rating: { type: Number, default: 5.0 },
  amenities: [String],
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Room', roomSchema);`
    }
  ]
};
