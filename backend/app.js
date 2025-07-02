require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/alunos', alunoRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas conectado!'))
  .catch(err => console.error('Erro na ao ligar á BD:', err));
const cursoRoutes = require('./routes/cursoRoutes');
app.use('/cursos', cursoRoutes);
module.exports = app;
