import React from 'react';
import logo from './logo.svg';
import './App.css';
import QASession from './components/QASession';
import data from "./mock.data"

function App() {
  return (
    <div>
      <QASession instructions={data}/>
    </div>
  );
}

export default App;
