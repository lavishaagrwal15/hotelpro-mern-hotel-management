import React, { useState } from 'react';
import { 
  Users, Hotel, CheckCircle2, Clock, AlertCircle, 
  Search, ArrowUpDown, Filter, QrCode, Sparkles
} from 'lucide-react';
import { HotelReservation, Room } from '../../types/hotel';

interface Props {
  reservations: HotelReservation[];
  rooms: Room[];
  onUpdateStatus: (reservationId: string, newStatus: HotelReservation['status']) => void;
  onViewVoucher: (reservation: HotelReservation) => void;
  onBookNewRoom: () => void;
}

export const HotelStaffDashboard: React.FC<Props> = ({
  reservations,
  rooms,
  onUpdateStatus,
  onViewVoucher,
  onBookNewRoom
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled'>('all');

  const totalOccupied = reservations.filter(r => r.status === 'checked-in' || r.status === 'confirmed').length;
  const occupancyPercentage = Math.round((totalOccupied / 18) * 100);
  const totalRevenue = reservations.reduce((acc, r) => r.status !== 'cancelled' ? acc + r.totalAmount : acc, 0);

  const filteredReservations = reservations.filter(r => {
    if (statusFilter !== 'all' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.guestName.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.roomName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-rose-500/10 text-rose-400 border border-rose-500/20 px-2 py-0.5 rounded font-mono">
              Staff & Operations Console
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mt-1">
            HotelPro Operations & Reservations Hub
          </h2>
          <p className="text-xs text-neutral-400">
            Real-time occupancy tracking, contactless QR guest check-in, and reservation life-cycle control.
          </p>
        </div>

        <button
          onClick={onBookNewRoom}
          className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow transition-colors flex items-center gap-1.5 self-start"
        >
          <span>+ New Guest Reservation</span>
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-xs text-neutral-400">Occupancy Rate</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">{occupancyPercentage}%</div>
          <div className="text-[11px] text-neutral-500">14 of 18 Luxury Suites Booked</div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-xs text-neutral-400">Active Checked-In</div>
          <div className="text-2xl font-bold font-mono text-white">
            {reservations.filter(r => r.status === 'checked-in').length}
          </div>
          <div className="text-[11px] text-neutral-500">Guests currently on property</div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-xs text-neutral-400">Arrivals Pending</div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {reservations.filter(r => r.status === 'confirmed').length}
          </div>
          <div className="text-[11px] text-neutral-500">Check-ins expected today</div>
        </div>

        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
          <div className="text-xs text-neutral-400">Total Bookings Revenue</div>
          <div className="text-2xl font-bold font-mono text-rose-400">
            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-neutral-500">Processed via HotelPro API</div>
        </div>

      </div>

      {/* Reservations Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
        
        {/* Table Filter Bar */}
        <div className="p-4 border-b border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="w-full md:max-w-xs relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by guest name or reservation ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-950 border border-neutral-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {(['all', 'confirmed', 'checked-in', 'checked-out', 'cancelled'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 text-xs rounded-lg font-medium capitalize transition-colors whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-rose-600 text-white'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Table Elements */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-950 text-neutral-400 uppercase font-mono text-[10px] tracking-wider border-b border-neutral-800">
              <tr>
                <th className="py-3 px-4">Reservation ID</th>
                <th className="py-3 px-4">Guest</th>
                <th className="py-3 px-4">Room & Suite</th>
                <th className="py-3 px-4">Stay Dates</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/80">
              {filteredReservations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-neutral-500">
                    No reservations match the specified search query or filter.
                  </td>
                </tr>
              ) : (
                filteredReservations.map((res) => {
                  let statusBadge = 'bg-neutral-800 text-neutral-300 border-neutral-700';
                  if (res.status === 'confirmed') statusBadge = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
                  if (res.status === 'checked-in') statusBadge = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
                  if (res.status === 'cancelled') statusBadge = 'bg-rose-500/10 text-rose-300 border-rose-500/30';

                  return (
                    <tr key={res.id} className="hover:bg-neutral-950/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        {res.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-white">{res.guestName}</div>
                        <div className="text-[11px] text-neutral-400">{res.guestEmail}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-neutral-200 font-medium">{res.roomName}</div>
                        <div className="text-[10px] text-rose-400">{res.roomType}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-neutral-300">
                        <div>{res.checkInDate} → {res.checkOutDate}</div>
                        <div className="text-[10px] text-neutral-500">{res.nights} Nights · {res.adults} Guests</div>
                      </td>
                      <td className="py-3 px-4 font-mono font-bold text-emerald-400">
                        ${res.totalAmount.toFixed(2)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border ${statusBadge}`}>
                          {res.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onViewVoucher(res)}
                            className="p-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                            title="View QR Voucher"
                          >
                            <QrCode className="w-3.5 h-3.5 text-rose-400" />
                          </button>

                          {res.status === 'confirmed' && (
                            <button
                              onClick={() => onUpdateStatus(res.id, 'checked-in')}
                              className="px-2 py-1 rounded bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-[11px] font-medium"
                            >
                              Check-In
                            </button>
                          )}

                          {res.status === 'checked-in' && (
                            <button
                              onClick={() => onUpdateStatus(res.id, 'checked-out')}
                              className="px-2 py-1 rounded bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-[11px] font-medium"
                            >
                              Check-Out
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
