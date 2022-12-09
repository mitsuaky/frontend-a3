import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/navbar.jsx';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Turmas from './pages/turmas';
import Professores from './pages/professores';
import Alunos from './pages/alunos';
import Boletins from './pages/boletins';
import Home from './pages/home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/turmas" element={<Turmas />} />
        <Route path="/professores" element={<Professores />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/boletins" element={<Boletins />} />
      </Routes>
      </BrowserRouter>
  </React.StrictMode>
);
