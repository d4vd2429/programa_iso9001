const db = require('../models/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const {
    razonSocial, nit, representante, sector, tipoEmpresa, direccion, telefonos, numEmpleados,
    email, web, facebook, instagram, tiktok, password, rol
  } = req.body;
  try {
    const [user] = await db.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (user.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      `INSERT INTO usuarios 
      (razon_social, nit, representante_legal, sector_economico, tipo_empresa, direccion, telefonos, num_empleados, email, web, facebook, instagram, tiktok, password, rol)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        razonSocial, nit, representante, sector, tipoEmpresa, direccion, telefonos, numEmpleados,
        email, web, facebook, instagram, tiktok, hashedPassword, rol || 'usuario'
      ]
    );
    res.status(201).json({ message: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.log('ERROR REGISTRO:', error);
    res.status(500).json({ message: 'Error en el registro.', error });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [user] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
    }
    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos.' });
    }
    const token = jwt.sign({ id: user[0].id, rol: user[0].rol }, process.env.JWT_SECRET, { expiresIn: '8h' });
    res.json({ token, usuario: { id: user[0].id, nombre: user[0].nombre, email: user[0].email, rol: user[0].rol } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login.', error });
  }
};
