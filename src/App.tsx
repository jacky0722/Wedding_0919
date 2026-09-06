import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimeBackgroundCanvas } from './components/AnimeBackgroundCanvas';
import { InvitationCover } from './components/InvitationCover';
import { HeroSection } from './components/HeroSection';
import { CountdownSection } from './components/CountdownSection';
import { VenueSection } from './components/VenueSection';
import { GallerySection } from './components/GallerySection';
import { Mail, ArrowUpCircle } from 'lucide-react';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Smooth scroll to top when opening
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCloseInvitation = () => {
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-[#221819] overflow-x-hidden selection:bg-[#941B26] selection:text-white font-chinese">
      <AnimatePresence mode="wait">
        {!isOpened ? (
          /* Layer 1: Initial Screen - Invitation Cover Card */
          <motion.div
            key="invitation-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <InvitationCover onOpen={handleOpenInvitation} />
          </motion.div>
        ) : (
          /* Layer 2: Full Wedding Website */
          <motion.div
            key="wedding-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-screen bg-grid-pattern"
          >
            {/* Top Navigation Bar with Return to Cover Button */}
            <header className="sticky top-0 z-40 backdrop-blur-md bg-[#FAF9F6]/85 border-b border-[#EFECE6]/80 px-4 py-2.5 flex items-center justify-between shadow-sm">
              <button
                onClick={handleCloseInvitation}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#941B26]/10 hover:bg-[#941B26] text-[#941B26] hover:text-white border border-[#941B26]/20 text-xs font-serif-tc tracking-wider transition-all duration-300 active:scale-95 shadow-sm"
                title="返回查看喜帖封面"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>返回喜帖封面</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-serif-tc text-[#6B5B5E]">
                <span className="font-semibold text-[#941B26]">白庭宇</span>
                <span className="font-cormorant italic text-[#C5A059]">&</span>
                <span className="font-semibold text-[#941B26]">李佳曄</span>
                <span className="hidden sm:inline text-[#B5A8A0]">· 2026.09.19</span>
              </div>
            </header>

            {/* Anime.js Interactive Kinetic Canvas (Floating Ivory Petals, Crimson Blossom & Golden Shimmer) */}
            <AnimeBackgroundCanvas />

            {/* Main Content Sections */}
            <main className="relative z-10 pb-20">
              <HeroSection />
              <GallerySection />
              <CountdownSection />
              <VenueSection />
            </main>

            {/* Floating Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-6 left-6 z-30 p-2.5 rounded-full bg-white/90 border border-[#EFECE6] text-[#6B5B5E] hover:text-[#941B26] hover:border-[#941B26] shadow-md transition-all active:scale-90"
              aria-label="回到頁首"
              title="回到頁首"
            >
              <ArrowUpCircle className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

