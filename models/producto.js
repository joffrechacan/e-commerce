const mongoose = require('mongoose');

// Definir el esquema
const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: String, required: true },
    imagen: { 
        type: String, 
        default: 'https://dummyimage.com/200x200/000/fff' 
    }
});

// Exportar el modelo
module.exports = mongoose.model('Producto', productoSchema);