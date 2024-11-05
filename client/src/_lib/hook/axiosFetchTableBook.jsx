// client

import { useEffect, useState, useCallback } from "react";
import axios from "../api/axios";

export const axiosFetchTableBook = (url, page, filter, classState, book_status, search) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch function
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Prepare query parameters
      const params = {
        search: search || '', // Ensure search is passed as a query parameter
      };

      const res = await axios.get(`${url}/${page}/${filter}/${classState}/${book_status}`, { params });
      setData(res.data);
    } catch (err) {
      console.error(err);
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url, page, filter, classState, book_status, search]);

  // Revalidate the data every second
  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [fetchData]);

  return {
    data,
    totalPage: data?.totalPages || 0,
    bookdata: data?.books || [],
    isLoading,
    error,
  };
};
