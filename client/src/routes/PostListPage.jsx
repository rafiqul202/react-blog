import React, { useState } from "react";
import PostLists from "../components/PostLists";
import SideMenu from "../components/SideMenu";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1 className="mb-8 text-2xl">Development Blogs</h1>
      <button
        onClick={() => setOpen((priv) => !priv)}
        className="md:hidden bg-blue-800 py-2.5 px-8 rounded-lg text-white mb-4 text-sm "
      >
        {open ? "Close" : "Search"}
      </button>
      <div className="flex flex-col-reverse md:flex-row gap-8">
        <div>
          <PostLists />
        </div>
        <div className={`${open ? "block" : "hidden"} md:block`}>
          <SideMenu/>
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
