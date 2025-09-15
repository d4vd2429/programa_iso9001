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
import ChecklistISO9001 from './pages/ChecklistISO9001';
import Login from './pages/Login';
import Registro from './pages/Registro';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';


function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';
  return (
    <div className="app-container">
      {!isAuthPage && <Sidebar />}
      <div className="main-content">
        {!isAuthPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" />} />
          <Route path="/inicio" element={<ProtectedRoute><Inicio /></ProtectedRoute>} />
          <Route path="/proyectos" element={<ProtectedRoute><Proyectos /></ProtectedRoute>} />
          <Route path="/indicadores" element={<ProtectedRoute><Indicadores /></ProtectedRoute>} />
          <Route path="/no-conformidades" element={<ProtectedRoute><NoConformidades /></ProtectedRoute>} />
          <Route path="/documentos" element={<ProtectedRoute><Documentos /></ProtectedRoute>} />
          <Route path="/auditorias" element={<ProtectedRoute><Auditorias /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/checklist" element={<ProtectedRoute><ChecklistISO9001 /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
