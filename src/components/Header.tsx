import React from 'react';
import { Hotel, Film, Video, GitBranch, Sparkles, Building, Users, Calendar } from 'lucide-react';

interface Props {
  projectMode: 'hotelpro' | 'imovies';
  onProjectModeChange: (mode: 'hotelpro' | 'imovies') => void;
  hotelTab: 'rooms' | 'operations';
  onHotelTabChange: (tab: 'rooms' | 'operations') => void;
  movieTab: 'now-playing' | 'upcoming' | 'cinemas' | 'my-bookings';
  onMovieTabChange: (tab: 'now-playing' | 'upcoming' | 'cinemas' | 'my-bookings') => void;
  onOpenDemoVideo: () => void;
  onOpenGitHubRepo: () => void;
  onOpenSkillWalletModal: () => void;
}

export const Header: React.FC<Props> = ({
  projectMode,
  onProjectModeChange,
  hotelTab,
  onHotelTabChange,
  movieTab,
  onMovieTabChange,
  onOpenDemoVideo,
  onOpenGitHubRepo,
  onOpenSkillWalletModal
}) => {
  return (
    <header className="sticky top-0 z-30 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Single text element wordmark with Brand Icon */}
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-600/30">
              {projectMode === 'hotelpro' ? <Hotel className="w-4 h-4" /> : <Film className="w-4 h-4" />}
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white leading-tight">
                {projectMode === 'hotelpro' ? 'HotelPro' : 'IMovies'}
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">
                {projectMode === 'hotelpro' ? 'Hotel Booking & Operations' : 'Cinema Ticket Booking'}
              </span>
            </div>
          </div>

          {/* Project Switcher Segmented Control */}
          <div className="hidden sm:flex items-center p-0.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs ml-2">
            <button
              onClick={() => onProjectModeChange('hotelpro')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                projectMode === 'hotelpro'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Hotel className="w-3 h-3" />
              <span>HotelPro</span>
            </button>
            <button
              onClick={() => onProjectModeChange('imovies')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                projectMode === 'imovies'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Film className="w-3 h-3" />
              <span>IMovies</span>
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-400">
          {projectMode === 'hotelpro' ? (
            <>
              <button
                onClick={() => onHotelTabChange('rooms')}
                className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  hotelTab === 'rooms' ? 'text-white' : 'hover:text-neutral-200'
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <span>Rooms & Suites</span>
              </button>
              <button
                onClick={() => onHotelTabChange('operations')}
                className={`whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  hotelTab === 'operations' ? 'text-white' : 'hover:text-neutral-200'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Staff & Operations Hub</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onMovieTabChange('now-playing')}
                className={`whitespace-nowrap transition-colors ${
                  movieTab === 'now-playing' ? 'text-white' : 'hover:text-neutral-200'
                }`}
              >
                Now Showing
              </button>
              <button
                onClick={() => onMovieTabChange('cinemas')}
                className={`whitespace-nowrap transition-colors ${
                  movieTab === 'cinemas' ? 'text-white' : 'hover:text-neutral-200'
                }`}
              >
                Cinemas
              </button>
              <button
                onClick={() => onMovieTabChange('my-bookings')}
                className={`whitespace-nowrap transition-colors ${
                  movieTab === 'my-bookings' ? 'text-white' : 'hover:text-neutral-200'
                }`}
              >
                My Tickets
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenDemoVideo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-medium transition-colors whitespace-nowrap"
            title="Watch Demo Video"
          >
            <Video className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">Demo Video</span>
          </button>

          <button
            onClick={onOpenGitHubRepo}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-medium transition-colors whitespace-nowrap"
            title="GitHub Repository"
          >
            <GitBranch className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">GitHub</span>
          </button>

          <button
            onClick={onOpenSkillWalletModal}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-sm transition-colors whitespace-nowrap"
          >
            Submit Project
          </button>
        </div>

      </div>
    </header>
  );
};
