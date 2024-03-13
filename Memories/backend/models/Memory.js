const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definição do esquema para os comentários
const commentSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    text :{
        type: String,
        required: true,
    },
});
// Esquema para os dados da memória
const MemorySchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    src :{
        type: String,
        required: true,
    },
    description :{
        type: String,
        required: true,
    },
    favorite :{
        type: Boolean,
        required: true,
    },
    comments : [commentSchema], // Referência ao esquema de comentário
}, {
    timestamps: true, // Opção para registrar a data de criação e de atualização
});

module.exports = mongoose.model("Memory", MemorySchema);