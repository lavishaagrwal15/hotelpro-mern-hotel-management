import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, 
  Hotel, Sparkles, Copy, Check, ChevronRight, 
  Building, Users, Calendar, ShieldCheck
} from 'lucide-react';
import { HOTEL_DEMO_CHAPTERS } from '../../data/hotelProData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  onNavigateToBooking: () => void;
}

export const HotelDemoVideoModal: React.FC<Props> = ({
  isOpen,
  onClose,
  demoUrl,
  onNavigateToBooking
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [copiedLink, setCopiedLink] = useState(false);
  const totalDuration = 105;

  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        const next = prev + 0.25 * playbackSpeed;
        if (next >= totalDuration) {
          setIsPlaying(false);
          return totalDuration;
        }
        return next;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed, totalDuration]);

  useEffect(() => {
    let matchedIndex = 0;
    for (let i = HOTEL_DEMO_CHAPTERS.length - 1; i >= 0; i--) {
      if (currentTime >= HOTEL_DEMO_CHAPTERS[i].seconds) {
        matchedIndex = i;
        break;
      }
    }
    setActiveChapterIndex(matchedIndex);
  }, [currentTime]);

  if (!isOpen) return null;

  const currentChapter = HOTEL_DEMO_CHAPTERS[activeChapterIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseFloat(e.target.value));
  };

  const handleJumpToChapter = (idx: number) => {
    setActiveChapterIndex(idx);
    setCurrentTime(HOTEL_DEMO_CHAPTERS[idx].seconds);
    setIsPlaying(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(demoUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-950/70">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <Hotel className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  HotelPro — Official Mentor Evaluation Demo Walkthrough
                </h3>
                <span className="text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                  1080p 60FPS
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Complete hotel booking and management solution MERN project
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 border border-neutral-700 font-medium transition-colors"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied' : 'Copy Demo Link'}</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center text-sm font-semibold transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video Canvas & Chapters Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">
          
          {/* Main Video Screen Area (8 cols) */}
          <div className="lg:col-span-8 bg-black flex flex-col justify-between relative overflow-hidden group">
            
            {/* Simulation Scenes */}
            <div className="relative aspect-video w-full flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-black overflow-hidden select-none">
              
              {/* Scene 1: Overview & Rooms */}
              {activeChapterIndex === 0 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center text-center animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-3 shadow-lg shadow-rose-500/10 animate-bounce">
                    <Hotel className="w-8 h-8 text-rose-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">HotelPro Management Solution</h4>
                  <p className="text-neutral-400 text-sm max-w-md leading-relaxed mb-3">
                    Full-stack MERN hospitality platform: real-time room availability, luxury suites, and guest booking workflows.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-neutral-300">
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700">Room Inventory</span>
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700">Availability Tracker</span>
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700">MongoDB Atlas</span>
                  </div>
                </div>
              )}

              {/* Scene 2: Date Picker */}
              {activeChapterIndex === 1 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-2xl">
                    <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Stay Calendar Calculator</div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 block">Check-In</span>
                        <span className="font-mono font-bold text-white">2026-10-28</span>
                      </div>
                      <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-neutral-500 block">Check-Out</span>
                        <span className="font-mono font-bold text-white">2026-10-31</span>
                      </div>
                    </div>
                    <div className="p-2 bg-rose-500/10 border border-rose-500/20 rounded-lg text-center text-xs text-rose-300 font-mono">
                      Stay Length: 3 Nights · 2 Guests
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 3: Add-ons */}
              {activeChapterIndex === 2 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2.5 shadow-2xl">
                    <div className="text-xs font-bold text-white flex items-center justify-between">
                      <span>Hospitality Concierge Add-ons</span>
                      <span className="text-rose-400 font-mono text-[11px]">Selected</span>
                    </div>
                    <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between text-xs">
                      <span>Gourmet Buffet Breakfast</span>
                      <span className="font-mono text-emerald-400">+$28 / night</span>
                    </div>
                    <div className="p-2 bg-neutral-950 rounded-lg border border-neutral-800 flex justify-between text-xs">
                      <span>Private Mercedes Airport Transfer</span>
                      <span className="font-mono text-emerald-400">+$65 / trip</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 4: Digital Voucher */}
              {activeChapterIndex === 3 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-xs bg-neutral-900 border border-neutral-700 rounded-xl p-4 text-center shadow-2xl">
                    <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Voucher Confirmed</div>
                    <div className="text-sm font-bold text-white mt-1">Azure Grand Executive Suite</div>
                    <div className="text-[11px] font-mono text-neutral-400 mt-0.5">RES ID: HTL-72910-AZ</div>
                    <div className="w-20 h-20 bg-white mx-auto my-3 p-1.5 rounded-lg flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-1 w-full h-full bg-black p-1">
                        <div className="bg-white"></div>
                        <div className="bg-black"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                        <div className="bg-black"></div>
                        <div className="bg-black"></div>
                        <div className="bg-white"></div>
                        <div className="bg-white"></div>
                      </div>
                    </div>
                    <div className="text-[11px] text-neutral-300">Scan at reception for instant check-in</div>
                  </div>
                </div>
              )}

              {/* Scene 5: Staff Operations */}
              {activeChapterIndex === 4 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-3 shadow-2xl">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">Staff Management Hub</span>
                      <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">84% Occupancy</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="p-2 bg-neutral-950 rounded border border-neutral-800 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white">Eleanor Vance</div>
                          <div className="text-[10px] text-neutral-500">Azure Grand Suite · 3 Nights</div>
                        </div>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">Checked-In</span>
                      </div>
                      <div className="p-2 bg-neutral-950 rounded border border-neutral-800 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white">Marcus Sterling</div>
                          <div className="text-[10px] text-neutral-500">Presidential Penthouse</div>
                        </div>
                        <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">Arrival Today</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 6: MERN Backend */}
              {activeChapterIndex === 5 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-md bg-neutral-950 border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-300 space-y-2 shadow-2xl">
                    <div className="text-indigo-400 font-bold">// Express.js & MongoDB Architecture</div>
                    <div className="text-emerald-400">✓ GET /api/rooms - Real-time inventory</div>
                    <div className="text-emerald-400">✓ POST /api/reservations - Booking engine</div>
                    <div className="text-emerald-400">✓ PATCH /api/reservations/:id/status - Staff workflows</div>
                    <div className="text-neutral-500 text-[11px] pt-1 border-t border-neutral-800">
                      All 6 Epics verified: Zero syntax or build errors.
                    </div>
                  </div>
                </div>
              )}

              {/* Narration Overlay */}
              <div className="absolute bottom-2 left-4 right-4 bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60 rounded-xl px-4 py-2 text-xs text-neutral-200 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-semibold text-rose-400">{currentChapter.title}:</span>
                  <span className="text-neutral-300 truncate">{currentChapter.narration}</span>
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-neutral-950/95 border-t border-neutral-800 p-3 flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-neutral-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={totalDuration}
                  step="0.5"
                  value={currentTime}
                  onChange={handleSeek}
                  className="flex-1 accent-rose-500 h-1.5 bg-neutral-800 rounded-lg cursor-pointer"
                />
                <span className="text-xs font-mono text-neutral-400 w-10">
                  {formatTime(totalDuration)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-xs">
                    <span className="text-neutral-500">Speed:</span>
                    {[1, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-mono ${
                          playbackSpeed === speed ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onNavigateToBooking();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold"
                >
                  <span>Try Live in HotelPro</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Chapters Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col p-4 overflow-y-auto">
            <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-3 pb-2 border-b border-neutral-800">
              HotelPro Chapters (6 Milestones)
            </div>

            <div className="space-y-2 flex-1">
              {HOTEL_DEMO_CHAPTERS.map((ch, idx) => {
                const isActive = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => handleJumpToChapter(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 ${
                      isActive 
                        ? 'bg-rose-500/10 border-rose-500/40 shadow-sm' 
                        : 'bg-neutral-900/60 border-neutral-800/80 hover:bg-neutral-900 hover:border-neutral-700'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5 ${
                      isActive ? 'bg-rose-600 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                          {ch.title}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500 shrink-0">
                          {ch.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                        {ch.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Demo Link Copy */}
            <div className="mt-4 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="text-xs font-medium text-neutral-300 mb-1 flex items-center justify-between">
                <span>Demo Link for SkillWallet</span>
                <span className="text-[10px] text-emerald-400 font-mono">Ready</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  readOnly
                  value={demoUrl}
                  className="bg-neutral-950 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-xs font-mono text-neutral-300 flex-1 truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors shrink-0 flex items-center gap-1"
                >
                  {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>Copy</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
