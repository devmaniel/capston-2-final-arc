import { useState, useEffect } from 'react';
import axios from "../api/axios";
import Cookies from 'js-cookie';

const axiosFetchPostProfile = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const sessionId = Cookies.get('sessionId');
      
      if (!sessionId) {
        setError('Session ID not found');
        return;
      }

      setLoading(true);

      try {
        const response = await axios.post('/student/fetch_profile', { sessionId });
        setData(response.data);  // Assuming the structure is { data: { ... } }
        setError(null);
      } catch (err) {
        console.error("Error fetching profile info:", err);
        setError('Failed to fetch profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, error, loading };
};

export default axiosFetchPostProfile;
