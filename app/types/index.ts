export interface Ebook {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  price: number;
  purchaseUrl: string;
  technology: string;
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
  technology: string;
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
  technology: string;
  operationalSystem: string;
  instructor: string;
  platform: string;
  createdAt: Date;
  updatedAt: Date;
}
