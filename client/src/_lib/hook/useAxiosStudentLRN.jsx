import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useAxiosStudentLRN = (lrn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Don't fetch if no LRN is provided
      if (!lrn) {
        setData(null);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/admin/excelspecificstudent?lrn_id=${lrn}`);
        setData(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || 
          'An error occurred while fetching student data'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [lrn]); // Re-fetch when LRN changes

  // Function to manually trigger a refresh
  const refetch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/admin/excelspecificstudent?lrn_id=${lrn}`);
      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'An error occurred while fetching student data'
      );
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
};

export default useAxiosStudentLRN;