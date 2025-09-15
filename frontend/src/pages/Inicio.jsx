
import React, { useEffect, useState } from 'react';
import './Inicio.css';

function Inicio() {
  const [indicadores, setIndicadores] = useState(null);
  const [cronograma, setCronograma] = useState([]);
  const [alertas, setAlertas] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/dashboard/indicadores')
      .then(res => res.json())
      .then(setIndicadores);
    fetch('http://localhost:3000/api/dashboard/cronograma-auditorias')
      .then(res => res.json())
      .then(setCronograma);
    fetch('http://localhost:3000/api/dashboard/alertas')
      .then(res => res.json())
      .then(setAlertas);
  }, []);

  return (
    <div className="dashboard-grid">
      <h1>Seguimiento ISO 9001</h1>
      <div className="widgets-row">
        <div className="widget">
          <h3>Proyectos Entregados</h3>
          <div className="widget-value">{indicadores ? indicadores.proyectosEntregados + '%' : '...'}</div>
        </div>
        <div className="widget">
          <h3>Satisfacción del Cliente</h3>
          <div className="widget-value">{indicadores ? indicadores.satisfaccionCliente : '...'}</div>
        </div>
        <div className="widget">
          <h3>Incidencias Resueltas</h3>
          <div className="widget-value">{indicadores ? indicadores.incidenciasResueltas : '...'}</div>
        </div>
      </div>
      <div className="dashboard-columns">
        <div className="dashboard-col">
          <h3>Cronograma de Auditorías</h3>
          <ul>
            {cronograma.map(a => (
              <li key={a.id}>{a.estado === 'finalizada' ? '✔️' : '🕒'} {a.fecha}</li>
            ))}
          </ul>
        </div>
        <div className="dashboard-col">
          <h3>Alertas</h3>
          {alertas && (
            <ul>
              <li>📝 {alertas.tareasPendientes} Tareas Pendientes</li>
              <li>⚠️ {alertas.noConformidadesAbiertas} No Conformidades Abiertas</li>
              <li>✅ {alertas.incidenciasResueltas} Incidencias Resueltas</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Inicio;
