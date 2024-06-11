const Router = require('express')
const router = new Router()
const tovarsController = require('../controllers/tovarsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(1), tovarsController.create)
router.get('/', tovarsController.getAll)
router.get('/:id', tovarsController.getOne)

module.exports = router
