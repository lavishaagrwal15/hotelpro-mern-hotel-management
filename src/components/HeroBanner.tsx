import React from 'react';
import { Play, Ticket, Star, Sparkles, Clock, Calendar } from 'lucide-react';
import { Movie } from '../types';

interface Props {
  movie: Movie;
  onBookNow: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
}

export const HeroBanner: React.FC<Props> = ({
  movie,
  onBookNow,
  onWatchTrailer
}) => {
  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-800">
      {/* Background Backdrop with Gradient Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={movie.backdrop}
          alt={movie.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        
        {/* Left Column: Movie Info */}
        <div className="flex-1 max-w-2xl space-y-4">
          
          {/* Clean Unboxed Metadata */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-neutral-400">
            <span className="text-rose-400 font-semibold tracking-wider uppercase">Featured Premiere</span>
            <span aria-hidden="true">·</span>
            <span>{movie.releaseYear}</span>
            <span aria-hidden="true">·</span>
            <span>{movie.certificate}</span>
            <span aria-hidden="true">·</span>
            <span>{movie.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="text-neutral-300">{movie.genres.join(', ')}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
            {movie.title}
          </h1>

          {/* Tagline */}
          <p className="text-base sm:text-lg text-neutral-300 italic font-normal">
            "{movie.tagline}"
          </p>

          {/* Synopsis */}
          <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
            {movie.synopsis}
          </p>

          {/* Formats & Rating Info */}
          <div className="flex items-center flex-wrap gap-6 pt-2 text-xs">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <div>
                <div className="font-bold text-white text-sm font-mono">{movie.rating} / 10</div>
                <div className="text-[11px] text-neutral-400">{movie.reviewCount} verified ratings</div>
              </div>
            </div>

            {/* Formats Available */}
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">Available in:</span>
              <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                {movie.formats.map((fmt) => (
                  <span key={fmt} className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-[11px]">
                    {fmt}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center flex-wrap gap-3 pt-3">
            <button
              onClick={() => onBookNow(movie)}
              className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm transition-all flex items-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95"
            >
              <Ticket className="w-4 h-4" />
              <span>Book Tickets</span>
            </button>

            <button
              onClick={() => onWatchTrailer(movie)}
              className="px-5 py-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 border border-neutral-700/80 text-sm font-medium transition-all flex items-center gap-2 active:scale-95"
            >
              <Play className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>Watch Trailer</span>
            </button>
          </div>

        </div>

        {/* Right Column: Poster Card */}
        <div className="w-48 sm:w-60 md:w-72 shrink-0 relative group">
          <div className="relative rounded-2xl overflow-hidden border border-neutral-700/60 shadow-2xl transition-all duration-300 group-hover:border-rose-500/50">
            <img
              src={movie.poster}
              alt={movie.title}
              referrerPolicy="no-referrer"
              className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
              <button
                onClick={() => onWatchTrailer(movie)}
                className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Trailer</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
