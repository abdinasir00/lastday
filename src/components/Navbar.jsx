// import { Link } from "react-router-dom";
// import { LogOut, BadgePlus } from "lucide-react";
// import { useState } from "react";
// import Register from "../pages/Register"

// const Navbar = () => {
//   const avatarLetter = "C"; // Xarafka ugu horeeya ee "ConnectHub"
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <header className="text-black shadow-md">
//       <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//         {/* Logo & Avatar */}
//         <div className="flex items-center space-x-2">
//           <span className="avator flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
//             {avatarLetter}
//           </span>
//           <h1 className="text-2xl font-bold">ConnectHub</h1>
//         </div>

//         {/* Desktop nav */}
//         <nav className="hidden md:flex">
//           <ul className="flex space-x-6 items-center">
//             <li className="hover:text-blue-600 transition-colors duration-200">
//               <Link to="/profile" className="flex items-center gap-x-1">
//                 <img src="https://rb.gy/fbxvbz" className="h-8 w-8 rounded-full object-cover" />
//                 <span className="font-medium text-gray-800">User</span>
//               </Link>
//             </li>
      


//             <li>
//               <Link to="/" element={Register}  className=" flex gap-2">
//                 <BadgePlus className="h-5 w-5 text-gray-700" /> 
//                <p> Register</p>
//                </Link> 
//             </li>

            
//             <li>
//               <Link to="/login"  className=" flex gap-2">
//                 <LogOut className="h-5 w-5 text-gray-700" />
//                                <p> Login</p>
//               </Link>
//             </li>

//                   <li>
//               <Link to="/logout"  className=" flex gap-2">
//                 <LogOut className="h-5 w-5 text-gray-700" />
//                                <p> Log Out</p>
//               </Link>
//             </li>


//           </ul>
//         </nav>

//         {/* Mobile menu button */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="text-gray-800 focus:outline-none"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* Mobile nav */}
//       {isOpen && (
//         <nav className="md:hidden bg-white shadow-md">
//           <ul className="flex flex-col space-y-2 p-4">
//             <li>
//               <Link to="/profile" className="flex items-center gap-x-2">
//                 <img className="h-8 w-8 rounded-full object-cover" />
//                 <span className="font-medium text-gray-800">Jordan Martinez</span>
//               </Link>
//             </li>
//             <li>
//               <Link to="/logout" className="flex items-center gap-x-2">
//                 <LogOut className="h-5 w-5 text-gray-700" />
//                 <span>Logout</span>
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Navbar;



import { Link } from "react-router-dom";
import { LogOut, BadgePlus } from "lucide-react";
import { useState } from "react";
import Register from "../pages/Register";

const Navbar = () => {
  const avatarLetter = "C"; // Xarafka ugu horeeya ee "ConnectHub"
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white text-black shadow-md">
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
              <li className="hover:text-blue-600 transition-colors duration-200">
                <Link to="/profile" className="flex items-center gap-x-1">
                  <img
                    src="https://rb.gy/fbxvbz"
                    className="h-8 w-8 rounded-full object-cover"
                    alt="avatar"
                  />
                  <span className="font-medium text-gray-800">User</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  element={Register}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition"
                >
                  <BadgePlus className="h-5 w-5 text-gray-700" />
                  <p>Register</p>
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition"
                >
                  <LogOut className="h-5 w-5 text-gray-700" />
                  <p>Login</p>
                </Link>
              </li>

              <li>
                <Link
                  to="/logout"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition"
                >
                  <LogOut className="h-5 w-5 text-gray-700" />
                  <p>Logout</p>
                </Link>
              </li>
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
        {isOpen && (
          <nav className="md:hidden bg-white shadow-md">
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <Link to="/profile" className="flex items-center gap-x-2">
                  <img
                    src="https://rb.gy/fbxvbz"
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-800">User</span>
                </Link>
              </li>
              <li>
                <Link to="/logout" className="flex items-center gap-x-2">
                  <LogOut className="h-5 w-5 text-gray-700" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>

      {/* 👇 Add margin to avoid content hiding under fixed navbar */}
      <div className="mt-20"></div>
    </>
  );
};

export default Navbar;
