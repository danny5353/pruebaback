const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;
const cors = require('cors');

// Habilitar CORS para todas las solicitudes
app.use(cors());

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@Pepe12345#',
  database: 'opticaDB'
});

db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Middleware para procesar datos JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para registrar un paciente
app.post('/registro', (req, res) => {
  const { nombre, apellido, dni, direccion, telefono, email } = req.body;

  const query = 'INSERT INTO pacientes (nombre, apellido, dni, direccion, telefono, email) VALUES (?, ?, ?, ?, ?, ?)';
  
  db.query(query, [nombre, apellido, dni, direccion, telefono, email], (err, result) => {
    if (err) {
      res.status(500).send('Error al registrar el paciente');
      return;
    }
    res.status(200).send('Paciente registrado con éxito');
  });
});

// Ruta para obtener todos los pacientes
app.get('/pacientes', (req, res) => {
  const query = 'SELECT * FROM pacientes';

  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener los pacientes');
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});