import React from "react";
// Import from components folder
import ReleaseHero from "../components/ReleaseHero";
import ReleaseList from "../components/ReleaseList";
import Footer from "../components/Footer";

const MovieRelease = () => {
  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
      <ReleaseHero />
      <ReleaseList />
      <Footer />
    </div>
  );
};

export default MovieRelease;
