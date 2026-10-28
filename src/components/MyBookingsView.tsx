import React, { useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, QrCode, Trash2, AlertCircle } from 'lucide-react';
import { Booking } from '../types';

interface Props {
  bookings: Booking[];
  onSelectBooking: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onBrowseMovies: () => void;
}

export const MyBookingsView: React.FC<Props> = ({
  bookings,
  onSelectBooking,
  onCancelBooking,
  onBrowseMovies
}) => {
  const [filter, setFilter] = useState<'all' | 'active' | 'cancelled'>('all');

  const filtered = bookings.filter(b => {
    if (filter === 'active') return b.status === 'confirmed';
    if (filter === 'cancelled') return b.status === 'cancelled';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Ticket className="w-6 h-6 text-rose-500" />
            <span>My Movie Tickets</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your reserved cinema seats, view entry QR codes, or request instant refunds.
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg self-start">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'active' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('cancelled')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filter === 'cancelled' ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-neutral-500 mx-auto flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">No tickets found</h4>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            You don't have any bookings matching this criteria yet. Browse blockbusters and book your cinema seats now!
          </p>
          <button
            onClick={onBrowseMovies}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-xl shadow transition-colors inline-block"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((booking) => {
            const isConfirmed = booking.status === 'confirmed';

            return (
              <div
                key={booking.id}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-md"
              >
                <div className="flex gap-4">
                  <img
                    src={booking.movie.poster}
                    alt={booking.movie.title}
                    referrerPolicy="no-referrer"
                    className="w-20 h-28 object-cover rounded-xl border border-neutral-800 shrink-0 bg-neutral-950"
                  />
                  
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[11px] font-mono text-neutral-400">
                        {booking.id}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isConfirmed 
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}>
                        {isConfirmed ? 'Confirmed' : 'Cancelled & Refunded'}
                      </span>
                    </div>

                    <h4 className="font-bold text-white text-base truncate">
                      {booking.movie.title}
                    </h4>

                    <div className="text-xs text-rose-400 font-medium">
                      {booking.theater.name}
                    </div>

                    <div className="text-xs text-neutral-400 flex items-center gap-1.5 pt-1">
                      <span>{booking.showtime.date}</span>
                      <span>·</span>
                      <span className="text-white font-medium">{booking.showtime.time}</span>
                      <span>·</span>
                      <span className="font-mono bg-neutral-800 px-1.5 py-0.2 rounded text-[10px]">
                        {booking.showtime.format}
                      </span>
                    </div>

                    <div className="text-xs text-neutral-300 pt-1">
                      Seats: <strong className="text-rose-400">{booking.seats.map(s => s.id).join(', ')}</strong>
                      <span className="text-neutral-500 ml-2">(${booking.totalAmount.toFixed(2)})</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-neutral-800/80">
                  <button
                    onClick={() => onSelectBooking(booking)}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View Digital QR Pass</span>
                  </button>

                  {isConfirmed && (
                    <button
                      onClick={() => {
                        if (confirm(`Cancel reservation for ${booking.movie.title}? A full refund of $${booking.totalAmount.toFixed(2)} will be initiated.`)) {
                          onCancelBooking(booking.id);
                        }
                      }}
                      className="text-xs text-neutral-500 hover:text-rose-400 transition-colors flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
