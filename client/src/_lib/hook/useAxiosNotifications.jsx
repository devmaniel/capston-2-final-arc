import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Cookies from 'js-cookie';

export const useAxiosNotifications = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(null)
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchNotifications = async () => {
      const sessionId = Cookies.get('sessionId');
      if (!sessionId) {
        setError("Session ID is missing.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post('/student/get_notifcations', { sessionId });
        console.log("Client received data:", response.data);
        setData(response.data.data);
        setCounter(response.data.counter)
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError(err.response ? err.response.data : "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [axios, Cookies]); // Add axios and Cookies to the dependency array

  return { loading, data, counter ,error };
};

