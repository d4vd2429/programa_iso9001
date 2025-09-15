import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const menu = [
  { path: '/inicio', label: 'Inicio' },
  { path: '/proyectos', label: 'Proyectos' },
  { path: '/indicadores', label: 'Indicadores' },
  { path: '/no-conformidades', label: 'No Conformidades' },
  { path: '/documentos', label: 'Documentos' },
  { path: '/auditorias', label: 'Auditorías', sub: [
    { path: '/checklist', label: 'Checklist ISO 9001' }
  ] },
];

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <div className="logo">DevSoft</div>
      <nav>
        <ul>
          {menu.map(item => (
            <React.Fragment key={item.path}>
              <li className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>{item.label}</Link>
              </li>
              {item.sub && location.pathname.startsWith('/auditorias') && (
                <ul style={{ marginLeft: 16 }}>
                  {item.sub.map(subitem => (
                    <li key={subitem.path} className={location.pathname === subitem.path ? 'active' : ''}>
                      <Link to={subitem.path}>{subitem.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
