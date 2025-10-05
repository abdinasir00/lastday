

// import { Link } from "react-router-dom";
// import { Home, Search, Bell, User, Plus } from "lucide-react";

// const Sidebar = () => {
//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden md:flex flex-col ml-12 px-6 my-8 space-y-4  ">
//         <Link to="/Home" className="flex items-center space-x-2 bg-blue-500 round-md text-blue-100">
//           <Home className="h-6 w-6 text-gray-600" />
//           <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
//             Home
//           </button>
//         </Link>

//         <Link to="/search" className="flex items-center space-x-2  bg-blue-500 round-md text-blue-100">
//           <Search className="h-6 w-6 text-gray-600" />
//           <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
//             Search
//           </button>
//         </Link>

//         <Link to="/create" className="flex items-center space-x-2  bg-blue-500 round-md text-blue-100">
//           <Plus className="h-6 w-6 text-gray-600" />
//           <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
//             Create
//           </button>
//         </Link>

//         <Link to="/notifications" className="flex items-center space-x-2  bg-blue-500 round-md text-blue-100">
//           <Bell className="h-6 w-6 text-gray-600" />
//           <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
//             Notifications
//           </button>
//         </Link>

//         <Link to="/profile" className="flex items-center space-x-2  bg-blue-500 round-md text-blue-100">
//           <User className="h-6 w-6 text-gray-600" />
//           <button className="hover:bg-blue-600 rounded-md w-30 font-medium px-3 py-2 hover:text-white">
//             Profile
//           </button>
//         </Link>
//       </div>

//       {/* Mobile Bottom Navbar */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 border-t">
//         <Link to="/Home" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
//           <Home className="h-6 w-6" />
//           <button className="text-xs hover:text-blue-600">Home</button>
//         </Link>

//         <Link to="/search" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
//           <Search className="h-6 w-6" />
//           <button className="text-xs hover:text-blue-600">Search</button>
//         </Link>

//         <Link to="/create" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
//           <Plus className="h-6 w-6" />
//           <button className="text-xs hover:text-blue-600">Create</button>
//         </Link>

//         <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
//           <Bell className="h-6 w-6" />
//           <button className="text-xs hover:text-blue-600">Alerts</button>
//         </Link>

//         <Link to="/rofile" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
//           <User className="h-6 w-6" />
//           <button className="text-xs hover:text-blue-600">Profile</button>
//         </Link>
//       </div>
//     </>
//   );
// };

// export default Sidebar;





import { NavLink } from "react-router-dom";
import { Home, Search, Bell, User, Plus } from "lucide-react";

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col ml-12 px-6 my-8 space-y-4">
        {[
          { to: "/home", icon: <Home className="h-6 w-6" />, label: "Home" },
          { to: "/search", icon: <Search className="h-6 w-6" />, label: "Search" },
          { to: "/create", icon: <Plus className="h-6 w-6" />, label: "Create" },
          { to: "/notifications", icon: <Bell className="h-6 w-6" />, label: "Notifications" },
          { to: "/profile", icon: <User className="h-6 w-6" />, label: "Profile" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md font-medium px-4 py-2 transition-all duration-300 
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md scale-[1.02]"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 border-t">
        {[
          { to: "/home", icon: <Home className="h-6 w-6" />, label: "Home" },
          { to: "/search", icon: <Search className="h-6 w-6" />, label: "Search" },
          { to: "/create", icon: <Plus className="h-6 w-6" />, label: "Create" },
          { to: "/notifications", icon: <Bell className="h-6 w-6" />, label: "Alerts" },
          { to: "/profile", icon: <User className="h-6 w-6" />, label: "Profile" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all 
              ${isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
