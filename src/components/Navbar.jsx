import React from "react";
import { FaMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav
      className={`flex justify-between items-center py-2 transition-all ${
        darkMode ? "bg-gray-100 text-black" : "bg-blue-500 text-white"
      }`}
    >
      <div className="logo">
        <span className="font-bold text-xl mx-8">eTasks</span>
      </div>
      <ul className="flex gap-6 mx-8 items-center">
        <li className="cursor-pointer hover:font-bold transition-all">Home</li>
        <li className="cursor-pointer hover:font-bold transition-all">
          Your Tasks
        </li>
        <li>
          <button
            onClick={toggleDarkMode}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-medium transition-all border ${
              darkMode
                ? "bg-white text-black hover:bg-gray-200 border-gray-400"
                : "bg-black text-white hover:bg-gray-800 border-black"
            }`}
            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {darkMode ? <LuSun /> : <FaMoon />}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
