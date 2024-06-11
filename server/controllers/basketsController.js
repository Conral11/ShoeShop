const { Basket } = require('../models/models')

class basketsController {
	async create(req, res) {
		const { name } = req.body
		const baskets = await Basket.create({ name })
		return res.json(baskets)
	}
	async get(req, res) {
		const baskets = await Basket.findAll()
		return res.json(baskets)
	}
}

module.exports = new basketsController()
