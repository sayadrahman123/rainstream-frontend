import React from "react";
import { Play } from "lucide-react";

const ContinueWatching = ({ data, onPlay }) => {
  // <--- Accept onPlay
  if (!data || data.length === 0) return null;

  return (
    <div className="px-8 md:px-16 py-8">
      <h2 className="text-xl text-white font-bold mb-6">Continue Watching</h2>

      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
        {data.map((item, index) => (
          <div
            key={index}
            className="min-w-[280px] md:min-w-[320px] cursor-pointer group relative"
            onClick={() => onPlay && onPlay(item.originalMovie || item)} // <--- TRIGGER PLAY
          >
            {/* Image Container */}
            <div className="relative rounded-xl overflow-hidden h-[180px] border border-gray-800">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                  <Play className="w-6 h-6 text-white fill-current ml-1" />
                </div>
              </div>

              {/* Progress Bar Background */}
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gray-700">
                <div
                  className="h-full bg-green-500 rounded-r-full shadow-[0_0_10px_rgba(34,197,94,0.7)]"
                  style={{ width: item.progress }}
                ></div>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-3">
              <h3 className="text-white font-medium text-base truncate group-hover:text-green-400 transition">
                {item.title}
              </h3>
              <div className="flex justify-between items-center mt-1 text-xs text-gray-400">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] font-bold">
                  RESUME
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  {item.timeLeft}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContinueWatching;
