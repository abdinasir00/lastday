
import { Link } from "react-router-dom"
import { User, Plus, Bell, Search, Home  } from "lucide-react"

const Sidebar = () => {
    return (
      
        <div className="flex ml-12 px-16 my-8">
         <div className="text justify-between items-center">
         <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-gray" />
            <button className="hover:bg-blue-600 rounded-md font-medium w-30 py-2 hover:text-white">Home</button>
          </Link>

        <Link to="/search" className="flex items-center space-x-2">
          <Search className="h-6 w-6 text-gray-600" />
          <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
            Search
          </button>
        </Link>

        <Link to="/create" className="flex items-center space-x-2">
          <Plus className="h-6 w-6 text-gray-600" />
          <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
            Create
          </button>
        </Link>

        <Link to="/notifications" className="flex items-center space-x-2">
          <Bell className="h-6 w-6 text-gray-600" />
          <button className="hover:bg-blue-600 rounded-md font-medium w-30 px-3 py-2 hover:text-white">
            Notifications
          </button>
        </Link>

        <Link to="/profile" className="flex items-center space-x-2">
          <User className="h-6 w-6 text-gray-600" />
          <button className="hover:bg-blue-600 rounded-md w-30 font-medium px-3 py-2 hover:text-white">
            Profile
          </button>
        </Link>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around py-2 border-t">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Home className="h-6 w-6" />
          <button className="text-xs hover:text-blue-600">Home</button>
        </Link>

        <Link to="/search" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Search className="h-6 w-6" />
          <button className="text-xs hover:text-blue-600">Search</button>
        </Link>

        <Link to="/create" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Plus className="h-6 w-6" />
          <button className="text-xs hover:text-blue-600">Create</button>
        </Link>

        <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <Bell className="h-6 w-6" />
          <button className="text-xs hover:text-blue-600">Alerts</button>
        </Link>

        <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-600">
          <User className="h-6 w-6" />
          <button className="text-xs hover:text-blue-600">Profile</button>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;









