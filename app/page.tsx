"use client";

import { useState, useMemo } from "react";
import Heading from "@/components/Heading";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/Search/SearchBar";
import Slider from "@/components/Slider";
import productsData from "@/data/products.json"; // JSON import

const Home = () => {
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState(""); // optional unit filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]); // min-max

  // Filter products based on search, unit, and price
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesUnit = unitFilter ? product.unit === unitFilter : true;
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      return matchesSearch && matchesUnit && matchesPrice;
    });
  }, [search, unitFilter, priceRange]);

  return (
    <div className="overflow-hidden padding-top-12vh z-10">
      <SearchBar />

      {/* Slider */}
      <Slider />

      {/* Heading */}
      <Heading />

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 max-w-6xl mx-auto p-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />

        {/* Unit Filter */}
        <select
          value={unitFilter}
          onChange={(e) => setUnitFilter(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="">All Units</option>
          <option value="2 lb">2 lb</option>
          <option value="454 g">454 g</option>
          <option value="1 kg">1 kg</option>
        </select>

        {/* Price Filter */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([parseFloat(e.target.value), priceRange[1]])
            }
            className="border px-2 py-1 rounded w-20"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseFloat(e.target.value)])
            }
            className="border px-2 py-1 rounded w-20"
          />
        </div>
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Home;
