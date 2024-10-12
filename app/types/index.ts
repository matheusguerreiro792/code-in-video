export interface Ebook {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  price: number;
  purchaseUrl: string;
  category: string;
  author: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  purchaseUrl: string;
  category: string;
  instructor: string;
  platform: string;
  lessons: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl: string;
  category: string;
  instructor: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}
