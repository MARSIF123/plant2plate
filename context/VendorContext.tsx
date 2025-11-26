"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { client } from "@/lib/sanity";
import type { SanityDocument } from "@sanity/client";

// -------------------------
// Vendor Type
// -------------------------
export type Vendor = {
  _id: string;
  name: string;
  slug: { current: string };
  email: string;
  password?: string;
  farmName: string;
  farmAddress: string;
  distance?: string;
  rating?: number;
  location?: { lat: number; lng: number };
  image?: any;
  description?: any[];
};

// -------------------------
// Context Type
// -------------------------
type VendorContextType = {
  vendors: Vendor[];
  getVendorById: (id: string) => Vendor | undefined;
  fetchVendors: () => Promise<void>;
  addVendor: (vendor: Omit<Vendor, "_id" | "slug">) => Promise<Vendor>;
  updateVendor: (id: string, vendor: Partial<Vendor>) => Promise<Vendor>;
  deleteVendor: (id: string) => Promise<void>;
};

// -------------------------
// Context
// -------------------------
const VendorContext = createContext<VendorContextType | undefined>(undefined);

// -------------------------
// Map Sanity Document → Vendor
// -------------------------
const mapVendor = (doc: any): Vendor => ({
  _id: doc._id,
  name: doc.name,
  slug: doc.slug,
  email: doc.email,
  password: doc.password,
  farmName: doc.farmName,
  farmAddress: doc.farmAddress,
  distance: doc.distance,
  rating: doc.rating,
  location: doc.location,
  image: doc.image,
  description: doc.description,
});

// -------------------------
// Provider
// -------------------------
export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  // Fetch all vendors from Sanity
  const fetchVendors = async () => {
    const data = await client.fetch('*[_type == "vendor"]');
    setVendors(data.map((doc: SanityDocument) => mapVendor(doc)));
  };

  // Get vendor by slug
  const getVendorById = (id: string) =>
    vendors.find((v) => v.slug?.current === id);

  // Add vendor via API (no certificate/image)
  const addVendor = async (vendor: Omit<Vendor, "_id" | "slug">) => {
    const res = await fetch("/api/vendors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(vendor),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to add vendor");
    }

    const data = await res.json();
    const mapped = mapVendor(data);
    setVendors((prev) => [...prev, mapped]);
    return mapped;
  };

  // Update vendor
  const updateVendor = async (id: string, vendor: Partial<Vendor>) => {
    const updatedVendor = await client.patch(id).set(vendor).commit();
    const mapped = mapVendor(updatedVendor);
    setVendors((prev) => prev.map((v) => (v._id === id ? mapped : v)));
    return mapped;
  };

  // Delete vendor
  const deleteVendor = async (id: string) => {
    await client.delete(id);
    setVendors((prev) => prev.filter((v) => v._id !== id));
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <VendorContext.Provider
      value={{
        vendors,
        getVendorById,
        fetchVendors,
        addVendor,
        updateVendor,
        deleteVendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

// -------------------------
// Hook
// -------------------------
export const useVendors = () => {
  const context = useContext(VendorContext);
  if (!context)
    throw new Error("useVendors must be used within a VendorProvider");
  return context;
};
