// src/auth/AuthProvider.js
import React, { createContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google login function
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post("/api/auth/google", {
          token: tokenResponse.credential,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Google login failed:", error);
      }
    },
    onError: () => {
      console.log("Google Login Failed");
    },
  });

  // GitHub login function
  const handleGithubLogin = () => {
    const clientId = "Ov23li7UCYG5RzudcCbm";
    const redirectUri = "http://localhost:3000/auth/callback"; // Update as needed
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user`;
    window.location.href = githubAuthUrl;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, loading, googleLogin, handleGithubLogin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
