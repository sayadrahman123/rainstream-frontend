import React from "react";
import ReleaseHero from "./ReleaseHero";
import ReleaseList from "./ReleaseList";

const MovieRelease = () => {
  return (
    <div className="bg-[#0b0c0f] min-h-screen text-white pb-20">
      <ReleaseHero />
      <ReleaseList />
    </div>
  );
};

export default MovieRelease;
