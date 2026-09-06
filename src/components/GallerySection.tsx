import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Mouse drag-to-scroll support for desktop
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [draggedDistance, setDraggedDistance] = useState(0);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const firstCard = scrollContainerRef.current.querySelector<HTMLElement>('[data-card="gallery-card"]');
    const cardWidth = firstCard ? firstCard.clientWidth + 20 : 320;
    const index = Math.round(scrollLeft / cardWidth);
    setCurrentSlideIndex(Math.max(0, Math.min(index, GALLERY_PHOTOS.length - 1)));
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const firstCard = scrollContainerRef.current.querySelector<HTMLElement>('[data-card="gallery-card"]');
    const scrollAmount = firstCard ? firstCard.clientWidth + 20 : 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToPhoto = (index: number) => {
    if (!scrollContainerRef.current) return;
    const firstCard = scrollContainerRef.current.querySelector<HTMLElement>('[data-card="gallery-card"]');
    const scrollAmount = firstCard ? firstCard.clientWidth + 20 : 340;
    scrollContainerRef.current.scrollTo({
      left: index * scrollAmount,
      behavior: 'smooth',
    });
  };

  // Initial scroll check
  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  // Mouse drag handlers for carousel
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeftState(scrollContainerRef.current.scrollLeft);
    setDraggedDistance(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    scrollContainerRef.current.scrollLeft = scrollLeftState - walk;
    setDraggedDistance(Math.abs(walk));
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const openLightbox = (photo: GalleryPhoto) => {
    const index = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % GALLERY_PHOTOS.length);
    }
  }, [selectedPhotoIndex]);

  const prevPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex(
        (selectedPhotoIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
      );
    }
  }, [selectedPhotoIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, nextPhoto, prevPhoto]);

  return (
    <section id="gallery" className="relative py-24 px-2 sm:px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF5F5] border border-[#941B26]/20 text-xs font-serif-tc tracking-widest text-[#941B26] mb-3 shadow-sm"
          >
            <Camera className="w-3.5 h-3.5 text-[#941B26]" />
            <span>美好定格 · 婚紗相簿</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif-tc text-3xl sm:text-4xl md:text-5xl font-normal text-[#221819] mb-3"
          >
            幸福光影 · 婚紗相簿
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif-tc text-sm sm:text-base text-[#6B5B5E] max-w-xl mx-auto mb-2"
          >
            快門定格的每一抹微笑，都是我們向世界宣告幸福的蹤跡
          </motion.p>
          <p className="font-montserrat text-xs tracking-[0.25em] text-[#C5A059] uppercase mb-4">
            Cherishing Every Precious Moment
          </p>
        </div>

        {/* Horizontal Reel Wrapper with Left & Right Nav Controls */}
        <div className="relative group/reel">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="往左瀏覽相片"
            className={`hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#EFECE6] shadow-md items-center justify-center text-[#221819] transition-all duration-300 ${
              canScrollLeft
                ? 'hover:bg-[#941B26] hover:text-white hover:scale-105 active:scale-95 cursor-pointer opacity-90 hover:opacity-100 shadow-md'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="往右瀏覽相片"
            className={`hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 border border-[#EFECE6] shadow-md items-center justify-center text-[#221819] transition-all duration-300 ${
              canScrollRight
                ? 'hover:bg-[#941B26] hover:text-white hover:scale-105 active:scale-95 cursor-pointer opacity-90 hover:opacity-100 shadow-md'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Horizontal Scrollable Reel */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth py-4 px-2 sm:px-3 touch-pan-x select-none ${
              isMouseDown ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {GALLERY_PHOTOS.map((photo) => (
              <div
                key={photo.id}
                data-card="gallery-card"
                className="group relative cursor-pointer rounded-2xl overflow-hidden p-[1.5px] bg-gradient-to-b from-[#EFECE6] via-white to-[#E2DED7] hover:from-[#941B26]/60 hover:to-[#B82835]/60 transition-all duration-500 shadow-sm hover:shadow-[0_12px_32px_rgba(148,27,38,0.15)] w-[78vw] max-w-[300px] sm:w-[320px] md:w-[340px] shrink-0 snap-center select-none"
                onClick={() => {
                  if (draggedDistance > 6) return;
                  openLightbox(photo);
                }}
              >
                <div className="relative h-[390px] sm:h-[450px] w-full rounded-[15px] overflow-hidden bg-[#FAF9F6]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    draggable={false}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out filter brightness-95 group-hover:brightness-100 pointer-events-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Top Action Bar on Card */}
                  <div className="absolute top-3 right-3 z-10">
                    {/* Hover Floating Magnify Icon */}
                    <div className="w-8 h-8 rounded-full bg-white/90 text-[#941B26] flex items-center justify-center transition-all shadow-md backdrop-blur-md group-hover:scale-110">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Pagination Indicator Dots */}
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {GALLERY_PHOTOS.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => scrollToPhoto(i)}
              aria-label={`前往第 ${i + 1} 張相片`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlideIndex === i
                  ? 'w-7 bg-[#941B26]'
                  : 'w-2 bg-[#E2DED7] hover:bg-[#941B26]/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Full-Screen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Top Toolbar */}
            <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
              <span className="font-montserrat text-xs text-[#E8E2D9] px-3 py-1 rounded-full bg-white/10 backdrop-blur-md">
                {selectedPhotoIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-[#941B26] hover:text-white text-white transition-colors"
                aria-label="關閉"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Left Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 hover:border-[#941B26] text-white hover:text-white hover:bg-[#941B26]/80 transition-colors z-50 active:scale-95"
              aria-label="上一張"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 border border-white/20 hover:border-[#941B26] text-white hover:text-white hover:bg-[#941B26]/80 transition-colors z-50 active:scale-95"
              aria-label="下一張"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Photo Container */}
            <div
              className="relative max-w-4xl max-h-[88vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={GALLERY_PHOTOS[selectedPhotoIndex].id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={GALLERY_PHOTOS[selectedPhotoIndex].url}
                alt={GALLERY_PHOTOS[selectedPhotoIndex].title}
                className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
