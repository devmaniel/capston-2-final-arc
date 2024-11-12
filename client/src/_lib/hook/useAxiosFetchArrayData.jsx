import { useState, useEffect, useCallback } from 'react';
import axios from '../api/axios';

const useAxiosFetchArrayData = (url) => {
  const [arrayData, setArrayData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize fetchData with useCallback to ensure it only changes when the URL changes
  const fetchData = useCallback(async () => {
    console.log(`Fetching data from: ${url}`); // Log URL to indicate when fetchData is called
    setLoading(true);
    try {
      const response = await axios.get(url);
      setArrayData(response.data);
      setLoading(false);
      console.log("Data fetched successfully:", response.data); // Log successful data fetch
    } catch (err) {
      setError(err);
      setLoading(false);
      console.error("Error fetching data:", err); // Log errors if the request fails
    }
  }, [url]);

  // Fetch data when URL changes
  useEffect(() => {
    console.log("useEffect triggered - calling fetchData"); // Log when useEffect is triggered
    fetchData();
  }, [fetchData]);

  return { arrayData, loading, error };
};

export default useAxiosFetchArrayData;
