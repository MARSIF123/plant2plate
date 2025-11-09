// context/CartContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type CartType = {
  [productId: number]: number;
};

type CartContextType = {
  cart: CartType;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  changeQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartType>({});

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
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

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook to use CartContext easily
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
