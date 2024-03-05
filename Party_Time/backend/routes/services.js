//Roteador de serviços
const router = require('express') . Router()

//para atrelara cada rota a um método do controller
const serviceController = require('../controllers/serviceController')

//Funções

// criar um endpoit para criar um serviço para conversar com o serviceController que fizemos no banco de dados
router.route('/services')
.post((req,res)=>serviceController.create(req,res))

//pegar os dados de todos os serviços
router.route('/services')
.get((req,res)=>serviceController.getAll(req,res))

//pegar os dados de um serviço
router.route('/services/:id')
.get((req,res)=>serviceController.get(req,res));

//Deletar um serviço
router
.route('/services/:id')
.delete((req,res)=>serviceController.delete(req,res));

//Atualizar um serviço
router.route('/services/:id')
.put((req,res)=>serviceController.update(req,res));

//por fim, exportamos o router pora usar na aplicação
module.exports = router