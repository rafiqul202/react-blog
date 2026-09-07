import { getAuth } from "@clerk/express";
import UserModel from "../models/user.model.js";

export const getUserSavedPost = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  if (!isAuthenticated) {
    res.status(401).json("not authenticated user");
    return;
  }

  const user = await UserModel.findOne({ clerkUserId: userId });
  res.status(200).json(user.savedPosts);
};

export const savePost = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  const { postId } = req.body;

  if (!isAuthenticated) {
    return res.status(401).json("user not authenticated");
  }
  const user = await UserModel.findOne({ clerkUserId: userId });
  const isSaved = user.savedPosts.some((p) => p === postId);
  if (!isSaved) {
    await UserModel.findByIdAndUpdate(user._id, {
      $push: { savedPosts: postId },
    });
  } else {
    await UserModel.findByIdAndUpdate(user._id, {
      $pull: { savedPosts: postId },
    });
  }
  // setTimeout(() => {
  //   res.status(200).json(isSaved ? "Post unsaved" : "post save");
  // }, 4000);
  res.status(200).json(isSaved ? "Post unsaved" : "post save");
};
