const { Pol } = require('../models/models')

class polsController {
	async create(req, res) {
		const { name } = req.body
		const pols = await Pol.create({ name })
		return res.json(pols)
	}
	async get(req, res) {
		const pols = await Pol.findAll()
		return res.json(pols)
	}
}

module.exports = new polsController()
