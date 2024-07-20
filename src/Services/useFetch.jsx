import {useState, useEffect} from 'react';

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        setStatusCode(response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message);
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url]);

  return {data, loading, error, statusCode};
};

export default useFetch;
