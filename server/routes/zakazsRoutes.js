const Router = require('express')
const router = new Router()
const zakazsController = require('../controllers/zakazsController')

router.post('/', zakazsController.create)
router.get('/', zakazsController.getAll)

module.exports = router
