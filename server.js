const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;
const connection = require('./db');

//ReadALL
app.use(cors());
app.use(express.json());

app.get('/api/products', (req, res)=>{
    const sql = 'SELECT * FROM producto';
    connection.query(sql, (err, results)=>{
        if(err) {
            console.log('Error en la consulta de los productos', err);
            return res.status(500).send('Error en el servidor');
        }else{
            res.status(200).send(results);
        }
    });
});

//Crear producto
app.post('/api/products', (req, res)=>{
    const {nombre, precio, cantidad} = req.body;
    const query = 'INSERT INTO producto (nombre, precio, cantidad) VALUES (?, ?, ?)';

    connection.query(query, [nombre, precio, cantidad], (err, results)=>{
        if(err) {
            console.error('Error al insertar producto: ', err);
            return res.status(500).send('Error en el servidor');
        }
        res.status(201).send({nombre, precio, cantidad});
    });
});

//Editar producto
app.put('/api/products/:id', (req, res)=>{
    const {id} = req.params;
    const {nombre, precio, cantidad} = req.body;
    const query = 'UPDATE producto SET nombre = ?, precio = ?, cantidad = ? WHERE idproducto = ?';

    connection.query(query, [nombre, precio, cantidad, id], (err, results)=>{
        if(err) {
            console.error('Error al actualizar producto: ', err);
            return res.status(500).send('Error en el servidor');
        }
        if(results.affectedRows === 0){
            return res.status(404).send('Producto no encontrado');;
        }
        res.status(200).send({ id, nombre, precio, cantidad });
    });
});

//Eliminar producto
app.delete('/api/products/:id', (req, res)=>{
    const {id} = req.params;
    const query = 'DELETE FROM producto Where idproducto = ?';

    connection.query(query, [id], (err, results) =>{
        if(err) {
            console.error('Error al eliminar el producto: ', err);
            return res.status(500).send('Error en el servidor');
        }
        if (results.affectedRows === 0){
            return res.status(404).send('Producto no encontrado');
        }
        res.status(200).send('producto eliminado');
    });
});

app.listen(port, ()=>{
    console.log(port);
});