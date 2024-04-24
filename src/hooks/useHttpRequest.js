import { useState } from "react";
import axios from "axios";

const useHttpRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");
  const fetchData = async (
    url,
    method = "GET",
    requestBody = null,
    customHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  ) => {
    setLoading(true);
    setError(null);
    setData(null);
    const fullUrl = `http://13.60.57.85${url}`;
    try {
      const response = await axios({
        method,
        url: fullUrl,
        headers: customHeaders,
        data: requestBody,
      });

      const responseData = response.data;
      setData(responseData);
    } catch (error) {
      setError(error || "Something went wrong!");
      if (error.response && error.response.status === 403) {
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("token", "");
      }
    }

    setLoading(false);
  };

  return {
    loading,
    error,
    data,
    get: (url, customHeaders) => fetchData(url, "GET", null, customHeaders),
    post: (url, requestBody, customHeaders) =>
      fetchData(url, "POST", requestBody, customHeaders),
    put: (url, requestBody, customHeaders) =>
      fetchData(url, "PUT", requestBody, customHeaders),
    patch: (url, requestBody, customHeaders) =>
      fetchData(url, "PATCH", requestBody, customHeaders),
  };
};

export default useHttpRequest;
