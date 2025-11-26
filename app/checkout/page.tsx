"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts, Product } from "@/context/ProductContext";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

// Sanity image builder
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

export default function CheckoutPage() {
  const { cart, changeQuantity, removeFromCart, clearCart } = useCart();
  const { products } = useProducts();

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.email || !userDetails.address) {
      alert("Please fill in all required fields!");
      return;
    }

    // TODO: send cart + userDetails to backend/payment gateway
    alert("Order placed successfully!");
    clearCart();
    setUserDetails({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
    });
  };

  // Calculate total
  const total = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((p) => p._id === id);
    return product ? sum + product.price * qty : sum;
  }, 0);

  if (Object.keys(cart).length === 0) {
    return (
      <main className="min-h-screen px-6 md:px-20 py-16">
        <h1 className="text-primary-green text-4xl md:text-5xl font-bold text-center mb-8">
          Checkout
        </h1>
        <p className="text-center text-primary-green text-xl">
          Your cart is empty. Please add some products!
        </p>
      </main>
    );
  }

  return (
    <main className="bg-green-50 min-h-screen px-6 md:px-20 py-16">
      <h1 className="text-primary-green text-4xl md:text-5xl font-bold mb-8 text-center">
        Checkout
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Cart Items */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-primary-green text-2xl font-semibold mb-4">
            Your Cart
          </h2>

          <table className="w-full text-left mb-6">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-2">Product</th>
                <th className="py-2">Price</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Subtotal</th>
                <th className="py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cart).map(([id, qty]) => {
                const product = products.find((p) => p._id === id);
                if (!product) return null;
                const imageSrc = product.image
                  ? urlFor(product.image)
                  : "/placeholder.png";

                return (
                  <tr key={id} className="border-b border-gray-200">
                    <td className="py-2 flex items-center gap-2">
                      <img
                        src={imageSrc}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <Link
                        href={`/products/${product.slug.current}`}
                        className="text-primary-green hover:underline"
                      >
                        {product.name}
                      </Link>
                    </td>
                    <td className="py-2">${product.price.toFixed(2)}</td>
                    <td className="py-2 flex items-center gap-2">
                      <button
                        onClick={() => changeQuantity(product._id, -1)}
                        className="px-2 text-lg font-bold bg-gray-200 rounded"
                      >
                        -
                      </button>
                      {qty}
                      <button
                        onClick={() => changeQuantity(product._id, 1)}
                        className="px-2 text-lg font-bold bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="py-2">
                      ${(product.price * qty).toFixed(2)}
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="text-primary-green hover:text-primary-red"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center text-primary-green font-semibold text-xl">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Right: User Details / Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-primary-green text-2xl font-semibold mb-4">
            Shipping Details
          </h2>
          <div className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={userDetails.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={userDetails.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={userDetails.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={userDetails.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              value={userDetails.city}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={userDetails.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>

          <h2 className="text-primary-green text-2xl font-semibold my-4">
            Payment
          </h2>
          <p className="text-primary-green mb-4">
            For now, payment will be simulated on submission.
          </p>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-primary-green hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-all mt-4"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}
