import React, { useEffect, useState } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { MainPage, ErrorPage, ArticlePage, AdmiterePage, BacalaureatPage, OlimpiadaPage, Post, StartLearningPage, ProblemSetPage, SolutieProbleme } from './pages'

import useFetchDataAPI from './hooks/useFetchDataAPI'

function App() {
  const PUBLIC_URL = process.env.REACT_APP_PUBLIC_URL;
  const SOLUTIONS_URL = process.env.REACT_APP_SOLUTIONS_URL;
  const CATEGORIES_URL = process.env.REACT_APP_CATEGORIES_URL;

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

  const [storedCategoryData, setStoredCategoryData] = useState(
    JSON.parse(localStorage.getItem("strapiSolutionData")) || {}
  );  

  let { loading, error, data, solutionLoading, solutionError, solutionData, categoryLoading, categoryError, categoryData } = useFetchDataAPI(PUBLIC_URL, SOLUTIONS_URL, CATEGORIES_URL)

  useEffect(() => {
    if (data) {
      localStorage.setItem("strapiData", JSON.stringify(data));
      setStoredData(data);
    }
    if (solutionData) {
      localStorage.setItem("strapiSolutionData", JSON.stringify(solutionData));
      setStoredSolutionData(solutionData);
    }
    if (categoryData) {
      localStorage.setItem("strapiCategoryData", JSON.stringify(categoryData));
      setStoredCategoryData(categoryData);
    }
  }, [data, solutionData, categoryData]);

  if (loading && !storedData) return <p> Loading </p>;
  if (error) return <p> Error! 1 </p>;
  if (!data && !storedData) return null;

  if (solutionLoading && !storedSolutionData) return <p> Loading </p>;
  if (solutionError) return <p> Error! 2 </p>;
  if (!solutionData && !storedSolutionData) return null;

  if (categoryLoading && !storedCategoryData) return <p> Loading </p>;
  if (categoryError) return <p> Error! 3 </p>;
  if (!categoryData && !storedCategoryData) return null;

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage blogs={storedData ? storedData : ""} />}
      />

      <Route
        path="/articles"
        element={<ArticlePage blogs={storedData ? storedData : ""} />}
      />

      <Route path={`/olimpiada`} element={<OlimpiadaPage data={storedCategoryData ? storedCategoryData : ""} />} />
      <Route path={`/admitere`} element={<AdmiterePage data={storedCategoryData ? storedCategoryData : ""} />} />
      <Route path={`/bacalaureat`} element={<BacalaureatPage data={storedCategoryData ? storedCategoryData : ""} />} />

      <Route path={`/olimpiada/:slug`} element={<ProblemSetPage data={storedCategoryData ? storedCategoryData : ""} />} />
      <Route path={`/admitere/:slug`} element={<ProblemSetPage data={storedCategoryData ? storedCategoryData : ""} />} />
      <Route path={`/bacalaureat/:slug`} element={<ProblemSetPage data={storedCategoryData ? storedCategoryData : ""} />} />

      <Route path="/learn" element={<StartLearningPage />} />
      <Route path="/problems" element={<ErrorPage />} />
      <Route path="/signup" element={<ErrorPage />} />
      <Route path="/login" element={<ErrorPage />} />

      <Route path="/solutie/:slug" element={<SolutieProbleme data={storedSolutionData ? storedSolutionData : ""} />} />

      <Route
        path="/blog/:slug"
        element={<Post blogs={storedData ? storedData : ""} />}
        exact
      />
      <Route path="*" element={<ErrorPage />} />

    </Routes>
  );
}

export default App;
