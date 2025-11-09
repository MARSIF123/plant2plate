import React from "react";
import ProductsGrid from "../../components/ProductGrid";

export default function ProductsPage() {
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

      {/* Optional: Filter / Search Bar */}
      {/* You can add a filter component here if needed */}

      {/* Products Grid */}
      <section>
        <ProductsGrid />
      </section>
    </main>
  );
}
