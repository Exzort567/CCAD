export interface News {
  _id: string;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface Event {
    _id: string;
    title: string;
    date: string;
    description: string;
    image: string;
}

export interface Program {
  _id: string;
  title: string;
  category: string;
  dateStart: string;
  dateEnd?: string;
  description: string;
  image: string;
  images?: string[]; // Array of image URLs for multiple images
  slug?: string;
} 