import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, Check, Heart } from 'lucide-react';
import { WEDDING_DATE, WEDDING_LOCATION, WEDDING_DATE_DISPLAY, WEDDING_DATE_WEEKDAY } from '../data';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownSection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);

  useEffect(() => {
    const target = new Date(WEDDING_DATE).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Google Calendar URL
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent('白庭宇 & 李佳曄 婚禮盛宴');
    const details = encodeURIComponent(
      '誠摯邀請您見證庭宇與佳曄的婚禮盛典！\n\n地點：高雄寒軒國際大飯店 40F 嘉賓廳\n時間：2026年9月19日 12:00 入席'
    );
    const location = encodeURIComponent(WEDDING_LOCATION.address);
    // 2026-09-19 11:30 to 15:30 (UTC+8 -> 03:30 to 07:30 UTC)
    const dates = '20260919T033000Z/20260919T073000Z';
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // Generate and download .ics file
  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Jacky & Kelly Wedding//TW',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-jacky-kelly-20260919@wedding.invitation',
      'DTSTAMP:20260101T000000Z',
      'DTSTART:20260919T033000Z',
      'DTEND:20260919T073000Z',
      'SUMMARY:白庭宇 & 李佳曄 婚禮盛宴',
      `DESCRIPTION:誠摯邀請您見證庭宇與佳曄的幸福時刻！地點：${WEDDING_LOCATION.name}`,
      `LOCATION:${WEDDING_LOCATION.address}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jacky_Kelly_Wedding_2026.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const timeUnits = [
    { label: 'DAYS', labelZh: '天', value: timeLeft.days },
    { label: 'HOURS', labelZh: '時', value: timeLeft.hours },
    { label: 'MINUTES', labelZh: '分', value: timeLeft.minutes },
    { label: 'SECONDS', labelZh: '秒', value: timeLeft.seconds },
  ];

  return (
    <section id="countdown" className="relative py-20 px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#941B26]/25 via-white to-[#C5A059]/25 shadow-[0_10px_35px_rgba(148,27,38,0.06)] font-chinese"
        >
          <div className="rounded-[22px] bg-white/95 backdrop-blur-2xl p-4 sm:p-10 md:p-12 text-center relative overflow-hidden border border-[#EFECE6]">
            {/* Background Anime.js Ambient Concentric Arcs */}
            <div className="absolute -top-24 -left-24 w-64 h-64 border border-[#941B26]/10 rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 border border-[#C5A059]/15 rounded-full pointer-events-none" />

            {/* Save The Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFF5F5] border border-[#941B26]/20 text-xs font-serif-tc tracking-widest text-[#941B26] mb-4 shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-[#941B26]" />
              <span>珍藏這一天</span>
            </div>

            {/* Grand Date Feature Box */}
            <div className="relative max-w-xl mx-auto my-3 px-3 py-5 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FFFDFD] via-white to-[#FAF8F6] border border-[#EFECE6] shadow-[0_8px_30px_rgba(148,27,38,0.04)] overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="h-[1px] w-8 bg-[#941B26]/30" />
                <span className="font-serif-tc text-xs tracking-widest text-[#941B26] font-semibold">
                  婚禮盛宴 · 幸福相約
                </span>
                <span className="h-[1px] w-8 bg-[#941B26]/30" />
              </div>

              {/* Massive Emphasized Date */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-cinzel text-3xl min-[360px]:text-4xl min-[410px]:text-[2.6rem] sm:text-7xl md:text-8xl font-black tracking-normal min-[410px]:tracking-tight sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#941B26] via-[#B82835] to-[#941B26] py-1 drop-shadow-sm select-none whitespace-nowrap leading-tight"
              >
                {WEDDING_DATE_DISPLAY}
              </motion.div>

              {/* Weekday & Time Details */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-4 mt-3 font-serif-tc text-xs sm:text-base text-[#221819]">
                <span className="font-medium text-[#941B26] bg-[#FFF5F5] border border-[#941B26]/25 px-3 py-0.5 rounded-full text-xs sm:text-sm">
                  {WEDDING_DATE_WEEKDAY}
                </span>
                <span className="text-[#C5A059]">•</span>
                <span className="font-medium">中午 12:00 準時入席</span>
                <span className="text-[#C5A059]">•</span>
                <span className="text-[#6B5B5E]">寒軒國際大飯店 40F</span>
              </div>
            </div>

            {/* Romantic divider */}
            <div className="flex items-center justify-center gap-3 my-8 max-w-md mx-auto">
              <span className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#941B26]/30" />
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F5] border border-[#941B26]/20 text-xs font-serif-tc text-[#941B26]">
                <Heart className="w-3 h-3 fill-[#941B26] text-[#941B26]" />
                <span>倒數迎接幸福時刻</span>
              </div>
              <span className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#941B26]/30" />
            </div>

            {/* Kinetic Countdown Counter Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto mb-10">
              {timeUnits.map((unit) => (
                <div
                  key={unit.label}
                  className="group relative p-[1px] rounded-2xl bg-gradient-to-b from-[#EFECE6] to-[#E2DED7] hover:from-[#941B26]/50 transition-all duration-300"
                >
                  <div className="p-4 sm:p-6 rounded-[15px] bg-white flex flex-col items-center justify-center border border-[#EFECE6] shadow-sm">
                    <motion.span
                      key={unit.value}
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="font-cinzel text-3xl sm:text-5xl font-bold text-[#941B26] drop-shadow-sm"
                    >
                      {String(unit.value).padStart(2, '0')}
                    </motion.span>
                    <div className="mt-2 text-xs font-serif-tc tracking-widest text-[#6B5B5E] font-semibold">
                      <span>{unit.labelZh}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add to Calendar Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={getGoogleCalendarUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-medium bg-[#941B26] hover:bg-[#7E131E] text-white shadow-[0_4px_16px_rgba(148,27,38,0.22)] transition-all duration-300 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#F3E3C8]" />
                <span>加入 Google 行事曆</span>
              </a>

              <button
                onClick={downloadIcsFile}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium bg-white text-[#941B26] border border-[#941B26]/30 hover:bg-[#FFF5F5] transition-all duration-300 active:scale-95 shadow-sm"
              >
                {copiedNotification ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Download className="w-4 h-4 text-[#941B26]" />
                )}
                <span>
                  {copiedNotification ? '已下載行事曆邀請 (.ics)' : '下載 Apple / Outlook 日曆'}
                </span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
