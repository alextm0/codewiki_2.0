import axios from "axios";
import { useEffect, useState } from "react";

function useFetchDataAPI(url1, url2) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [solutionData, setSolutionData] = useState(null);
  const [solutionError, setSolutionError] = useState(null);
  const [solutionLoading, setSolutionLoading] = useState(null);

  useEffect(() => {
    setLoading(true)
    axios.get(url1)
      .then((res) => {
        setData(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setLoading(false);
        setError(true);
      })

      axios.get(url2)
      .then((res) => {
        setSolutionData(res.data)
        setSolutionLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setSolutionLoading(false);
        setSolutionError(true);
      })
  }, [url1, url2])
  return {
    loading,
    error,
    data,
    solutionLoading,
    solutionError,
    solutionData
  };
}

export default useFetchDataAPI;