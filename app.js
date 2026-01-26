// 1. Importar librerías
const express = require('express');
const mongoose = require('mongoose');

// Importar modelo Producto
const Producto = require('./models/producto');

// 2. Crear instancia de Express
const app = express();

// 3. Puerto
const PORT = 3000;

// --- CONFIGURACIÓN ---
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Middleware para manejar JSON (opcional pero recomendado)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- CONEXIÓN A MONGODB ---
mongoose.connect('mongodb://127.0.0.1:27017/tienda')
    .then(() => console.log('[OK] Conectado a MongoDB local'))
    .catch(err => console.log('[FAIL] Error de conexión', err));

// --- RUTAS ---

// Ruta principal
app.get('/', async (req, res) => {
    try {
        const listaProductos = await Producto.find();

        res.render('index', {
            productos: listaProductos,
            titulo: 'Todos los Productos'
        });
    } catch (error) {
        res.status(500).send('Error al obtener productos');
    }
});

// Ruta dinámica por categoría
app.get('/categoria/:nombreCategoria', async (req, res) => {
    try {
        const cat = req.params.nombreCategoria;

        const productosFiltrados = await Producto.find({ categoria: cat });

        res.render('index', {
            productos: productosFiltrados,
            titulo: cat.charAt(0).toUpperCase() + cat.slice(1)
        });
    } catch (error) {
        res.status(500).send('Error al obtener productos por categoría');
    }
});

// 5. Encender servidor
app.listen(PORT, () => {
    console.log(`>>> Servidor corriendo en http://localhost:${PORT}`);
    console.log('>>> Presione Ctrl + C para detener');
});
//6. Detalle del producto
app.get('/producto/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        res.render('detalle', {
            producto
        });
    } catch (error) {
        res.status(404).send('Producto no encontrado');
    }
});

//7. Formulario nuevo producto 
app.get('/admin/productos/nuevo', (req, res) => {
    res.render('form-producto', { producto: {} });
});

//8. Guardar producto
app.post('/admin/productos', async (req, res) => {
    await Producto.create(req.body);
    res.redirect('/');
});

//9. Editar producto
app.get('/admin/productos/editar/:id', async (req, res) => {
    const producto = await Producto.findById(req.params.id);
    res.render('form-producto', { producto });
});

//10.- Actualizar producto
app.post('/admin/productos/editar/:id', async (req, res) => {
    await Producto.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

//11. Eliminar producto
app.post('/admin/productos/eliminar/:id', async (req, res) => {
    await Producto.findByIdAndDelete(req.params.id);
    res.redirect('/');
});