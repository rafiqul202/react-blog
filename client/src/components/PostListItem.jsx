import ImageKit from "./ImageKit";
import { Link } from "react-router-dom";
import VideoKit from "./VideoKit";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {
  console.log("postList Items",post)
  return (
    <div className="flex flex-col items-start xl:flex-row gap-8 shadow-lg p-5">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        {post?.img && (
          <ImageKit
            src={post?.img}
            alt="postImg"
            className="rounded-lg object-cover"
            w="440"
            h="230"
          />
        )}
        {post.video && (
          <VideoKit
            src={post.video}
            className="w-full h-full rounded-md"
            w="900"
            h="900"
          />
        )}
      </div>
      {/* details */}
      <div className="flex flex-col gap-3 xl:w-2/3">
        <Link to={`/${post?.slug}`} className="text-2xl font-semibold">
          {post?.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link to={`/posts?author=${post.user.username}`} className="text-blue-500">{post?.user?.username}</Link>
          <span>On</span>
          <Link className="text-blue-500">{post?.category}</Link>
          <span>{format(post?.createAt)}</span>
        </div>
        <p>{post?.desc}</p>
        <Link
          to={post?.slug}
          className="underline underline-offset-4 decoration-blue-500 text-blue-800 text-sm"
        >
          Read more...
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
