import React, { useEffect, useState } from "react";
import ImageKit from "./ImageKit";
import { Link } from "react-router-dom";
import { Show, SignUpButton, useAuth, UserButton } from "@clerk/react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  });
  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* logo */}
      <Link
        to={"/"}
        className="flex justify-start items-center gap-2 font-bold text-lg"
      >
        <ImageKit
          src={"/Blogs/public/logo.png"}
          alt={"Logo"}
          className={"w-7 h-7 "}
        />

        <span>Rafiqul</span>
      </Link>
      {/* Mobile Menu */}
      <div className="md:hidden">
        {/* Mobile  list */}
        <div
          className="cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          <div className="text-2xl">{open ? "X" : "☰"}</div>
          {/* Mobile link list */}
          <div
            className={`w-full h-screen flex  bg-[#e6e6ff]  flex-col items-center justify-center absolute top-16 transition-all ease-in-out text-lg gap-4 ${open ? "-right-0" : "-right-[100%]"}`}
          >
            <Link to="/">Home</Link>
            <Link to="/">Trending</Link>
            <Link to="/">MostPopular</Link>
            <Link to="/">About</Link>
            <Link to="/">
              <button className="py-2 px-4 rounded-lg bg-blue-600 text-white">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/">Trending</Link>
        <Link to="/">MostPopular</Link>
        <Link to="/about">About</Link>

        <Show when="signed-out">
          <Link to="/login">
            <button className="py-2 px-4 rounded-lg bg-blue-600 text-white">
              Login
            </button>
          </Link>
          <SignUpButton />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </div>
  );
};

export default Navbar;
