import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MailOpen } from 'lucide-react';
import { WEDDING_DATE_DISPLAY, WEDDING_LOCATION, COUPLE_NAMES } from '../data';

interface InvitationCoverProps {
  onOpen: () => void;
}

export const InvitationCover: React.FC<InvitationCoverProps> = ({ onOpen }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 bg-[#1B0507] relative overflow-hidden select-none">
      {/* Ambient background glow and floating golden particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#941B26]/30 rounded-full blur-[120px]" />
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-[90px]" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#941B26]/25 rounded-full blur-[90px]" />
      </div>

      {/* Main Wedding Invitation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        onClick={onOpen}
        className="group relative w-full max-w-[430px] sm:max-w-[460px] md:max-w-[490px] rounded-3xl p-6 sm:p-9 cursor-pointer transition-all duration-500 shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_40px_rgba(148,27,38,0.25)] hover:shadow-[0_24px_70px_rgba(0,0,0,0.7),0_0_50px_rgba(197,160,89,0.3)] bg-gradient-to-b from-[#8C151F] via-[#7B111A] to-[#600B13] border border-[#C5A059]/40 overflow-hidden"
      >
        {/* Subtle velvet card texture overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.15),transparent_70%)]" />

        {/* Outer and Inner Gold Framing with Classic Chinese Corner Brackets */}
        <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#C5A059]/35 pointer-events-none" />

        {/* Classical Golden Corner Brackets (┌ ┐ └ ┘) */}
        {/* Top-Left */}
        <div className="absolute top-5 sm:top-6 left-5 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-l-2 border-[#E5C378] pointer-events-none" />
        {/* Top-Right */}
        <div className="absolute top-5 sm:top-6 right-5 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 border-t-2 border-r-2 border-[#E5C378] pointer-events-none" />
        {/* Bottom-Left */}
        <div className="absolute bottom-5 sm:bottom-6 left-5 sm:left-6 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-l-2 border-[#E5C378] pointer-events-none" />
        {/* Bottom-Right */}
        <div className="absolute bottom-5 sm:bottom-6 right-5 sm:right-6 w-5 h-5 sm:w-6 sm:h-6 border-b-2 border-r-2 border-[#E5C378] pointer-events-none" />

        {/* Card Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center font-chinese py-2 sm:py-3">
          {/* Top Double Happiness Crest (圓徽 囍) */}
          <div className="relative mb-5 sm:mb-6">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-b from-[#F3E3C8] via-[#C5A059] to-[#8C6D37] shadow-[0_4px_18px_rgba(0,0,0,0.4)] flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#750E16] border border-[#E5C378]/50 flex items-center justify-center shadow-inner">
                <span className="font-serif-tc text-2xl sm:text-3xl font-bold tracking-wider text-[#FCEBD3] drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                  囍
                </span>
              </div>
            </div>
            {/* Subtle rotating glow ring on hover */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute -inset-1.5 rounded-full border border-dashed border-[#E5C378]/30 pointer-events-none"
            />
          </div>

          {/* Couple Names (白庭宇 & 李佳曄) */}
          <h1 className="font-serif-tc text-3xl sm:text-4xl md:text-[40px] font-medium tracking-wider text-[#FFFFFF] mb-3 drop-shadow-md flex items-center justify-center gap-3">
            <span>{COUPLE_NAMES.groom.zh}</span>
            <span className="font-cormorant italic text-3xl sm:text-4xl text-[#E5C378] font-normal px-1">
              &
            </span>
            <span>{COUPLE_NAMES.bride.zh}</span>
          </h1>

          {/* Slogan */}
          <p className="font-serif-tc text-xs sm:text-sm tracking-[0.35em] text-[#F3E3C8] font-light mb-6 opacity-95">
            誠 摯 期 待 您 的 蒞 臨 與 祝 福
          </p>

          {/* Warm Message / Invitation Text */}
          <div className="max-w-[340px] sm:max-w-[370px] space-y-2 mb-6 text-center text-[#FCEBD3]/95 font-serif-tc text-xs sm:text-sm font-light leading-relaxed">
            <p>感謝每一位陪伴我們成長、見證我們相愛的親朋好友</p>
            <p>期待與每一個重要的你相聚，一起收藏這份幸福與美好</p>
          </div>

          {/* Horizontal Golden Divider */}
          <div className="w-full max-w-[320px] sm:max-w-[360px] h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/60 to-transparent mb-6 sm:mb-7" />

          {/* Bottom Capsule Badge (Date & Venue) */}
          <div className="w-full max-w-[360px] sm:max-w-[400px] py-2.5 sm:py-3 px-4 rounded-full bg-[#4E0A0F]/85 border border-[#C5A059]/40 shadow-inner flex items-center justify-center gap-2 sm:gap-3 text-[#FCEBD3]">
            <span className="font-montserrat tracking-widest text-xs sm:text-sm font-medium whitespace-nowrap shrink-0">
              {WEDDING_DATE_DISPLAY}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C5A059] shrink-0" />
            <span className="font-serif-tc text-xs sm:text-sm font-light tracking-wider whitespace-nowrap">
              {WEDDING_LOCATION.name}
            </span>
          </div>

          {/* Pulsing "Click to Open" CTA Indicator */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-6 sm:mt-7 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#C5A059] via-[#F3E3C8] to-[#C5A059] text-[#5A0C12] font-serif-tc text-xs sm:text-sm font-semibold tracking-widest shadow-[0_4px_16px_rgba(197,160,89,0.4)] group-hover:scale-105 transition-transform"
          >
            <MailOpen className="w-4 h-4 text-[#5A0C12]" />
            <span>點 擊 開 啟 喜 帖</span>
            <Sparkles className="w-3.5 h-3.5 text-[#5A0C12]" />
          </motion.div>
        </div>
      </motion.div>

      {/* Elegant Footer Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-5 text-[#C5A059]/70 font-serif-tc text-xs tracking-widest text-center"
      >
        輕觸卡片開啟幸福序幕 · 進入婚禮頁面
      </motion.p>
    </div>
  );
};
