const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: 'tu_usuario',
    host: 'localhost',
    database: 'cursos_techwork',
    password: 'tu_contraseña',
    port: 5432,
});

app.get('/api/alumnos', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT g.nombre AS grupo, a.nombre, a.email
            FROM alumnos a
            JOIN grupos g ON a.id_grupo = g.id
            ORDER BY g.nombre, a.nombre
        `);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los datos");
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

// Cursos
app.get('/api/cursos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM cursos');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los cursos");
    }
});

// Profesores
app.get('/api/profesores', async (req, res) => {
    try {
        const result = await pool.query('SELECT nombre, email FROM profesores');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los profesores");
    }
});
