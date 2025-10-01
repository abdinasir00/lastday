
import Sidebar from "./components/Sidebar"
import Navbar from "./components/NAvbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage"
import Notification from "./pages/Notification"
import Create from "./pages/Create"




function App() {

  return (
  <Router>
  <div className="flex flex-col main-h-screen"> 
   <Navbar user="ConnectHub" />
  <main className=" flex flex-grow">
  <Sidebar />
  <Routes>
    <Route path="/search" 
      element={<SearchPage />}
    
    />
        <Route path="/Create" element={<Create />} />
        <Route path="/notifications" element={<Notification />} />
   \
  </Routes>
  </main>
  </div>
</Router>
  )
}

export default App
