/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ActivePage, InstagramPost } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingEngine } from './components/BookingEngine';
import { InstagramPostModal } from './components/InstagramPostModal';

import { HomePage } from './pages/HomePage';
import { TracksuitSetsPage } from './pages/TracksuitSetsPage';
import { ServicesPage } from './pages/ServicesPage';
import { PriceListPage } from './pages/PriceListPage';
import { TeamPage } from './pages/TeamPage';
import { GalleryPage } from './pages/GalleryPage';
import { SpaPage } from './pages/SpaPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';

import { ProfileProvider } from './context/ProfileContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>();
  const [preselectedStylistId, setPreselectedStylistId] = useState<string | undefined>();
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  // Sync initial URL path /new-page or /tracksuit-sets to the Tracksuit Sets page
  useEffect(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    if (
      path.includes('new-page') || 
      path.includes('tracksuit') || 
      path.includes('track-suit') ||
      hash.includes('new-page') || 
      hash.includes('tracksuit') ||
      hash.includes('track-suit')
    ) {
      setCurrentPage('tracksuit-sets');
    } else if (path.includes('price-list') || hash.includes('price-list')) {
      setCurrentPage('price-list');
    }
  }, []);

  // Navigate handler with smooth scroll to top
  const handleNavigate = (page: ActivePage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open booking modal with optional service / stylist preselection
  const handleOpenBooking = (serviceId?: string, stylistId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedStylistId(stylistId);
    setIsBookingModalOpen(true);
  };

  // Handle booking directly from an Instagram post modal
  const handleBookFromInstagram = (serviceId?: string, stylistId?: string) => {
    setSelectedPost(null);
    handleOpenBooking(serviceId, stylistId);
  };

  return (
    <ProfileProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#E2D4C3] selection:text-[#181615]">
        
        {/* Top Bar adhering to Top Bar Contract */}
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Main Page View */}
        <main className="flex-1">
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenBooking={handleOpenBooking}
              onSelectPost={(post) => setSelectedPost(post)}
            />
          )}

          {currentPage === 'tracksuit-sets' && (
            <TracksuitSetsPage />
          )}

          {currentPage === 'services' && (
            <ServicesPage onOpenBooking={handleOpenBooking} />
          )}

          {currentPage === 'price-list' && (
            <PriceListPage onOpenBooking={handleOpenBooking} />
          )}

          {currentPage === 'team' && (
            <TeamPage onOpenBooking={handleOpenBooking} />
          )}

          {currentPage === 'gallery' && (
            <GalleryPage
              onSelectPost={(post) => setSelectedPost(post)}
              onOpenBooking={handleOpenBooking}
            />
          )}

          {currentPage === 'spa' && (
            <SpaPage onOpenBooking={handleOpenBooking} />
          )}

          {currentPage === 'contact' && (
            <ContactPage onOpenBooking={() => handleOpenBooking()} />
          )}

          {currentPage === 'book' && (
            <BookingPage
              initialServiceId={preselectedServiceId}
              initialStylistId={preselectedStylistId}
            />
          )}
        </main>

        {/* Luxury Salon Footer */}
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Instagram Post Detail Modal */}
        {selectedPost && (
          <InstagramPostModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onBookThisLook={handleBookFromInstagram}
          />
        )}

        {/* Booking Modal Overlay (when opened from buttons anywhere across the app) */}
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div
              className="w-full max-w-4xl max-h-[92vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <BookingEngine
                initialServiceId={preselectedServiceId}
                initialStylistId={preselectedStylistId}
                onClose={() => setIsBookingModalOpen(false)}
                isModal={true}
              />
            </div>
          </div>
        )}

      </div>
    </ProfileProvider>
  );
}
