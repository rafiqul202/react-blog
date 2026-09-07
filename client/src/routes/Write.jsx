import { useAuth, useUser } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/react";

import { authenticator } from "../../lib/imagekitAuthenticator.js";
const Write = () => {
  const [value, setValue] = useState("");
  const { getToken, userId } = useAuth();
  const [progress, setProgress] = useState(0);
  const abortController = new AbortController();
  // State to keep track of the current upload progress (percentage)

  const fileInputRef = useRef(null);

  console.log("upload input ref", fileInputRef);

  const navigate = useNavigate();
  // Mutations
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created!");
      navigate(`/${res.data.slug}`);
    },
  });

  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (isLoaded && !isSignedIn) {
    return <div>You should login!</div>;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Please select a file to upload");
      return;
    }

    // Extract the first file from the file input
    const file = fileInput.files[0];

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const uploadResponse = await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file,
        folder: "/Blogs",
        useUniqueFileName: true,
        fileName: file.name, // Optionally set a custom file name
        // Progress callback to update upload progress state
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
        // Abort signal to allow cancellation of the upload if needed.
        abortSignal: abortController.signal,
      });
      console.log("Upload response:", uploadResponse);
      const formData = new FormData(e.target);
      let image;
      let video;
      if (uploadResponse.fileType.includes("non-image")) {
        video = uploadResponse.filePath || "";
      } else {
        image = uploadResponse.filePath || "";
      }
      const data = {
        img: image,
        video: video,
        title: formData.get("title"),
        category: formData.get("category"),
        desc: formData.get("desc"),
        content: value,
      };
      // console.log("write route data",data)
      mutation.mutate(data);
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
      }
    }
  };
  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-2xl uppercase font-light">Create a new Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            className="p-2 shadow-md rounded-lg text-sm text-gray-500 bg-white w-1/6"
          />
        </div>
        <div className="flex gap-4 items-center mt-3">
          <button type="button" className="px-10 py-2 bg-yellow-500 rounded-md">
            Upload file
          </button>
          Upload progress: <progress value={progress} max={100}></progress>
        </div>

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          name="title"
          placeholder="My awesome story"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Chose a category:
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-lg bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea
          name="desc"
          id=""
          placeholder="A Sort Description"
          className="p-4 rounded-lg bg-white shadow-md"
        />
        <div className="flex flex-1">
          {/* <div className="flex flex-col gap-2 mr-2">
            <div className="cursor-pointer"> 🌆</div>
            <div className="cursor-pointer"> ▶️</div>
          </div> */}
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className="flex-1 rounded-md shadow-md bg-slate-100 "
          />
        </div>
        <button
          disabled={mutation.isPending}
          className="bg-blue-500 py-3 px-10 rounded-lg font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {mutation.isError && (
          <span className="p-4 text-red-500">{mutation.error.message}</span>
        )}
      </form>
    </div>
  );
};

export default Write;
