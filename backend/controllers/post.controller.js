import { getAuth } from "@clerk/express";
import Post from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import ImageKit from "@imagekit/nodejs";
export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  let query = {};

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }
  if (author) {
    const user = await UserModel.findOne({ username: author }).select("_id");
    if (!user) {
      return res.status(404).json("No Post Found!")
    }
    query.user= user._id
  }
  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }
  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break
    }
  }
  if (featured) {
    query.isFeatured = true;
  }
  const posts = await Post.find(query)
    .populate("user", "username")
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img ",
  );
  res.status(200).json(post);
};
export const createPost = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  console.log("createPost req", req);

  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const user = await UserModel.findOne({ clerkUserId: userId });

  if (!user) {
    return res.status(404).json("User not found!");
  }

  let slug = req.body.title.replace(/ /g, "-").toLowerCase();

  let existingPost = await Post.findOne({ slug });

  let counter = 2;

  while (existingPost) {
    slug = `${slug}-${counter}`;
    existingPost = await Post.findOne({ slug });
    counter++;
  }
  const newPost = new Post({ user: user._id, slug, ...req.body });
  const post = await newPost.save();
  res.status(201).json(post);
};
export const deletePost = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  const role = req.auth?.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post has been deleted");
  }

  const deletePost = await Post.findByIdAndDelete({
    _id: req.params.id,
    user: userId,
  });
  if (!deletePost) {
    res.status(401).json("you can delete only your post");
    return;
  }
  res.status(200).json("post has been deleted");
};

export const featurePost = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  const { postId } = req.body;
  if (!isAuthenticated) {
    res.status(401).json("Unauthorize");
    return;
  }
  const role = req?.auth?.sessionClaims?.metadata?.role;

  // if (role !== "admin") {
  //   res.status(403).json("you cannot feature post!")
  // return
  // }
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json("Post not found");
  }
  const feature = post.isFeatured;
  const updateFeaturePost = await Post.findByIdAndUpdate(
    postId,
    { isFeatured: !feature },
    { new: true },
  );
  res.status(200).json(updateFeaturePost);
};

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const { token, expire, signature } =
    client.helper.getAuthenticationParameters();
  res.send({
    token,
    expire,
    signature,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  });
};
