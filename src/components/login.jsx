import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const Login = ({setLogIn}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5050/record/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      // Successful login, redirect to dashboard or home page

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLogin} style={{display: 'flex', alignItems: 'center', flexDirection: 'column',justifyContent: 'center', border: '1px solid grey', borderRadius: '10px'}}>
        <div>
          <label>Email:</label>
          <TextField
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <TextField
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <Button type="submit" onClick={() => setLogIn(true)}>Login</Button>
      </form>
    </div>
  );
};

export default Login;
