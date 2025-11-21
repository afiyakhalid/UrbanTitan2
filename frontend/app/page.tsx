import { Categories } from "@/components/categories";
import { Brands } from "@/components/brands";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { Compare } from "@/components/compare";
import { FeatureHighlights } from "@/components/features";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <Categories />
      <Products />
      <Brands />
      <Compare />
      <FeatureHighlights />
    </main>
  );
}
