// hooks/useLogout.js
import { useState } from 'react';
import axios from './axios'; 
import { useNavigate } from '@tanstack/react-router';

import Cookies from 'js-cookie';  // Import js-cookie

const useLogout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Retrieve sessionId from cookies instead of sessionStorage
      const sessionId = Cookies.get('sessionId');

      if (!sessionId) {
        throw new Error("No sessionId found");
      }

      // Send sessionId to server to destroy the session and wait for the response
      const response = await axios.post('/logout', { sessionId });

      if (response.status === 200) {
        // Clear the sessionId cookie after server successfully logs out
        Cookies.remove('sessionId');

        // Redirect to the login page
        navigate('/login');  // Adjust the path based on your routing setup
      } else {
        throw new Error("Failed to logout from the server.");
      }
    } catch (err) {
      setError('An error occurred while logging out.');
      console.error("Logout Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
};


export default useLogout;