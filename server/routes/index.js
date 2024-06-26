const Router = require('express')
const router = new Router()
const rolesRoutes = require('./rolesRoutes')
const usersRouters = require('./usersRouters')
const tovarsRoutes = require('./tovarsRoutes')
const sizesRoutes = require('./sizesRoutes')
const brendsRoutes = require('./brendsRoutes')
const colorsRoutes = require('./colorsRoutes')
const materialsRoutes = require('./materialsRoutes')
const polsRoutes = require('./polsRoutes')
const basketTovarsRoutes = require('./basketTovarsRoutes')
const zakazsRoutes = require('./zakazsRoutes')
const favoritesRoutes = require('./favoritesRoutes')
const seasonRoutes = require('./seasonRoutes')

router.use('/roles', rolesRoutes)
router.use('/users', usersRouters)
router.use('/tovars', tovarsRoutes)
router.use('/sizes', sizesRoutes)
router.use('/brends', brendsRoutes)
router.use('/colors', colorsRoutes)
router.use('/materials', materialsRoutes)
router.use('/pols', polsRoutes)
router.use('/basketTovars', basketTovarsRoutes)
router.use('/zakazs', zakazsRoutes)
router.use('/favorites', favoritesRoutes)
router.use('/seasons', seasonRoutes)

module.exports = router
