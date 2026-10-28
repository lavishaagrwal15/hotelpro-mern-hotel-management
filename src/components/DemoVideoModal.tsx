import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize2, 
  CheckCircle2, Film, MonitorPlay, Sparkles, Copy, Check,
  ChevronRight, FastForward, Sliders, Share2, Download
} from 'lucide-react';
import { DEMO_CHAPTERS } from '../data/moviesData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  demoUrl: string;
  onNavigateToBooking: () => void;
}

export const DemoVideoModal: React.FC<Props> = ({
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
  const totalDuration = 105; // 1 min 45 sec total demo

  // Auto-play progress
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

  // Update chapter index based on currentTime
  useEffect(() => {
    let matchedIndex = 0;
    for (let i = DEMO_CHAPTERS.length - 1; i >= 0; i--) {
      if (currentTime >= DEMO_CHAPTERS[i].seconds) {
        matchedIndex = i;
        break;
      }
    }
    setActiveChapterIndex(matchedIndex);
  }, [currentTime]);

  if (!isOpen) return null;

  const currentChapter = DEMO_CHAPTERS[activeChapterIndex];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
  };

  const handleJumpToChapter = (chapterIndex: number) => {
    setActiveChapterIndex(chapterIndex);
    setCurrentTime(DEMO_CHAPTERS[chapterIndex].seconds);
    setIsPlaying(true);
  };

  const handleCopyDemoLink = () => {
    const fullDemoLink = `${demoUrl}#demo-video`;
    navigator.clipboard.writeText(fullDemoLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-neutral-900 border border-neutral-700/80 rounded-2xl w-full max-w-5xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-neutral-800 bg-neutral-950/60">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center">
              <Film className="w-4 h-4 text-rose-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white text-sm sm:text-base">
                  IMovies Platform - Official Evaluation Demo Walkthrough
                </h3>
                <span className="text-[11px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full">
                  1080p 60FPS
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Prepared for SkillWallet mentor evaluation & MERN stack code review
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyDemoLink}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200 border border-neutral-700 font-medium transition-colors"
              title="Copy shareable demo video link"
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
            
            {/* Screen Viewport with Animated Simulation */}
            <div className="relative aspect-video w-full flex items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-black overflow-hidden select-none">
              
              {/* Scene 1: Platform Overview */}
              {activeChapterIndex === 0 && (
                <div className="relative w-full h-full p-6 flex flex-col justify-center items-center text-center animate-in fade-in duration-300">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/10 animate-bounce">
                    <Film className="w-8 h-8 text-rose-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">IMovies Cinema Experience</h4>
                  <p className="text-neutral-400 text-sm max-w-md leading-relaxed mb-4">
                    Full-stack MERN cinema platform: Browse trending blockbusters, high-definition trailers, multi-format listings (IMAX 3D, Dolby Atmos, 4DX).
                  </p>
                  <div className="flex items-center gap-3 text-xs text-neutral-300">
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700">React 19 Frontend</span>
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700">Express.js REST API</span>
                    <span className="px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700">MongoDB Atlas</span>
                  </div>
                </div>
              )}

              {/* Scene 2: Theater & Showtimes */}
              {activeChapterIndex === 1 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300 bg-neutral-950/70">
                  <div className="w-full max-w-md bg-neutral-900/90 border border-neutral-800 rounded-xl p-5 shadow-2xl">
                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-4">
                      <div>
                        <div className="text-xs text-rose-400 font-semibold uppercase tracking-wider">Theater Selection</div>
                        <div className="text-base font-bold text-white">CineSphere Grand IMAX</div>
                      </div>
                      <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded">
                        Laser 4K
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-center">
                        <div className="text-xs text-neutral-400">Morning</div>
                        <div className="text-sm font-semibold text-white">10:30 AM</div>
                        <div className="text-[10px] text-emerald-400">Available</div>
                      </div>
                      <div className="p-2.5 bg-rose-500/20 border border-rose-500/50 rounded-lg text-center shadow-sm">
                        <div className="text-xs text-rose-200">Matinee</div>
                        <div className="text-sm font-bold text-white">02:15 PM</div>
                        <div className="text-[10px] text-amber-300">Filling Fast</div>
                      </div>
                      <div className="p-2.5 bg-neutral-800/80 border border-neutral-700 rounded-lg text-center">
                        <div className="text-xs text-neutral-400">Evening</div>
                        <div className="text-sm font-semibold text-white">06:45 PM</div>
                        <div className="text-[10px] text-rose-400">Almost Full</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 3: Seat Selection */}
              {activeChapterIndex === 2 && (
                <div className="w-full h-full p-5 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  {/* Curved Screen Simulation */}
                  <div className="w-3/4 h-3 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent rounded-full shadow-lg shadow-cyan-500/30 mb-1"></div>
                  <div className="text-[10px] text-cyan-300/80 uppercase tracking-widest mb-4">Cinema Curved Screen</div>
                  
                  {/* Mini Seat Matrix */}
                  <div className="space-y-1.5 mb-3">
                    <div className="flex gap-1.5 justify-center">
                      <span className="w-4 h-4 rounded bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white shadow-md">✓</span>
                      <span className="w-4 h-4 rounded bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white shadow-md">✓</span>
                      <span className="w-4 h-4 rounded bg-neutral-800"></span>
                      <span className="w-4 h-4 rounded bg-neutral-800"></span>
                      <span className="w-4 h-4 rounded bg-neutral-700"></span>
                      <span className="w-4 h-4 rounded bg-neutral-700"></span>
                    </div>
                    <div className="flex gap-1.5 justify-center">
                      <span className="w-4 h-4 rounded bg-neutral-800"></span>
                      <span className="w-4 h-4 rounded bg-neutral-800"></span>
                      <span className="w-4 h-4 rounded bg-neutral-700"></span>
                      <span className="w-4 h-4 rounded bg-neutral-700"></span>
                      <span className="w-4 h-4 rounded bg-rose-500 flex items-center justify-center text-[9px] font-bold text-white shadow-md">✓</span>
                      <span className="w-4 h-4 rounded bg-neutral-800"></span>
                    </div>
                  </div>
                  <div className="text-xs text-neutral-300 bg-neutral-900/90 border border-neutral-800 px-3 py-1.5 rounded-lg flex items-center gap-3">
                    <span>Selected: <strong className="text-white">F7, F8, G5 (3 Seats)</strong></span>
                    <span className="text-neutral-500">·</span>
                    <span>Total: <strong className="text-rose-400 font-mono">$48.00</strong></span>
                  </div>
                </div>
              )}

              {/* Scene 4: Concessions */}
              {activeChapterIndex === 3 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl">
                        🍿
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Caramel Gold Mega Popcorn</div>
                        <div className="text-xs text-neutral-400">Sweet & Salted Artisan Kernels</div>
                        <div className="text-xs font-mono font-semibold text-rose-400 mt-0.5">$8.50</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-800 px-2.5 py-1 rounded-lg border border-neutral-700 text-xs">
                      <span className="text-neutral-400">Qty:</span>
                      <span className="font-bold text-white">2</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 5: Secure Checkout */}
              {activeChapterIndex === 4 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-4 space-y-2.5 shadow-2xl">
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>3x Prime Tickets</span>
                      <span className="font-mono text-neutral-200">$54.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400">
                      <span>Caramel Popcorn (x2)</span>
                      <span className="font-mono text-neutral-200">$17.00</span>
                    </div>
                    <div className="flex justify-between text-xs text-emerald-400 font-medium">
                      <span>Promo Coupon (IMOVIE20)</span>
                      <span className="font-mono">-$14.20</span>
                    </div>
                    <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold text-white">
                      <span>Total Amount Paid</span>
                      <span className="font-mono text-rose-400">$56.80</span>
                    </div>
                    <div className="text-center text-[11px] text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 py-1 rounded">
                      ✓ Instant 256-bit Encrypted Transaction
                    </div>
                  </div>
                </div>
              )}

              {/* Scene 6: Digital E-Ticket & QR */}
              {activeChapterIndex === 5 && (
                <div className="w-full h-full p-6 flex flex-col justify-center items-center animate-in fade-in duration-300">
                  <div className="w-full max-w-xs bg-gradient-to-b from-neutral-900 to-neutral-950 border border-neutral-700 rounded-xl p-4 text-center shadow-2xl relative">
                    <div className="text-xs text-rose-400 font-bold uppercase tracking-wider">Confirmed E-Ticket</div>
                    <div className="text-sm font-bold text-white mt-1">Interstellar: Beyond Horizons</div>
                    <div className="text-xs text-neutral-400 mt-0.5">Auditorium 1 · IMAX Laser · F7, F8</div>
                    
                    {/* Simulated High-Contrast QR Code */}
                    <div className="w-24 h-24 bg-white p-2 mx-auto my-3 rounded-lg flex items-center justify-center shadow-md">
                      <div className="w-full h-full bg-neutral-950 p-1 flex items-center justify-center">
                        <div className="grid grid-cols-4 gap-1 w-full h-full bg-white p-1">
                          <div className="bg-neutral-950"></div>
                          <div className="bg-white"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-white"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-white"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-white"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-white"></div>
                          <div className="bg-neutral-950"></div>
                          <div className="bg-white"></div>
                        </div>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-neutral-300">BOOKING ID: IMV-98752-B4</div>
                  </div>
                </div>
              )}

              {/* Subtitle / Narration Banner Overlay */}
              <div className="absolute bottom-2 left-4 right-4 bg-neutral-950/85 backdrop-blur-md border border-neutral-700/60 rounded-xl px-4 py-2 text-xs text-neutral-200 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span className="font-semibold text-rose-400">{currentChapter.title}:</span>
                  <span className="text-neutral-300 truncate">{currentChapter.narration}</span>
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="bg-neutral-950/95 border-t border-neutral-800 p-3 flex flex-col gap-2">
              {/* Scrubber slider */}
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

              {/* Action Buttons row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-8 h-8 rounded-lg bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center transition-colors shadow-sm"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => {
                      setCurrentTime(0);
                      setIsPlaying(true);
                    }}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors"
                    title="Restart Demo"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center transition-colors"
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  {/* Playback speed selector */}
                  <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 rounded-lg px-2 py-1 text-xs">
                    <span className="text-neutral-500">Speed:</span>
                    {[1, 1.25, 1.5].map((speed) => (
                      <button
                        key={speed}
                        onClick={() => setPlaybackSpeed(speed)}
                        className={`px-1.5 py-0.5 rounded text-[11px] font-mono transition-colors ${
                          playbackSpeed === speed ? 'bg-rose-600 text-white' : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToBooking();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
                  >
                    <span>Try This Step Live</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters & Navigation Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-neutral-950 border-t lg:border-t-0 lg:border-l border-neutral-800 flex flex-col p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
              <div className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">
                Video Chapters (6 Milestones)
              </div>
              <span className="text-[11px] font-mono text-neutral-500">
                Full Walkthrough
              </span>
            </div>

            <div className="space-y-2 flex-1">
              {DEMO_CHAPTERS.map((ch, idx) => {
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

            {/* Quick submission copy box */}
            <div className="mt-4 p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="text-xs font-medium text-neutral-300 mb-1 flex items-center justify-between">
                <span>Demo Video Link for SkillWallet</span>
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
                  onClick={handleCopyDemoLink}
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
