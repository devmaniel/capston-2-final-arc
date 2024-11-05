import { useState, useEffect } from 'react';
import axios from '../api/axios';

// Custom hook to fetch single student data
const useAxiosFetchSingleStudent = (student_id) => {
  const [data, setData] = useState(null);  // State for storing student data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null);  // State for handling errors

  useEffect(() => {
    // Function to fetch student data
    const fetchStudentData = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts

        // Fetch student data from the server
        const response = await axios.get(`/admin/fetch_single_student?student_id=${student_id}`);
        
        // Set the response data
        setData(response.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        setError(err.message); // Handle any error that occurs
        setLoading(false);  // Set loading to false even if there is an error
      }
    };

    // Call the fetch function if student_id is available
    if (student_id) {
      fetchStudentData();
    }
  }, [student_id]);  // Dependency array ensures fetch happens on student_id change

  // Return the data, loading, and error states
  return { data, loading, error };
};

export default useAxiosFetchSingleStudent;
