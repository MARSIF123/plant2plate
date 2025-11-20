"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { Vendor } from "@/context/VendorContext";

type MapViewProps = {
  vendors: Vendor[];
};

export default function MapView({ vendors }: MapViewProps) {
  return (
    <MapContainer
      center={[43.6532, -79.3832]}
      zoom={13}
      style={{ height: "300px" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {vendors.map((vendor) => (
        <Marker
          key={vendor.id}
          position={[vendor.location.lat, vendor.location.lng]}
        >
          <Popup>
            {vendor.name} <br /> {vendor.distance} away
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
