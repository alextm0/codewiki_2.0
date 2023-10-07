import axios from "axios";
import { useEffect, useState } from "react";

function useFetchDataAPI(url1, url2, url3) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);

  const [solutionData, setSolutionData] = useState(null);
  const [solutionError, setSolutionError] = useState(null);
  const [solutionLoading, setSolutionLoading] = useState(null);

  const [categoryData, setCategoryData] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [categoryLoading, setCategoryLoading] = useState(null);

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

    axios.get(url3)
      .then((res) => {
        setCategoryData(res.data)
        setCategoryLoading(false);
      })
      .catch((err) => {
        console.log(err)
        setCategoryLoading(false);
        setCategoryError(true);
      })
  }, [url1, url2, url3])
  return {
    loading,
    error,
    data,
    solutionLoading,
    solutionError,
    solutionData,
    categoryData,
    categoryError,
    categoryLoading
  };
}

export default useFetchDataAPI;