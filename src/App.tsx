import React from 'react';
import logo from './logo.svg';
import './App.css';
import QASession from './views/QASession';
import data from "./mock.data"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import Home from './views/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/new-session' element={<QASession instructions={data}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
