import React, { useState } from 'react';
import { Star, Play, Ticket, Clock, Filter } from 'lucide-react';
import { Movie, MovieFormat } from '../types';

interface Props {
  movies: Movie[];
  onBookNow: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
  selectedGenre: string;
  onSelectGenre: (genre: string) => void;
  selectedFormat: string;
  onSelectFormat: (format: string) => void;
}

export const MovieCatalog: React.FC<Props> = ({
  movies,
  onBookNow,
  onWatchTrailer,
  selectedGenre,
  onSelectGenre,
  selectedFormat,
  onSelectFormat
}) => {
  const genres = ['All', 'Action', 'Sci-Fi', 'Adventure', 'Drama', 'Thriller', 'Animation'];
  const formats = ['All Formats', 'IMAX 3D', 'Dolby Atmos', '4DX', 'Standard 2D'];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      
      {/* Section Header & Interactive Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Now Playing in Theaters</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Select your preferred film, reserve certified cinema seats, and enjoy real-time availability.
          </p>
        </div>

        {/* Filter Controls (Segmented buttons) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Genre Filter Tabs */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
            {genres.map((g) => (
              <button
                key={g}
                onClick={() => onSelectGenre(g)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  selectedGenre === g
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Format Select Dropdown */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1 text-xs text-neutral-300">
            <select
              value={selectedFormat}
              onChange={(e) => onSelectFormat(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-xs text-neutral-200"
            >
              {formats.map((fmt) => (
                <option key={fmt} value={fmt} className="bg-neutral-900 text-white">
                  {fmt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {movies.length === 0 ? (
        <div className="text-center py-16 bg-neutral-900/40 border border-neutral-800 rounded-2xl p-6">
          <p className="text-sm text-neutral-400">No movies match your selected filter criteria.</p>
          <button
            onClick={() => {
              onSelectGenre('All');
              onSelectFormat('All Formats');
            }}
            className="mt-3 text-xs text-rose-400 hover:text-rose-300 underline font-medium"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-neutral-900/80 border border-neutral-800/80 rounded-2xl overflow-hidden flex flex-col group hover:border-neutral-700 transition-all duration-200 hover:-translate-y-1 shadow-lg"
            >
              {/* Poster Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Certificate overlay at top-right */}
                <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-sm border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-200">
                  {movie.certificate}
                </div>

                {/* Hover Play Trailer Button */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={() => onWatchTrailer(movie)}
                    className="w-12 h-12 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    title="Watch Trailer"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Movie Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-1.5">
                    <span>{movie.genres.slice(0, 2).join(' / ')}</span>
                    <span aria-hidden="true">·</span>
                    <span>{movie.duration}</span>
                  </div>

                  <h3 className="font-bold text-white text-base leading-snug line-clamp-1 group-hover:text-rose-400 transition-colors">
                    {movie.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <div className="flex items-center gap-1 text-amber-400 font-mono font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{movie.rating}</span>
                    </div>
                    <span className="text-neutral-500">·</span>
                    <span className="text-neutral-400 text-[11px]">{movie.reviewCount} votes</span>
                  </div>
                </div>

                {/* Formats Strip */}
                <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-400 overflow-hidden">
                  {movie.formats.map((fmt) => (
                    <span key={fmt} className="bg-neutral-950 border border-neutral-800 px-1.5 py-0.5 rounded whitespace-nowrap">
                      {fmt}
                    </span>
                  ))}
                </div>

                {/* Booking Button */}
                <div className="pt-2 border-t border-neutral-800/80">
                  <button
                    onClick={() => onBookNow(movie)}
                    className="w-full py-2 bg-neutral-800 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Book Tickets</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </section>
  );
};
