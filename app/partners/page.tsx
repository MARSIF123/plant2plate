"use client";

import { useVendors } from "@/context/VendorContext";
import dynamic from "next/dynamic";
import Link from "next/link";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function VendorsPage() {
  const { vendors } = useVendors();
  console.log("Vendors:", vendors);

  return (
    <main className="p-4 space-y-6">
      <h1 className="text-3xl font-bold">Nearby Vendors</h1>

      {/* Map */}
      <MapView vendors={vendors} />

      {/* List */}
      <div className="space-y-3">
        {vendors.map((vendor) => (
          <Link key={vendor.id} href={`/partners/1`}>
            <div className="p-3 border rounded-xl flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
              <img
                src={vendor.image}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold">{vendor.name}</h2>
                <p className="text-gray-500">
                  {vendor.distance} • ⭐ {vendor.rating}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
