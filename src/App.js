import React, { useEffect, useState } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { MainPage, ErrorPage, ArticlePage, AdmiterePage, BacalaureatPage, OlimpiadaPage, Post, StartLearningPage, ProblemSetPage } from './pages'

import useFetch from "./hooks/useFetch";
import useFetchDataAPI from './hooks/useFetchDataAPI'

function App() {
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("strapiData")) || {}
  );

  console.log("Initial", storedData);

  const PUBLIC_URL = 'https://codewiki-blog.onrender.com/api/blogs?populate=*';
  const LOCAL_URL = 'http://localhost:1337'

  // let { loading, data, error } = useFetch(
  //   `${PUBLIC_URL}/api/blogs?populate=*`
  // );

  let {loading,data,error} = useFetchDataAPI(PUBLIC_URL)

  useEffect(() => {
    if (data) {
      localStorage.setItem("strapiData", JSON.stringify(data));
      setStoredData(data);
    }
  }, [data]);

  if (loading && !storedData) return <p> Loading </p>;
  if (error) return <p> Error! </p>;
  if (!data && !storedData) return null;

  if(storedData && storedData.data != 0)
    console.log(storedData.data);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage/>}
      />
      <Route
        path="/codewiki_2.0"
        element={<MainPage blogs={storedData ? storedData : ""}/>}
      />

      <Route
        path="/codewiki_2.0/articles"
        element={<ArticlePage blogs={storedData ? storedData : ""} />}
      />
      <Route path="/codewiki_2.0/admitere" element={<AdmiterePage />} />
      <Route path="/codewiki_2.0/bacalaureat" element={<BacalaureatPage />} />
      <Route path="/codewiki_2.0/olimpiada" element={<OlimpiadaPage />} />
      <Route path="/codewiki_2.0/learn" element={<StartLearningPage />} />
      <Route path="/codewiki_2.0/problems" element={<ErrorPage />} />
      <Route path="/codewiki_2.0/signup" element={<ErrorPage />} />
      <Route path="/codewiki_2.0/login" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />

      <Route path="/codewiki_2.0/bacalaureat/:slug" element={<ProblemSetPage />} />
      <Route path="/codewiki_2.0/admitere/:slug" element={<ProblemSetPage />} />
      <Route path="/codewiki_2.0/olimpiada/:slug" element={<ProblemSetPage />} />

      <Route
        path="/codewiki_2.0/blog/:slug"
        element={<Post blogs={storedData ? storedData : ""} />}
        exact
      />
  </Routes>
  );
}

export default App;
