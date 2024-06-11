const Router = require('express')
const router = new Router()
const rolesController = require('../controllers/rolesController')
const checkRole = require('../middleware/checkRoleMiddleware')

// router.post('/', checkRole(1), roleController.create)
router.post('/', checkRole(1), rolesController.create)
router.get('/', rolesController.get)
module.exports = router
