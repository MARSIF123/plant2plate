"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { products as dummyProducts } from "@/data/products";
import type { Vendor } from "./VendorContext";

// Product type
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  unit: string;
};

// Context type
type ProductContextType = {
  products: Product[];
  getProductById: (id: number) => Product | undefined;
  getProductsForVendor: (vendor: Vendor) => Product[];
};

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  const getProductById = (id: number) => products.find((p) => p.id === id);

  const getProductsForVendor = (vendor: Vendor) =>
    products.filter((p) => vendor.products.includes(p.id));

  return (
    <ProductContext.Provider
      value={{ products, getProductById, getProductsForVendor }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
