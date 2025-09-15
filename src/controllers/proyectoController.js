const db = require('../models/db');

// Obtener todos los proyectos
exports.getProyectos = async (req, res) => {
  try {
    const [proyectos] = await db.query('SELECT * FROM procesos');
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener proyectos', error });
  }
};

// Crear un nuevo proyecto
exports.createProyecto = async (req, res) => {
  const { nombre, descripcion, responsable_id } = req.body;
  try {
    await db.query('INSERT INTO procesos (nombre, descripcion, responsable_id) VALUES (?, ?, ?)', [nombre, descripcion, responsable_id]);
    res.status(201).json({ message: 'Proyecto creado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear proyecto', error });
  }
};

// Actualizar un proyecto
exports.updateProyecto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, responsable_id } = req.body;
  try {
    await db.query('UPDATE procesos SET nombre = ?, descripcion = ?, responsable_id = ? WHERE id = ?', [nombre, descripcion, responsable_id, id]);
    res.json({ message: 'Proyecto actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar proyecto', error });
  }
};

// Eliminar un proyecto
exports.deleteProyecto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM procesos WHERE id = ?', [id]);
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar proyecto', error });
  }
};
