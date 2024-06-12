const { BasketTovar } = require('../models/models')

class BasketProductController {
	async create(req, res) {
		const { basketId, tovarId } = req.body
		if (!basketId || !tovarId) {
			return res
				.status(400)
				.json({ error: 'basketId and tovarId are required' })
		}
		try {
			const basketTovar = await BasketTovar.create({ basketId, tovarId })
			return res.json(basketTovar)
		} catch (error) {
			console.error('Ошибка при создании товара в корзине', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async destroy(req, res) {
		const { basketId, tovarId } = req.params
		if (!basketId || !tovarId) {
			return res
				.status(400)
				.json({ error: 'basketId and tovarId are required' })
		}
		try {
			await BasketTovar.destroy({ where: { basketId, tovarId } })
			return res.json({ message: 'Товар успешно удален из корзины' })
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async get(req, res) {
		const { basketId } = req.params
		if (!basketId || isNaN(basketId)) {
			return res.status(400).json({ error: 'Invalid basketId' })
		}
		try {
			const basketTovar = await BasketTovar.findAll({ where: { basketId } })
			return res.json(basketTovar)
		} catch (error) {
			console.error('Ошибка при получении товаров из корзины', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}
}

module.exports = new BasketProductController()
