"use client";

import { useState } from "react";
import { useProducts, Product } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

type AddProductFormProps = {
  onProductAdded: (product: Product) => void;
};

export default function AddProductForm({
  onProductAdded,
}: AddProductFormProps) {
  const { user } = useAuth();
  const { addProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [unit, setUnit] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || isNaN(parseFloat(price)) || !image) return;
    if (!user) return;

    const newProduct = {
      name,
      price: parseFloat(price),
      unit,
      image,
      vendorId: user.id,
    };

    try {
      const addedProduct = await addProduct(newProduct);
      onProductAdded(addedProduct);

      // Reset form
      setName("");
      setPrice("");
      setUnit("");
      setImage("");
    } catch (err) {
      alert("Failed to add product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
      />
      <input
        type="number"
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
  );
}
