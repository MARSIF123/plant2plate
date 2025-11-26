"use client";

import { useState } from "react";
import { useProducts, Product } from "@/context/ProductContext";
import { useAuth } from "@/context/AuthContext";

type AddProductFormProps = {
  onProductAdded: (product: Product) => void;
  defaultCategoryId: string;
};

export default function AddProductForm({
  onProductAdded,
  defaultCategoryId,
}: AddProductFormProps) {
  const { user } = useAuth();
  const { addProduct } = useProducts();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !inStock || !imageFile) return;

    setUploading(true);

    // 1️⃣ Upload image
    const formData = new FormData();
    formData.append("file", imageFile);

    const uploadRes = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const uploadData = await uploadRes.json();
    if (!uploadData.success) {
      alert(uploadData.error);
      setUploading(false);
      return;
    }

    const imageId = uploadData.imageId;

    // 2️⃣ Create product
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        inStock: parseInt(inStock),
        categoryId: defaultCategoryId,
        vendorId: user?._id,
        imageId,
      }),
    });

    const data = await res.json();
    setUploading(false);

    if (!data.success) return alert(data.error);
    onProductAdded(data.product);

    setName("");
    setPrice("");
    setInStock("");
    setImageFile(null);
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
        type="number"
        placeholder="Stock Quantity"
        value={inStock}
        onChange={(e) => setInStock(e.target.value)}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-green"
      />
      {imageFile && (
        <img
          src={URL.createObjectURL(imageFile)}
          alt="Preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}
      <button
        type="submit"
        disabled={uploading}
        className={`px-4 py-2 rounded text-white ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary-green hover:bg-primary-red"
        }`}
      >
        {uploading ? "Uploading..." : "Add Product"}
      </button>
    </form>
  );
}
