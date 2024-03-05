const express = require('express');
const cors = require('cors');
// O App é qual vai centralizar todas as configurações da aplicação
const app = express();

// O app vai usar o cors para permitir que a API seja acessada por qualquer origem
app.use(cors());

// O app vai usar o express.json() para que ele entenda requisições com o corpo em JSON
app.use(express.json());

//DB Connection
const conn = require('./db/conn');

conn();

//Rotas
const routers = require('./routes/router');

app.use('/api', routers);

app.listen(3000,function(){
    console.log('Servidor rodando na porta 3000!!')
});
