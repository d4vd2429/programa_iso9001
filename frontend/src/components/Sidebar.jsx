import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menu = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/proyectos', label: 'Proyectos' },
  { path: '/indicadores', label: 'Indicadores' },
  { path: '/no-conformidades', label: 'No Conformidades' },
  { path: '/documentos', label: 'Documentos' },
  { path: '/auditorias', label: 'Auditorías' },
];

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="logo">DevSoft</div>
      <nav>
        <ul>
          {menu.map(item => (
            <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
