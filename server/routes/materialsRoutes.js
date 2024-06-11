const Router = require('express')
const router = new Router()
const materialsController = require('../controllers/materialsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(1), materialsController.create)
router.get('/', materialsController.get)

module.exports = router
