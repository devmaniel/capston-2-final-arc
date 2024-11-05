import React from 'react'
import Cookies from 'js-cookie';
import axios from '../api/axios';

import { useState, useEffect } from 'react';

export const axiosFetchSingleRequest = (request_id) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchSingleRequest = async () => {
        const sessionId = Cookies.get('sessionId');  // Retrieve sessionId from cookies
  
        if (!sessionId) {
          setError('Session ID not found');
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.post('/student/qr_singleview_request', {
            sessionId,
            request_id
          });
  
          setData(response.data);  // Handle response data (e.g., userId)
          setLoading(false);
        } catch (error) {
          console.error("Error fetching single request:", error);
          setError(error.response?.data?.message || 'An error occurred');
          setLoading(false);
        }
      };
  
      fetchSingleRequest();
    }, [request_id]);
  
    return { data, error, loading };
}
