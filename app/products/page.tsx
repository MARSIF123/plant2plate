"use client";
import ProductGrid from "../../components/ProductGrid";
import { useProducts } from "@/context/ProductContext"; // <- use ProductContext

export default function ProductsPage() {
  const { products: productsData } = useProducts(); // <- get products from context
  return (
    <main className="min-h-screen px-6 md:px-20 py-16">
      {/* Page Heading */}
      <section className="text-center mb-12">
        <h1 className="text-primary-green text-4xl md:text-5xl font-bold mb-4">
          Explore Our Fresh Produce
        </h1>
        <p className="text-primary-green text-lg md:text-xl">
          Discover seasonal fruits and vegetables directly from local farmers.
          Freshness and quality guaranteed!
        </p>
      </section>

      {/* Products Grid */}
      <section>
        <ProductGrid products={productsData} />
      </section>
    </main>
  );
}
