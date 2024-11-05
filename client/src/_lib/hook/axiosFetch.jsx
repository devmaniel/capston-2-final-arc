import { useEffect, useState } from "react";
import axios from "../api/axios";

export const axiosFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        setData(res.data);
        setStatus(res.status);
        setLoading(false);
      } catch (err) {
        setData(null);
        setStatus(err.response ? err.response.status : 'Unknown');
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, status };
};