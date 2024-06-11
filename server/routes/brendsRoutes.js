const Router = require('express')
const router = new Router()
const brendsController = require('../controllers/brendsController')
const checkRole = require('../middleware/checkRoleMiddleware')
router.get('/:id', brendsController.getOne)
router.post('/', checkRole(1), brendsController.create)
router.get('/', brendsController.get)

module.exports = router
