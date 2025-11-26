"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Vendor } from "@/context/VendorContext";

type MapViewProps = {
  vendors: Vendor[];
};

// define the real location type your JSON uses
type Location = { lat: number; lng: number };

export default function MapView({ vendors }: MapViewProps) {
  return (
    <MapContainer
      center={[43.6532, -79.3832]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {vendors.map((vendor) => {
        // force cast the location safely
        const loc = vendor.location as unknown as Location | undefined;

        // skip if invalid
        if (
          !loc ||
          typeof loc.lat !== "number" ||
          typeof loc.lng !== "number"
        ) {
          return null;
        }

        return (
          <Marker key={vendor.id} position={[loc.lat, loc.lng]}>
            <Popup>
              {vendor.name}
              <br />
              {vendor.distance} away
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
