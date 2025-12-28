import React from "react";

const PremiereEvents = () => {
  return (
    <div className="px-8 md:px-16 pb-20 border-t border-gray-800/50 pt-12">
      <h2 className="text-xl text-white font-bold mb-12">
        Movie Premiere Event
      </h2>

      <div className="mb-12">
        <h3 className="text-gray-400 font-bold text-sm mb-8 tracking-wider">
          NOVEMBER
        </h3>

        <div className="flex gap-8 mb-12 group">
          <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-extrabold text-lg">05</span>
          </div>

          <div className="flex-1 max-w-3xl">
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://image.tmdb.org/t/p/w200/p33fb0Q52tF8T62e08k09kZk0k.jpg"
                className="w-8 h-8 rounded-full object-cover"
                alt="Icon"
              />
              <h3 className="text-white font-bold text-lg">
                Talk About Weak Hero S1: Episode 4
              </h3>
            </div>
            <p className="text-gray-500 text-sm mb-4">
              Season 1 Episode3: Part One
            </p>

            <div className="mb-4">
              <span className="text-white font-bold text-sm block mb-1">
                Star Time
              </span>
              <span className="text-gray-400 text-sm">09:00 AM EST</span>
            </div>

            <div className="mb-4">
              <span className="text-white font-bold text-sm block mb-1">
                Info
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">
                Originally a story from Archie Comics which started in 1941,
                Riverdale centres around a group of high school students who are
                shocked by the death of classmate, Jason Blossom. Together they
                unravel the secrets...{" "}
                <span className="text-green-500 cursor-pointer">More</span>
              </p>
            </div>

            <div>
              <span className="text-white font-bold text-sm block mb-1">
                Rules
              </span>
              <ul className="text-gray-400 text-sm list-disc pl-5 space-y-1">
                <li>Polite</li>
                <li>No Swear Words</li>
                <li>
                  Be Good...{" "}
                  <span className="text-green-500 cursor-pointer">More</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiereEvents;
