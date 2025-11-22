"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

export default function VendorRegistrationForm() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    farmName: "",
    farmAddress: "",
    certificate: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSuccess(localStorage.getItem("vendorSuccess") === "true");
    setHydrated(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "certificate" && e.target.files) {
      setForm({ ...form, certificate: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.farmName) newErrors.farmName = "Farm name is required";
    if (!form.farmAddress) newErrors.farmAddress = "Farm address is required";
    if (!form.certificate) newErrors.certificate = "Certificate is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("farmName", form.farmName);
      formData.append("farmAddress", form.farmAddress);
      if (form.certificate) formData.append("certificate", form.certificate);

      const res = await fetch("/api/vendors", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("vendorSuccess", "true");
        setSuccess(true);
      } else {
        alert(data.error || "Failed to register vendor");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  if (!hydrated) return null;

  if (success) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-6">
        <Confetti numberOfPieces={300} />
        <h1 className="text-4xl font-bold text-primary-green mb-4 text-center">
          🎉 Congratulations! 🎉
        </h1>
        <p className="mb-6 text-center text-gray-700">
          Your vendor account has been registered successfully.
        </p>
        <button
          onClick={() => router.push("/login")}
          className="bg-primary-green hover:bg-primary-yellow text-white py-3 px-6 rounded-lg font-semibold transition-all hover:scale-105"
        >
          Go to Login
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg w-full p-8 bg-white rounded-xl shadow-xl space-y-5"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Vendor Registration
        </h1>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Farm Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Farm Name</label>
          <input
            name="farmName"
            value={form.farmName}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            placeholder="Green Valley Farm"
          />
          {errors.farmName && (
            <p className="text-red-500 text-sm">{errors.farmName}</p>
          )}
        </div>

        {/* Farm Address */}
        <div>
          <label className="block text-sm font-medium mb-2">Farm Address</label>
          <input
            name="farmAddress"
            value={form.farmAddress}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg"
            placeholder="123 Farm Road"
          />
          {errors.farmAddress && (
            <p className="text-red-500 text-sm">{errors.farmAddress}</p>
          )}
        </div>

        {/* Certificate */}
        <div>
          <label className="block text-sm font-medium mb-2">Certificate</label>
          <input
            name="certificate"
            type="file"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg"
          />
          {errors.certificate && (
            <p className="text-red-500 text-sm">{errors.certificate}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary-green hover:bg-primary-yellow text-white py-4 px-6 rounded-lg w-full font-semibold text-lg transition-all hover:scale-105"
        >
          Register Vendor
        </button>
      </form>
    </main>
  );
}
