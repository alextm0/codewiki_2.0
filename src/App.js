import React, { useEffect, useState } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { MainPage, ErrorPage, ArticlePage, AdmiterePage, BacalaureatPage, OlimpiadaPage, Post, StartLearningPage, ProblemSetPage, SolutieProbleme } from './pages'

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

  const [storedSolutionData, setStoredSolutionData] = useState(
    JSON.parse(localStorage.getItem("strapiSolutionData")) || {}
  );

  const PUBLIC_URL = 'https://codewiki-blog.onrender.com/api/blogs?populate=*';
  const SOLUTIONS_URL = 'http://localhost:1337/api/solutions?populate=*';

  let {loading, error, data, solutionLoading, solutionError, solutionData} = useFetchDataAPI(PUBLIC_URL, SOLUTIONS_URL)

  useEffect(() => {
    if (data) {
      localStorage.setItem("strapiData", JSON.stringify(data));
      setStoredData(data);
    }
    if (solutionData) {
      localStorage.setItem("strapiSolutionData", JSON.stringify(solutionData));
      setStoredSolutionData(solutionData);
    }
  }, [data, solutionData]);

  if (loading && !storedData) return <p> Loading </p>;
  if (error) return <p> Error! </p>;
  if (!data && !storedData) return null;


  if (solutionLoading && !storedSolutionData) return <p> Loading </p>;
  if (solutionError) return <p> Error! </p>;
  if (!solutionData && !storedSolutionData) return null;

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

      <Route path="/codewiki_2.0/solutie/:slug" element={<SolutieProbleme data={storedSolutionData ? storedSolutionData : ""} />} />

      <Route
        path="/codewiki_2.0/blog/:slug"
        element={<Post blogs={storedData ? storedData : ""} />}
        exact
      />
  </Routes>
  );
}

export default App;
