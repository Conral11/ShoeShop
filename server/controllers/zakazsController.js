const { Zakaz } = require('../models/models')

class ZakazsController {
	async create(req, res) {
		try {
			const { userId, products, address, status, telephone, name } = req.body

			if (!address || Object.keys(address).length === 0) {
				return res.status(400).json({ message: 'Адрес не указан' })
			}

			if (!Array.isArray(products) || products.length === 0) {
				return res.status(400).json({ message: 'Продуктов нет' })
			}

			const zakazs = await Promise.all(
				products.map((product) => {
					const { basketTovarId, price } = product
					if (!price) {
						throw new Error('Цена отсутствует')
					}
					return Zakaz.create({
						userId,
						basketTovarId,
						price,
						address,
						status,
						telephone,
						name,
					})
				})
			)

			res.status(201).json(zakazs)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}

	async getAll(req, res) {
		try {
			const zakazs = await Zakaz.findAll()
			return res.json(zakazs)
		} catch (error) {
			res.status(500).json({ error: error.message })
		}
	}
}

module.exports = new ZakazsController()
