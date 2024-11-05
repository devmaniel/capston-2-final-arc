import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";

export const axiosFetchEditBook = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  // Create a fetch function that can be called for re-fetching
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setData(res.data);
      setStatus(res.status);
    } catch (err) {
      setData(null);
      setStatus(err.response ? err.response.status : "Unknown");
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Automatically fetch data on component mount or URL change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return data, loading status, error status, and the refetch function
  return { data, isLoading, status, refetch: fetchData };
};
