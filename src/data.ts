import { GalleryPhoto } from './types';

export const WEDDING_DATE = '2026-09-19T12:00:00';
export const WEDDING_DATE_DISPLAY = '2026.09.19';
export const WEDDING_DATE_WEEKDAY = '星期六';

export const COUPLE_NAMES = {
  groom: {
    zh: '白庭宇',
    en: 'Jacky',
    fullNameEn: 'Jacky Pai',
  },
  bride: {
    zh: '李佳曄',
    en: 'Kelly',
    fullNameEn: 'Kelly Lee',
  },
  monogram: 'J & K',
};

export const WEDDING_LOCATION = {
  name: '高雄寒軒國際大飯店 · 40F',
  englishName: 'Han-Hsien International Hotel Kaohsiung, 40F',
  address: '高雄市苓雅區四維三路 33 號 40 樓',
  googleMapsUrl: 'https://maps.google.com/?q=高雄寒軒國際大飯店',
  phone: '+886 7 332 2000',
  mrt: '高雄捷運紅線「三多商圈站」6 號出口，步行約 10-12 分鐘；或搭乘公車紅 21、0 南至「寒軒國際飯店」站。',
  parking: '飯店地下室 B2-B4 備有貴賓平面及機械停車場，參加婚宴之貴賓提供免費停車消磁優惠。',
};

const base = import.meta.env.BASE_URL || './';

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'g-1192',
    url: `${base}photos/20260721婚紗攝影-毛片-1192.jpg`,
    title: '春日煦陽',
    caption: '陽光穿透樹梢，捕捉相視一笑的溫潤情意',
    category: 'romantic',
    aspect: 'portrait',
  },
  {
    id: 'g-1139',
    url: `${base}photos/20260721婚紗攝影-毛片-1139.jpg`,
    title: '浪漫時光',
    caption: '相視而笑，勾勒出心中最純淨的承諾',
    category: 'ceremony',
    aspect: 'portrait',
  },
  {
    id: 'g-1017',
    url: `${base}photos/20260721婚紗攝影-毛片-1017.jpg`,
    title: '花漾約定',
    caption: '盛放的笑顏，定格成青春中最璀璨的誓約',
    category: 'romantic',
    aspect: 'portrait',
  },
  {
    id: 'g-529',
    url: `${base}photos/20260721婚紗攝影-毛片-529.jpg`,
    title: '微醺暮色',
    caption: '暮色溫潤如水，執手同行每一步皆是心動',
    category: 'romantic',
    aspect: 'portrait',
  },
  {
    id: 'g-25',
    url: `${base}photos/20260721婚紗攝影-毛片-25.jpg`,
    title: '誓約深情',
    caption: '微風輕拂裙襬，在相擁中找到一生的歸宿',
    category: 'ceremony',
    aspect: 'portrait',
  },
  {
    id: 'g-650',
    url: `${base}photos/20260721婚紗攝影-毛片-650.jpg`,
    title: '甜蜜凝眸',
    caption: '相視而笑，相視相惜此生不渝',
    category: 'lifestyle',
    aspect: 'landscape',
  },
];
