const { Size } = require('../models/models')

class sizesController {
	async create(req, res) {
		const { name } = req.body
		const sizes = await Size.create({ name })
		return res.json(sizes)
	}
	async get(req, res) {
		const sizes = await Size.findAll()
		return res.json(sizes)
	}
}

module.exports = new sizesController()
