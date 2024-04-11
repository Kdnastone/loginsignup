// Importar los módulos necesarios
const express = require('express');
const app = express();
const mysql = require("mysql");
const bcrypt = require('bcrypt');
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


// Ruta para iniciar sesión
app.post("/access", (req, res) => {
    const { usuario, clave } = req.body;

    const sql = "SELECT clave FROM ingreso WHERE usuario = ?";
    db.query(sql, [usuario], (err, data) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).send('Error al consultar la base de datos');
        }
        if (data.length === 0) {
            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        const hashedPassword = data[0].clave;
        bcrypt.compare(clave, hashedPassword, (compareErr, result) => {
            if (compareErr) {
                console.error('Error al comparar las contraseñas:', compareErr);
                return res.status(500).send('Error al comparar las contraseñas');
            }
            if (result) {
                return res.send({ message: 'Ingreso Exitoso' });
            } else {
                return res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
            }
        });
    });
});

// Puerto en el que el servidor escuchará las solicitudes
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});