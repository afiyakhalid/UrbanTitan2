export interface CategoryType {
  id: string;
  name: string;
  slug: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDetails {
  brand: { name: string; slug: string };
  name: string;
  volume: string;
  productCode: string;
  rating: number;
  reviewCount: number;
  price: number;
  mrp: number;
  couponOffer: number;
  treatsPoints: number;
  deliveryDate: string;
  sizes: string[];
  category: { name: string; slug: string };
}

export interface RatingBreakdownItem {
  stars: number;
  count: number;
}

export interface Product {
  id: string;
  details: ProductDetails;
  images: string[];
  ratingBreakdown: RatingBreakdownItem[];
}
