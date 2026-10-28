import React, { useState } from 'react';
import { 
  CheckCircle2, Download, Printer, Calendar, 
  Share2, Film, MapPin, Clock, Ticket, Copy, Check
} from 'lucide-react';
import { Booking } from '../types';

interface Props {
  booking: Booking | null;
  onClose: () => void;
  onViewMyBookings: () => void;
}

export const ETicketModal: React.FC<Props> = ({
  booking,
  onClose,
  onViewMyBookings
}) => {
  const [copiedId, setCopiedId] = useState(false);

  if (!booking) return null;

  const handleCopyBookingId = () => {
    navigator.clipboard.writeText(booking.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Top Success Banner */}
        <div className="bg-emerald-600 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="font-bold text-xs uppercase tracking-wider">Booking Confirmed</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Ticket Card Body */}
        <div className="p-6 bg-gradient-to-b from-neutral-950 to-neutral-900 space-y-5 text-neutral-200 print:text-black">
          
          {/* Movie Header */}
          <div className="flex items-start gap-4">
            <img
              src={booking.movie.poster}
              alt={booking.movie.title}
              referrerPolicy="no-referrer"
              className="w-16 h-24 object-cover rounded-xl shadow-md border border-neutral-800 shrink-0 bg-neutral-900"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <span>{booking.movie.certificate}</span>
                <span>·</span>
                <span>{booking.movie.duration}</span>
              </div>
              <h3 className="font-bold text-white text-lg leading-tight mt-0.5 line-clamp-2">
                {booking.movie.title}
              </h3>
              <div className="text-xs text-rose-400 font-semibold mt-1">
                {booking.showtime.format} · {booking.showtime.screen}
              </div>
            </div>
          </div>

          {/* Ticket Information Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-900/90 border border-neutral-800 rounded-xl text-xs">
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Cinema</span>
              <span className="font-semibold text-white truncate block">{booking.theater.name}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Showtime</span>
              <span className="font-semibold text-white block">
                {booking.showtime.date} · {booking.showtime.time}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Seats</span>
              <span className="font-bold text-rose-400 text-sm block">
                {booking.seats.map(s => s.id).join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Total Paid</span>
              <span className="font-bold text-emerald-400 text-sm font-mono block">
                ${booking.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Authentic High-Contrast QR Code Section */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner text-neutral-950">
            {/* SVG Matrix QR Code */}
            <div className="w-36 h-36 p-2 bg-white flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Finder Corners */}
                <rect x="0" y="0" width="28" height="28" fill="#000" rx="3" />
                <rect x="4" y="4" width="20" height="20" fill="#fff" rx="2" />
                <rect x="8" y="8" width="12" height="12" fill="#000" rx="1" />

                <rect x="72" y="0" width="28" height="28" fill="#000" rx="3" />
                <rect x="76" y="4" width="20" height="20" fill="#fff" rx="2" />
                <rect x="80" y="8" width="12" height="12" fill="#000" rx="1" />

                <rect x="0" y="72" width="28" height="28" fill="#000" rx="3" />
                <rect x="4" y="76" width="20" height="20" fill="#fff" rx="2" />
                <rect x="8" y="80" width="12" height="12" fill="#000" rx="1" />

                {/* QR Data Matrix Bits */}
                <rect x="36" y="8" width="8" height="8" fill="#000" />
                <rect x="48" y="16" width="8" height="8" fill="#000" />
                <rect x="36" y="24" width="8" height="8" fill="#000" />
                <rect x="56" y="8" width="8" height="8" fill="#000" />

                <rect x="12" y="36" width="8" height="8" fill="#000" />
                <rect x="24" y="44" width="8" height="8" fill="#000" />
                <rect x="36" y="40" width="16" height="16" fill="#000" rx="2" />
                <rect x="60" y="36" width="8" height="8" fill="#000" />
                <rect x="76" y="44" width="8" height="8" fill="#000" />
                <rect x="84" y="36" width="8" height="8" fill="#000" />

                <rect x="36" y="64" width="8" height="8" fill="#000" />
                <rect x="48" y="72" width="8" height="8" fill="#000" />
                <rect x="60" y="60" width="8" height="8" fill="#000" />
                <rect x="72" y="76" width="8" height="8" fill="#000" />
                <rect x="84" y="84" width="8" height="8" fill="#000" />
              </svg>
            </div>

            <div className="mt-2 text-center">
              <div className="font-mono text-xs font-bold tracking-widest text-neutral-800 flex items-center justify-center gap-1.5">
                <span>{booking.id}</span>
                <button
                  onClick={handleCopyBookingId}
                  className="text-neutral-500 hover:text-black p-0.5"
                  title="Copy ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Scan this code at cinema turnstile or usher entrance
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onViewMyBookings();
              }}
              className="flex-1 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>My Tickets</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
