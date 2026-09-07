import ImageKit from "./ImageKit";
import { Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import VideoKit from "./VideoKit";
import { format } from "timeago.js";
const fetchFeatured = async () => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts?featured=true&limit=4&sort=newest`,
  );
  return res.data;
};
const FeaturedPosts = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["featuredPosts"],
    queryFn: () => fetchFeatured(),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong";
  const post = data?.posts;
  if (!post || post.length === 0) return;

  console.log("featuredPost fetch data", post);
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* first post */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        {post[0]?.img ? (
          <ImageKit
            src={post[0].img}
            alt="featured1"
            className="rounded-lg object-cover"
            w="895"
          />
        ) : (
          <VideoKit src={post[0].video} />
        )}
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold">01.</h1>
          <Link className="text-blue-800">{post[0].category}</Link>
          <span className="text-gray-400 text-sm">
            {format(post[0].createdAt)}
          </span>
        </div>
        {/* title */}

        <Link
          to={post[0].slug}
          className="text-base lg:text-xl font-semibold lg:font-bold"
        >
          {post[0].title}
        </Link>
      </div>
      {/* others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          {/* image */}
          <div className="w-1/3 aspect-video">
            <ImageKit
              src={`/Blogs/public/featured2.jpeg`}
              alt="featured2"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex justify-start items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link className="text-blue-800">Web Design</Link>
              <span className="text-gray-400 text-sm">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores.
            </Link>
          </div>
        </div>
        {/* third */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          {/* image */}
          <div className="w-1/3 aspect-video">
            <ImageKit
              src={`/Blogs/public/featured3.jpeg`}
              alt="featured3"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex justify-start items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">03.</h1>
              <Link className="text-blue-800">Web Design</Link>
              <span className="text-gray-400 text-sm">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores.
            </Link>
          </div>
        </div>
        {/* fourth */}
        <div className="lg:h-1/3 flex justify-between gap-4">
          {/* image */}
          <div className="w-1/3 aspect-video">
            <ImageKit
              src={`/Blogs/public/featured4.jpeg`}
              alt="featured4"
              className="rounded-3xl object-cover w-full h-full"
              w="298"
            />
          </div>
          {/* details and title */}
          <div className="w-2/3">
            {/* details */}
            <div className="flex justify-start items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">04.</h1>
              <Link className="text-blue-800">Web Development</Link>
              <span className="text-gray-400 text-sm">2 days ago</span>
            </div>
            {/* title */}
            <Link
              to={"/test"}
              className="text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl font-medium"
            >
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolores.
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPosts;
