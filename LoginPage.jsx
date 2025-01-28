import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    console.log("Response status:", response.status);

    if (response.ok) {
      const data = await response.json();
      console.log("Token received:", data.token);
      localStorage.setItem("token", data.token);
      console.log("Navigating to home...");
      navigate("/home");
    } else {
      console.error("Login failed:", await response.text());
      alert("Login failed");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
