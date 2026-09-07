import React from "react";
import { Link } from "react-router-dom";
import Search from "./components/Search";
const MainCategories = () => {
  return (
    <div className="hidden md:flex bg-white rounded-2xl shadow-lg xl:rounded-3xl px-5 py-3 items-center justify-center gap-8">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to={"/posts"}
          className="bg-blue-800 text-white py-2 px-4 rounded-2xl"
        >
          All Posts
        </Link>
        <Link
          to={"/posts?cat=web-design"}
          className="hover:bg-gray-300  py-2 px-4 rounded-2xl"
        >
          Web Design
        </Link>
        <Link
          to={"/posts?cat=development"}
          className="hover:bg-gray-300  py-2 px-4 rounded-2xl"
        >
          Development
        </Link>
        <Link
          to={"/posts?cat=database"}
          className="hover:bg-gray-300  py-2 px-4 rounded-2xl"
        >
          Database
        </Link>
        <Link
          to={"/posts?cat=seo"}
          className="hover:bg-gray-300  py-2 px-4 rounded-2xl"
        >
          Search Engines
        </Link>
        <Link
          to={"/posts?cat=marketing"}
          className="hover:bg-gray-300  py-2 px-4 rounded-2xl"
        >
          Marketing
        </Link>
      </div>
      <span className="text-xl font-medium">|</span>
      {/* search */}
      {/* <div className="bg-gray-100 p-2 rounded-lg border-none flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="gray"
        >
          <circle cx="10.5" cy="10.5" r="7.5" />
          <line x1="16.5" y1="16.5" x2="22" y2="22" />
        </svg>
        <input
          type="text"
          placeholder="Search a post..."
          className="bg-transparent border-none focus:outline-none focus:ring-0"
        />
      </div> */}
      <Search />
    </div>
  );
};

export default MainCategories;
