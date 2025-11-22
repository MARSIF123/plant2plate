"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import productsData from "@/data/products.json"; // import JSON
import type { Vendor } from "./VendorContext";

// Product type
export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  unit: string;
  vendorId: number;
};

// Context type
type ProductContextType = {
  products: Product[];
  getProductById: (id: number) => Product | undefined;
  getProductsForVendor: (vendorId: number) => Product[];
  addProduct: (product: Omit<Product, "id">) => Promise<Product>;
};

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load products from JSON on mount
  useEffect(() => {
    setProducts(productsData);
  }, []);

  const getProductById = (id: number) => products.find((p) => p.id === id);

  const getProductsForVendor = (vendorId: number) =>
    products.filter((p) => p.vendorId === vendorId);

  // Add product via API
  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (data.success) {
        setProducts((prev) => [...prev, data.product]);
        return data.product;
      } else {
        throw new Error(data.error || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{ products, getProductById, getProductsForVendor, addProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Hook to use context
export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts must be used within a ProductProvider");
  return context;
};
