import { useEffect, useState } from "react";
import axios from "../api/axios";


export const useAxiosFetchImage = (url) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          setLoading(true);
          const response = await axios.get(url, { responseType: 'blob' });
          const blobUrl = URL.createObjectURL(new Blob([response.data]));
          setImageUrl(blobUrl);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
          console.error('Error fetching image:', err);
        }
      };
  
      fetchImage();
  
      // Cleanup function to revoke the blob URL
      return () => {
        if (imageUrl) {
          URL.revokeObjectURL(imageUrl);
        }
      };
    }, [url]);
  
    return { imageUrl, loading, error };
  };
