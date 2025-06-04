export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  imageUrl: string;
  category: string;
  rating?: number; // Optional: average customer rating
  stock?: number; // Optional: stock quantity
}

export interface ContentItem {
  id: string;
  type: 'news' | 'blog' | 'announcement'; // To differentiate content types
  title: string;
  snippet: string;
  fullContent?: string; // Optional: for full article view later
  imageUrl?: string;
  publishDate: string; // ISO date string
  author?: string;
}

export interface WelcomeContent {
  title: string;
  mainParagraph: string;
  secondaryParagraph?: string;
  callToAction?: {
    text: string;
    href: string;
  };
}

export interface User {
  id: string;
  username: string;
  email: string;
}