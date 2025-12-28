import React from "react";

const brands = [
  {
    name: "Disney",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  },
  {
    name: "Netflix",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "HBO Max",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/HBO_Max_Logo.svg",
  },
  {
    name: "Pixar",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/Pixar_logo.svg",
  },
  {
    name: "Marvel",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg",
  },
  {
    name: "Star Wars",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg",
  },
  {
    name: "National Geographic",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/65/National_Geographic_Logo.svg",
  },
];

const BrandRow = () => {
  return (
    <div className="px-8 md:px-16 py-8">
      <div className="flex flex-wrap items-center justify-between gap-6 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="h-8 md:h-12 flex items-center justify-center cursor-pointer hover:scale-110 transition"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandRow;
