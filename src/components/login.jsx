import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import md5 from "md5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUpClick = async (e) => {
    e.preventDefault();

    try {
      const encryptedPassword = md5(password); 

      const response = await fetch("http://localhost:5050/record/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: encryptedPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      localStorage.setItem("login", "true");
      setLogIn(true);

    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  const handleLoginClick = async (e) => {
    e.preventDefault();

    try {
      const encryptedPassword = md5(password); 

      const response = await fetch("http://localhost:5050/record/login-verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password: encryptedPassword }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      localStorage.setItem("login", "true");
      setLogIn(true);

    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleLoginClick} style={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center", border: "1px solid grey", borderRadius: "10px" }}>
        <div>
          <label>Email:</label>
          <TextField type="email" value={email} onChange={handleEmailChange} required />
        </div>
        <div>
          <label>Password:</label>
          <TextField type="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <Button type="submit" onClick={handleSignUpClick}>Sign up</Button>
        <br/>
        <Button type="submit" onClick={handleLoginClick}>Log in</Button>
      </form>
    </div>
  );
};

export default Login;
