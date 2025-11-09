"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";

type Product = {
  id: number;
  name: string;
  price: number;
  unit?: string;
  image: string;
};

export default function VendorDashboard() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

  if (!user) return <p>Loading...</p>;

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !image) return;

    const newProduct: Product = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      unit,
      image,
    };

    setProducts((prev) => [...prev, newProduct]);
    setName("");
    setPrice("");
    setUnit("");
    setImage("");
  };

  return (
    <main className="min-h-screen p-8 bg-green-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-green">
          Welcome, {user.name}
        </h1>
        <button
          onClick={logout}
          className="bg-primary-green hover:bg-primary-red text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Your Products
        </h2>
        <ProductGrid products={products} setProducts={setProducts} />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Add New Product
        </h2>
        <form
          onSubmit={handleAddProduct}
          className="flex flex-col gap-4 max-w-md"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
          <input
            type="text"
            placeholder="Unit (optional)"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
          <button
            type="submit"
            className="bg-primary-green hover:bg-primary-red text-white px-4 py-2 rounded"
          >
            Add Product
          </button>
        </form>
      </section>
    </main>
  );
}
