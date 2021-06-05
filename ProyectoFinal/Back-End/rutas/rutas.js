const express = require('express');
const rutas = express.Router();
const BD = require('../config/BD.js');

rutas.get('/Categorias', (req, res) => {
    if (BD) {
        let sql = 'select * from CATEGORIAS';
        BD.query(sql, (err, Categorias) => {
            if (err) {
                res.send(err)
            } else {
                res.json(Categorias);
            }
        })
    }
}
);

rutas.post('/Agregar-Categorias', (req, res) => {
    if (BD) {
        const Categoria = req.body;
        if (!Categoria.Nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" })
        }
        if (Categoria.Nombre.length > 50) {
            return res.status(400).send({ error: true, mensaje: "La longitud sobrepasa el limite permitido" })
        }
        let sql = 'INSERT INTO CATEGORIAS set ?';
        BD.query(sql, [Categoria], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Categoria insertada correctamente" })
            }
        })

    }
});
rutas.delete('/Eliminar-Categoria/:ID', (req, res) => {
    if (BD) {
        const id = req.params.ID;
        let sql = 'DELETE FROM CATEGORIAS where ID = ?';
        BD.query(sql, [id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Categoria Eliminada Correctamente" })
            }
        })

    }
});
rutas.get('/Personal', (req, res) => {
    if (BD) {
        let sql = 'select * from PERSONAL';
        BD.query(sql, (err, Personal) => {
            if (err) {
                res.send(err)
            } else {
                res.json(Personal);
            }
        })
    }
}
);

rutas.post('/Agregar-Personal', (req, res) => {
    if (BD) {
        const Personal = req.body;
        if (!Personal.Nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" })
        }
        if (Personal.Nombre.length > 50) {
            return res.status(400).send({ error: true, mensaje: "La longitud sobrepasa el limite permitido" })
        }
        let sql = 'INSERT INTO PERSONAL set ?';
        BD.query(sql, [Personal], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Personal insertado correctamente" })
            }
        })

    }
});
rutas.put('/Editar-Personal/:ID', (req, res) => {
    if (BD) {
        const id = req.params.ID;
        const Personal = req.body;
        if (!Personal) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" })
        }
        if (Personal.Nombre.length > 50) {
            return res.status(400).send({ error: true, mensaje: "La longitud sobrepasa el limite permitido" })
        }

        let sql = 'UPDATE PERSONAL set ? where ID = ?';
        BD.query(sql, [Personal, id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Personal Editado Correctamente" })
            }
        })

    }
});
rutas.delete('/Eliminar-Personal/:ID', (req, res) => {
    if (BD) {
        const id = req.params.ID;
        let sql = 'DELETE FROM PERSONAL where ID = ?';
        BD.query(sql, [id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Personal Eliminado Correctamente" })
            }
        })

    }
});

rutas.get('/Tickets', (req, res) => {
    if (BD) {
        let sql = 'select * from TICKETS';
        BD.query(sql, (err, Categorias) => {
            if (err) {
                res.send(err)
            } else {
                res.json(Categorias);
            }
        })
    }
}
);
rutas.post('/Agregar-Ticket', (req, res) => {
    if (BD) {
        const Tickets = req.body;
        if (!Tickets.Nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" })
        }
        if (Tickets.Nombre.length > 50) {
            return res.status(400).send({ error: true, mensaje: "La longitud sobrepasa el limite permitido" })
        }
        let sql = 'INSERT INTO TICKETS set ?';
        BD.query(sql, [Tickets], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Ticket insertado correctamente" })
            }
        })

    }
});
module.exports = rutas;