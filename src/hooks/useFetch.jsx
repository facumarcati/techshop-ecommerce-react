import { useEffect, useState } from "react";

const useFetch = (url, delay) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => setData(data), delay);
      })
      .catch((error) => setError(error))
      .finally(() => setTimeout(() => setLoading(false), delay));
  }, [url, delay]);

  return { data, error, loading };
};

export default useFetch;
