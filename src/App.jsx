
import Sidebar from "./components/Sidebar"
import Navbar from "./components/NAvbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import SearchPage from "./pages/SearchPage"




function App() {

  return (
  <Router>
  <div className="flex flex-col main-h-screen"> 
   <Navbar user="ConnectHub" />
  <main className="flex-grow">
  <Sidebar />
  <Routes>
    <Route path="/search" 
      element={<SearchPage />}
    />
  </Routes>
  </main>
  </div>
</Router>
  )
}

export default App
