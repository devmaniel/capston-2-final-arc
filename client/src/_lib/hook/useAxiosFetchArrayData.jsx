import { useState, useEffect } from 'react';
import axios from '../api/axios';

const useAxiosFetchArrayData = (url) => {
  const [arrayData, setArrayData] = useState([]); // For storing the fetched data
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setArrayData(response.data); // Assuming the response.data is an array
        setLoading(false);
      } catch (err) {
        setError(err); // Set error if the request fails
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-run the effect if the URL changes

  return { arrayData, loading, error }; // Return the data, loading, and error
};

export default useAxiosFetchArrayData;
