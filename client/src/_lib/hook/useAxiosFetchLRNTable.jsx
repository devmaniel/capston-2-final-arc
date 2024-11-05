import { useEffect, useState, useCallback } from 'react';
import axios from '../api/axios';

const useAxiosFetchLRNTable = (page, filter, status, statuslrn, search) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [fetchStatus, setFetchStatus] = useState(200); // Default success status
    const [totalPages, setTotalPages] = useState(0); // State for total pages

    // Memoized fetch function
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/admin/excelLRNTable`, {
                params: {
                    page,
                    filter,
                    status,
                    statuslrn,
                    search // Include search in the request
                },
            });
            setData(response.data.data);
            setTotalPages(response.data.pagination.totalPages); // Extract totalPages
            setFetchStatus(response.status);
            console.log(response.data); // Log the data received from the server
        } catch (err) {
            setError(err);
            setFetchStatus(err.response ? err.response.status : 500);
            console.error('Error fetching data:', err); // Log the error for debugging
        } finally {
            setLoading(false);
        }
    }, [page, filter, status, statuslrn, search]); // Add search to dependencies

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Re-fetch when fetchData changes

    return { data, loading, error, fetchStatus, totalPages }; // Return totalPages
};

export default useAxiosFetchLRNTable;
