import axios from "axios";
import { useEffect, useState } from "react";

function useFetchDataAPI(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true)
    axios.get(url)
      .then((res) => {
        setData(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        setError(true);
      })
  }, [url])
  return {
    loading,
    error,
    data,
  };
}

export default useFetchDataAPI;