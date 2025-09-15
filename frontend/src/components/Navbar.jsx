
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <nav>
        <ul>
          <li>Inicio</li>
          <li>Indicadores</li>
          <li>No conformidades</li>
          <li>Documentos</li>
        </ul>
      </nav>
      <div className="user-icon" title="Cerrar sesión" onClick={handleLogout} style={{cursor:'pointer'}}>
        <span role="img" aria-label="user">👤</span>
        <span style={{fontSize:'0.9rem',marginLeft:'0.5rem',color:'#1976d2'}}>Salir</span>
      </div>
    </header>
  );
}

export default Navbar;
