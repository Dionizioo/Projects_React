//Roteador de serviços
const router = require('express') . Router()

//para atrelara cada rota a um método do controller
const partyController = require('../controllers/partyController')

//Funções

router.route("/parties")
.post((req,res)=>partyController.create(req,res))

router.route("/parties")
.get((req,res)=>partyController.getAll(req,res))

router.route("/parties/:id")
.get((req,res)=>partyController.get(req,res))

router.route("/parties/:id")
.delete((req,res)=>partyController.delete(req,res))

router.route("/parties/:id")
.put((req,res)=>partyController.update(req,res))

module.exports = router