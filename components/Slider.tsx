"use client";
import { useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string; // path relative to public folder
  title?: string;
  description?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: "/images/slide1.jpg",
    title: "Fresh Tomatoes",
    description: "Direct from local farms to your plate",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    title: "Barries",
    description: "Natural sweetness without additives",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    title: "Farmers",
    description: "Dedicated to sustainable agriculture.",
  },
  {
    id: 3,
    image: "/images/slide4.jpg",
    title: "Peaches",
    description: "Peaches being picked off the tree.",
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => setCurrentIndex(index);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-lg shadow-lg">
      {/* Slide */}
      <div className="w-full h-64 md:h-120">
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
          <h2 className="font-semibold">{slides[currentIndex].title}</h2>
          <p className="text-sm">{slides[currentIndex].description}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() =>
          setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10094;
      </button>
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % slides.length)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
      >
        &#10095;
      </button>
    </div>
  );
}
