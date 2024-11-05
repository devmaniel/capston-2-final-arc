import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const useAxiosBookBottomCatalog = (bookClass) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookClass) {
      setLoading(false); // If no class is provided, stop loading
      return;
    }

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`/student/table_book_bottom/${bookClass}`);
        setData(response.data.books);
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [bookClass]);

  return { data, loading, error };
};

export default useAxiosBookBottomCatalog;
