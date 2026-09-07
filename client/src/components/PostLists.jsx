import React from "react";
import PostListItem from "./PostListItem";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
  return res.data;
};
const PostLists = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetchPosts(),
  });

  // console.log("all post result", data);
  return (
    <div className="flex flex-col gap-4 mb-12 rounded-md">
      {data?.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostLists;
