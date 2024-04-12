// Importar los módulos necesarios
const express = require('express');
const app = express();
const mysql = require("mysql");
const cors = require("cors");

// Middleware para el manejo de datos JSON y CORS
app.use(express.json());
app.use(cors());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "usuario1",
    password: "recia10",
    database: "usuarios"
});

// Establecer la conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión a la base de datos establecida');
});

// Ruta para crear un nuevo usuario en la base de datos
app.post("/create", (req, res) => {
    console.log(req.body); // Registra en la consola el cuerpo de la solicitud POST
    const { nombre, apellido, cargo, usuario, clave } = req.body; // Extrae datos del cuerpo de la solicitud
    const sql = 'INSERT INTO ingreso (nombre, apellido, cargo, usuario, clave) VALUES (?, ?, ?, ?, ?)'; // Consulta SQL para insertar un nuevo usuario
    const values = [nombre, apellido, cargo, usuario, clave]; // Valores a insertar en la consulta SQL
    // Ejecuta la consulta SQL con los valores proporcionados
    db.query(sql, values, (err, data) => {
        if (err) { // Manejo de errores en caso de que la consulta falle
            console.error('Error al insertar usuario en la base de datos:', err);
            res.status(500).send('Error al insertar usuario en la base de datos');
        } else {
            res.status(201).json({ message: 'Usuario creado exitosamente' }); // Respuesta exitosa si la inserción se realizó correctamente
        }
    });
});

app.post('/access', (req, res) => {
    const usuario= req.body.usuario;
    const clave = req.body.clave;
  
    // Consulta para obtener la contraseña almacenada en la base de datos
    db.query('SELECT clave FROM ingreso WHERE usuario = ?', [usuario], (error, results, fields) => {
      if (error) throw error;
  
      if (results.length > 0) {
        const storedPassword = results[0].clave;
  
        // Comparar contraseñas
        if (clave === storedPassword) {
          res.send('Inicio de sesión exitoso');
        } else {
          res.send('Contraseña incorrecta');
        }
      } else {
        res.send('Usuario no encontrado');
      }
    });
  });

// Puerto en el que el servidor escuchará las solicitudes
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});