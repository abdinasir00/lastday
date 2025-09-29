

import { Link } from "react-router-dom"
import { Home } from "lucide-react"
import { Search } from "lucide-react"
import { Bell } from "lucide-react"
import { User } from "lucide-react"



const Sidebar = () => {
    return (
        <div className="flex ml-12 px-16 my-8">
         <div className="text justify-between items-center">
         <Link to="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-gray" />
            <button className="hover:bg-blue-600 rounded-md font-medium w-30 py-2 hover:text-white">Home</button>
          </Link>

          <Link to="/search" className="flex items-center space-x-2">
            <Search className="h-6 w-6 text-gray" />
            <button className="hover:bg-blue-600 rounded-md font-medium w-30 py-2 hover:text-white">Search</button>
          </Link>

          <Link to="/notifications" className="flex items-center space-x-2">
            <Bell className="h-6 w-6 text-gray" />
            <button className="hover:bg-blue-600 rounded-md font-medium w-30 py-2 hover:text-white">Notifications</button>
          </Link>

          <Link to="/profile" className="flex items-center space-x-2">
            <User className="h-6 w-6 text-blue" />
            <button className="hover:bg-blue-600 rounded-md font-medium w-30 py-2 hover:text-white">Profile</button>
          </Link>
          
         </div>
        </div>
    )
}

export default Sidebar;