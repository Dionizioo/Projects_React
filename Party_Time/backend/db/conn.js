const mongoose = require('mongoose');

async function main( ){

    try {

        mongoose.set("strictQuery", true)

        await mongoose.connect('mongodb+srv://xxxx:xxxxx@cluster0.89bodxg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        

        console.log('Conectado ao banco de dados');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dadds: ', error);
        
    }
}

module.exports = main;