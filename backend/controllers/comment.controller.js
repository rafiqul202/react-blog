import { getAuth } from "@clerk/express";
import Comment from "../models/comment.model.js";
import UserModel from "../models/user.model.js";

export const addComment = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  // console.log("addComment request full details", getAuth(req));
  const { postId } = req.params;
  if (!isAuthenticated) {
    return res.status(401).json({ message: "not Authenticated" });
  }

  const user = await UserModel.findOne({ clerkUserId: userId });
  const newComment = new Comment({
    ...req.body,
    user: user._id,
    post: postId,
  });
  const saveComment = await newComment.save();
  res.status(201).json(saveComment);
};

export const getPostComments = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.find({ post: postId })
    .populate("user", "username img")
    .sort({ createdAt: -1 });
  res.json(comments);
};
export const deleteComment = async (req, res) => {
  const { isAuthenticated, userId } = getAuth(req);
  const { id } = req.params;
  if (!isAuthenticated) {
    return res.status(401).json({ message: "not authenticated" });
  }
    const role = req.auth?.sessionClaims?.metadata?.role || "user";

    if (role === "admin") {
      await Comment.findByIdAndDelete(id);
     return res.status(200).json("Comment has been deleted");
    }

  const user = await UserModel.findOne({ clerkUserId: userId });

  const deletedComment = await Comment.findByIdAndDelete({
    _id: id,
    user: user._id,
  });
  if (!deleteComment) {
    return res.status(403).json("You can delete only your comment!");
  }
  res.status(200).json("comment deleted!");
};
