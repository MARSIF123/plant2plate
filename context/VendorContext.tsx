"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import vendorsDataRaw from "@/data/vendors.json";

// Vendor type
export type Vendor = {
  id: number;
  name: string;
  email: string;
  password?: string;
  farmName: string;
  farmAddress: string;
  certificate?: string;
  distance?: number;
  rating?: number;
  location?: string;
  image?: string;
  products?: number[];
  description?: string;
};

// Context type
type VendorContextType = {
  vendors: Vendor[];
  getVendorById: (id: number) => Vendor | undefined;
  addVendor: (vendor: Omit<Vendor, "id">) => Vendor;
};

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider = ({ children }: { children: ReactNode }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    // safely cast JSON data to Vendor[]
    const loadedVendors: Vendor[] = vendorsDataRaw as unknown as Vendor[];
    setVendors(loadedVendors);
  }, []);

  const getVendorById = (id: number) => vendors.find((v) => v.id === id);

  const addVendor = (vendor: Omit<Vendor, "id">) => {
    const newVendor: Vendor = {
      id: vendors.length ? Math.max(...vendors.map((v) => v.id)) + 1 : 1,
      ...vendor,
      products: vendor.products || [],
      distance: vendor.distance || 0,
      rating: vendor.rating || 0,
      location: vendor.location || "",
      image: vendor.image || "",
      description: vendor.description || "",
    };
    setVendors((prev) => [...prev, newVendor]);
    return newVendor;
  };

  return (
    <VendorContext.Provider value={{ vendors, getVendorById, addVendor }}>
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
