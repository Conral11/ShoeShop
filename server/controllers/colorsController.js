const { Color } = require('../models/models')

class ColorsController {
	async create(req, res) {
		const { name } = req.body
		const colors = await Color.create({ name })
		return res.json(colors)
	}
	async get(req, res) {
		const colors = await Color.findAll()
		return res.json(colors)
	}
}

module.exports = new ColorsController()
