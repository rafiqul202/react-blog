import React, { useRef } from "react";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth, useUser } from "@clerk/react";
import { toast } from "react-toastify";

const fetchComments = async (postId) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`,
  );
  return response.data;
};
const Comments = ({ postId }) => {
  const inputRef = useRef(null);
  const { user } = useUser();
  const { getToken } = useAuth();

  console.log("inputref current value", inputRef);

  const { isLoading, data, error, isPending } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      desc: formData.get("desc"),
    };
    mutation.mutate(data);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-8">
      <h1 className="text-lg underline underline-offset-4 text-gray-500">
        Comments
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center text-center w-full relative"
      >
        <textarea
          name="desc"
          ref={inputRef}
          id=""
          placeholder="Write a comment...."
          className="w-full p-4 rounded-md "
        />
        <button className="absolute right-1 flex items-center justify-center text-center h-10 w-10 rounded-full bg-gray-300 text-3xl font-extrabold ">
          →
        </button>
      </form>
      {isPending ? (
        "Loading..."
      ) : error ? (
        "Error loading comments!"
      ) : (
        <>
          {mutation.isPending && (
            <Comment
              comment={{
                desc: `${mutation.variables.desc}  Sending...`,
                createdAt: new Date(),
                user: { img: user.imageUrl, username: user.username },
              }}
            />
          )}

          {data.map((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
