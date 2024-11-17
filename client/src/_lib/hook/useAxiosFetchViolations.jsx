import { useState, useEffect, useCallback } from 'react';
import axios from '../api/axios'; // Import axios instance

const useAxiosFetchViolations = (initialParams = {}) => {
    // States for data, loading, status, and error
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [params, setParams] = useState(initialParams);

    // Function to fetch violations from the API
    const fetchViolations = useCallback(async () => {
        try {
            setLoading(true);
            const queryString = new URLSearchParams(params).toString(); // Build query string from params
            const response = await axios.get(`/admin/fetch_table_violations?${queryString}`);
            setData(response.data.data); // Store fetched data
            setStatus(response.status); // Store the status code
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setStatus(err.response ? err.response.status : 500); // Capture status from the error
        } finally {
            setLoading(false);
        }
    }, [params]); // Dependencies include params

    // UseEffect to call fetchViolations when params change
    useEffect(() => {
        fetchViolations();
    }, [fetchViolations]);

    return { data, loading, status, error, setParams }; // Return relevant states and param setter
};

export default useAxiosFetchViolations;
