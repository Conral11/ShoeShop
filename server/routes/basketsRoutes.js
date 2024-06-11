const Router = require('express')
const router = new Router()
const basketsController = require('../controllers/basketsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', basketsController.create)
router.get('/', basketsController.get)

module.exports = router


