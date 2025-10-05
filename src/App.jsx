
import Notification from "./pages/Notification"
import Create from "./pages/Create"
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NAvbar";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";

import Notification from "./pages/Notification"
import Create from "./pages/Create"
import Login from './pages/Login'
import Register from './pages/Register'
// import { Home } from "lucide-react";
import Home from "./pages/Home"
import Profile from "./pages/Profile"

function App() {
  return (
      <div className="flex flex-col main-h-screen">
        <Navbar />
        {/* <Navbar user={currentUser.name} avatar={currentUser.avatar} /> */}
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-grow">
          
          <Routes>
              <Route path="/" element={<Register/>} />
              <Route path="/Home" element={ <Home/>} />
              <Route path="/login" element={ <Login/>} />
              <Route path="/search" element={<SearchPage />} />

              <Route path="/notifications" element={<Notification />} />
              <Route path="/create" element={<Create />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Create" element={<Create />} />
              <Route path="/notifications" element={<Notification />} />


            </Routes>
          </main>
        </div>
      </div>
    
  );
}

export default App;


