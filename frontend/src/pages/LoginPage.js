import React, { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { loginUser } from "../services/api";
import { setAuthToken } from "../services/api";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);  
      setToken(data.token);  
      setAuthToken(data.token);  
      navigate("/dashboard");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    
    <div>
        <h1>Login</h1>
        <p>
          Don't have an account?{" "}
          <Link to="/register">Register</Link> here.
        </p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
