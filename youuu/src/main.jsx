import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './pages/HomePage';
import MessagePage from './pages/MessagePage';
import MiniGame from './pages/MiniGame';
import FinalGift from './pages/FinalGift';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/message" element={<MessagePage />} />
      <Route path="/game" element={<MiniGame />} />
      <Route path="/gift" element={<FinalGift />} />
    </Routes>
  </BrowserRouter>
);