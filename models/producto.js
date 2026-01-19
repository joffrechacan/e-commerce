const mongoose = requiere ('mongoose');

//Definir el esquema
const productoSchema = new mongoose.Schema({
    nombre: {type: String, requiere: true},
    precio: {type: Number, requiere: true},
    categoria: {type: String, requiere: true},
    imagen: {type: String, default: "https://dummyimage.com/200x200/000/fff"},
});

//Exportar el modelo para usar
module.exports = mongoose.model('Producto', productoSchema);