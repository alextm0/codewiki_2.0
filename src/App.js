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
  const SOLUTIONS_URL = 'https://codewiki-blog.onrender.com/api/solutions?populate=*';

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
  if (error) return <p> Error! 1 </p>;
  if (!data && !storedData) return null;


  if (solutionLoading && !storedSolutionData) return <p> Loading </p>;
  if (solutionError) return <p> Error! 2 </p>;
  if (!solutionData && !storedSolutionData) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage blogs={storedData ? storedData : ""}/>}
      />
      <Route
        path="/codewiki_2.0"
        element={<MainPage blogs={storedData ? storedData : ""}/>}
      />

      <Route
        path="/articles"
        element={<ArticlePage blogs={storedData ? storedData : ""} />}
      />
      <Route path="/admitere" element={<AdmiterePage />} />
      <Route path="/bacalaureat" element={<BacalaureatPage />} />
      <Route path="/olimpiada" element={<OlimpiadaPage />} />
      <Route path="/learn" element={<StartLearningPage />} />
      <Route path="/problems" element={<ErrorPage />} />
      <Route path="/signup" element={<ErrorPage />} />
      <Route path="/login" element={<ErrorPage />} />
      <Route path="*" element={<ErrorPage />} />

      <Route path="/bacalaureat/:slug" element={<ProblemSetPage />} />
      <Route path="/admitere/:slug" element={<ProblemSetPage />} />
      <Route path="/olimpiada/:slug" element={<ProblemSetPage />} />

      <Route path="/solutie/:slug" element={<SolutieProbleme data={storedSolutionData ? storedSolutionData : ""} />} />
      <Route path="*" element={<ErrorPage />} />


      <Route
        path="/blog/:slug"
        element={<Post blogs={storedData ? storedData : ""} />}
        exact
      />
  </Routes>
  );
}

export default App;
