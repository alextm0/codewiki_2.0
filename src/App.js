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

  // const PUBLIC_URL = 'https://codewiki-blog.onrender.com';
  // const LOCAL_URL = 'http://localhost:1337'

  // let { loading, data, error } = useFetch(
  //   `${PUBLIC_URL}/api/blogs?populate=*`
  // );

  // useEffect(() => {
  //   if (data) {
  //     localStorage.setItem("strapiData", JSON.stringify(data));
  //     setStoredData(data);
  //   }
  // }, [data]);

  // if (loading && !storedData) return <p> Loading </p>;
  // if (error) return <p> Error! </p>;
  // if (!data && !storedData) return null;

  // if(storedData.data)
  //   console.log(storedData.data);

  // blogs={storedData ? storedData : ""} 

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage/>}
      />
      <Route
        path="/codewiki_2.0"
        element={<MainPage />}
      />

      {/* <Route
        path="/codewiki_2.0/articles"
        element={<ArticlePage blogs={storedData ? storedData : ""} />}
      /> */}
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

      {/* <Route
        path="/codewiki_2.0/blog/:slug"
        element={<Post blogs={storedData ? storedData : ""} />}
        exact
      /> */}
  </Routes>
  );
}

export default App;
