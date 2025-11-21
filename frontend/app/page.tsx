import { Categories } from "@/components/categories";
import { Brands } from "@/components/brands";
import { Hero } from "@/components/hero";
import { Products } from "@/components/products";
import { TopShelf } from "@/components/top-pics";
import { FeatureHighlights } from "@/components/features";

export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <Categories />
      <Products />
      <Brands />
      <TopShelf />
      <FeatureHighlights />
    </main>
  );
}
