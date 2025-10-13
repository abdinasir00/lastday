
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../store/slices/PostSlices";
import { BASE_URL } from "../store/BaseUrl";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.post);

  // 🔹 Fetch posts when component mounts
  useEffect(() => {
    dispatch(getPosts()).then((res) => {
      console.log("Fetched posts:", res.payload);
    });
  }, [dispatch]);

  // 🔹 Loading state
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center pt-40">
        <div className="flex flex-col items-center">
          <div className="w-13 h-13 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600 font-medium">Loading posts...</p>
        </div>
      </div>
    );
  }

  // 🔹 Error state
  if (status === "failed") {
    return (
      <div className="flex justify-center items-center pt-40">
        <p className="text-red-500 font-medium bg-red-50 border border-red-300 p-4 rounded-lg">
          Error loading posts: {error || "Something went wrong."}
        </p>
      </div>
    );
  }

  // 🔹 Render posts
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        📰 All Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">No posts found.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => {
            // 🔹 Handle image URL formats
            const imageSrc =
              post.image_url && post.image_url.startsWith("http")
                ? post.image_url
                : post.imageUrl && post.imageUrl.startsWith("http")
                ? post.imageUrl
                : post.image_url
                ? `${BASE_URL}${post.image_url}`
                : post.imageUrl
                ? `${BASE_URL}${post.imageUrl}`
                : null;

            return (
              <li
                key={post.id}
                className="p-5 rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-200"
              >
                {/* 🔹 User info */}
                {post.user && (
                  <Link
                    to={`/profile/${post.user.id}`}
                    className="flex items-center gap-x-3 mb-3"
                  >
                    <img
                      src={post.user.avatar || "https://rb.gy/fbxvbz"}
                      alt="avatar"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-gray-800">
                      {post.user.name}
                    </span>
                  </Link>
                )}

                {/* 🔹 Post Text */}
                <p className="text-gray-900 text-lg mb-4 leading-relaxed">
                  {post.text}
                </p>

                {/* 🔹 Post Image */}
                {imageSrc && (
                  <div className="flex justify-center">
                    <img
                      src={imageSrc}
                      alt="Post"
                      className="w-full sm:w-[500px] lg:w-[600px] h-[300px] object-cover rounded-xl border border-red-100 shadow-sm hover:scale-[1.02] transition-transform duration-200"
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Home;
=======
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PostCard from "../Components/posts/PostCard";
import defaultAvatar from "../assets/defaultimage.png";

import { fetchPostsWithUsers, fetchComments } from "../store/slices/PostSlices";
import { fetchConnections, checkAuthStatus } from "../store/slices/auth";
// import Sidebar from "../components/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const { user } = useSelector((state) => state.auth);
  console.log("USER in Home:", user);
  console.log("User avatar URL:", user?.avatarUrl);
  
  // SAFER: Add proper error handling for posts state
  const postsState = useSelector((state) => state.posts);
  const { posts = [], status = "idle", error } = postsState || {};

  const loggedInUserId = user?._id || user?.id;

  const fetchedCommentsRef = useRef(new Set());

  useEffect(() => {
    // Only fetch comments if posts exist
    if (posts && posts.length > 0) {
      posts.forEach((post) => {
        const postId = post._id || post.id;
        if (!fetchedCommentsRef.current.has(postId)) {
          fetchedCommentsRef.current.add(postId);
          dispatch(fetchComments(postId));
        }
      });
    }
  }, [posts, dispatch]);

  useEffect(() => {
    if (user?.id && (!user.followingIds || !user.followerIds)) {
      dispatch(fetchConnections(user.id));
    }
    if (status === "idle") {
      dispatch(fetchPostsWithUsers());
      dispatch(checkAuthStatus());
    }
  }, [status, dispatch, user?.id]);

  // Refresh user data when component mounts to ensure latest profile picture
  useEffect(() => {
    if (user?.id) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, user?.id]);

  // Force refresh user data when component becomes visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && user?.id) {
        dispatch(checkAuthStatus());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [dispatch, user?.id]);

  const followingIds = user?.followingIds || [];

  // Show all posts from everyone (like in the image)
  const filteredPosts = (posts && posts.length > 0) 
    ? [...posts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  // Counts how many posts belong to the logged-in user
  const userPostCount = posts 
    ? posts.filter((p) => p.user?.id === loggedInUserId).length 
    : 0;

  // Total posts in the feed
  const feedPostCount = filteredPosts.length;

  return (
    <div className="flex">
      {/* <Sidebar /> */}

      <main className="flex flex-col w-full md:ml-48 px-4 py-8 max-w-7xl mx-auto mb-8">
        {/* Welcome */}
        <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-8 rounded-xl shadow-lg mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {imageLoading && (
                  <div className="w-20 h-20 rounded-full bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={user?.avatarUrl || defaultAvatar}
                  alt="Profile"
                  className={`w-20 h-20 rounded-full object-cover border-4 border-white shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    imageLoading ? "hidden" : "block"
                  }`}
                  onLoad={() => {
                    setImageLoading(false);
                    setImageError(false);
                  }}
                  onError={(e) => {
                    e.target.src = defaultAvatar;
                    setImageLoading(false);
                    setImageError(true);
                  }}
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome back, {user?.name || "Guest"}! 👋
                </h2>
                <p className="text-blue-100 text-lg">
                  Discover what's happening in the entire community.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {userPostCount}
            </div>
            <p className="text-gray-600 font-medium">Your Posts</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {followingIds.length}
            </div>
            <p className="text-gray-600 font-medium">Following</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition-shadow">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {feedPostCount}
            </div>
            <p className="text-gray-600 font-medium">All Posts</p>
          </div>
        </section>

        {/* Posts Feed */}
        {status === "loading" && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-500 text-lg">Loading your feed...</p>
          </div>
        )}

        {status === "failed" && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-red-600 mb-4">Error loading posts: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {status === "succeeded" && filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-lg">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                Welcome to ConnectHub!
              </h3>
              <p className="text-gray-600 mb-6 text-lg">
                Be the first to create a post and start sharing with the
                community!
              </p>
              <Link
                to="/create-post"
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
              >
                Create Your First Post
              </Link>
            </div>
          </div>
        )}

        {status === "succeeded" && filteredPosts.length > 0 && (
          <div className="w-full max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">🌍 All Posts</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {filteredPosts.length} posts
              </span>
            </div>
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <PostCard
                  key={post._id || post.id || post.createdAt || index}
                  post={post}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
