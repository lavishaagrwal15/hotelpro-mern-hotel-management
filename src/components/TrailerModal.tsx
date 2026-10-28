import React, { useRef, useState } from 'react';
import { Movie } from '../types';
import { Film, Ticket, X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  onBookNow: (movie: Movie) => void;
}

export const TrailerModal: React.FC<Props> = ({
  isOpen,
  onClose,
  movie,
  onBookNow
}) => {
  if (!isOpen || !movie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 bg-neutral-950">
          <div className="flex items-center gap-2.5">
            <Film className="w-4 h-4 text-rose-500" />
            <h3 className="font-bold text-white text-sm sm:text-base truncate">
              {movie.title} — Official 4K Trailer
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onBookNow(movie);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Ticket className="w-3.5 h-3.5" />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm font-semibold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          <video
            src={movie.trailerUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          >
            Your browser does not support HTML5 video.
          </video>
        </div>

        {/* Footer with movie synopsis */}
        <div className="p-4 bg-neutral-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <div>
            <span className="text-white font-medium">{movie.genres.join(', ')}</span> · <span>Directed by {movie.director}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-neutral-300">
            <span>Certificate: {movie.certificate}</span>
            <span>·</span>
            <span>Duration: {movie.duration}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
