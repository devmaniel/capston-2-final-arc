import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const useAxiosBookBottomCatalog = (bookClass, bookId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookClass) {
      setLoading(false); // If no class is provided, stop loading
      return;
    }

    console.log("Testing API", bookId);

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      

      try {
        // Add bookId as a query parameter if it exists
        const response = await axios.get(`/student/table_book_bottom/${bookClass}`, {
          params: bookId ? { bookId } : {}, // Add the query parameter dynamically
        });
        setData(response.data.books);
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bookClass, bookId]); // Add bookId to the dependency array

  return { data, loading, error };
};

export default useAxiosBookBottomCatalog;
