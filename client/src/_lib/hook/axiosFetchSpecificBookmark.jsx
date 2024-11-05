import { useState, useEffect } from 'react';
import axios from '../api/axios'; // Adjust the path if necessary

const axiosFetchSpecificBookmark = (requestId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        setStatus(null);

        const response = await axios.get(`/admin/fetch_specific_request/${requestId}`);
        setData(response.data);
        setStatus(response.status);
      } catch (err) {
        setError(err.message || 'An error occurred');
        if (err.response) {
          setStatus(err.response.status);
        }
      } finally {
        setLoading(false);
      }
    };

    if (requestId) { // Ensure requestId is available before making a request
      fetchData();
    }
  }, [requestId]);

  return { data, loading, error, status };
};

export default axiosFetchSpecificBookmark;
