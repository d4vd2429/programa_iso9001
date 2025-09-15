require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Rutas
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);


const proyectoRoutes = require('./routes/proyectos');
app.use('/api/proyectos', proyectoRoutes);



const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const checklistRoutes = require('./routes/checklist');
app.use('/api/checklist', checklistRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
