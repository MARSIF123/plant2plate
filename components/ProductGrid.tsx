"use client";

import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Product } from "@/context/ProductContext"; // <-- import Product type from context

type ProductGridProps = {
  products: Product[];
  setProducts?: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function ProductGrid({
  products,
  setProducts,
}: ProductGridProps) {
  const { cart, addToCart, removeFromCart, changeQuantity } = useCart();
  const router = useRouter();

  const handleRemove = (id: number) => {
    removeFromCart(id);
    if (setProducts) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCardClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
      {products.map((product) => {
        const quantity = cart[product.id] || 0;

        return (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCardClick(product.id)}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                className="absolute top-2 right-2 text-primary-green hover:text-primary-red"
                onClick={(e) => e.stopPropagation()}
              >
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
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                  className="mt-4 bg-primary-green hover:bg-primary-red text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              ) : (
                <div
                  className="mt-4 flex items-center justify-between border border-gray-200 rounded px-2"
                  onClick={(e) => e.stopPropagation()}
                >
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
                    onClick={() => handleRemove(product.id)}
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
