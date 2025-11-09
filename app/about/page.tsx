// components/AboutUs.tsx
import React from "react";
import Image from "next/image";
import farmerImage from "@/public/images/slide3.jpg"; // Replace with your farmer image

const AboutUs: React.FC = () => {
  return (
    <section className="py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:gap-12">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-primary-green text-4xl md:text-5xl font-bold mb-6">
            Meet the Farmers Behind Your Food
          </h1>

          <p className="text-primary-green text-lg md:text-xl mb-6">
            We connect you directly with local farmers to enjoy fresh, seasonal
            produce. Every bite is nutrient-rich, sustainably grown, and
            supports the people who cultivate your food.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-primary-green font-semibold mb-2">
                Transparency
              </h2>
              <p className="text-primary-green text-sm">
                Know exactly where your food comes from.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-primary-green font-semibold mb-2">
                Sustainability
              </h2>
              <p className="text-primary-green text-sm">
                Support local farms and eco-friendly practices.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-primary-green font-semibold mb-2">
                Freshness
              </h2>
              <p className="text-primary-green text-sm">
                Enjoy produce picked at peak ripeness.
              </p>
            </div>
          </div>

          <a
            href="/products"
            className="inline-block bg-primary-green hover:bg-primary-red text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Browse Local Produce
          </a>
        </div>

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image
            src={farmerImage}
            alt="Local Farmer"
            className="rounded-lg shadow-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
