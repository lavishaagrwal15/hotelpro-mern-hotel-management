import React, { useState } from 'react';
import { 
  X, ChevronRight, ChevronLeft, Calendar, Clock, 
  MapPin, Check, Ticket, Utensils, CreditCard, 
  Tag, ShieldCheck, AlertCircle, Sparkles
} from 'lucide-react';
import { Movie, Theater, Showtime, ConcessionItem, Booking } from '../types';
import { THEATERS, SHOWTIMES, CONCESSIONS } from '../data/moviesData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  onBookingComplete: (booking: Booking) => void;
}

export const BookingModal: React.FC<Props> = ({
  isOpen,
  onClose,
  movie,
  onBookingComplete
}) => {
  if (!isOpen || !movie) return null;

  // Step 1: Showtime selection state
  const dates = [
    { label: 'Today', date: '2026-10-28', day: 'Wed' },
    { label: 'Tomorrow', date: '2026-10-29', day: 'Thu' },
    { label: 'Fri, Oct 30', date: '2026-10-30', day: 'Fri' },
    { label: 'Sat, Oct 31', date: '2026-10-31', day: 'Sat' },
    { label: 'Sun, Nov 01', date: '2026-11-01', day: 'Sun' }
  ];
  const [selectedDate, setSelectedDate] = useState('2026-10-28');
  const [selectedTheater, setSelectedTheater] = useState<Theater>(THEATERS[0]);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime>(SHOWTIMES[0]);

  // Step 2: Seat matrix state
  // Rows: A (Recliner), B-D (Prime), E-H (Classic)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  const [selectedSeats, setSelectedSeats] = useState<{ id: string; type: 'recliner' | 'prime' | 'classic' | 'wheelchair'; price: number }[]>([
    { id: 'D5', type: 'prime', price: 18.00 },
    { id: 'D6', type: 'prime', price: 18.00 }
  ]);

  // Step 3: Concessions cart state
  const [concessionsCart, setConcessionsCart] = useState<{ [itemId: string]: number }>({
    'con-1': 1 // Default 1 popcorn for quick flow
  });

  // Step 4: Checkout state
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [customerName, setCustomerName] = useState('Alex Morgan');
  const [customerEmail, setCustomerEmail] = useState('alex.morgan@example.com');
  const [customerPhone, setCustomerPhone] = useState('+1 (555) 234-8971');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'apple-pay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Active step (1: Theater & Time, 2: Seats, 3: Snacks, 4: Checkout)
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Helpers for seats
  const getSeatType = (row: string, col: number): 'recliner' | 'prime' | 'classic' | 'wheelchair' => {
    if (row === 'A') return 'recliner';
    if (row === 'H' && (col === 1 || col === 12)) return 'wheelchair';
    if (['B', 'C', 'D'].includes(row)) return 'prime';
    return 'classic';
  };

  const getSeatPrice = (type: 'recliner' | 'prime' | 'classic' | 'wheelchair'): number => {
    if (type === 'recliner') return selectedShowtime.pricing.recliner;
    if (type === 'prime') return selectedShowtime.pricing.prime;
    return selectedShowtime.pricing.classic;
  };

  const toggleSeat = (seatId: string, row: string, col: number) => {
    // If seat is occupied in showtime, ignore
    if (selectedShowtime.occupiedSeats.includes(seatId)) return;

    const exists = selectedSeats.find(s => s.id === seatId);
    if (exists) {
      setSelectedSeats(prev => prev.filter(s => s.id !== seatId));
    } else {
      if (selectedSeats.length >= 8) {
        alert('You can select a maximum of 8 seats per booking.');
        return;
      }
      const type = getSeatType(row, col);
      const price = getSeatPrice(type);
      setSelectedSeats(prev => [...prev, { id: seatId, type, price }]);
    }
  };

  // Concessions helpers
  const handleUpdateConcession = (itemId: string, delta: number) => {
    setConcessionsCart(prev => {
      const current = prev[itemId] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[itemId];
        return copy;
      }
      return { ...prev, [itemId]: next };
    });
  };

  // Promo discount verification
  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'IMOVIE20' || code === 'SKILLWALLET') {
      const discount = 10.00;
      setDiscountAmount(discount);
      setPromoMessage({ type: 'success', text: `Promo code ${code} applied successfully! ($10.00 saved)` });
    } else if (code === 'STUDENT50') {
      const discount = 15.00;
      setDiscountAmount(discount);
      setPromoMessage({ type: 'success', text: 'Student discount applied! ($15.00 saved)' });
    } else {
      setDiscountAmount(0);
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try IMOVIE20 or SKILLWALLET' });
    }
  };

  // Calculations
  const seatsSubtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const concessionsSubtotal = Object.entries(concessionsCart).reduce((acc, [id, qty]) => {
    const item = CONCESSIONS.find(c => c.id === id);
    return acc + (item ? item.price * qty : 0);
  }, 0);
  const rawSubtotal = seatsSubtotal + concessionsSubtotal;
  const convenienceFee = selectedSeats.length > 0 ? 2.50 * selectedSeats.length : 0;
  const tax = (rawSubtotal - discountAmount) * 0.08;
  const totalAmount = Math.max(0, rawSubtotal + convenienceFee + tax - discountAmount);

  // Final booking submission
  const handleFinalCheckout = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const bookingId = `IMV-${Math.floor(10000 + Math.random() * 90000)}-${movie.certificate}`;
      
      const concessionsItems = Object.entries(concessionsCart).map(([id, qty]) => ({
        item: CONCESSIONS.find(c => c.id === id)!,
        quantity: qty
      })).filter(c => c.item !== undefined);

      const newBooking: Booking = {
        id: bookingId,
        bookingDate: new Date().toISOString(),
        movie,
        theater: selectedTheater,
        showtime: selectedShowtime,
        seats: selectedSeats,
        concessions: concessionsItems,
        subtotal: rawSubtotal,
        discount: discountAmount,
        promoCode: promoCode || undefined,
        convenienceFee,
        tax,
        totalAmount,
        customer: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone
        },
        paymentMethod,
        status: 'confirmed',
        qrData: `IMOVIES-VERIFIED-${bookingId}-${movie.title}-${selectedSeats.map(s => s.id).join(',')}`
      };

      setIsProcessing(false);
      onBookingComplete(newBooking);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-5 py-3.5 border-b border-neutral-800 bg-neutral-950 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base truncate max-w-md">
                {movie.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <span>{movie.certificate}</span>
                <span aria-hidden="true">·</span>
                <span>{movie.duration}</span>
                <span aria-hidden="true">·</span>
                <span className="text-rose-400 font-medium">{selectedShowtime.format}</span>
              </div>
            </div>
          </div>

          {/* Stepper Indicator */}
          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span className={`px-2.5 py-1 rounded-md font-medium ${step === 1 ? 'bg-rose-600 text-white' : 'text-neutral-400 bg-neutral-800'}`}>
              1. Showtimes
            </span>
            <span className="text-neutral-600">→</span>
            <span className={`px-2.5 py-1 rounded-md font-medium ${step === 2 ? 'bg-rose-600 text-white' : 'text-neutral-400 bg-neutral-800'}`}>
              2. Seats
            </span>
            <span className="text-neutral-600">→</span>
            <span className={`px-2.5 py-1 rounded-md font-medium ${step === 3 ? 'bg-rose-600 text-white' : 'text-neutral-400 bg-neutral-800'}`}>
              3. Snacks
            </span>
            <span className="text-neutral-600">→</span>
            <span className={`px-2.5 py-1 rounded-md font-medium ${step === 4 ? 'bg-rose-600 text-white' : 'text-neutral-400 bg-neutral-800'}`}>
              4. Pay
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm font-semibold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-6">

          {/* STEP 1: Date, Theater, Showtime */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Date Selector */}
              <div>
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2.5">
                  Select Date
                </label>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {dates.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`px-4 py-2.5 rounded-xl border text-center transition-all min-w-[90px] ${
                        selectedDate === d.date
                          ? 'bg-rose-600 border-rose-500 text-white shadow-md'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-[11px] font-medium opacity-80">{d.day}</div>
                      <div className="text-sm font-bold mt-0.5">{d.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Theater & Showtimes List */}
              <div className="space-y-4">
                <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                  Select Cinema & Showtime
                </label>
                
                {THEATERS.map((theater) => {
                  const theaterShowtimes = SHOWTIMES.filter(st => st.theaterId === theater.id);
                  const isSelectedTheater = selectedTheater.id === theater.id;

                  return (
                    <div
                      key={theater.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isSelectedTheater
                          ? 'bg-neutral-950 border-neutral-700'
                          : 'bg-neutral-950/60 border-neutral-800/80 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-800/80 mb-3">
                        <div>
                          <div className="font-bold text-white text-sm sm:text-base flex items-center gap-2">
                            <span>{theater.name}</span>
                            <span className="text-xs text-neutral-500 font-normal">({theater.distance})</span>
                          </div>
                          <div className="text-xs text-neutral-400 mt-0.5">{theater.location}</div>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400">
                          {theater.amenities.slice(0, 2).map(a => (
                            <span key={a} className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Showtime Buttons */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {theaterShowtimes.map((st) => {
                          const isSelectedShow = selectedShowtime.id === st.id && isSelectedTheater;
                          return (
                            <button
                              key={st.id}
                              onClick={() => {
                                setSelectedTheater(theater);
                                setSelectedShowtime(st);
                              }}
                              className={`px-3.5 py-2 rounded-xl border text-left transition-all ${
                                isSelectedShow
                                  ? 'bg-rose-600 border-rose-500 text-white shadow-md'
                                  : 'bg-neutral-900 border-neutral-800 text-neutral-200 hover:border-neutral-700'
                              }`}
                            >
                              <div className="text-xs font-bold font-mono">{st.time}</div>
                              <div className="text-[10px] opacity-80 mt-0.5 flex items-center gap-1">
                                <span>{st.format}</span>
                                <span>·</span>
                                <span>${st.pricing.prime.toFixed(2)}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* STEP 2: Interactive Seat Matrix */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Screen Curve Graphic */}
              <div className="relative text-center pt-2">
                <div className="w-4/5 max-w-lg h-3 mx-auto bg-gradient-to-r from-transparent via-rose-500 to-transparent rounded-full shadow-lg shadow-rose-500/20 mb-2"></div>
                <div className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono">
                  All Eyes This Way · Curved Laser Cinema Screen
                </div>
              </div>

              {/* Seat Matrix */}
              <div className="bg-neutral-950 p-4 sm:p-6 rounded-2xl border border-neutral-800/80 overflow-x-auto">
                <div className="min-w-[480px] space-y-2.5">
                  {rows.map((row) => (
                    <div key={row} className="flex items-center justify-center gap-2">
                      <span className="w-5 text-xs font-mono font-bold text-neutral-500 text-center">
                        {row}
                      </span>

                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: seatsPerRow }, (_, i) => i + 1).map((num) => {
                          const seatId = `${row}${num}`;
                          const isOccupied = selectedShowtime.occupiedSeats.includes(seatId);
                          const isSelected = selectedSeats.some(s => s.id === seatId);
                          const type = getSeatType(row, num);

                          // Aisle gap in middle
                          const hasAisleGap = num === 4 || num === 8;

                          let bgStyle = 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700';
                          if (isOccupied) bgStyle = 'bg-neutral-900 text-neutral-700 cursor-not-allowed border-neutral-900';
                          else if (isSelected) bgStyle = 'bg-rose-600 text-white font-bold shadow-md shadow-rose-600/40 border-rose-500';
                          else if (type === 'recliner') bgStyle = 'bg-amber-950/40 text-amber-200 border border-amber-600/40 hover:bg-amber-900/40';
                          else if (type === 'wheelchair') bgStyle = 'bg-blue-950/40 text-blue-300 border border-blue-500/40';

                          return (
                            <React.Fragment key={seatId}>
                              <button
                                onClick={() => toggleSeat(seatId, row, num)}
                                disabled={isOccupied}
                                title={`${seatId} - ${type.toUpperCase()} ($${getSeatPrice(type).toFixed(2)})`}
                                className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md text-[10px] font-mono flex items-center justify-center transition-all ${bgStyle}`}
                              >
                                {isSelected ? '✓' : num}
                              </button>
                              {hasAisleGap && <span className="w-3"></span>}
                            </React.Fragment>
                          );
                        })}
                      </div>

                      <span className="w-5 text-xs font-mono font-bold text-neutral-500 text-center">
                        {row}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Seat Legend */}
                <div className="flex flex-wrap items-center justify-center gap-4 pt-6 border-t border-neutral-800/80 mt-6 text-xs text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-neutral-800"></span>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-rose-600 text-white flex items-center justify-center text-[9px]">✓</span>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-neutral-900 border border-neutral-800"></span>
                    <span>Occupied</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-amber-950/60 border border-amber-600/50"></span>
                    <span>VIP Recliner ($24.50)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-neutral-800"></span>
                    <span>Prime Club ($18.00)</span>
                  </div>
                </div>
              </div>

              {/* Tally Bar */}
              <div className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-400">Selected Seats: </span>
                  <span className="font-bold text-white">
                    {selectedSeats.length > 0 ? selectedSeats.map(s => s.id).join(', ') : 'None selected'}
                  </span>
                  <span className="text-neutral-500 ml-1">({selectedSeats.length} seats)</span>
                </div>
                <div className="text-sm font-bold text-rose-400 font-mono">
                  ${seatsSubtotal.toFixed(2)}
                </div>
              </div>

            </div>
          )}

          {/* STEP 3: Concessions & Snack Add-ons */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                <div>
                  <h4 className="text-base font-bold text-white">Grab Cinema Snacks & Combos</h4>
                  <p className="text-xs text-neutral-400">
                    Fresh gourmet popcorn, nachos, and refreshing drink combos delivered to your seat.
                  </p>
                </div>
                <span className="text-xs text-rose-400 font-mono font-semibold">
                  Optional Add-on
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONCESSIONS.map((item) => {
                  const qty = concessionsCart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center gap-3.5 hover:border-neutral-700 transition-colors"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-lg object-cover shrink-0 bg-neutral-900"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h5 className="font-bold text-white text-xs truncate">{item.name}</h5>
                          {item.badge && (
                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded font-medium shrink-0">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-mono text-xs font-bold text-rose-400">
                            ${item.price.toFixed(2)}
                          </span>

                          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-0.5">
                            <button
                              onClick={() => handleUpdateConcession(item.id, -1)}
                              className="text-neutral-400 hover:text-white px-1 text-xs"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-white w-4 text-center">
                              {qty}
                            </span>
                            <button
                              onClick={() => handleUpdateConcession(item.id, 1)}
                              className="text-neutral-400 hover:text-white px-1 text-xs"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: Checkout, Promo & Payment */}
          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Left: Contact Info & Payment Options (7 cols) */}
                <div className="md:col-span-7 space-y-4">
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                    <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Contact Information for E-Ticket Delivery
                    </h5>
                    
                    <div className="space-y-2">
                      <div>
                        <label className="text-[11px] text-neutral-400 block mb-1">Full Name</label>
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">Email Address</label>
                          <input
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-neutral-400 block mb-1">Mobile Number</label>
                          <input
                            type="tel"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                    <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Select Payment Method
                    </h5>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-rose-600/20 border-rose-500 text-white font-medium'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <CreditCard className="w-4 h-4 mx-auto mb-1 text-rose-400" />
                        <span className="text-xs">Credit/Debit</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-rose-600/20 border-rose-500 text-white font-medium'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 mx-auto mb-1 text-emerald-400" />
                        <span className="text-xs">Instant UPI</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          paymentMethod === 'apple-pay'
                            ? 'bg-rose-600/20 border-rose-500 text-white font-medium'
                            : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                        }`}
                      >
                        <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                        <span className="text-xs">Apple/GPay</span>
                      </button>
                    </div>

                    <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>256-bit encrypted checkout. Safe & verified transaction.</span>
                    </div>
                  </div>
                </div>

                {/* Right: Order Summary & Coupon (5 cols) */}
                <div className="md:col-span-5 space-y-4">
                  <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3">
                    <h5 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Order Summary
                    </h5>

                    {/* Movie info line */}
                    <div className="text-xs pb-3 border-b border-neutral-800">
                      <div className="font-bold text-white">{movie.title}</div>
                      <div className="text-neutral-400 mt-0.5">
                        {selectedTheater.name} · {selectedShowtime.format}
                      </div>
                      <div className="text-rose-400 font-mono mt-0.5">
                        {selectedDate} at {selectedShowtime.time}
                      </div>
                    </div>

                    {/* Calculation breakdown */}
                    <div className="space-y-1.5 text-xs text-neutral-400">
                      <div className="flex justify-between">
                        <span>{selectedSeats.length}x Tickets ({selectedSeats.map(s => s.id).join(', ')})</span>
                        <span className="font-mono text-white">${seatsSubtotal.toFixed(2)}</span>
                      </div>

                      {concessionsSubtotal > 0 && (
                        <div className="flex justify-between">
                          <span>Concessions & Snacks</span>
                          <span className="font-mono text-white">${concessionsSubtotal.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between">
                        <span>Convenience Fee</span>
                        <span className="font-mono text-white">${convenienceFee.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between">
                        <span>Integrated Tax (8%)</span>
                        <span className="font-mono text-white">${tax.toFixed(2)}</span>
                      </div>

                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-semibold">
                          <span>Discount Applied</span>
                          <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="pt-3 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                        <span>Total Payable Amount</span>
                        <span className="font-mono text-rose-400 text-base">
                          ${totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Coupon Input */}
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          placeholder="Promo Code (e.g. IMOVIE20)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs text-white uppercase placeholder-neutral-500 flex-1 focus:outline-none"
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg text-xs font-semibold"
                        >
                          Apply
                        </button>
                      </div>

                      {promoMessage && (
                        <div className={`text-[11px] mt-1.5 ${promoMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {promoMessage.text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Bar */}
        <div className="px-5 py-3.5 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 rounded-xl text-xs font-medium transition-colors"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-neutral-400">Total Price</div>
              <div className="text-sm font-bold text-white font-mono">
                ${totalAmount.toFixed(2)}
              </div>
            </div>

            {step < 4 ? (
              <button
                onClick={() => {
                  if (step === 2 && selectedSeats.length === 0) {
                    alert('Please select at least 1 seat to continue.');
                    return;
                  }
                  setStep((step + 1) as any);
                }}
                className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-md shadow-rose-600/30"
              >
                <span>Continue</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinalCheckout}
                disabled={isProcessing}
                className="px-6 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 shadow-md shadow-rose-600/30 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Generating E-Ticket...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ${totalAmount.toFixed(2)} & Get Ticket</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
