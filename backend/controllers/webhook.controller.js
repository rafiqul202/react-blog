import { Webhook } from "svix";

import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";
import UserModel from "../models/user.model.js";

const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
export const clerkWebhook = async (req, res) => {
  console.log(process.env.CLERK_WEBHOOK_SECRET);
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }
  const payload = req.body;
  const headers = req.headers;
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    res.status(400).json({
      message: "Webhook verification failed!",
    });
  }
  // console.log("webhook user info details", evt.data);

  if (evt.type === "user.created") {
    const newUser = new UserModel({
      clerkUserId: evt.data.id,
      username: evt.data.username || evt.data.email_addresses[0].email_address,
      email: evt.data.email_addresses[0].email_address,
      img: evt.data.image_url,
    });

    await newUser.save();
  }
  if (evt.type === "user.deleted") {
    const deletedUser = await UserModel.findOneAndDelete({
      clerkUserId: evt.data.id,
    });
    await Post.deleteMany({ user: deletedUser._id });
    await Comment.deleteMany({ user: deletedUser._id });
  }
  return res.status(200).json({ message: "Delete Webhook receive!" });
};
