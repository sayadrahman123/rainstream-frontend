import React from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const topics = [
  {
    title: "The Man from Toronto",
    reviews: "45",
    discussions: "9",
    image: "https://image.tmdb.org/t/p/w200/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
  },
  {
    title: "Elvis",
    reviews: "45",
    discussions: "9",
    image: "https://image.tmdb.org/t/p/w200/qBOKWqAFbveZ4ryjJJwbie6tXkQ.jpg",
  },
  {
    title: "Spiderman 3",
    reviews: "45",
    discussions: "9",
    image: "https://image.tmdb.org/t/p/w200/5weKu49pzSuYuO9ZhJ9nr7dyO9M.jpg",
  },
  {
    title: "The Mechanic",
    reviews: "45",
    discussions: "9",
    image: "https://image.tmdb.org/t/p/w200/tgfRDJs5PFW20Aoh1orEzuxW8VQ.jpg",
  },
];

const HotTopics = () => {
  return (
    <div className="px-8 md:px-16 py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔥</span>
          <h2 className="text-xl text-white font-bold">Hot Movie Topics</h2>
        </div>
        <div className="flex gap-2">
          <button className="p-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full bg-gray-800 text-gray-400 hover:text-white">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {topics.map((topic, idx) => (
          <div
            key={idx}
            className="flex gap-4 p-3 rounded-xl bg-[#131418] border border-gray-800 hover:border-gray-600 transition cursor-pointer group"
          >
            <img
              src={topic.image}
              alt={topic.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex flex-col justify-center">
              <h4 className="text-white font-bold text-sm mb-1 group-hover:text-green-400 transition">
                {topic.title}
              </h4>
              <span className="text-gray-500 text-xs mb-1">
                Comedy • Action
              </span>
              <div className="flex items-center gap-3 text-[10px] text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span>4.6</span>
                </div>
                <span>|</span>
                <span>{topic.reviews} Reviews</span>
                <span>|</span>
                <span>{topic.discussions} Discussion</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotTopics;
