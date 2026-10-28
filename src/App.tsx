import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SkillWalletBanner } from './components/SkillWalletBanner';
import { HotelRoomsCatalog } from './components/hotel/HotelRoomsCatalog';
import { HotelBookingModal } from './components/hotel/HotelBookingModal';
import { HotelVoucherModal } from './components/hotel/HotelVoucherModal';
import { HotelStaffDashboard } from './components/hotel/HotelStaffDashboard';
import { HotelDemoVideoModal } from './components/hotel/HotelDemoVideoModal';
import { HeroBanner } from './components/HeroBanner';
import { MovieCatalog } from './components/MovieCatalog';
import { BookingModal } from './components/BookingModal';
import { ETicketModal } from './components/ETicketModal';
import { TrailerModal } from './components/TrailerModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { GitHubRepoModal } from './components/GitHubRepoModal';
import { SkillWalletModal } from './components/SkillWalletModal';
import { MyBookingsView } from './components/MyBookingsView';
import { CinemasView } from './components/CinemasView';
import { Footer } from './components/Footer';
import { HOTEL_ROOMS, INITIAL_RESERVATIONS } from './data/hotelProData';
import { Room, HotelReservation } from './types/hotel';
import { MOVIES, THEATERS, SHOWTIMES, CONCESSIONS } from './data/moviesData';
import { Movie, Booking } from './types';

