import { useState, useEffect } from 'react';
import axios from '../api/axios'; // Import axios instance

const useAxiosFetchViolations = () => {
    // States for data, loading, status, and error
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch violations from the API
    const fetchViolations = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/admin/fetch_table_violations');
            setData(response.data.data); // Store fetched data
            setStatus(response.status); // Store the status code
        } catch (err) {
            setError(err.message || 'Something went wrong');
            setStatus(err.response ? err.response.status : 500); // Capture status from the error
        } finally {
            setLoading(false);
        }
    };

    // UseEffect to call fetchViolations when the component mounts
    useEffect(() => {
        fetchViolations();
    }, []); // Empty dependency array ensures it runs only once

    return { data, loading, status, error }; // Return relevant states
};

export default useAxiosFetchViolations;
