"use client";
import { useState } from "react";
import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";

type Product = {
  id: number;
  name: string;
  price: number;
  unit?: string;
  image: string;
};

type ProductGridProps = {
  products: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>; // optional for delete
};

export default function ProductGrid({
  products,
  setProducts,
}: ProductGridProps) {
  const [cart, setCart] = useState<{ [key: number]: number }>({});

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
    if (setProducts) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const changeQuantity = (id: number, delta: number) => {
    setCart((prev) => {
      const newQty = (prev[id] || 0) + delta;
      if (newQty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => {
        const quantity = cart[product.id] || 0;
        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-2 right-2 text-primary-green hover:text-primary-red">
                <HiHeart size={24} />
              </button>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                {product.unit && (
                  <p className="text-gray-500 text-sm">{product.unit}</p>
                )}
                <p className="text-green-700 font-bold mt-2">
                  ${product.price.toFixed(2)} ea.
                </p>
              </div>

              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-4 bg-primary-green hover:bg-primary-red text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              ) : (
                <div className="mt-4 flex items-center justify-between border border-gray-200 rounded px-2">
                  <button
                    onClick={() => changeQuantity(product.id, -1)}
                    className="px-2 text-lg font-bold"
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    onClick={() => changeQuantity(product.id, 1)}
                    className="px-2 text-lg font-bold"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-primary-green hover:text-primary-red ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
