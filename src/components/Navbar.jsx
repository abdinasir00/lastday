import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";



const Navbar = ({ user }) => {
    
  return (
    <header className="text-black shadow-md">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="avator flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
            {user.charAt(0).toUpperCase()}
            </span>
            <h1 className="text-2xl font-bold">ConnectHub</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li className="hover:text-200 transition-colors duration-200">
                <Link to="/profile">
                  <div className="flex items-center gap-x-1">
                    <img className="h-8 w-8 text-gray-500 mr-1" />
                    <h2 className="text-2  text-black-700">Jordan Martinez</h2>
                  </div>
                </Link>
              </li>
              <li>
                <Link to="/logout">
                  <LogOut className="h-5 w-5 " />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
  //className="text-2xl font-semibold text-gray-700 mr-8
};

export default Navbar;
