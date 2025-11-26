"use client";

import { useEffect, useState } from "react";
import { useVendors, Vendor } from "@/context/VendorContext";
import { useProducts, Product } from "@/context/ProductContext";
import ProductGrid from "@/components/ProductGrid";
import { urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

interface VendorDetailClientProps {
  vendorId: string;
}

export default function VendorDetailClient({
  vendorId,
}: VendorDetailClientProps) {
  const { getVendorById } = useVendors();
  const { getProductsForVendor } = useProducts();

  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [vendorProducts, setVendorProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!vendorId) return;

    const v = getVendorById(vendorId);
    if (!v) return;

    setVendor(v);

    const products = getProductsForVendor(v._id) || [];
    setVendorProducts(products);
  }, [vendorId, getVendorById, getProductsForVendor]);

  if (!vendor) return <p className="p-4">Loading vendor...</p>;

  return (
    <main className="min-h-screen px-6 md:px-20 py-16">
      {/* Vendor Image */}
      {vendor.image ? (
        <img
          src={urlFor(vendor.image)}
          alt={vendor.name}
          className="w-full h-56 rounded-xl object-cover mb-4"
        />
      ) : (
        <div className="w-full h-56 bg-gray-200 rounded-xl mb-4 flex items-center justify-center text-gray-500">
          No Image
        </div>
      )}

      {/* Vendor Info */}
      <h1 className="text-2xl font-bold">{vendor.name}</h1>

      {/* Use PortableText for rich text description */}
      {vendor.description ? (
        <div className="text-gray-600 mb-2">
          <PortableText value={vendor.description} />
        </div>
      ) : (
        <p className="text-gray-600 mb-2">No description available.</p>
      )}

      {vendor.distance && (
        <p className="font-medium">Distance: {vendor.distance}</p>
      )}
      {vendor.rating !== undefined && (
        <p className="font-medium">Rating: ⭐ {vendor.rating}</p>
      )}

      {/* Products */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Products</h2>
      {vendorProducts.length > 0 ? (
        <ProductGrid products={vendorProducts} />
      ) : (
        <p className="text-gray-500">This vendor has no products available.</p>
      )}
    </main>
  );
}
