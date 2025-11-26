"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import { client } from "@/lib/sanity";

type User = {
  _id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Restore user from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // 1️⃣ Check localStorage first
      if (typeof window !== "undefined") {
        const storedVendor = localStorage.getItem("vendor");
        if (storedVendor) {
          const vendorData = JSON.parse(storedVendor);
          if (vendorData.email === email && vendorData.password === password) {
            setUser({ ...vendorData, role: "vendor" });
            localStorage.setItem(
              "user",
              JSON.stringify({ ...vendorData, role: "vendor" })
            );
            router.push("/vendor/dashboard");
            return true;
          }
        }
      }

      // 2️⃣ Otherwise query Sanity
      const query = `*[_type == "vendor" && email == $email][0]{
        _id,
        name,
        email,
        password,
        role
      }`;

      const vendor: any = await client.fetch(query, { email });

      if (vendor && vendor.password === password) {
        const userData: User = {
          _id: vendor._id,
          name: vendor.name,
          email: vendor.email,
          role: vendor.role || "vendor",
        };

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem(
          "vendor",
          JSON.stringify({ ...userData, password })
        );

        router.push("/vendor/dashboard");
        return true;
      }

      return false;
    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
      localStorage.removeItem("vendorSuccess");
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
