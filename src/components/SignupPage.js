import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { signup } from "../api";

const SignupPage = ({ handleSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [designation, setdesignation] = useState("");
  const [department, setdepartment] = useState("");

  const [error, setError] = useState("");

  const signUpWithEmailAndPassword = (
    email,
    password,
    username,
    designation,
    department
  ) => {
    const auth = getAuth();
    const db = getFirestore();

    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(
          "🚀 ~ file: SignupPage.js:25 ~ .then ~ userCredential:",
          userCredential
        );
        // Signup successful, you can access the user information
        // Create a new document in the "users" collection with user data
        const user = userCredential.user;
        const userRef = doc(db, "users", user.uid);
        const userData = {
          UserName: username,
          email: email,
          designation: designation,
          id: user.uid,
          department: department,

          // Add any additional user data you want to store
        };
        setDoc(userRef, userData)
          .then(() => {
            console.log("User data stored in Firestore");
            // Perform any additional actions after storing user data
          })
          .catch((error) => {
            console.log("Error storing user data:", error);
            // Handle the error and provide appropriate feedback to the user
          });
        console.log("Signup successful:", user);
        return user; // You can return the user object or perform further actions
      })
      .catch((error) => {
        // Signup failed, handle the error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Signup error:", errorCode, errorMessage);
        throw new Error(errorMessage); // You can handle the error in the calling code
      });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    signUpWithEmailAndPassword(
      email,
      password,
      username,
      designation,
      department
    ) ///
      .then((user) => {
        // Signup successful, you can perform further actions (e.g., redirect to dashboard)
        setUsername("");
        setPassword("");
        handleSignup();
        console.log("Signup successful:", user);
      })
      .catch((error) => {
        // Signup failed, update the error state to display the error message
        setError(error.message);
      });
  };

  return (
    <div className="content">
      <h2>Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setdesignation(e.target.value)}
        />
        <input
          type="text"
          placeholder="Designation"
          value={department}
          onChange={(e) => setdepartment(e.target.value)}
        />
        <button type="submit">Create Account</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>
        Already have an account?{" "}
        <button onClick={handleSignup}>Back to Login</button>
      </p>
    </div>
  );
};

export default SignupPage;
