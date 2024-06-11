const Router = require('express')
const router = new Router()
const sizesController = require('../controllers/sizesController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(1), sizesController.create)
router.get('/', sizesController.get)

module.exports = router
