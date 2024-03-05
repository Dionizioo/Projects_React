const router = require('express').Router()

//Service Router
const serviceRouter = require('./services');

//centralizar as rotas
router.use('/', serviceRouter);

//parties routes
const partyRouter = require('./parties');
router.use('/', partyRouter);

module.exports = router;