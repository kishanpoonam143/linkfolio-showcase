export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  affiliateLink: string;
  category: string;
  price?: string;
  rating?: number;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}