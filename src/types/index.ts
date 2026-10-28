export type MovieFormat = 'IMAX 3D' | 'Dolby Atmos' | '4DX' | 'Standard 2D';

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  poster: string;
  backdrop: string;
  rating: number; // e.g. 8.9
  reviewCount: string; // e.g. "124K"
  duration: string; // e.g. "2h 49m"
  releaseYear: number;
  genres: string[];
  certificate: string; // e.g. "PG-13", "R", "U/A"
  languages: string[];
  director: string;
  cast: string[];
  trailerUrl: string;
  formats: MovieFormat[];
  isFeatured?: boolean;
  status: 'now-showing' | 'coming-soon';
}

export interface Theater {
  id: string;
  name: string;
  location: string;
  distance: string;
  formats: MovieFormat[];
  amenities: string[];
}

export interface Showtime {
  id: string;
  theaterId: string;
  movieId: string;
  time: string; // e.g. "10:30 AM", "02:15 PM"
  date: string; // YYYY-MM-DD
  format: MovieFormat;
  screen: string; // e.g. "Screen 1 - IMAX"
  pricing: {
    recliner: number;
    prime: number;
    classic: number;
  };
  occupiedSeats: string[]; // e.g. ["A3", "A4", "D6"]
}

export interface Seat {
  id: string; // e.g. "F7"
  row: string; // "A" - "H"
  number: number; // 1 - 14
  type: 'recliner' | 'prime' | 'classic' | 'wheelchair';
  price: number;
  status: 'available' | 'selected' | 'occupied';
}

export interface ConcessionItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'Popcorn' | 'Combos' | 'Beverages' | 'Nachos';
  badge?: string;
}

export interface Booking {
  id: string; // e.g. "IMV-83921-X9"
  bookingDate: string;
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  seats: {
    id: string;
    type: 'recliner' | 'prime' | 'classic' | 'wheelchair';
    price: number;
  }[];
  concessions: {
    item: ConcessionItem;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  promoCode?: string;
  convenienceFee: number;
  tax: number;
  totalAmount: number;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: string;
  status: 'confirmed' | 'cancelled';
  qrData: string;
}

export interface DemoChapter {
  id: string;
  title: string;
  timestamp: string; // "00:15"
  seconds: number;
  description: string;
  featureKey: string;
  narration: string;
}

export interface GitHubFile {
  name: string;
  path: string;
  type: 'file' | 'folder';
  size?: string;
  content?: string;
  children?: GitHubFile[];
}
