// src/auth/AuthProvider.js
import React, { createContext, useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../config/axiosConfig";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // signup with credential
   const signup = async (data) => {
    try {
      const response = await axios.post('/auth/signup', data);
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };


  // login with credential
  const login = async (data) => {
    try {
      const response = await axios.post('/auth/login',data);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  // Google login function
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.get("/auth/google", {
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
      value={{ user, loading,setUser,googleLogin, handleGithubLogin, logout,signup,login }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
