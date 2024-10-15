import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import Dashboard from "./components/Dashboard/TasksList";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import TasksList from "./components/Dashboard/TasksList";
import AddTask from "./components/Dashboard/AddTask";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <main className="flex flex-col justify-center items-center ">
      {isLoggedIn &&
        location.pathname !== "/" &&
        location.pathname !== "/register" && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasksList" element={<TasksList />} />
        <Route path="/addTask" element={<AddTask />} />
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
