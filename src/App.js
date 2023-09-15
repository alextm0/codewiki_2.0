import React, { useEffect, useState } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { MainPage, ErrorPage, ArticlePage, AdmiterePage, BacalaureatPage, OlimpiadaPage, Post, StartLearningPage, ProblemSetPage } from './pages'

import useFetch from "./hooks/useFetch";

function App() {
  console.log("THIS PROJECT");

  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  const [storedData, setStoredData] = useState(
    JSON.parse(localStorage.getItem("strapiData")) || null
  );

  const PUBLIC_URL = 'https://codewiki-blog.onrender.com';
  const LOCAL_URL = 'http://localhost:1337'

  let { loading, data, error } = useFetch(
    `${PUBLIC_URL}/api/blogs?populate=*`
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem("strapiData", JSON.stringify(data));
      setStoredData(data);
    }
  }, [data]);

  if (loading && !storedData) return <p> Loading </p>;
  if (error) return <p> Error! </p>;
  if (!data && !storedData) return null;

  console.log(storedData.data);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage blogs={storedData ? storedData : ""} />}
      />
      <Route
        path="/codewiki"
        element={<MainPage blogs={storedData ? storedData : ""} />}
      />

      <Route
        path="/codewiki/articles"
        element={<ArticlePage blogs={storedData ? storedData : ""} />}
      />
      <Route path="/codewiki/admitere" element={<AdmiterePage />} />
      <Route path="/codewiki/bacalaureat" element={<BacalaureatPage />} />
      <Route path="/codewiki/olimpiada" element={<OlimpiadaPage />} />
      <Route path="/codewiki/learn" element={<StartLearningPage />} />
      <Route path="/codewiki/problems" element={<ErrorPage />} />
      <Route path="/codewiki/signup" element={<ErrorPage />} />
      <Route path="/codewiki/login" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />

      <Route path="/codewiki/bacalaureat/:slug" element={<ProblemSetPage />} />
      <Route path="/codewiki/admitere/:slug" element={<ProblemSetPage />} />
      <Route path="/codewiki/olimpiada/:slug" element={<ProblemSetPage />} />

      <Route
        path="/codewiki/blog/:slug"
        element={<Post blogs={storedData ? storedData : ""} />}
        exact
      />
  </Routes>
  );
}

export default App;
