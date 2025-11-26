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

// Full Product type
export type Product = {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  inStock: number;
  image: { asset: { _ref: string } };
  vendor: { _ref: string };
  category: { _ref: string };
  description?: any[];
  rating?: number;
  tags?: string[];
};

// Type for creating a product (no _id yet)
export type NewProduct = Omit<Product, "_id"> & { _type: "product" };

// Context type
type ProductContextType = {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getProductsForVendor: (vendorId: string) => Product[];
  addProduct: (product: Omit<Product, "_id">) => Promise<Product>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
};

// Create context
const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from Sanity on mount
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        _id,
        name,
        price,
        slug,
        inStock,
        image,
        vendor,
        category,
        description,
        rating,
        tags
      }`;
      const data = await client.fetch<Product[]>(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const getProductById = (id: string) => products.find((p) => p._id === id);

  const getProductsForVendor = (vendorId: string) => {
    return products.filter((p) => p.vendor._ref === vendorId);
  };
  // Add product
  const addProduct = async (
    product: Omit<Product, "_id">
  ): Promise<Product> => {
    try {
      const newProduct: Product = await client.create<NewProduct>({
        _type: "product",
        ...product,
      });
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      console.error("Error adding product:", err);
      throw err;
    }
  };

  // Update product
  const updateProduct = async (
    id: string,
    product: Partial<Product>
  ): Promise<Product> => {
    try {
      const updated: Product = await client
        .patch(id)
        .set(product)
        .commit<Product>();
      setProducts((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...updated } : p))
      );
      return updated;
    } catch (err) {
      console.error("Error updating product:", err);
      throw err;
    }
  };

  // Delete product
  const deleteProduct = async (id: string): Promise<void> => {
    try {
      await client.delete(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      throw err;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        getProductsForVendor,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
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
