const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.use(express.json());
app.use(express.static('public'));

require("./db/conn")

const port = 3000

//chamando as rotas
const memoryRouter = require("./routes")

app.use("/memories", memoryRouter)


app.listen(port, async () => {
    console.log(`O servidor iniciou com sucesso! na porta ${port}`)
})