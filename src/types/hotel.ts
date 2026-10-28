export type RoomType = 'Deluxe King Suite' | 'Executive Ocean View' | 'Presidential Penthouse' | 'Luxury Garden Villa' | 'Standard Double';

export interface Room {
  id: string;
  name: string;
  type: RoomType;
  pricePerNight: number;
  capacity: { adults: number; children: number };
  bedType: string;
  size: string; // e.g. "48 m² / 516 ft²"
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  totalRooms: number;
  availableRooms: number;
  floor: number;
  featured?: boolean;
}

export interface HotelReservation {
  id: string; // e.g. "HTL-84920-PR"
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  roomId: string;
  roomName: string;
  roomType: RoomType;
  roomPrice: number;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  nights: number;
  adults: number;
  children: number;
  addOns: {
    name: string;
    price: number;
  }[];
  subtotal: number;
  tax: number;
  totalAmount: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  bookingDate: string;
  qrCodeData: string;
}

export interface HotelAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}
