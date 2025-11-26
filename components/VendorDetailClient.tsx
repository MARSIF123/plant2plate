"use client";
import { useEffect, useState } from "react";
import type { Product } from "@/context/ProductContext";
import type { Vendor } from "@/context/VendorContext";
import { useVendors } from "@/context/VendorContext";
import { useProducts } from "@/context/ProductContext";
import ProductGrid from "@/components/ProductGrid";

export default function VendorDetailClient({ vendorId }: { vendorId: string }) {
  const { getVendorById } = useVendors();
  const { getProductsForVendor } = useProducts();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);

  useEffect(() => {
    const id = Number(vendorId);
    const v = getVendorById(id);

    if (v) {
      setVendor(v);

      // FIX: pass vendor.id OR vendor.products
      const products = getProductsForVendor(v.id);
      setVendorProducts(products);
    }
  }, [vendorId, getVendorById, getProductsForVendor]);

  if (!vendor) return <p className="p-4">Loading vendor...</p>;

  return (
    <main className="min-h-screen px-6 md:px-20 py-16">
      <img src={vendor.image} className="w-full h-56 rounded-xl object-cover" />

      <h1 className="text-2xl font-bold">{vendor.name}</h1>
      <p className="text-gray-600">{vendor.description}</p>

      <p className="font-medium">Distance: {vendor.distance}</p>
      <p className="font-medium">Rating: ⭐ {vendor.rating}</p>

      <h2 className="text-xl font-semibold mt-4">Products</h2>

      <ProductGrid products={vendorProducts} />
    </main>
  );
}
