import React, { useState } from "react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignupPage, setShowSignupPage] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleSignup = () => {
    setShowSignupPage(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CRM App</h1>
      </header>
      <div className="container">
        {!isLoggedIn && !showSignupPage && (
          <LoginPage handleLogin={handleLogin} handleSignup={handleSignup} />
        )}
        {!isLoggedIn && showSignupPage && (
          <SignupPage handleSignup={() => setShowSignupPage(false)} />
        )}
        {isLoggedIn && <Dashboard handleLogout={handleLogout} />}
      </div>
    </div>
  );
}

export default App;
