import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio';
import Proyectos from './pages/Proyectos';
import Indicadores from './pages/Indicadores';
import NoConformidades from './pages/NoConformidades';
import Documentos from './pages/Documentos';
import Auditorias from './pages/Auditorias';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/indicadores" element={<Indicadores />} />
          <Route path="/no-conformidades" element={<NoConformidades />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/auditorias" element={<Auditorias />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
