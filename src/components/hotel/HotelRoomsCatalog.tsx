import React, { useState } from 'react';
import { 
  Users, Bed, Maximize2, Star, Check, Sparkles, 
  Calendar, ShieldCheck, ArrowRight, Hotel, Coffee
} from 'lucide-react';
import { Room } from '../../types/hotel';

interface Props {
  rooms: Room[];
  onBookRoom: (room: Room) => void;
  checkInDate: string;
  checkOutDate: string;
  onDatesChange: (checkIn: string, checkOut: string) => void;
  guestCount: number;
  onGuestsChange: (count: number) => void;
}

export const HotelRoomsCatalog: React.FC<Props> = ({
  rooms,
  onBookRoom,
  checkInDate,
  checkOutDate,
  onDatesChange,
  guestCount,
  onGuestsChange
}) => {
  const [selectedType, setSelectedType] = useState<string>('All');

  const types = ['All', 'Executive Ocean View', 'Presidential Penthouse', 'Luxury Garden Villa', 'Deluxe King Suite'];

  const filteredRooms = rooms.filter(room => {
    if (selectedType !== 'All' && room.type !== selectedType) return false;
    if (room.capacity.adults + room.capacity.children < guestCount) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Search & Reservation Filter Bar */}
      <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-5 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          {/* Check-In Date */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Check-In Date</span>
            </label>
            <input
              type="date"
              value={checkInDate}
              onChange={(e) => onDatesChange(e.target.value, checkOutDate)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
            />
          </div>

          {/* Check-Out Date */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Check-Out Date</span>
            </label>
            <input
              type="date"
              value={checkOutDate}
              onChange={(e) => onDatesChange(checkInDate, e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 font-mono"
            />
          </div>

          {/* Guests Count */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-rose-500" />
              <span>Guests & Party</span>
            </label>
            <select
              value={guestCount}
              onChange={(e) => onGuestsChange(Number(e.target.value))}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              <option value={1} className="bg-neutral-900">1 Adult (Solo Stay)</option>
              <option value={2} className="bg-neutral-900">2 Guests (Couple / Executive)</option>
              <option value={3} className="bg-neutral-900">3 Guests (Small Group)</option>
              <option value={4} className="bg-neutral-900">4+ Guests (Family Suite)</option>
            </select>
          </div>

          {/* Room Type Filter */}
          <div>
            <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-rose-500" />
              <span>Room Category</span>
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500 cursor-pointer"
            >
              {types.map(t => (
                <option key={t} value={t} className="bg-neutral-900">
                  {t}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Rooms Showcase */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Available Rooms & Luxury Suites</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Showing available rooms for stay: {checkInDate} to {checkOutDate} ({filteredRooms.length} available)
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            Real-Time Availability Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-200 flex flex-col group shadow-lg"
            >
              {/* Room Image with Badges */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
                <img
                  src={room.image}
                  alt={room.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-400">
                  {room.type}
                </div>

                <div className="absolute top-3 right-3 bg-neutral-950/80 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded-lg text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <span>{room.availableRooms} rooms left</span>
                </div>

                <div className="absolute bottom-3 left-3 bg-neutral-950/90 backdrop-blur-sm border border-neutral-800 px-3 py-1.5 rounded-xl text-xs text-neutral-200 flex items-center gap-3">
                  <span className="font-mono">{room.size}</span>
                  <span className="text-neutral-500">·</span>
                  <span>{room.bedType}</span>
                </div>
              </div>

              {/* Room Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-white text-lg group-hover:text-rose-400 transition-colors">
                      {room.name}
                    </h4>
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{room.rating.toFixed(1)}</span>
                      <span className="text-neutral-500 font-normal">({room.reviewCount})</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mt-1">
                    {room.description}
                  </p>

                  {/* Amenities Checklist */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {room.amenities.map(a => (
                      <span
                        key={a}
                        className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800/80 text-[11px] text-neutral-300 flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-rose-500" />
                        <span>{a}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-white font-mono">
                      ${room.pricePerNight}
                    </span>
                    <span className="text-xs text-neutral-400"> / night</span>
                    <div className="text-[10px] text-neutral-500">Excluding taxes & fees</div>
                  </div>

                  <button
                    onClick={() => onBookRoom(room)}
                    className="px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-all flex items-center gap-2 shadow-md shadow-rose-600/20 active:scale-95"
                  >
                    <span>Reserve Room</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
