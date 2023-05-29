import React, { useState } from "react";
import { login } from "../api";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({ handleLogin, handleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(username, password);
    } catch (error) {
      setError(error.message);
    }
  };
  const login = (email, password) => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        console.log("User logged in:", user);
        handleLogin();
        // Perform any additional actions after successful login
      })
      .catch((error) => {
        // Login failed
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Login error:", errorCode, errorMessage);
        // Handle the error and provide appropriate feedback to the user
      });
  };

  return (
    <div className="content">
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Don't have an account? <button onClick={handleSignup}>Sign Up</button>
      </p>
    </div>
  );
};

export default LoginPage;
