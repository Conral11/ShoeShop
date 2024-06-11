const { Material } = require('../models/models')

class MaterialsController {
	async create(req, res) {
		const { name } = req.body
		const material = await Material.create({ name })
		return res.json(material)
	}
	async get(req, res) {
		const material = await Material.findAll()
		return res.json(material)
	}
}

module.exports = new MaterialsController()
