import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import TitanicPredictorPage from './components/TitanicPredictorPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/titanic-predictor" element={<TitanicPredictorPage />} />
    </Routes>
  );
};

export default App;