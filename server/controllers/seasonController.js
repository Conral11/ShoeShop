const { Season } = require('../models/models')

class seasonsController {
	async create(req, res) {
		const { name } = req.body
		const seasons = await Season.create({ name })
		return res.json(seasons)
	}
	async get(req, res) {
		const seasons = await Season.findAll()
		return res.json(seasons)
	}
}

module.exports = new seasonsController()
