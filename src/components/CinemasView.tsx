import React from 'react';
import { MapPin, Film, Sparkles, Navigation, Check } from 'lucide-react';
import { THEATERS, MOVIES } from '../data/moviesData';
import { Movie } from '../types';

interface Props {
  onBookMovie: (movie: Movie) => void;
}

export const CinemasView: React.FC<Props> = ({ onBookMovie }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      <div className="pb-4 border-b border-neutral-800">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <MapPin className="w-6 h-6 text-rose-500" />
          <span>Certified Partner Cinemas & Formats</span>
        </h2>
        <p className="text-xs text-neutral-400 mt-0.5">
          Equipped with laser IMAX, 64-channel Dolby Atmos spatial audio, and premium recliners.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {THEATERS.map((theater) => (
          <div
            key={theater.id}
            className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-lg">{theater.name}</h3>
                  <div className="text-xs text-neutral-400 flex items-center gap-1 mt-1">
                    <Navigation className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{theater.location} ({theater.distance})</span>
                  </div>
                </div>
              </div>

              {/* Formats Strip */}
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1.5 font-semibold">
                  Projection & Sound Formats
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {theater.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <span className="text-[11px] text-neutral-500 uppercase tracking-wider block mb-1.5 font-semibold">
                  Cinema Amenities
                </span>
                <ul className="space-y-1 text-xs text-neutral-400">
                  {theater.amenities.map((item) => (
                    <li key={item} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-5 border-t border-neutral-800/80 mt-5">
              <button
                onClick={() => onBookMovie(MOVIES[0])}
                className="w-full py-2 bg-neutral-800 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Film className="w-3.5 h-3.5" />
                <span>View Now Showing Schedules</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
