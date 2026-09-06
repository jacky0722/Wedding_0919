import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation as NavIcon, Copy, Check, Car, Train, Phone, ExternalLink } from 'lucide-react';
import { WEDDING_LOCATION } from '../data';

export const VenueSection: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(WEDDING_LOCATION.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="venue" className="relative py-28 px-4 overflow-hidden bg-radial-gradient">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF5F5] border border-[#941B26]/20 text-xs font-serif-tc tracking-widest text-[#941B26] mb-4 shadow-sm"
          >
            <MapPin className="w-3.5 h-3.5 text-[#941B26]" />
            <span>典雅宴會 · 交通指引</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-serif-tc text-3xl sm:text-4xl md:text-5xl font-normal text-[#221819] mb-3"
          >
            宴會地點 · 交通指引
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif-tc text-sm sm:text-base text-[#6B5B5E]"
          >
            高雄寒軒國際大飯店 40F 嘉賓廳，坐擁港都高空美景與尊榮典雅空間。
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch font-chinese">
          {/* Left Column: Venue Info & Transportation cards */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Primary Venue Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-[1.5px] rounded-3xl bg-gradient-to-r from-[#941B26]/25 via-white to-[#C5A059]/25 shadow-[0_10px_35px_rgba(148,27,38,0.06)]"
            >
              <div className="p-6 sm:p-8 rounded-[22px] bg-white/95 backdrop-blur-xl border border-[#EFECE6]">
                {/* Venue Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFF5F5] border border-[#941B26]/20 text-xs font-serif-tc text-[#941B26] mb-3 whitespace-nowrap">
                  <span className="font-medium">婚宴會館</span>
                  <span className="text-[#C5A059]">•</span>
                  <span className="font-semibold text-[#941B26]">40F 嘉賓廳</span>
                </div>

                {/* Hotel & Hall Name */}
                <h3 className="font-serif-tc text-[17px] min-[390px]:text-lg sm:text-2xl md:text-3xl font-medium text-[#221819] mb-5 tracking-wide whitespace-nowrap">
                  高雄寒軒國際大飯店 · 40F 嘉賓廳
                </h3>

                {/* Address Bar with Copy Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#FFFDFD] border border-[#EFECE6] mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#941B26] shrink-0 mt-0.5" />
                    <span className="font-serif-tc text-sm text-[#221819]">
                      {WEDDING_LOCATION.address}
                    </span>
                  </div>

                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FFF5F5] border border-[#941B26]/25 text-xs font-medium text-[#941B26] transition-colors shrink-0 self-start sm:self-auto shadow-sm"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">已複製地址</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#941B26]" />
                        <span>複製地址</span>
                      </>
                    )}
                  </button>
                </div>

                {/* External Maps Link */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={WEDDING_LOCATION.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#941B26] hover:bg-[#7E131E] text-white active:scale-95 transition-all shadow-[0_4px_16px_rgba(148,27,38,0.22)]"
                  >
                    <NavIcon className="w-4 h-4" />
                    <span>開啟 Google Maps 導航</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                  </a>

                  <a
                    href={`tel:${WEDDING_LOCATION.phone}`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium bg-white border border-[#EFECE6] text-[#221819] hover:border-[#941B26]/40 hover:bg-[#FFF5F5] transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 text-[#941B26]" />
                    <span>酒店總機：{WEDDING_LOCATION.phone}</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Transport Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* MRT info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="p-5 rounded-2xl bg-white/90 border border-[#EFECE6] backdrop-blur-md shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] border border-[#941B26]/20 flex items-center justify-center mb-3">
                  <Train className="w-5 h-5 text-[#941B26]" />
                </div>
                <h4 className="font-serif-tc text-base font-medium text-[#221819] mb-1.5">
                  大眾捷運 (MRT)
                </h4>
                <p className="font-serif-tc text-xs text-[#6B5B5E] leading-relaxed">
                  {WEDDING_LOCATION.mrt}
                </p>
              </motion.div>

              {/* Parking info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="p-5 rounded-2xl bg-white/90 border border-[#EFECE6] backdrop-blur-md shadow-sm"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFF5F5] border border-[#941B26]/20 flex items-center justify-center mb-3">
                  <Car className="w-5 h-5 text-[#941B26]" />
                </div>
                <h4 className="font-serif-tc text-base font-medium text-[#221819] mb-1.5">
                  自行開車 &amp; 泊車
                </h4>
                <p className="font-serif-tc text-xs text-[#6B5B5E] leading-relaxed">
                  {WEDDING_LOCATION.parking}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Styled Interactive Map Display with Radar Pin */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="h-full min-h-[380px] rounded-3xl overflow-hidden relative p-[1.5px] bg-gradient-to-b from-[#941B26]/25 via-[#EFECE6] to-[#C5A059]/25 shadow-[0_10px_35px_rgba(148,27,38,0.06)]"
            >
              <div className="w-full h-full rounded-[22px] overflow-hidden relative bg-[#1c1816] flex items-center justify-center">
                {/* Hotel Facade / Exterior Architectural Visual */}
                <img
                  src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80"
                  alt="高雄寒軒國際大飯店"
                  className="w-full h-full object-cover filter brightness-[0.6] saturate-[0.8] scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Romantic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#221819]/80 via-transparent to-[#221819]/40" />

                {/* Anime.js Radar Scanner and Floating Waypoint Pin */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6 text-center">
                  <div className="relative mb-4">
                    {/* Pulsing Radar Ring */}
                    <span className="absolute -inset-6 rounded-full border border-[#941B26] animate-ping opacity-35" />
                    <span className="absolute -inset-3 rounded-full border border-[#C5A059] animate-pulse" />
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-[#941B26] shadow-[0_0_20px_rgba(148,27,38,0.5)] flex items-center justify-center">
                      <MapPin className="w-7 h-7 text-[#941B26] drop-shadow-sm" />
                    </div>
                  </div>

                  <div className="px-5 py-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-[#EFECE6] shadow-xl max-w-xs">
                    <span className="font-serif-tc text-sm font-bold text-[#221819] block mb-0.5">
                      高雄寒軒國際大飯店
                    </span>
                    <span className="font-serif-tc text-xs text-[#941B26] font-medium block">
                      40F 嘉賓廳 · 盛大入席
                    </span>
                    <span className="text-[11px] font-serif-tc text-[#6B5B5E] block mt-1">
                      高雄市苓雅區四維三路 33 號
                    </span>
                  </div>
                </div>

                {/* View on Map Floating Button */}
                <a
                  href={WEDDING_LOCATION.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-5 inset-x-5 py-3 rounded-xl bg-[#941B26]/95 backdrop-blur-md text-white border border-white/20 font-medium text-xs text-center shadow-lg hover:bg-[#7E131E] transition-all flex items-center justify-center gap-1.5 pointer-events-auto"
                >
                  <NavIcon className="w-3.5 h-3.5 text-[#F3E3C8]" />
                  <span>在 Google 地圖中檢視全景</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
