import { useEffect, useState, useCallback } from 'react';
import axios from "../api/axios";



const axiosFetchRequest = (status, page, format, search) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: page,
    pageSize: 10,
  });

  // Use useCallback to memoize the fetch function
  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      // Add status, page, format, and search as query parameters
      const response = await axios.get(
        `/admin/fetch_request_table/${status}?page=${page}&format=${format}&search=${search}`
      );
      
      // Set the requests and pagination metadata from the response
      setRequests(response.data.requests);
      setPagination(response.data.pagination); // Assuming pagination metadata is sent in response

    } catch (err) {
      setError("Failed to load requests."); // Handle errors more clearly
    } finally {
      setLoading(false); // Set loading to false when done
    }
  }, [status, page, format, search]); // Dependency array includes status, page, format, and search

  useEffect(() => {
    fetchData(); // Call the fetch function
  }, [fetchData]); // Only call fetchData when it changes

  return { requests, loading, error, pagination }; // Return the requests and pagination data
};

export default axiosFetchRequest;
