import { Link, useNavigate } from "react-router-dom";
import { LogOut, BadgePlus } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { logOut } from "../store/slices/auth";
// import { userLogout } from "../store/slices/auth";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const avatarLetter = "C";
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, status, user } = useSelector((state) => state.auth);

  const hundleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      navigate("/login");
    } catch (error) {
      console.log("failed logout", error);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md  ">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo & Avatar */}
          <div className="flex items-center space-x-2">
            <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
              {avatarLetter}
            </span>
            <h1 className="text-2xl font-bold">ConnectHub</h1>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6 items-center">
              {isAuthenticated && (
                <>
                  <li className="hover:text-blue-600 transition-colors duration-200">
                    <Link to="/profile" className="flex items-center gap-x-1">
                      <img
                        src="https://rb.gy/fbxvbz"
                        className="h-10 w-10 rounded-full object-cover mr-5"
                        alt="avatar"
                      />
                      <span className="text-1xl font-thin text-black-800">
                        {user?.name || "User"}
                      </span>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={hundleLogout}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition"
                    >
                      <LogOut className="h-5 w-5 text-gray-700" />
                      <p>Logout</p>
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {isOpen && isAuthenticated && (
          <nav className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <Link to="/profile" className="flex items-center gap-x-2">
                  <img
                    src="https://rb.gy/fbxvbz"
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">
                    {user?.name || "User"}
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={hundleLogout}
                  className="flex items-center gap-x-2"
                >
                  <LogOut className="h-5 w-5 text-gray-700" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;
