import Heading from "@/components/Heading";
import ProductGrid from "@/components/ProductGrid";
import SearchBar from "@/components/Search/SearchBar";
import Slider from "@/components/Slider";
import Head from "next/head";
import React from "react";

const Home = () => {
  return (
    <div className="overflow-hidden padding-top-12vh z-10">
      <SearchBar />
      <Slider />
      <Heading />
      <ProductGrid />
    </div>
  );
};

export default Home;
