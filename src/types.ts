export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'all' | 'romantic' | 'ceremony' | 'lifestyle';
  aspect: 'portrait' | 'landscape';
}
