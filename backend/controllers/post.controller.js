import { getAuth } from "@clerk/express";
import Post from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import ImageKit from "@imagekit/nodejs";
export const getPosts = async (req, res) => {
  const post = await Post.find().populate("user", "username");

  res.status(200).json(post);
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
