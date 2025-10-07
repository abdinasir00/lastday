
import React, { useState, useRef } from "react";
import { X, Image } from "lucide-react";
import axios from "axios";

function CreatePostForm() {
  const [post, setPost] = useState(null);
  const [fileType, setFileType] = useState(null); // image or video
  const [text, setText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const fileInputRef = useRef(null);
  const maxChars = 280;

  const CLOUD_NAME = "dbgpnh1ix";
  const UPLOAD_PRESET = "abdinasir";

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost(file);
      if (file.type.startsWith("image/")) setFileType("image");
      else if (file.type.startsWith("video/")) setFileType("video");
      else setFileType(null);
    }
  };

  // // Handle form submit / upload
  // const handleUpload = async (e) => {
  //   e.preventDefault();

  //   if (!post) {
  //     // alert("Please select a file first");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("file", post);
  //   formData.append("upload_preset", UPLOAD_PRESET);

  //   try {
  //     const data = await axios.post(
  //       `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
  //       formData
  //     );

  //     console.log("✅ Uploaded File URL:", data.secure_url);

  //     // Clear form after upload
  //     clearForm();
  //   } catch (error) {
  //     console.error("❌ Upload error:", error.response?.data || error.message);
  //     alert("Upload failed! Check your Cloudinary credentials or preset name.");
  //   }
  // };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!post && !text.trim()) return;

    setIsPosting(true); // start posting

    try {
      const formData = new FormData();
      if (post) formData.append("file", post);
      formData.append("upload_preset", UPLOAD_PRESET);

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
        formData
      );

      console.log("Uploaded:", data.secure_url);
      clearForm();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPosting(false); // finished posting
    }
  };
  // Clear form
  const clearForm = () => {
    setText("");
    setPost(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  // Preview URL
  const previewURL = post ? URL.createObjectURL(post) : null;

  return (
    <div className="flex justify-center items-start mt-20 mr-70">
      <form
        onSubmit={handleUpload}
        className="bg-white shadow-lg rounded-xl p-6 w-[600px]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold">Create Post</h1>
          <X
            className="cursor-pointer hover:text-red-500"
            onClick={clearForm}
          />
        </div>

        <hr className="mb-4 border-gray-300" />

        {/* Content */}
        <div className="flex gap-4">
          <img
            src="https://rb.gy/fbxvbz"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={maxChars}
              className="border border-blue-500 rounded-md h-40 w-full p-2 focus:outline-blue-500 resize-none"
            />
          </div>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* File Preview */}
        {post && (
          <div className="mb-4 text-center">
            {fileType === "image" && (
              <img
                src={previewURL}
                alt="preview"
                className="w-40 h-40 object-cover rounded-lg mx-auto"
              />
            )}
            {fileType === "video" && (
              <video
                src={previewURL}
                controls
                className="w-60 h-40 rounded-lg mx-auto"
              />
            )}
          </div>
        )}

        {/* File Upload + Character Count + Post Button */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="bg-gray-100 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg cursor-pointer flex items-center gap-2"
          >
            <Image />
          </button>

          <input
            type="file"
            accept="image/*,video/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              {text.length}/{maxChars}
            </p>
          
            {/* <button
              type="submit"
              disabled={!text.trim() && !post}
              className={`${
                text.trim() || post
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-semibold py-2 px-6 rounded-full`}
            >
              Post
            </button> */}

            <button
              type="submit"
              disabled={(!text.trim() && !post) || isPosting}
              className={`${
                text.trim() || post
                  ? "bg-blue-600 hover:bg-blue-600"
                  : "bg-blue-400 cursor-not-allowed"
              } text-white font-semibold py-2 px-6 rounded-full`}
            >
              {isPosting ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
