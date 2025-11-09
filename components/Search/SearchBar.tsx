"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // your search logic here
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm overflow-hidden w-full max-w-md">
        <div className="px-3 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="flex-grow px-2 py-2 text-gray-700 focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="bg-primary-green text-white px-4 py-2 font-medium hover:bg-primary-red transition"
        >
          Search
        </button>
      </div>
    </div>
  );
}
