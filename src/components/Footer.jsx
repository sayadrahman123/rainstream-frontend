import React from "react";
import { Instagram, Facebook, Twitter, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-8 md:px-16 py-12 border-t border-gray-800/50 mt-12 bg-[#0b0c0f]">
      <div className="flex flex-col md:flex-row justify-between items-start mb-20">
        {/* Left Text */}
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
            Our platform is trusted <br /> by millions & features <br /> best
            updated movies <br /> all around the world.
          </h2>
        </div>

        {/* Right Nav */}
        <div className="flex flex-col items-end gap-10 mt-8 md:mt-0">
          <div className="flex gap-8 text-gray-300 text-sm font-medium">
            <span className="cursor-pointer hover:text-green-400 transition">
              Home
            </span>
            <span>/</span>
            <span className="cursor-pointer hover:text-green-400 transition">
              Discover
            </span>
            <span>/</span>
            <span className="cursor-pointer hover:text-green-400 transition">
              Influence
            </span>
            <span>/</span>
            <span className="cursor-pointer hover:text-green-400 transition">
              Release
            </span>
          </div>

          <div className="flex gap-6">
            <Instagram className="text-white w-6 h-6 cursor-pointer hover:text-green-400 transition" />
            <Facebook className="text-white w-6 h-6 cursor-pointer hover:text-green-400 transition" />
            <Twitter className="text-white w-6 h-6 cursor-pointer hover:text-green-400 transition" />
            <Link
              to="https://github.com/sayadrahman123/rainstream-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="text-white w-6 h-6 cursor-pointer hover:text-green-400 transition" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 font-medium">
        <div className="flex gap-8 mb-4 md:mb-0">
          <span className="hover:text-gray-300 cursor-pointer">
            Privacy policy
          </span>
          <span className="hover:text-gray-300 cursor-pointer">
            Term of service
          </span>
          <span className="hover:text-gray-300 cursor-pointer">Language</span>
        </div>
        <span>© 2026</span>
      </div>
    </footer>
  );
};

export default Footer;
