import React from "react";

// Example partners data
const partners = [
  {
    name: "Green Valley Farms",
    logo: "/logo.jpg",
    description: "Sustainable organic fruits and vegetables from Ontario.",
  },
  {
    name: "Sunny Orchards",
    logo: "/logo.jpg",
    description: "Fresh seasonal fruits picked at peak ripeness.",
  },
  {
    name: "NutriVeggies",
    logo: "/logo.jpg",
    description: "Locally grown, nutrient-rich vegetables delivered fresh.",
  },
];

export default function PartnersPage() {
  return (
    <main className="min-h-screen px-6 md:px-20 py-16">
      <section className="text-center mb-12">
        <h1 className="text-primary-green text-4xl md:text-5xl font-bold mb-4">
          Our Trusted Partners
        </h1>
        <p className="text-primary-green text-lg md:text-xl">
          We collaborate with local farms and vendors to bring fresh,
          high-quality produce to your plate.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h2 className="text-primary-green text-xl font-semibold mb-2">
              {partner.name}
            </h2>
            <p className="text-gray-600">{partner.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
