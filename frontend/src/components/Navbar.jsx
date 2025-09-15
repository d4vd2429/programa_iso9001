import React from 'react';
import './Navbar.css';

function Navbar() {
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
      <div className="user-icon">
        <span role="img" aria-label="user">👤</span>
      </div>
    </header>
  );
}

export default Navbar;
