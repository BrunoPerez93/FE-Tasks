import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Navbar from "./components/Navbar/Navbar";
import { useState, useEffect } from "react";
import TasksList from "./components/Dashboard/TasksList";
import AddTask from "./components/Dashboard/AddTask";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (
      !token &&
      location.pathname !== "/" &&
      location.pathname !== "/register"
    ) {
      navigate("/"); 
    }
  }, [isLoggedIn, location.pathname, navigate]);

  return (
    <main className="flex flex-col justify-center items-center ">
      {isLoggedIn &&
        location.pathname !== "/" &&
        location.pathname !== "/register" && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/tasksList" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isLoggedIn ? <Navigate to="/tasksList" replace /> : <Register />
          }
        />
        <Route
          path="/tasksList"
          element={<ProtectedRoute element={TasksList} />}
        />
        <Route path="/addTask" element={<ProtectedRoute element={AddTask} />} />
      </Routes>
    </main>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
