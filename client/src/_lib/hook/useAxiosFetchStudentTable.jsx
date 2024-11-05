import { useState, useEffect, useCallback } from 'react';
import axios from "../api/axios";

const useAxiosFetchStudentTable = (page, filter, status, search) => {
  // working
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStudentTable = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/admin/fetch_student_table`, {
        params: {
          page,
          filter: typeof filter === 'string' ? filter.toLowerCase() : filter,
          status: typeof status === 'string' ? status.toLowerCase() : status,
          search: search.toLowerCase(),
        }
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [page, filter, status, search]);

  useEffect(() => {
    fetchStudentTable(); // Fetch data when page, filter, status, or search changes
  }, [fetchStudentTable]); // Refire when the dependencies change

  return { data, loading, error };
};

export default useAxiosFetchStudentTable;
