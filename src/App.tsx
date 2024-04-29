import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import QASession from './views/QASession';
import data from "./mock.data"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import { PageRoutes, QAResultsList } from './types';
import Home from './views/Home';
import Results from './views/Results';
import { Storage } from './utils/storage';

function App() {
  const [qaResults, setQaResults] = useState<QAResultsList>();


  useEffect(() => {
    Storage.QAResults.get().then(result => {
      setTimeout(() => setQaResults(result), 2000);
    })
  }, [])


  return (
    <Router>
      <Routes>
        <Route path={PageRoutes.home} element={
          <Home
            qaResults={qaResults}
            setQaResults={setQaResults} />
        } />
        <Route path={PageRoutes.newSession} element={
          <QASession instructions={data} />
        } />
        <Route path={PageRoutes.results} element={
          <Results qaResults={qaResults} />
        } />
      </Routes>
    </Router>
  );
}

export default App;
