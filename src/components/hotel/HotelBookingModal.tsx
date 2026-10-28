import React, { useState } from 'react';
import { 
  X, Calendar, Users, Coffee, Car, Sparkles, 
  Clock, ShieldCheck, Check, CreditCard, ChevronRight, ChevronLeft
} from 'lucide-react';
import { Room, HotelReservation, HotelAddOn } from '../../types/hotel';
import { HOTEL_ADDONS } from '../../data/hotelProData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  room: Room | null;
  checkInDate: string;
  checkOutDate: string;
  onReservationComplete: (reservation: HotelReservation) => void;
}

export const HotelBookingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  room,
  checkInDate: initialCheckIn,
  checkOutDate: initialCheckOut,
  onReservationComplete
}) => {
  if (!isOpen || !room) return null;

  const [checkInDate, setCheckInDate] = useState(initialCheckIn || '2026-10-28');
  const [checkOutDate, setCheckOutDate] = useState(initialCheckOut || '2026-10-31');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>(['add-1']); // default breakfast

  const [guestName, setGuestName] = useState('Eleanor Vance');
  const [guestEmail, setGuestEmail] = useState('eleanor.vance@example.com');
  const [guestPhone, setGuestPhone] = useState('+1 (555) 782-9912');
  const [isProcessing, setIsProcessing] = useState(false);

  // Compute nights
  const d1 = new Date(checkInDate);
  const d2 = new Date(checkOutDate);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24))) || 1;

  const roomSubtotal = room.pricePerNight * nights;
  const addOnsSubtotal = selectedAddOns.reduce((acc, id) => {
    const item = HOTEL_ADDONS.find(a => a.id === id);
    return acc + (item ? item.price * nights : 0);
  }, 0);

  const rawSubtotal = roomSubtotal + addOnsSubtotal;
  const tax = rawSubtotal * 0.08;
  const totalAmount = rawSubtotal + tax;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleConfirmReservation = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const reservationId = `HTL-${Math.floor(10000 + Math.random() * 90000)}-${room.type.substring(0, 2).toUpperCase()}`;
      
      const chosenAddOns = selectedAddOns.map(id => {
        const item = HOTEL_ADDONS.find(a => a.id === id);
        return { name: item!.name, price: item!.price * nights };
      });

      const newReservation: HotelReservation = {
        id: reservationId,
        guestName,
        guestEmail,
        guestPhone,
        roomId: room.id,
        roomName: room.name,
        roomType: room.type,
        roomPrice: room.pricePerNight,
        checkInDate,
        checkOutDate,
        nights,
        adults,
        children,
        addOns: chosenAddOns,
        subtotal: rawSubtotal,
        tax,
        totalAmount,
        status: 'confirmed',
        bookingDate: new Date().toISOString(),
        qrCodeData: `HOTELPRO-VERIFIED-${reservationId}-${guestName}-${room.name}`
      };

      setIsProcessing(false);
      onReservationComplete(newReservation);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={room.image}
              alt={room.name}
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-lg object-cover border border-neutral-800 shrink-0"
            />
            <div>
              <h3 className="font-bold text-white text-base truncate">{room.name}</h3>
              <p className="text-xs text-neutral-400">
                {room.type} · ${room.pricePerNight} / night
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm font-semibold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Left Column: Dates, Guests, Add-ons (7 cols) */}
            <div className="md:col-span-7 space-y-5">
              
              {/* Stay Dates */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  1. Reservation Dates & Duration ({nights} {nights === 1 ? 'Night' : 'Nights'})
                </span>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Check-In</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Check-Out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Adults</label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value={1}>1 Adult</option>
                      <option value={2}>2 Adults</option>
                      <option value={3}>3 Adults</option>
                      <option value={4}>4 Adults</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Children</label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value={0}>0 Children</option>
                      <option value={1}>1 Child</option>
                      <option value={2}>2 Children</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Concierge Add-ons */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  2. Concierge Services & Hospitality Perks
                </span>

                <div className="space-y-2">
                  {HOTEL_ADDONS.map((addOn) => {
                    const isSelected = selectedAddOns.includes(addOn.id);
                    return (
                      <div
                        key={addOn.id}
                        onClick={() => toggleAddOn(addOn.id)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-rose-500/10 border-rose-500/50 text-white'
                            : 'bg-neutral-900/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 text-xs font-bold ${
                            isSelected ? 'bg-rose-600 text-white' : 'border border-neutral-700 bg-neutral-800'
                          }`}>
                            {isSelected && '✓'}
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate">{addOn.name}</div>
                            <div className="text-[11px] text-neutral-400 line-clamp-1">{addOn.description}</div>
                          </div>
                        </div>

                        <span className="text-xs font-mono font-bold text-rose-400 shrink-0">
                          +${addOn.price} / night
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guest Information */}
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  3. Primary Guest Information
                </span>

                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Email Address</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Contact Phone</label>
                      <input
                        type="tel"
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Pricing Breakdown & Payment (5 cols) */}
            <div className="md:col-span-5 space-y-4">
              <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-4">
                <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block">
                  Reservation Invoice
                </span>

                <div className="space-y-2 text-xs text-neutral-400">
                  <div className="flex justify-between">
                    <span>Room Rate (${room.pricePerNight} × {nights} nights)</span>
                    <span className="font-mono text-white">${roomSubtotal.toFixed(2)}</span>
                  </div>

                  {addOnsSubtotal > 0 && (
                    <div className="flex justify-between">
                      <span>Hospitality Add-ons</span>
                      <span className="font-mono text-white">${addOnsSubtotal.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Hotel Occupancy Tax (8%)</span>
                    <span className="font-mono text-white">${tax.toFixed(2)}</span>
                  </div>

                  <div className="pt-3 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                    <span>Total Stay Amount</span>
                    <span className="font-mono text-rose-400 text-lg">
                      ${totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg text-xs space-y-1.5 text-neutral-300">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Free Cancellation up to 24h before Check-In</span>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Instant confirmation voucher with reception QR code delivered upon payment.
                  </p>
                </div>

                <button
                  onClick={handleConfirmReservation}
                  disabled={isProcessing}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Confirm & Generate Hotel Voucher</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
