"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Vendor } from "@/context/VendorContext";

// Only public-facing fields
type PublicVendor = {
  _id: string;
  name: string;
  distance?: string | number;
  location?: { lat: number; lng: number };
};

type MapViewProps = {
  vendors: PublicVendor[];
};

export default function MapView({ vendors }: MapViewProps) {
  // Default map center if no vendors
  const defaultCenter: [number, number] = [43.6532, -79.3832];

  // Center map around first vendor if available
  const center: [number, number] =
    vendors.length && vendors[0].location
      ? [vendors[0].location.lat, vendors[0].location.lng]
      : defaultCenter;

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {vendors.map((vendor) => {
        const loc = vendor.location;
        if (!loc || typeof loc.lat !== "number" || typeof loc.lng !== "number")
          return null;

        return (
          <Marker key={vendor._id} position={[loc.lat, loc.lng]}>
            <Popup>
              <strong>{vendor.name}</strong>
              {vendor.distance && <div>{vendor.distance} away</div>}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
