"use client";

import { useVendors } from "@/context/VendorContext";
import dynamic from "next/dynamic";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function VendorsPage() {
  const { vendors } = useVendors();

  // Filter only public-facing fields
  const publicVendors = vendors.map((v) => ({
    _id: v._id,
    name: v.name,
    slug: v.slug,
    farmName: v.farmName,
    distance: v.distance,
    rating: v.rating,
    image: v.image,
    location: v.location,
  }));

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Nearby Vendors</h1>

      {/* Map */}
      <MapView vendors={publicVendors} />

      {/* List */}
      <div className="space-y-3">
        {publicVendors.map((vendor) => (
          <Link
            key={vendor._id}
            href={`/partners/${vendor.slug?.current || vendor._id}`}
          >
            <div className="p-3 border rounded-xl flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
              <img
                src={vendor.image ? urlFor(vendor.image) : "/placeholder.png"}
                alt={vendor.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{vendor.name}</h2>
                {vendor.distance !== undefined &&
                  vendor.rating !== undefined && (
                    <p className="text-gray-500">
                      {vendor.distance} • ⭐ {vendor.rating}
                    </p>
                  )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
