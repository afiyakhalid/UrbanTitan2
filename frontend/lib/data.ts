export interface ProductDetails {
  brand: string;
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
  category: string;
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

export const productData: Product[] = [
  {
    id: "101",
    details: {
      brand: "Greenstone's",
      name: "Greenstone's AAC Brick - 600mmX200mmX100mm (4)",
      volume: "Standard",
      productCode: "PRD-102",
      rating: 4.5,
      reviewCount: 128,
      price: 79,
      mrp: 95,
      couponOffer: 10,
      treatsPoints: 4,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "cement",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/200x200/9df78eab33525d08d6e5fb8d27136e95/b/r/brick_image.png",
    ],
    ratingBreakdown: [
      { stars: 5, count: 48 },
      { stars: 4, count: 40 },
      { stars: 3, count: 25 },
      { stars: 2, count: 10 },
      { stars: 1, count: 5 },
    ],
  },
  {
    id: "102",
    details: {
      brand: "Local",
      name: "Local Red Brick - 8-10 x 3.8 x 2.9",
      volume: "Standard",
      productCode: "PRD-103",
      rating: 4.0,
      reviewCount: 256,
      price: 12,
      mrp: 14,
      couponOffer: 10,
      treatsPoints: 1,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "brick-block",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/v/i/vijayawadaredbrick_2.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 90 },
      { stars: 4, count: 80 },
      { stars: 3, count: 50 },
      { stars: 2, count: 20 },
      { stars: 1, count: 16 },
    ],
  },
  {
    id: "103",
    details: {
      brand: "CCI",
      name: "CCI OPC Cement",
      volume: "Standard",
      productCode: "PRD-104",
      rating: 4.7,
      reviewCount: 342,
      price: 410,
      mrp: 492,
      couponOffer: 10,
      treatsPoints: 21,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "cement",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/c/cci_opc.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 180 },
      { stars: 4, count: 100 },
      { stars: 3, count: 40 },
      { stars: 2, count: 15 },
      { stars: 1, count: 7 },
    ],
  },
  {
    id: "104",
    details: {
      brand: "Birla.A1",
      name: "Birla.A1 StrongCrete",
      volume: "Standard",
      productCode: "PRD-105",
      rating: 4.8,
      reviewCount: 512,
      price: 435,
      mrp: 522,
      couponOffer: 10,
      treatsPoints: 22,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "cement",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/e/ceba1cre0002_2.png",
    ],
    ratingBreakdown: [
      { stars: 5, count: 300 },
      { stars: 4, count: 150 },
      { stars: 3, count: 40 },
      { stars: 2, count: 15 },
      { stars: 1, count: 7 },
    ],
  },
  {
    id: "105",
    details: {
      brand: "Sugna",
      name: "Sugna TMT Fe-550 Grade - 16mm",
      volume: "Standard",
      productCode: "PRD-106",
      rating: 3.8,
      reviewCount: 1024,
      price: 53800,
      mrp: 64560,
      couponOffer: 10,
      treatsPoints: 2690,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "steel-bar",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/200x200/9df78eab33525d08d6e5fb8d27136e95/s/u/sugna_tmt_image_3.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 320 },
      { stars: 4, count: 290 },
      { stars: 3, count: 230 },
      { stars: 2, count: 110 },
      { stars: 1, count: 74 },
    ],
  },
  {
    id: "106",
    details: {
      brand: "ACC",
      name: "ACC Suraksha Cement",
      volume: "Standard",
      productCode: "PRD-107",
      rating: 2.7,
      reviewCount: 724,
      price: 290,
      mrp: 348,
      couponOffer: 10,
      treatsPoints: 15,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "cement",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/e/ceppcgacc0001.png",
    ],
    ratingBreakdown: [
      { stars: 5, count: 120 },
      { stars: 4, count: 180 },
      { stars: 3, count: 160 },
      { stars: 2, count: 150 },
      { stars: 1, count: 114 },
    ],
  },

  {
    id: "107",
    details: {
      brand: "Electronics",
      name: "Bajaj CUB LED Street Light 25W",
      volume: "Standard",
      productCode: "PRD-107",
      rating: 4.3,
      reviewCount: 412,
      price: 1299,
      mrp: 1559,
      couponOffer: 10,
      treatsPoints: 65,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "electronics",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/u/cub_led_street_light-bajaj_2.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 180 },
      { stars: 4, count: 140 },
      { stars: 3, count: 60 },
      { stars: 2, count: 20 },
      { stars: 1, count: 12 },
    ],
  },

  {
    id: "108",
    details: {
      brand: "Philips",
      name: "Philips Master LED Bulb",
      volume: "Standard",
      productCode: "PRD-108",
      rating: 4.6,
      reviewCount: 650,
      price: 199,
      mrp: 239,
      couponOffer: 10,
      treatsPoints: 10,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["Standard"],
      category: "electronics",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/1/8/18w.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 300 },
      { stars: 4, count: 200 },
      { stars: 3, count: 100 },
      { stars: 2, count: 30 },
      { stars: 1, count: 20 },
    ],
  },

  {
    id: "109",
    details: {
      brand: "Dulux",
      name: "Dulux ICI Duwel Acrylic Wall Putty - 5 Kg",
      volume: "5 Kg",
      productCode: "PRD-109",
      rating: 4.1,
      reviewCount: 540,
      price: 349,
      mrp: 419,
      couponOffer: 10,
      treatsPoints: 17,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["5 Kg"],
      category: "paint",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/f/pfwcptdlx0108.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 190 },
      { stars: 4, count: 180 },
      { stars: 3, count: 110 },
      { stars: 2, count: 40 },
      { stars: 1, count: 20 },
    ],
  },

  {
    id: "110",
    details: {
      brand: "Dulux",
      name: "Dulux Smoothover - Putty - 4 Ltr",
      volume: "4 Ltr",
      productCode: "PRD-110",
      rating: 4.2,
      reviewCount: 460,
      price: 399,
      mrp: 479,
      couponOffer: 10,
      treatsPoints: 20,
      deliveryDate: "Delivered in 3–5 days",
      sizes: ["4 Ltr"],
      category: "paint",
    },
    images: [
      "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/p/f/pfwcptdlx0105_1.jpg",
    ],
    ratingBreakdown: [
      { stars: 5, count: 170 },
      { stars: 4, count: 160 },
      { stars: 3, count: 90 },
      { stars: 2, count: 25 },
      { stars: 1, count: 15 },
    ],
  },
];