export default function App() {
  const DEMO_URL = 'https://ais-pre-crsezy7gi24xgpbymtrhkw-987524342274.asia-east1.run.app';

  // Mode switcher: Default to 'hotelpro' matching the user's latest SkillWallet module!
  const [projectMode, setProjectMode] = useState<'hotelpro' | 'imovies'>('hotelpro');

  // HotelPro State
  const [hotelTab, setHotelTab] = useState<'rooms' | 'operations'>('rooms');
  const [rooms, setRooms] = useState<Room[]>(HOTEL_ROOMS);
  const [reservations, setReservations] = useState<HotelReservation[]>(() => {
    try {
      const saved = localStorage.getItem('hotelpro_reservations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RESERVATIONS;
  });
  const [bookingRoom, setBookingRoom] = useState<Room | null>(null);
  const [activeVoucher, setActiveVoucher] = useState<HotelReservation | null>(null);
  const [checkInDate, setCheckInDate] = useState('2026-10-28');
  const [checkOutDate, setCheckOutDate] = useState('2026-10-31');
  const [guestCount, setGuestCount] = useState(2);
  const [isHotelDemoVideoOpen, setIsHotelDemoVideoOpen] = useState(false);

  // IMovies State
  const [movieTab, setMovieTab] = useState<'now-playing' | 'upcoming' | 'cinemas' | 'my-bookings'>('now-playing');
  const [selectedCity, setSelectedCity] = useState('New York');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [bookingMovie, setBookingMovie] = useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [activeETicket, setActiveETicket] = useState<Booking | null>(null);
  const [isMovieDemoVideoOpen, setIsMovieDemoVideoOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('imovies_user_bookings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'IMV-98752-B4',
        bookingDate: new Date().toISOString(),
        movie: MOVIES[0],
        theater: THEATERS[0],
        showtime: SHOWTIMES[2],
        seats: [
          { id: 'F7', type: 'prime', price: 19.50 },
          { id: 'F8', type: 'prime', price: 19.50 }
        ],
        concessions: [{ item: CONCESSIONS[0], quantity: 1 }],
        subtotal: 47.50,
        discount: 10.00,
        promoCode: 'IMOVIE20',
        convenienceFee: 5.00,
        tax: 3.40,
        totalAmount: 45.90,
        customer: {
          name: 'Alex Morgan',
          email: 'alex.morgan@example.com',
          phone: '+1 (555) 234-8971'
        },
        paymentMethod: 'card',
        status: 'confirmed',
        qrData: 'IMOVIES-VERIFIED-IMV-98752-B4-Interstellar-F7,F8'
      }
    ];
  });

  // Common Modals State
  const [isGitHubRepoOpen, setIsGitHubRepoOpen] = useState(false);
  const [isSkillWalletModalOpen, setIsSkillWalletModalOpen] = useState(false);

  const activeGithubUrl = projectMode === 'hotelpro'
    ? 'https://github.com/lavishaagrwal15/hotelpro-mern-hotel-management'
    : 'https://github.com/lavishaagrwal15/imovies-mern-ticket-booking';

  // Persist reservations
  useEffect(() => {
    try {
      localStorage.setItem('hotelpro_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error(e);
    }
  }, [reservations]);

  // Persist movie bookings
  useEffect(() => {
    try {
      localStorage.setItem('imovies_user_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.error(e);
    }
  }, [bookings]);

  // HotelPro Handlers
  const handleReservationComplete = (newRes: HotelReservation) => {
    setReservations(prev => [newRes, ...prev]);
    setBookingRoom(null);
    setActiveVoucher(newRes);
  };

  const handleUpdateReservationStatus = (id: string, newStatus: HotelReservation['status']) => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  // IMovies Handlers
  const filteredMovies = MOVIES.filter(m => {
    if (movieTab === 'upcoming' && m.status !== 'coming-soon') return false;
    if (movieTab === 'now-playing' && m.status !== 'now-showing') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!m.title.toLowerCase().includes(q) && !m.genres.some(g => g.toLowerCase().includes(q))) return false;
    }
    if (selectedGenre !== 'All' && !m.genres.includes(selectedGenre)) return false;
    if (selectedFormat !== 'All Formats' && !m.formats.includes(selectedFormat as any)) return false;
    return true;
  });

  const featuredMovie = MOVIES.find(m => m.isFeatured) || MOVIES[0];

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      
      {/* SkillWallet Submission Banner */}
      <SkillWalletBanner
        demoUrl={DEMO_URL}
        githubUrl={activeGithubUrl}
        onOpenSkillWalletModal={() => setIsSkillWalletModalOpen(true)}
        onOpenDemoVideo={() => {
          if (projectMode === 'hotelpro') setIsHotelDemoVideoOpen(true);
          else setIsMovieDemoVideoOpen(true);
        }}
        onOpenGitHubRepo={() => setIsGitHubRepoOpen(true)}
      />

      {/* Top Header */}
      <Header
        projectMode={projectMode}
        onProjectModeChange={setProjectMode}
        hotelTab={hotelTab}
        onHotelTabChange={setHotelTab}
        movieTab={movieTab}
        onMovieTabChange={setMovieTab}
        onOpenDemoVideo={() => {
          if (projectMode === 'hotelpro') setIsHotelDemoVideoOpen(true);
          else setIsMovieDemoVideoOpen(true);
        }}
        onOpenGitHubRepo={() => setIsGitHubRepoOpen(true)}
        onOpenSkillWalletModal={() => setIsSkillWalletModalOpen(true)}
      />

      {/* Main Experience View */}
      <main className="flex-1">
        {projectMode === 'hotelpro' ? (
          hotelTab === 'rooms' ? (
            <HotelRoomsCatalog
              rooms={rooms}
              onBookRoom={(r) => setBookingRoom(r)}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              onDatesChange={(cIn, cOut) => {
                setCheckInDate(cIn);
                setCheckOutDate(cOut);
              }}
              guestCount={guestCount}
              onGuestsChange={setGuestCount}
            />
          ) : (
            <HotelStaffDashboard
              reservations={reservations}
              rooms={rooms}
              onUpdateStatus={handleUpdateReservationStatus}
              onViewVoucher={(res) => setActiveVoucher(res)}
              onBookNewRoom={() => {
                setHotelTab('rooms');
                setBookingRoom(rooms[0]);
              }}
            />
          )
        ) : (
          movieTab === 'cinemas' ? (
            <CinemasView onBookMovie={(m) => setBookingMovie(m)} />
          ) : movieTab === 'my-bookings' ? (
            <MyBookingsView
              bookings={bookings}
              onSelectBooking={(b) => setActiveETicket(b)}
              onCancelBooking={(id) => setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b))}
              onBrowseMovies={() => setMovieTab('now-playing')}
            />
          ) : (
            <>
              {!searchQuery && movieTab === 'now-playing' && (
                <HeroBanner
                  movie={featuredMovie}
                  onBookNow={(m) => setBookingMovie(m)}
                  onWatchTrailer={(m) => setTrailerMovie(m)}
                />
              )}
              <MovieCatalog
                movies={filteredMovies}
                onBookNow={(m) => setBookingMovie(m)}
                onWatchTrailer={(m) => setTrailerMovie(m)}
                selectedGenre={selectedGenre}
                onSelectGenre={setSelectedGenre}
                selectedFormat={selectedFormat}
                onSelectFormat={setSelectedFormat}
              />
            </>
          )
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenDemoVideo={() => {
          if (projectMode === 'hotelpro') setIsHotelDemoVideoOpen(true);
          else setIsMovieDemoVideoOpen(true);
        }}
        onOpenGitHubRepo={() => setIsGitHubRepoOpen(true)}
        onOpenSkillWalletModal={() => setIsSkillWalletModalOpen(true)}
      />

      {/* HotelPro Modals */}
      <HotelBookingModal
        isOpen={!!bookingRoom}
        onClose={() => setBookingRoom(null)}
        room={bookingRoom}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onReservationComplete={handleReservationComplete}
      />

      <HotelVoucherModal
        reservation={activeVoucher}
        onClose={() => setActiveVoucher(null)}
        onViewStaffHub={() => {
          setActiveVoucher(null);
          setHotelTab('operations');
        }}
      />

      <HotelDemoVideoModal
        isOpen={isHotelDemoVideoOpen}
        onClose={() => setIsHotelDemoVideoOpen(false)}
        demoUrl={DEMO_URL}
        onNavigateToBooking={() => setBookingRoom(rooms[0])}
      />

      {/* IMovies Modals */}
      <BookingModal
        isOpen={!!bookingMovie}
        onClose={() => setBookingMovie(null)}
        movie={bookingMovie}
        onBookingComplete={(newB) => {
          setBookings(prev => [newB, ...prev]);
          setBookingMovie(null);
          setActiveETicket(newB);
        }}
      />

      <ETicketModal
        booking={activeETicket}
        onClose={() => setActiveETicket(null)}
        onViewMyBookings={() => {
          setActiveETicket(null);
          setMovieTab('my-bookings');
        }}
      />

      <TrailerModal
        isOpen={!!trailerMovie}
        onClose={() => setTrailerMovie(null)}
        movie={trailerMovie}
        onBookNow={(m) => setBookingMovie(m)}
      />

      <DemoVideoModal
        isOpen={isMovieDemoVideoOpen}
        onClose={() => setIsMovieDemoVideoOpen(false)}
        demoUrl={DEMO_URL}
        onNavigateToBooking={() => setBookingMovie(featuredMovie)}
      />

      {/* Common Modals */}
      <GitHubRepoModal
        isOpen={isGitHubRepoOpen}
        onClose={() => setIsGitHubRepoOpen(false)}
        githubUrl={activeGithubUrl}
      />

      <SkillWalletModal
        isOpen={isSkillWalletModalOpen}
        onClose={() => setIsSkillWalletModalOpen(false)}
        demoUrl={DEMO_URL}
        githubUrl={activeGithubUrl}
        onOpenDemoVideo={() => {
          if (projectMode === 'hotelpro') setIsHotelDemoVideoOpen(true);
          else setIsMovieDemoVideoOpen(true);
        }}
        onOpenGitHubRepo={() => setIsGitHubRepoOpen(true)}
      />

    </div>
  );
}
