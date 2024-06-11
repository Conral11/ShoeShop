const Router = require('express')
const router = new Router()
const basketTovarsController = require('../controllers/basketTovarsController')

router.post('/', basketTovarsController.create)
router.get('/', basketTovarsController.get)
router.delete('/:basketId/:tovarId', basketTovarsController.destroy)

module.exports = router
