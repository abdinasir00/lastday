
import React, { useState, useRef } from "react";
import { X, Image } from "lucide-react";

function CreatePostForm() {
  const [post, setPost] = useState(null);
  const [fileType, setFileType] = useState(null); // image or video
  const [text, setText] = useState("");
  const fileInputRef = useRef(null);
  const maxChars = 280;

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost(URL.createObjectURL(file));
      if (file.type.startsWith("image/")) setFileType("image");
      else if (file.type.startsWith("video/")) setFileType("video");
      else setFileType(null);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", { text, post });
    clearForm();
  };

  // Clear form when X is clicked
  const clearForm = () => {
    setText("");
    setPost(null);
    setFileType(null);
  };

  return (
    <div className="flex justify-center items-start mt-20 mr-70">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-[600px]"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-lg font-bold">Create Post</h1>
          <X
            className="cursor-pointer hover:text-red-500"
            onClick={clearForm} // clears form
          />
        </div>

        <hr className="mb-4 border-gray-300" />

        {/* Content */}
        <div className="flex gap-4">
          {/* Avatar */}
          <img
            src="https://rb.gy/fbxvbz"
            alt="profile"
            className="w-16 h-16 rounded-full object-cover"
          />

          {/* Textarea */}
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
        <div className="mb-4 text-center">
          {post && fileType === "image" && (
            <img
              src={post}
              alt="preview"
              className="w-40 h-40 object-cover rounded-lg mx-auto"
            />
          )}
          {post && fileType === "video" && (
            <video
              src={post}
              controls
              className="w-60 h-40 rounded-lg mx-auto"
            />
          )}
        </div>

        {/* File Upload + Character Count + Post Button */}
        <div className="flex justify-between items-center">
          {/* Upload Button */}
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

          {/* Character count + Post button */}
          <div className="flex items-center gap-4">
            <p className="text-sm text-gray-500">
              {text.length}/{maxChars}
            </p>

            <button
              type="submit"
              disabled={!text.trim()}
              className={`${
                text.trim()
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              } text-white font-semibold py-2 px-6 rounded-full`}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreatePostForm;
