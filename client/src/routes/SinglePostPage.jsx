import { Link, useParams } from "react-router-dom";
import ImageKit from "../components/ImageKit";
import PostMenuActions from "../components/PostMenuActions";
import Search from "../components/Search";
import Comments from "../components/Comments";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import VideoKit from "../components/VideoKit";
const fetchPost = async (slug) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/posts/${slug}`,
  );
  return response.data;
};
const SinglePostPage = () => {
  const { slug } = useParams();
  const {
    isLoading,
    isError,
    data: post,
    error,
  } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  console.log("single post data", post);
  return (
    <div className="flex flex-col gap-8">
      {/* details */}
      <div className="flex flex-col items-start lg:flex-row gap-8">
        {/* text */}
        <div className="w-3/5 flex flex-col gap-4">
          <h1 className="text-base lg:text-3xl font-semibold">{post?.title}</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-gray-500">Writer By</span>

            <Link className="text-blue-500">{post.user?.username}</Link>
            <span className="text-gray-500">on</span>
            <Link className="text-blue-500">{post?.category}</Link>
            <span className="text-gray-500 text-xs">
              {format(post?.createdAt)}
            </span>
          </div>
          <p className="text-gray-500 font-medium">{post?.desc}</p>
        </div>
        {/* image */}
        <div className="hidden lg:block w-2/5">
          {post?.img ? (
            <ImageKit
              src={post?.img}
              alt="featured3"
              className="rounded-lg "
              w="500"
              h="300"
            />
          ) : (
            <VideoKit src={post?.video} className="lg:block" w="500" h="300" />
          )}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* text */}
        <div className="lg:text-lg flex flex-col gap-4 text-justify">
          <p>{post?.content}</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam, quam dicta quas
            exercitationem aliquam maxime quaerat, enim autem culpa sequi at!
            Earum facere in ducimus culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Libero fuga modi amet error aliquid
            eos nobis vero soluta facilis, voluptatem, voluptates quod suscipit
            obcaecati voluptate quaerat laborum, voluptatum dicta ipsum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam, quam dicta quas
            exercitationem aliquam maxime quaerat, enim autem culpa sequi at!
            Earum facere in ducimus culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Libero fuga modi amet error aliquid
            eos nobis vero soluta facilis, voluptatem, voluptates quod suscipit
            obcaecati voluptate quaerat laborum, voluptatum dicta ipsum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam, quam dicta quas
            exercitationem aliquam maxime quaerat, enim autem culpa sequi at!
            Earum facere in ducimus culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Libero fuga modi amet error aliquid
            eos nobis vero soluta facilis, voluptatem, voluptates quod suscipit
            obcaecati voluptate quaerat laborum, voluptatum dicta ipsum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam, quam dicta quas
            exercitationem aliquam maxime quaerat, enim autem culpa sequi at!
            Earum facere in ducimus culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Libero fuga modi amet error aliquid
            eos nobis vero soluta facilis, voluptatem, voluptates quod suscipit
            obcaecati voluptate quaerat laborum, voluptatum dicta ipsum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam, quam dicta quas
            exercitationem aliquam maxime quaerat, enim autem culpa sequi at!
            Earum facere in ducimus culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Libero fuga modi amet error aliquid
            eos nobis vero soluta facilis, voluptatem, voluptates quod suscipit
            obcaecati voluptate quaerat laborum, voluptatum dicta ipsum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias neque
            fugiat itaque quas esse sunt cupiditate possimus cumque asperiores,
            dolorem, dolores eligendi amet perferendis illum repellat nam quam
            facilis veritatis. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint ipsa fuga nihil numquam, quam dicta quas
            exercitationem aliquam maxime quaerat, enim autem culpa sequi at!
            Earum facere in ducimus culpa. Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Libero fuga modi amet error aliquid
            eos nobis vero soluta facilis, voluptatem, voluptates quod suscipit
            obcaecati voluptate quaerat laborum, voluptatum dicta ipsum.
          </p>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-semibold">Author</h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col items-start justify-start">
              <div className="flex items-center justify-between gap-8">
                <ImageKit
                  src={post?.user?.img}
                  className="h-11 w-11 rounded-full object-cover"
                  w="48"
                  h="48"
                />
                <Link>
                  <h1 className="text-blue-800">{post?.user?.username}</h1>
                </Link>
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
              </p>
              <div className="flex gap-2">
                <Link>
                  <ImageKit
                    src={`/Blogs/public/facebook.svg`}
                    className="w-8 h-8"
                  />
                </Link>
                <Link>
                  <ImageKit
                    src={`/Blogs/public/instagram.svg`}
                    className="w-8 h-8"
                  />
                </Link>
              </div>
            </div>
          </div>
          <PostMenuActions post={post} />
          {/* categories */}
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm ">
            <Link className="underline">All</Link>
            <Link className="underline" to={"/"}>
              Web Design
            </Link>
            <Link className="underline" to={"/"}>
              Development
            </Link>
            <Link className="underline" to={"/"}>
              Database
            </Link>
            <Link className="underline" to={"/"}>
              Search Engine
            </Link>
            <Link className="underline" to={"/"}>
              Markating
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <Comments postId={post?._id} />
    </div>
  );
};

export default SinglePostPage;
