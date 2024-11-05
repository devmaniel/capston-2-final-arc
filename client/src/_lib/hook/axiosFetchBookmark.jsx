import { useState, useEffect } from 'react';
import axios from '../api/axios';
import Cookies from 'js-cookie';

export const axiosFetchBookmark = (url) => {
  const [bookmarkData, setBookmarkData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookmarks = async () => {
    const sessionId = Cookies.get('sessionId');
    if (!sessionId) {
      setError("Session ID is missing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(url, { sessionId });
      if (response.data) {
        setBookmarkData(response.data.bookmarks);
        setUserData(response.data.user);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [url]);

  return { bookmarkData, userData, loading, error, refetch: fetchBookmarks };
};
