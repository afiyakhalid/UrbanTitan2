import { apiFetch } from "@/lib/api";
import { type Product as UiProduct } from "@/lib/types";

import {
  allBrands,
  allCategories,
  type Brand as UiBrand,
  type CategoryLink as UiCategoryLink,
} from "@/lib/constants";

type CacheEntry<T> = { value: T; expiresAt: number };

const CACHE_TTL_MS = 60_000; // 60s, keeps UI snappy without going stale for long

let brandsCache: CacheEntry<UiBrand[]> | null = null;
let categoriesCache: CacheEntry<UiCategoryLink[]> | null = null;
let productsCache: CacheEntry<UiProduct[]> | null = null;

function isFresh<T>(entry: CacheEntry<T> | null): entry is CacheEntry<T> {
  return !!entry && Date.now() < entry.expiresAt;
}

export type BackendBrand = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string | null;
  imageUrl?: string | null;
  websiteUrl?: string | null;
};

export type BackendCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  imageUrl?: string | null;
  isActive?: boolean | null;
};

export type BackendProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  volume?: string | null;
  productCode?: string | null;
  basePrice: number | string;
  mrp?: number | string | null;
  couponOffer?: number | null;
  treatsPoints?: number | null;
  rating?: number | string | null;
  reviewCount?: number | null;
  deliveryDate?: string | null;
  primaryImageUrl?: string | null;
  brandId: string;
  categoryId: string;
  brandName?: string | null;
  brandSlug?: string | null;
  categoryName?: string | null;
  categorySlug?: string | null;
};

const DEFAULT_PRODUCT_IMAGE =
  "https://cdn-media.buildersmart.in/media/catalog/product/cache/1/image/200x200/9df78eab33525d08d6e5fb8d27136e95/b/r/brick_image.png";

function toNumber(v: unknown, fallback: number): number {
  if (v === null || v === undefined) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

export function mapBackendBrandToUi(brand: BackendBrand): UiBrand {
  return {
    name: brand.name,
    slug: brand.slug,
    href: `/brands/${brand.slug}`,
    imageUrl: brand.imageUrl ?? undefined,
    description: brand.description,
  };
}

export function mapBackendCategoryToUi(category: BackendCategory): UiCategoryLink {
  return {
    name: category.name,
    slug: category.slug,
    href: `/products?categories=${encodeURIComponent(category.slug)}`,
    imageUrl: category.imageUrl ?? undefined,
    children: [],
  };
}

export function mapBackendProductToUi(product: BackendProduct): UiProduct {
  const price = toNumber(product.basePrice, 0);
  const mrp = toNumber(product.mrp, price);
  const couponOffer = product.couponOffer ?? 0;
  const treatsPoints = product.treatsPoints ?? 0;
  const rating = toNumber(product.rating, 4.0);
  const reviewCount = product.reviewCount ?? 0;

  const volume = product.volume?.trim() ? product.volume : "Standard";
  const deliveryDate = product.deliveryDate?.trim()
    ? product.deliveryDate
    : "Delivered in 3–5 days";

  const brandName = product.brandName?.trim() ? product.brandName : "Brand";
  const brandSlug = product.brandSlug?.trim() ? product.brandSlug : "";

  const categoryName = product.categoryName?.trim()
    ? product.categoryName
    : "Category";
  const categorySlug = product.categorySlug?.trim() ? product.categorySlug : "";

  const images = [product.primaryImageUrl ?? DEFAULT_PRODUCT_IMAGE].filter(
    Boolean
  ) as string[];

  return {
    id: product.id,
    details: {
      brand: { name: brandName, slug: brandSlug },
      name: product.name,
      volume,
      productCode: product.productCode?.trim() ? product.productCode : product.slug,
      rating,
      reviewCount,
      price,
      mrp,
      couponOffer,
      treatsPoints,
      deliveryDate,
      sizes: [volume],
      category: { name: categoryName, slug: categorySlug },
    },
    images,
    ratingBreakdown: [],
  };
}

export async function fetchBrands(): Promise<UiBrand[]> {
  if (isFresh(brandsCache)) return brandsCache.value;
  try {
    const res = await apiFetch("/api/v1/brands/");
    const data = (await res.json()) as BackendBrand[];
    const mapped = data.map(mapBackendBrandToUi);
    brandsCache = { value: mapped, expiresAt: Date.now() + CACHE_TTL_MS };
    return mapped;
  } catch {
    return allBrands;
  }
}

export async function fetchCategories(): Promise<UiCategoryLink[]> {
  if (isFresh(categoriesCache)) return categoriesCache.value;
  try {
    const res = await apiFetch("/api/v1/categories/");
    const data = (await res.json()) as BackendCategory[];
    const mapped = data.map(mapBackendCategoryToUi);
    categoriesCache = { value: mapped, expiresAt: Date.now() + CACHE_TTL_MS };
    return mapped;
  } catch {
    return allCategories;
  }
}

export async function fetchProducts(): Promise<UiProduct[]> {
  if (isFresh(productsCache)) return productsCache.value;
  try {
    const res = await apiFetch("/api/v1/products/");
    const data = (await res.json()) as BackendProduct[];
    const mapped = data.map(mapBackendProductToUi);
    productsCache = { value: mapped, expiresAt: Date.now() + CACHE_TTL_MS };
    return mapped;
  } catch {
    return [];
  }
}

export async function fetchProductById(id: string): Promise<UiProduct | null> {
  try {
    const res = await apiFetch(`/api/v1/products/${id}`);
    const data = (await res.json()) as BackendProduct;
    return mapBackendProductToUi(data);
  } catch {
    try {
      const res = await apiFetch(`/api/v1/products/slug/${encodeURIComponent(id)}`);
      const data = (await res.json()) as BackendProduct;
      return mapBackendProductToUi(data);
    } catch {
      return null;
    }
  }
}

export async function searchProducts(query: string): Promise<UiProduct[]> {
  try {
    // Backend returns mixed types; for the products page we only want product matches.
    const [matches, allProducts] = await Promise.all([
      (async () => {
        const res = await apiFetch(
          `/api/v1/search?q=${encodeURIComponent(query)}&limit=50`
        );
        const raw = (await res.json()) as unknown;
        const list = Array.isArray(raw)
          ? raw
          : Array.isArray((raw as any)?.matches)
            ? (raw as any).matches
            : Array.isArray((raw as any)?.results)
              ? (raw as any).results
              : Array.isArray((raw as any)?.items)
                ? (raw as any).items
                : [];
        return list as Array<{
          type: string;
          label: string;
          slug: string;
          score?: number;
        }>;
      })(),
      fetchProducts(),
    ]);

    if (!Array.isArray(matches) || matches.length === 0) return [];

    const productSlugsInOrder = matches
      .filter((m) => String(m.type).toLowerCase() === "product" && m.slug)
      .map((m) => m.slug);

    const productSlugRank = new Map<string, number>();
    productSlugsInOrder.forEach((slug, idx) => {
      if (!productSlugRank.has(slug)) productSlugRank.set(slug, idx);
    });

    const matched = allProducts.filter((p) => {
      const code = p.details.productCode;
      return code ? productSlugRank.has(code) : false;
    });

    // Preserve backend ordering.
    matched.sort((a, b) => {
      const ra = productSlugRank.get(a.details.productCode ?? "") ?? 1e9;
      const rb = productSlugRank.get(b.details.productCode ?? "") ?? 1e9;
      return ra - rb;
    });

    return matched;
  } catch (error) {
    console.error("Search failed", error);
    return [];
  }
}
