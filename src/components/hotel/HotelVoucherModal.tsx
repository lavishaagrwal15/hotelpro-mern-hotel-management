import React, { useState } from 'react';
import { 
  CheckCircle2, Printer, Calendar, Clock, MapPin, 
  Copy, Check, Hotel, Bed, ShieldCheck, Download
} from 'lucide-react';
import { HotelReservation } from '../../types/hotel';

interface Props {
  reservation: HotelReservation | null;
  onClose: () => void;
  onViewStaffHub: () => void;
}

export const HotelVoucherModal: React.FC<Props> = ({
  reservation,
  onClose,
  onViewStaffHub
}) => {
  const [copiedId, setCopiedId] = useState(false);

  if (!reservation) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(reservation.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700 rounded-3xl w-full max-w-md shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Top Banner */}
        <div className="bg-emerald-600 px-5 py-3 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="font-bold text-xs uppercase tracking-wider">Hotel Voucher Confirmed</span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-xs font-bold"
          >
            ✕
          </button>
        </div>

        {/* Card Body */}
        <div className="p-6 bg-gradient-to-b from-neutral-950 to-neutral-900 space-y-4 text-neutral-200">
          
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-800">
            <div>
              <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">
                HotelPro Luxury Resort
              </div>
              <h3 className="font-bold text-white text-lg mt-0.5">
                {reservation.roomName}
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Guest: <strong className="text-white">{reservation.guestName}</strong>
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0">
              <Hotel className="w-5 h-5 text-rose-500" />
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-neutral-900/90 border border-neutral-800 rounded-xl text-xs">
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Check-In</span>
              <span className="font-semibold text-white block">{reservation.checkInDate}</span>
              <span className="text-[10px] text-neutral-400">From 3:00 PM</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Check-Out</span>
              <span className="font-semibold text-white block">{reservation.checkOutDate}</span>
              <span className="text-[10px] text-neutral-400">Until 12:00 PM</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Stay Length</span>
              <span className="font-bold text-rose-400 text-xs block">
                {reservation.nights} {reservation.nights === 1 ? 'Night' : 'Nights'} ({reservation.adults} Guests)
              </span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-neutral-500 font-medium block">Total Paid</span>
              <span className="font-bold text-emerald-400 text-sm font-mono block">
                ${reservation.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Scannable Reception QR Code */}
          <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-inner text-neutral-950">
            <div className="w-32 h-32 p-1.5 bg-white flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="0" y="0" width="28" height="28" fill="#000" rx="3" />
                <rect x="4" y="4" width="20" height="20" fill="#fff" rx="2" />
                <rect x="8" y="8" width="12" height="12" fill="#000" rx="1" />

                <rect x="72" y="0" width="28" height="28" fill="#000" rx="3" />
                <rect x="76" y="4" width="20" height="20" fill="#fff" rx="2" />
                <rect x="80" y="8" width="12" height="12" fill="#000" rx="1" />

                <rect x="0" y="72" width="28" height="28" fill="#000" rx="3" />
                <rect x="4" y="76" width="20" height="20" fill="#fff" rx="2" />
                <rect x="8" y="80" width="12" height="12" fill="#000" rx="1" />

                <rect x="36" y="12" width="8" height="8" fill="#000" />
                <rect x="48" y="8" width="8" height="8" fill="#000" />
                <rect x="56" y="16" width="8" height="8" fill="#000" />
                <rect x="20" y="40" width="8" height="8" fill="#000" />
                <rect x="36" y="36" width="16" height="16" fill="#000" rx="2" />
                <rect x="64" y="44" width="8" height="8" fill="#000" />
                <rect x="40" y="68" width="8" height="8" fill="#000" />
                <rect x="52" y="76" width="8" height="8" fill="#000" />
                <rect x="68" y="68" width="8" height="8" fill="#000" />
              </svg>
            </div>

            <div className="mt-2 text-center">
              <div className="font-mono text-xs font-bold tracking-widest text-neutral-800 flex items-center justify-center gap-1.5">
                <span>{reservation.id}</span>
                <button
                  onClick={handleCopyId}
                  className="text-neutral-500 hover:text-black p-0.5"
                  title="Copy ID"
                >
                  {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[10px] text-neutral-500 mt-0.5">
                Scan this voucher at the reception desk for instant contactless check-in
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handlePrint}
              className="flex-1 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Voucher</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onViewStaffHub();
              }}
              className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/30"
            >
              <span>Operations Hub</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
