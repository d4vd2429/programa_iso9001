import React, { useEffect, useState } from 'react';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/proyectos')
      .then(res => res.json())
      .then(data => setProyectos(data));
  }, []);

  return (
    <div>
      <h2>Proyectos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Responsable</th>
          </tr>
        </thead>
        <tbody>
          {proyectos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>{p.responsable_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Proyectos;
