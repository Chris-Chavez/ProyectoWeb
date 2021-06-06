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
            return res.status(400).send({ error: true, mensaje: "La longitud del Nombre sobrepasa el limite permitido" })
        }
        if (Personal.Apellidos.length > 80) {
            return res.status(400).send({ error: true, mensaje: "La longitud de los Apellidos sobrepasa el limite permitido" })
        }
        if (!Personal.Apellidos) {
            return res.status(400).send({ error: true, mensaje: "Los Apellidos son obligatorios" })
        }
        if (Personal.Telefono.length > 10) {
            return res.status(400).send({ error: true, mensaje: "La longitud del Telefono sobrepasa el limite permitido" })
        }
        if (Personal.Direccion.length > 150) {
            return res.status(400).send({ error: true, mensaje: "La longitud de la Direccion sobrepasa el limite permitido" })
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
        if (!Personal.Nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" })
        }
        if (Personal.Nombre.length > 50) {
            return res.status(400).send({ error: true, mensaje: "La longitud del Nombre sobrepasa el limite permitido" })
        }
        if (Personal.Apellidos.length > 80) {
            return res.status(400).send({ error: true, mensaje: "La longitud de los Apellidos sobrepasa el limite permitido" })
        }
        if (!Personal.Apellidos) {
            return res.status(400).send({ error: true, mensaje: "Los Apellidos son obligatorios" })
        }
        if (Personal.Telefono.length > 10) {
            return res.status(400).send({ error: true, mensaje: "La longitud del Telefono sobrepasa el limite permitido" })
        }
        if (Personal.Direccion.length > 150) {
            return res.status(400).send({ error: true, mensaje: "La longitud de la Direccion sobrepasa el limite permitido" })
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
            return res.status(400).send({ error: true, mensaje: "La longitud del Nombre sobrepasa el limite permitido" })
        }
        if (Tickets.Descripcion.length > 100) {
            return res.status(400).send({ error: true, mensaje: "La longitud de la Descripcion sobrepasa el limite permitido" })
        }
        if (!Tickets.Prioridad) {
            return res.status(400).send({ error: true, mensaje: "La Prioridad es obligatoria" })
        }
        if (!Tickets.Personal) {
            return res.status(400).send({ error: true, mensaje: "El Personal es obligatorio" })
        }
        if (Tickets.Categoria > 50) {
            return res.status(400).send({ error: true, mensaje: "La Categoria es obligatoria" })
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
rutas.put('/Editar-Ticket/:ID', (req, res) => {
    if (BD) {
        const id = req.params.ID;
        const Tickets = req.body;
        if (!Tickets.Nombre) {
            return res.status(400).send({ error: true, mensaje: "El nombre es obligatorio" })
        }
        if (Tickets.Nombre.length > 50) {
            return res.status(400).send({ error: true, mensaje: "La longitud del Nombre sobrepasa el limite permitido" })
        }
        if (Tickets.Descripcion.length > 100) {
            return res.status(400).send({ error: true, mensaje: "La longitud de la Descripcion sobrepasa el limite permitido" })
        }
        if (!Tickets.Prioridad) {
            return res.status(400).send({ error: true, mensaje: "La Prioridad es obligatoria" })
        }
        if (!Tickets.Personal) {
            return res.status(400).send({ error: true, mensaje: "El Personal es obligatorio" })
        }
        if (Tickets.Categoria > 50) {
            return res.status(400).send({ error: true, mensaje: "La Categoria es obligatoria" })
        }

        let sql = 'UPDATE TICKETS set ? where ID = ?';
        BD.query(sql, [Tickets, id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Personal Editado Correctamente" })
            }
        })

    }
});
rutas.put('/Editar-Ticket-Estatus/:ID', (req, res) => {
    if (BD) {
        const id = req.params.ID;
        const Tickets = req.body;
        if (!Tickets) {
            return res.status(400).send({ error: true, mensaje: "El Estatus es obligatorio" })
        }
        
        let sql = 'UPDATE TICKETS set ? where ID = ?';
        BD.query(sql, [Tickets, id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Personal Editado Correctamente" })
            }
        })

    }
});
rutas.delete('/Eliminar-Tickets/:ID', (req, res) => {
    if (BD) {
        const id = req.params.ID;
        let sql = 'DELETE FROM TICKETS where ID = ?';
        BD.query(sql, [id], (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json({ error: false, data: rows, mensaje: "Personal Eliminado Correctamente" })
            }
        })

    }
});
module.exports = rutas;