import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "./axios";
import { useNavigate } from "@tanstack/react-router";

const auth = async (role) => {
  try {
    const sessionId = Cookies.get('sessionId');  // Retrieve sessionId from cookies
    if (!sessionId) {
      console.log("Session ID not found");
      return { success: false, reason: 'session_not_found' };
    }
    
    const response = await axios.post("/session/find-session", { sessionId, role });
    console.log("Server Response:", response.data);
    
    if (response.status === 200) {
      // Check if role matches and return data accordingly
      return { success: true, role: response.data.role, valid: true };
    } else {
      if (response.status === 401) {
        Cookies.remove('sessionId');
        console.log("Session expired. Cookie removed.");
      }
      return {
        success: false,
        reason: response.data.reason || 'unknown_error',
        message: response.data.message || 'An unexpected error occurred'
      };
    }
  } catch (err) {
    if (err.response) {
      console.error("Error Response from Server:", err.response.data);
      
      if (err.response.status === 401) {
        Cookies.remove('sessionId');
        console.log("Session expired. Cookie removed.");
      }
      
      // Handle the unenrolled case specifically
      if (err.response.status === 403 && err.response.data.reason === 'unenrolled') {
        return {
          success: false,
          reason: 'unenrolled',
          message: err.response.data.message
        };
      }

      return {
        success: false,
        reason: err.response.data.reason || 'server_error',
        message: err.response.data.message || 'An error occurred while communicating with the server'
      };
    } else {
      console.error("Error Message:", err.message);
      return { success: false, reason: 'network_error', message: err.message };
    }
  }
};

export default auth;