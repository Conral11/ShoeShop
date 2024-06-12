const { Brend } = require('../models/models')

class brendsController {
	async create(req, res) {
		const { name, img_url } = req.body
		const brends = await Brend.create({ name, img_url })
		return res.json(brends)
	}
	async get(req, res) {
		const brends = await Brend.findAll()
		return res.json(brends)
	}
	async getOne(req, res) {
		const { id } = req.params
		const tovar = await Brend.findOne({
			where: { id },
		})
		return res.json(tovar)
	}
}

module.exports = new brendsController()