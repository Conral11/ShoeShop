const Router = require('express')
const router = new Router()
const colorsController = require('../controllers/colorsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(1), colorsController.create)
router.get('/', colorsController.get)

module.exports = router
