

import { NavLink, Link } from "react-router-dom";
import { Home, Search, Bell, User, Plus } from "lucide-react";

const links = [
  { to: "/home", icon: <Home className="h-6 w-6" />, label: "Home" },
  { to: "/search", icon: <Search className="h-6 w-6" />, label: "Search" },
  { to: "/create", icon: <Plus className="h-6 w-6" />, label: "Create" },
  { to: "/notifications", icon: <Bell className="h-6 w-6" />, label: "Notifications" },
  { to: "/profile", icon: <User className="h-6 w-6" />, label: "Profile" },
];

const Sidebar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col ml-12 px-6 my-8 space-y-4">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 rounded-md font-medium px-4 py-2 transition-all duration-300 ${
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
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all ${
                isActive ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
              }`
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
