// components/Heading.tsx
import React from "react";

type HeadingProps = {
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
};

const Heading: React.FC<HeadingProps> = ({
  subtitle = "From the Farm Straight to Your Plate – Fresh, Local, and Sustainable Produce",
  ctaText = "Browse Products",
  ctaLink = "/products",
}) => {
  return (
    <section className=" py-16 text-center">
      <h2 className="text-lg md:text-2xl text-primary-green mb-6">
        {subtitle}
      </h2>
      <a
        href={ctaLink}
        className="inline-block bg-primary-green hover:bg-primary-red text-white font-semibold px-6 py-3 rounded-lg transition-all"
      >
        {ctaText}
      </a>
    </section>
  );
};

export default Heading;
