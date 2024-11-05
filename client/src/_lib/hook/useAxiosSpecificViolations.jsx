import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "@tanstack/react-router";

const useAxiosSpecificViolations = (violations_id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        setLoading(true);
        setError(null);

        if (!violations_id) {
          throw new Error("Violations ID is required");
        }

        const response = await axios.get(`/admin/fetch_specific_violations`, {
          params: {
            violations_id: violations_id,
          },
        });

        // If no data is returned or data is empty, redirect to manage violations
        if (
          !response.data ||
          !response.data.data ||
          response.data.data.length === 0
        ) {
          navigate({ to: "/admin/manage_violations" });
          return;
        }

        setData(response.data);
        setStatus(response.status);
      } catch (err) {
        setError(err.message || "An error occurred while fetching violations");
        setStatus(err.response?.status);
        // Redirect to manage violations page on error
        navigate({ to: "/admin/manage_violations" });
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, [violations_id, navigate]);

  return { data, loading, error, status };
};

export default useAxiosSpecificViolations;
