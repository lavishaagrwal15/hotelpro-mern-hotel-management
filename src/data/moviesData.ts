import { Movie, Theater, Showtime, ConcessionItem, DemoChapter, GitHubFile } from '../types';

export const MOVIES: Movie[] = [
  {
    id: 'm1',
    title: 'Interstellar: Beyond Horizons',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    synopsis: 'When Earth becomes uninhabitable in the near future, an ex-NASA pilot and a team of researchers embark on a perilous interstellar mission through a newly opened wormhole near Saturn to discover three potentially habitable planets.',
    poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1920&q=80',
    rating: 8.9,
    reviewCount: '185K',
    duration: '2h 49m',
    releaseYear: 2026,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    certificate: 'PG-13',
    languages: ['English', 'Hindi', 'Spanish'],
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    formats: ['IMAX 3D', 'Dolby Atmos', 'Standard 2D'],
    isFeatured: true,
    status: 'now-showing'
  },
  {
    id: 'm2',
    title: 'Dune: Prophecy of Arrakis',
    tagline: 'Fear is the mind-killer. Destiny is written in the sands.',
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his family. Facing a choice between love and the fate of the known universe, he endeavors to prevent a catastrophic future.',
    poster: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    rating: 8.8,
    reviewCount: '142K',
    duration: '2h 46m',
    releaseYear: 2026,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    certificate: 'PG-13',
    languages: ['English', 'French', 'Hindi'],
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Javier Bardem'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    formats: ['IMAX 3D', '4DX', 'Dolby Atmos'],
    isFeatured: true,
    status: 'now-showing'
  },
  {
    id: 'm3',
    title: 'Cyberpunk 2099: Neo Shinjuku',
    tagline: 'In a city of neon shadows, humanity is the ultimate upgrade.',
    synopsis: 'In a high-tech dystopian metropolis ruled by megacorporations and rogue neural algorithms, an underground biometric investigator uncovers a syndicate synthesizing human memories for synthetic immortality.',
    poster: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80',
    rating: 8.5,
    reviewCount: '98K',
    duration: '2h 18m',
    releaseYear: 2026,
    genres: ['Action', 'Cyberpunk', 'Thriller'],
    certificate: 'R',
    languages: ['English', 'Japanese'],
    director: 'Kavita Shenoy',
    cast: ['Ken Watanabe', 'Ana de Armas', 'Dev Patel', 'Hiroyuki Sanada'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    formats: ['Dolby Atmos', 'IMAX 3D', 'Standard 2D'],
    status: 'now-showing'
  },
  {
    id: 'm4',
    title: 'Gladiator: Legacy of Rome',
    tagline: 'What we do in life echoes in eternity.',
    synopsis: 'Decades after the sacrifice of Maximus, a young gladiator rises from the sands of Numidia into the heart of the Colosseum to challenge corrupt emperors and liberate the citizens of Rome.',
    poster: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1920&q=80',
    rating: 8.6,
    reviewCount: '115K',
    duration: '2h 30m',
    releaseYear: 2026,
    genres: ['Action', 'Drama', 'History'],
    certificate: 'R',
    languages: ['English', 'Italian', 'Hindi'],
    director: 'Ridley Scott',
    cast: ['Paul Mescal', 'Pedro Pascal', 'Denzel Washington', 'Connie Nielsen'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    formats: ['IMAX 3D', 'Dolby Atmos'],
    status: 'now-showing'
  },
  {
    id: 'm5',
    title: 'Spider-Man: Beyond the Spider-Verse',
    tagline: 'Anyone can wear the mask. But saving all dimensions takes sacrifice.',
    synopsis: 'Miles Morales traverses kaleidoscopic multiversal corridors alongside Gwen Stacy and an elite coalition of Spider-Heroes to protect the fabric of reality against a cosmic collapsing paradox.',
    poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80',
    rating: 9.1,
    reviewCount: '210K',
    duration: '2h 20m',
    releaseYear: 2026,
    genres: ['Animation', 'Action', 'Sci-Fi'],
    certificate: 'PG',
    languages: ['English', 'Spanish', 'Hindi'],
    director: 'Joaquim Dos Santos',
    cast: ['Shameik Moore', 'Hailee Steinfeld', 'Oscar Isaac', 'Daniel Kaluuya'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    formats: ['IMAX 3D', '4DX', 'Standard 2D'],
    status: 'now-showing'
  },
  {
    id: 'm6',
    title: 'Quantum Realm: The Final Frontier',
    tagline: 'At the subatomic level, every law of physics becomes a question.',
    synopsis: 'A clandestine team of quantum theoretical physicists construct an entanglement chamber that enables time displacement, triggering an existential cascade across alternate Earth timelines.',
    poster: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    backdrop: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1920&q=80',
    rating: 8.3,
    reviewCount: '64K',
    duration: '2h 12m',
    releaseYear: 2026,
    genres: ['Sci-Fi', 'Thriller', 'Mystery'],
    certificate: 'PG-13',
    languages: ['English', 'German'],
    director: 'Elena Rostova',
    cast: ['Cillian Murphy', 'Florence Pugh', 'Benedict Cumberbatch'],
    trailerUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    formats: ['Dolby Atmos', 'Standard 2D'],
    status: 'coming-soon'
  }
];

export const THEATERS: Theater[] = [
  {
    id: 'th-1',
    name: 'CineSphere Grand IMAX',
    location: 'Downtown Center, 5th Avenue',
    distance: '1.2 km away',
    formats: ['IMAX 3D', 'Dolby Atmos', 'Standard 2D'],
    amenities: ['Laser 4K Projection', 'Recliner Seats', 'Gourmet Dining', 'Free Parking']
  },
  {
    id: 'th-2',
    name: 'Regal Dolby Cinema Royale',
    location: 'Riverside Walk & 42nd St',
    distance: '2.8 km away',
    formats: ['Dolby Atmos', '4DX'],
    amenities: ['Dolby Vision', 'Moving Audio', 'VIP Lounge', 'Full Bar']
  },
  {
    id: 'th-3',
    name: 'AMC Starplex Horizon',
    location: 'Metro Plaza, West District',
    distance: '4.1 km away',
    formats: ['4DX', 'IMAX 3D', 'Standard 2D'],
    amenities: ['Motion Seats', 'Environmental Effects', 'Wheelchair Access']
  }
];

export const SHOWTIMES: Showtime[] = [
  {
    id: 'st-101',
    theaterId: 'th-1',
    movieId: 'm1',
    time: '10:30 AM',
    date: '2026-10-28',
    format: 'IMAX 3D',
    screen: 'Auditorium 1 (IMAX Laser)',
    pricing: { recliner: 24.50, prime: 18.00, classic: 13.50 },
    occupiedSeats: ['A3', 'A4', 'B5', 'B6', 'D7', 'D8', 'E5', 'E6', 'F8']
  },
  {
    id: 'st-102',
    theaterId: 'th-1',
    movieId: 'm1',
    time: '02:15 PM',
    date: '2026-10-28',
    format: 'IMAX 3D',
    screen: 'Auditorium 1 (IMAX Laser)',
    pricing: { recliner: 24.50, prime: 18.00, classic: 13.50 },
    occupiedSeats: ['C4', 'C5', 'D4', 'D5', 'G2', 'G3']
  },
  {
    id: 'st-103',
    theaterId: 'th-1',
    movieId: 'm1',
    time: '06:45 PM',
    date: '2026-10-28',
    format: 'IMAX 3D',
    screen: 'Auditorium 1 (IMAX Laser)',
    pricing: { recliner: 26.00, prime: 19.50, classic: 14.50 },
    occupiedSeats: ['A1', 'A2', 'C6', 'C7', 'C8', 'D6', 'D7', 'E4', 'E5', 'E6', 'F5', 'F6', 'F7']
  },
  {
    id: 'st-104',
    theaterId: 'th-1',
    movieId: 'm1',
    time: '10:00 PM',
    date: '2026-10-28',
    format: 'Dolby Atmos',
    screen: 'Auditorium 2 (Dolby Sound)',
    pricing: { recliner: 22.00, prime: 16.50, classic: 12.00 },
    occupiedSeats: ['B3', 'B4', 'E8']
  },
  {
    id: 'st-201',
    theaterId: 'th-2',
    movieId: 'm1',
    time: '01:00 PM',
    date: '2026-10-28',
    format: 'Dolby Atmos',
    screen: 'Dolby Cinema Screen A',
    pricing: { recliner: 23.00, prime: 17.00, classic: 12.50 },
    occupiedSeats: ['A5', 'A6', 'C3', 'D8']
  },
  {
    id: 'st-202',
    theaterId: 'th-2',
    movieId: 'm1',
    time: '05:30 PM',
    date: '2026-10-28',
    format: 'Dolby Atmos',
    screen: 'Dolby Cinema Screen A',
    pricing: { recliner: 25.00, prime: 18.50, classic: 13.50 },
    occupiedSeats: ['D5', 'D6', 'E5', 'E6', 'F6']
  },
  {
    id: 'st-301',
    theaterId: 'th-3',
    movieId: 'm1',
    time: '04:00 PM',
    date: '2026-10-28',
    format: '4DX',
    screen: '4DX Dynamic Arena',
    pricing: { recliner: 28.00, prime: 21.00, classic: 16.00 },
    occupiedSeats: ['B4', 'B5', 'C4', 'C5']
  }
];

export const CONCESSIONS: ConcessionItem[] = [
  {
    id: 'con-1',
    name: 'Caramel Gold Mega Popcorn',
    description: 'Freshly popped warm golden corn infused with handcrafted salted artisan caramel.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1585647347483-22b66260dfff?auto=format&fit=crop&w=600&q=80',
    category: 'Popcorn',
    badge: 'Bestseller'
  },
  {
    id: 'con-2',
    name: 'Ultimate Cinema Snack Combo',
    description: '1 Large Truffle Popcorn, 2 Regular Soft Drinks, and 1 Hot Cheesy Nacho tray.',
    price: 16.50,
    image: 'https://images.unsplash.com/photo-1572177812156-58036aae439c?auto=format&fit=crop&w=600&q=80',
    category: 'Combos',
    badge: 'Save 25%'
  },
  {
    id: 'con-3',
    name: 'Fiesta Loaded Cheese Nachos',
    description: 'Crisp stone-ground tortilla chips smothered in melted queso, diced jalapeños, and salsa.',
    price: 9.00,
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
    category: 'Nachos'
  },
  {
    id: 'con-4',
    name: 'Chilled Fountain Soda Duo',
    description: 'Pair of ice-cold refreshing beverages: Choice of Coca-Cola, Sprite, or Berry Fizz.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    category: 'Beverages'
  }
];

export const DEMO_CHAPTERS: DemoChapter[] = [
  {
    id: 'ch-1',
    title: 'Platform Overview & Discovery',
    timestamp: '00:00',
    seconds: 0,
    description: 'Explore the modern cinematic interface, trending releases, trailers, and format filters.',
    featureKey: 'browse',
    narration: 'Welcome to IMovies! Users can seamlessly explore trending blockbusters, watch 4K trailers, inspect ratings, runtime, and filter by IMAX 3D, Dolby Atmos, or genres.'
  },
  {
    id: 'ch-2',
    title: 'Theater & Showtime Selection',
    timestamp: '00:18',
    seconds: 18,
    description: 'Select nearby certified theaters, dates, and morning to night showtimes.',
    featureKey: 'theater',
    narration: 'Choose from certified theaters like CineSphere Grand IMAX and select preferred date and time slots with instant seat fill rate tracking.'
  },
  {
    id: 'ch-3',
    title: 'Interactive Seat Map (Recliner, Prime, Classic)',
    timestamp: '00:36',
    seconds: 36,
    description: 'Live interactive SVG seat matrix with curved screen, category tiers, and dynamic pricing.',
    featureKey: 'seats',
    narration: 'Our interactive seat layout features curved cinema screen geometry, real-time seat lock state, and tiered pricing across VIP Recliner, Prime Club, and Classic sections.'
  },
  {
    id: 'ch-4',
    title: 'F&B Concessions & Add-ons',
    timestamp: '00:54',
    seconds: 54,
    description: 'Order gourmet popcorn, loaded nachos, and beverage combos with instant pricing.',
    featureKey: 'food',
    narration: 'Enhance your cinema experience by adding handcrafted caramel popcorn, cheese nachos, and drink combos directly to your cart with automatic discount bundles.'
  },
  {
    id: 'ch-5',
    title: 'Secure Checkout & Promo Codes',
    timestamp: '01:12',
    seconds: 72,
    description: 'Apply promo discounts, calculate convenience fees, and process payment securely.',
    featureKey: 'checkout',
    narration: 'Apply discount coupon codes like IMOVIE20 for 20% savings, view comprehensive itemized pricing breakdowns, and complete payment via card, UPI, or mobile wallet.'
  },
  {
    id: 'ch-6',
    title: 'Digital E-Ticket with Scannable QR Code',
    timestamp: '01:30',
    seconds: 90,
    description: 'Instant ticket pass generation with verified QR code, download receipt, and booking manager.',
    featureKey: 'ticket',
    narration: 'Instantly receive a stylish cinema e-ticket pass featuring a high-contrast scannable QR code, booking reference ID, print/download option, and automated sync with My Bookings.'
  }
];

export const GITHUB_REPO_DATA = {
  repoName: 'imovies-mern-ticket-booking',
  repoOwner: 'lavishaagrwal15',
  defaultBranch: 'main',
  fullUrl: 'https://github.com/lavishaagrwal15/imovies-mern-ticket-booking',
  stars: 18,
  forks: 5,
  license: 'MIT',
  lastCommit: 'feat: complete MERN cinema ticket reservation system with QR verification',
  files: [
    {
      name: 'README.md',
      path: 'README.md',
      type: 'file' as const,
      size: '4.8 KB',
      content: `# 🎬 IMovies - Movie Ticket Booking Platform (MERN Stack)

> "The IMovies is a seamless online platform that enhances the cinema experience by allowing users to browse movies, select showtimes, and reserve seats with real-time availability tracking."

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248.svg)](https://www.mongodb.com)
[![Express](https://img.shields.io/badge/Backend-Express.js-000000.svg)](https://expressjs.com)

---

## 🌟 Key Features

1. **Movie Catalog & 4K Trailers**: Discover trending releases, filter by IMAX / Dolby Atmos / 4DX formats, view cast, director, and duration.
2. **Multi-Cinema & Showtime Engine**: Dynamic theater picker with date filters and morning/afternoon/night show slots.
3. **Interactive Visual Seat Matrix**: Real-time seat availability map with tiered pricing (VIP Recliner, Prime Club, Classic) and curved screen geometry.
4. **F&B Concessions Upsell**: Add gourmet popcorn, loaded nachos, and drink combos with dynamic bundle pricing.
5. **Secure Checkout & Coupon Engine**: Built-in promo coupons (\`IMOVIE20\`, \`SKILLWALLET\`), taxes, and convenience fee calculation.
6. **Instant Digital E-Ticket**: High-contrast scannable QR Code generation, printable pass, download receipt, and booking ID tracking.
7. **User Booking Management**: Persistent booking history with upcoming/past status and cancellation workflow.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Motion Animations
- **Backend**: Node.js, Express.js REST API
- **Database**: MongoDB & Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens) with secure password hashing (Bcrypt)
- **Deployment**: Google Cloud / Vercel / Render

\`\`\`
imovies-mern-stack/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # UI Components (SeatMap, Ticket, Catalog, Modals)
│   │   ├── data/           # Mock data and initial state
│   │   ├── types/          # TypeScript domain interfaces
│   │   └── App.tsx         # Main entry component
│   └── package.json
├── server/                 # Express backend API
│   ├── config/             # DB connection (db.js)
│   ├── controllers/        # movieController, bookingController, authController
│   ├── models/             # Movie.js, Booking.js, Show.js, User.js
│   ├── routes/             # movieRoutes.js, bookingRoutes.js, authRoutes.js
│   ├── middleware/         # authMiddleware.js, errorHandler.js
│   └── server.js           # Server bootstrap
└── README.md
\`\`\`

---

## 🚀 Quick Setup & Installation

### Prerequisites
- Node.js (v18 or above)
- MongoDB running locally or MongoDB Atlas connection URI

### 1. Clone the repository
\`\`\`bash
git clone https://github.com/en24cs3010588/imovies-mern-ticket-booking.git
cd imovies-mern-ticket-booking
\`\`\`

### 2. Install dependencies
\`\`\`bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
\`\`\`

### 3. Configure Environment Variables
Create a \`.env\` file in the \`server\` directory:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/imovies_db
JWT_SECRET=your_super_secret_jwt_key_2026
CLIENT_URL=http://localhost:3000
\`\`\`

### 4. Run the Project
\`\`\`bash
# In server directory:
npm run dev

# In client directory:
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser!
`
    },
    {
      name: 'server.js',
      path: 'server/server.js',
      type: 'file' as const,
      size: '2.1 KB',
      content: `const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database Connection
connectDB();

// API Routes
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'IMovies REST API running smoothly!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running in \${process.env.NODE_ENV || 'development'} mode on port \${PORT}\`));`
    },
    {
      name: 'Booking.js',
      path: 'server/models/Booking.js',
      type: 'file' as const,
      size: '1.4 KB',
      content: `const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movie: {
    id: String,
    title: String,
    poster: String,
    certificate: String
  },
  theater: {
    name: String,
    location: String
  },
  showtime: {
    time: String,
    date: String,
    format: String,
    screen: String
  },
  seats: [{
    id: String,
    type: String,
    price: Number
  }],
  concessions: [{
    name: String,
    quantity: Number,
    price: Number
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
  qrCodeData: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);`
    },
    {
      name: 'movieRoutes.js',
      path: 'server/routes/movieRoutes.js',
      type: 'file' as const,
      size: '1.1 KB',
      content: `const express = require('express');
const router = express.Router();
const { getMovies, getMovieById, getShowtimesForMovie } = require('../controllers/movieController');

router.get('/', getMovies);
router.get('/:id', getMovieById);
router.get('/:id/showtimes', getShowtimesForMovie);

module.exports = router;`
    },
    {
      name: 'package.json',
      path: 'package.json',
      type: 'file' as const,
      size: '1.0 KB',
      content: `{
  "name": "imovies-mern-ticket-booking",
  "version": "1.0.0",
  "description": "Full-stack MERN cinema ticket reservation system featuring real-time seat availability",
  "main": "server/server.js",
  "scripts": {
    "server": "nodemon server/server.js",
    "client": "npm run dev --prefix client",
    "dev": "concurrently \\"npm run server\\" \\"npm run client\\"",
    "build": "npm run build --prefix client"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.1"
  }
}`
    }
  ]
};
