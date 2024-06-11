const Router = require('express')
const router = new Router()
const polsController = require('../controllers/polsController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', polsController.create)
router.get('/', polsController.get)

module.exports = router
