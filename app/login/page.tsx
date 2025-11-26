"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/vendor/dashboard");
    }
  }, [user, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Await the async login function
    const success = await login(email, password);

    if (!success) {
      setError("Invalid email or password");
    }
  };

  return (
    <main className="max-w-md mx-auto p-6 mt-20 mb-20 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Vendor Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full bg-primary-green hover:bg-green-600 text-white py-2 rounded font-semibold cursor-pointer transition-all hover:scale-105"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-center text-gray-600">
        Don’t have an account?{" "}
        <Link href="/register" className="text-primary-green font-semibold">
          Register here
        </Link>
      </p>
    </main>
  );
}
