const Router = require('express')
const router = new Router()
const seasonController = require('../controllers/seasonController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole(1), seasonController.create)
router.get('/', seasonController.get)

module.exports = router
