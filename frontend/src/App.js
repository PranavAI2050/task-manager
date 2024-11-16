import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {Link} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import { setAuthToken } from "./services/api";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    } else {
      setAuthToken(null);
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAuthToken(null);
  };
return (
  <Router>
    <Routes>
      <Route path="/" element={token ? <Navigate to="/dashboard" /> : <div>
            <h1>Welcome to the Task Management App</h1>
            <p>
              <Link to="/register">Register</Link> or{" "}
              <Link to="/login">Login</Link> to get started.
            </p>
          </div>} />
      <Route path="/register" element={token ? <Navigate to="/dashboard" /> : <RegisterPage />} />
      <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <LoginPage setToken={setToken} />} />
      <Route
        path="/dashboard"
        element={token ? <DashboardPage /> : <Navigate to="/login" />}
      />
    </Routes>
    {token && <button onClick={handleLogout}>Logout</button>}
  </Router>
);
}

export default App;
