const db = require('../models/db');

// Indicadores clave: proyectos entregados, satisfacción del cliente, incidencias resueltas
exports.getIndicadoresClave = async (req, res) => {
  try {
    // Proyectos entregados (finalizados)
    const [proyectos] = await db.query("SELECT COUNT(*) AS total, SUM(CASE WHEN descripcion LIKE '%finalizad%' THEN 1 ELSE 0 END) AS entregados FROM procesos");
    // Satisfacción del cliente (dummy, se puede conectar a otra tabla en el futuro)
    const satisfaccion = 4.2;
    // Incidencias resueltas (dummy, se puede conectar a hallazgos/acciones)
    const incidenciasResueltas = 15;
    res.json({
      proyectosEntregados: proyectos[0].total ? Math.round((proyectos[0].entregados / proyectos[0].total) * 100) : 0,
      satisfaccionCliente: satisfaccion,
      incidenciasResueltas: incidenciasResueltas
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener indicadores clave', error });
  }
};

// Cronograma de auditorías
exports.getCronogramaAuditorias = async (req, res) => {
  try {
    const [auditorias] = await db.query('SELECT id, fecha, estado FROM auditorias ORDER BY fecha ASC');
    res.json(auditorias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cronograma de auditorías', error });
  }
};

// Alertas (dummy)
exports.getAlertas = async (req, res) => {
  res.json({
    tareasPendientes: 3,
    noConformidadesAbiertas: 2,
    incidenciasResueltas: 15
  });
};
