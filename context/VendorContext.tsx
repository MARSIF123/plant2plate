"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { vendors as dummyVendors } from "@/data/vendors";

// ✅ Export Vendor type
export type Vendor = {
  id: number;
  name: string;
  distance: string;
  rating: number;
  location: { lat: number; lng: number };
  image: string;
  description: string;
  products: number[]; // product IDs only
};

type VendorContextType = {
  vendors: Vendor[];
  selectedVendor: Vendor | null;
  getVendorById: (id: number) => Vendor | undefined;
};

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    setVendors(dummyVendors);
  }, []);

  const getVendorById = (id: number) => {
    const v = vendors.find((v) => v.id === Number(id));
    setSelectedVendor(v || null);
    return v;
  };

  return (
    <VendorContext.Provider value={{ vendors, selectedVendor, getVendorById }}>
      {children}
    </VendorContext.Provider>
  );
};

export const useVendors = (): VendorContextType => {
  const context = useContext(VendorContext);
  if (!context)
    throw new Error("useVendors must be used within a VendorProvider");
  return context;
};
