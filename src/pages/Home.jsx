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
