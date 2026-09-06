import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Calendar, MapPin } from 'lucide-react';
import { WEDDING_DATE_DISPLAY, WEDDING_DATE_WEEKDAY, WEDDING_LOCATION, COUPLE_NAMES } from '../data';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);
  const ringRotate = useTransform(scrollY, [0, 1000], [0, 180]);
  const scaleText = useTransform(scrollY, [0, 400], [1, 0.92]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden"
    >
      {/* Anime.js Style Kinetic SVG Geometric Ring Background */}
      <motion.div
        style={{ rotate: ringRotate }}
        className="absolute w-[500px] h-[500px] md:w-[750px] md:h-[750px] pointer-events-none -z-10 opacity-35"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            <linearGradient id="weddingRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#941B26" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#C5A059" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FAF9F6" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Concentric Geometric Orbit Circles */}
          <circle cx="200" cy="200" r="180" stroke="url(#weddingRedGrad)" strokeWidth="1" strokeDasharray="6 8" fill="none" />
          <circle cx="200" cy="200" r="140" stroke="rgba(148,27,38,0.18)" strokeWidth="1.5" fill="none" />
          <circle cx="200" cy="200" r="95" stroke="rgba(197,160,89,0.22)" strokeWidth="1" strokeDasharray="3 6" fill="none" />

          {/* Rotating Polygon Nodes */}
          <polygon
            points="200,60 321,130 321,270 200,340 79,270 79,130"
            stroke="rgba(148,27,38,0.15)"
            strokeWidth="1"
            fill="none"
          />
          <circle cx="200" cy="60" r="3.5" fill="#941B26" />
          <circle cx="321" cy="130" r="2.5" fill="#C5A059" />
          <circle cx="321" cy="270" r="2.5" fill="#941B26" />
          <circle cx="200" cy="340" r="3.5" fill="#C5A059" />
          <circle cx="79" cy="270" r="2.5" fill="#941B26" />
          <circle cx="79" cy="130" r="2.5" fill="#C5A059" />
        </svg>
      </motion.div>

      {/* Main Content Container with Parallax */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: scaleText }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center font-chinese"
      >
        {/* Monogram Crest with 囍 character and Anime.js Staggered Entrance */}
        <motion.div
          initial={{ scale: 0, rotate: -45, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full p-[2px] bg-gradient-to-tr from-[#941B26] via-[#C5A059] to-[#B82835] shadow-[0_6px_24px_rgba(148,27,38,0.2)] flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center relative overflow-hidden group shadow-inner border border-[#EFECE6]">
              <span className="font-serif-tc text-2xl md:text-3xl font-bold tracking-wider text-[#941B26] select-none scale-105 drop-shadow-sm">
                囍
              </span>
              <span className="text-[8.5px] font-montserrat tracking-[0.2em] text-[#C5A059] uppercase font-semibold mt-0.5">
                {WEDDING_DATE_DISPLAY}
              </span>
            </div>
          </div>
          {/* Subtle orbiting dot */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
            className="absolute inset-0 -m-2 pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-[#941B26] block shadow-[0_0_8px_rgba(148,27,38,0.8)]" />
          </motion.div>
        </motion.div>

        {/* Couple Chinese Names with Microsoft JhengHei - No hover color change */}
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-tc text-4xl sm:text-5xl md:text-7xl font-normal tracking-wide text-[#221819] mb-6 sm:mb-8 select-none drop-shadow-sm"
        >
          <span className="inline-block">
            {COUPLE_NAMES.groom.zh}
          </span>
          <span className="inline-block mx-4 md:mx-6 text-[#941B26] font-cormorant italic text-3xl sm:text-4xl md:text-5xl">
            &
          </span>
          <span className="inline-block">
            {COUPLE_NAMES.bride.zh}
          </span>
        </motion.h1>

        {/* Elegant Date & Venue Pill Badge */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 py-3 px-6 rounded-2xl md:rounded-full bg-white/95 border border-[#EFECE6] shadow-[0_6px_25px_rgba(148,27,38,0.06)] backdrop-blur-md mb-8"
        >
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#221819]">
            <Calendar className="w-4 h-4 text-[#941B26]" />
            <span className="font-montserrat tracking-widest font-medium">
              {WEDDING_DATE_DISPLAY} ({WEDDING_DATE_WEEKDAY}) 12:00
            </span>
          </div>
          <span className="hidden sm:inline text-[#C5A059]">•</span>
          <div className="flex items-center gap-2 text-xs md:text-sm text-[#221819]">
            <MapPin className="w-4 h-4 text-[#C5A059]" />
            <span className="font-serif-tc font-medium">{WEDDING_LOCATION.name}</span>
          </div>
        </motion.div>

        {/* Emotional Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="max-w-xl mx-auto text-center px-4"
        >
          <p className="font-serif-tc text-sm md:text-base text-[#524446] italic leading-relaxed mb-6">
            「誠摯邀請您蒞臨，一起共享這份幸福喜悅。」
          </p>
          <div className="flex items-center justify-center gap-4">
            <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#941B26]" />
            <Sparkles className="w-4 h-4 text-[#941B26] animate-pulse" />
            <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#941B26]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Kinetic Anime.js Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-12 flex flex-col items-center gap-2 text-xs tracking-widest text-[#6B5B5E]"
      >
        <span className="font-serif-tc text-[11px] tracking-[0.25em] text-[#941B26] font-medium">
          輕滑向下探索
        </span>
        <div className="w-5 h-8 rounded-full border border-[#EFECE6] bg-white flex items-start justify-center p-1 shadow-sm">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#941B26]"
          />
        </div>
      </motion.div>
    </section>
  );
};
