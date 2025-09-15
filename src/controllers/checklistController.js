const db = require('../models/db');

// Guarda o actualiza el checklist de un usuario
exports.saveChecklist = async (req, res) => {
  console.log('Petición recibida para guardar checklist', req.body, req.user);
  const { checklist } = req.body;
  const userId = req.user.id;
  try {
    // Elimina el checklist anterior del usuario
    await db.query('DELETE FROM checklist_iso9001 WHERE user_id = ?', [userId]);
    // Inserta cada respuesta
    for (const item of checklist) {
      await db.query(
        'INSERT INTO checklist_iso9001 (user_id, punto, estado) VALUES (?, ?, ?)',
        [userId, item.id, item.estado]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error('Error al guardar checklist:', err);
    res.status(500).json({ error: 'Error al guardar el checklist' });
  }
};

// Obtiene el checklist guardado de un usuario
exports.getChecklist = async (req, res) => {
  const userId = req.user.id;
  try {
    const [rows] = await db.query(
      'SELECT punto, estado FROM checklist_iso9001 WHERE user_id = ?',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el checklist' });
  }
};
