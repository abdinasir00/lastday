import Notification from "./pages/Notification";
import Create from "./pages/Create";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/NAvbar";
import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import { useSelector } from "react-redux";

// import Notification from "./pages/Notification"
// import Create from "./pages/Create"
import Login from "./pages/Login";
import Register from "./pages/Register";
// import { Home } from "lucide-react";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NotificationsList from "./pages/NotificationsList";
import ProtectedRoute from "./components/auth/ProtectedRoutes";

function App() {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  // Loading spinner
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col main-h-screen">
      {isAuthenticated && <Navbar />}
      {/* <Navbar user={currentUser.name} avatar={currentUser.avatar} /> */}
      <div className="flex flex-1">
        {isAuthenticated && <Sidebar />}
        <main className="flex-grow">
          <Routes>
        

            <Route
              path="/register"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Register />
                </ProtectedRoute>
              }
            />
       

            <Route
              path="/home"
              element={
                <ProtectedRoute requireAuth={true}>
                  <Home/>
                </ProtectedRoute>
              }
            />

 

            <Route
              path="/login"
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />

   

            <Route
              path="/search"
              element={
                <ProtectedRoute requireAuth={true}>
                  <SearchPage />
                </ProtectedRoute>
              }
            />



            <Route
              path="/notifications"
              element={
                <ProtectedRoute requireAuth={true}>
                  <NotificationsList />
                </ProtectedRoute>
              }
            />

      

            <Route
              path="/create"
              element={
                <ProtectedRoute requireAuth={true}>
                  <Create />
                </ProtectedRoute>
              }
            />

     

            <Route
              path="/profile"
              element={
                <ProtectedRoute requireAuth={true}>
                  <Profile />
                </ProtectedRoute>
              }
            />
      

            <Route
              path="/notification"
              element={
                <ProtectedRoute requireAuth={true}>
                  <Notification />
                </ProtectedRoute>
              }
            />

          
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
