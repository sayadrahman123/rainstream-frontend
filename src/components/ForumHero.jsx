import React from "react";

const ForumHero = () => {
  const posters = [
    "https://image.tmdb.org/t/p/w200/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg",
    "https://image.tmdb.org/t/p/w200/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    "https://image.tmdb.org/t/p/w200/1e2J2J2.jpg",
    "https://image.tmdb.org/t/p/w200/tegBpjM5ODoYoM1NjaiHVLEA0QM.jpg",
    "https://image.tmdb.org/t/p/w200/u3bZgnGQ9T01sWNhyho4nmw5Ts.jpg",
    "https://image.tmdb.org/t/p/w200/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    "https://image.tmdb.org/t/p/w200/qNBAXBIQlnOThrVvA6mA2K5ggV6.jpg",
    "https://image.tmdb.org/t/p/w200/5pGBX4eXlY1tG02fA9O8n8fQ0yM.jpg",
  ];

  return (
    <div className="relative w-full h-[50vh] overflow-hidden bg-black">
      {/* Poster Grid Background */}
      <div className="absolute inset-0 grid grid-cols-4 md:grid-cols-8 gap-0 opacity-40 grayscale">
        {posters.map((src, idx) => (
          <img
            key={idx}
            src={src}
            className="w-full h-full object-cover"
            alt="Poster"
          />
        ))}
        {posters.map((src, idx) => (
          <img
            key={`dup-${idx}`}
            src={src}
            className="w-full h-full object-cover"
            alt="Poster"
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0f] via-[#0b0c0f]/80 to-transparent"></div>

      {/* Hero Content */}
      <div className="absolute bottom-0 left-0 w-full px-8 md:px-16 pb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Become A Movie <br /> Influencer
        </h1>
        <p className="text-gray-400 text-sm max-w-lg">
          Share your thought about movie to people and become an influencer
        </p>
      </div>
    </div>
  );
};

export default ForumHero;
