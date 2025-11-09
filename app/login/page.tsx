"use client";
import { useState } from "react";
import { LuLogIn } from "react-icons/lu";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (!success) setError("Invalid email or password!");
  };

  return (
    <main className="bg-green-50 min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h1 className="text-3xl text-primary-green font-bold mb-6 flex items-center gap-2">
          <LuLogIn className="w-8 h-8" /> Log In
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-green"
          />

          <button
            type="submit"
            className="bg-primary-green hover:bg-primary-red text-white font-semibold px-4 py-2 rounded-md transition-all"
          >
            Log In
          </button>
        </form>
      </div>
    </main>
  );
}
