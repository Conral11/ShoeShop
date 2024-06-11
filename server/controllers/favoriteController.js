const { Favorites } = require('../models/models')

class favoritesController {
	async create(req, res) {
		const { tovarId, userId } = req.body
		if (!tovarId) {
			return res.status(400).json({ error: 'Missing required tovarId' })
		}
		if (!userId) {
			return res.status(400).json({ error: 'Missing required userId' })
		}
		try {
			const favorites = await Favorites.create({ tovarId, userId })
			return res.json(favorites)
		} catch (error) {
			console.error('Ошибка при добавлении в избранное', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async destroy(req, res) {
		const { tovarId, userId } = req.body
		if (!tovarId || !userId) {
			return res.status(400).json({ error: 'Missing required fields' })
		}
		try {
			await Favorites.destroy({ where: { tovarId, userId } })
			return res.json({ message: 'Элемент успешно удален из избранного' })
		} catch (error) {
			console.error('Ошибка при удалении из избранного', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}

	async get(req, res) {
		const { userId } = req.params
		if (!userId) {
			return res.status(400).json({ error: 'Missing required fields' })
		}
		try {
			const favoritess = await Favorites.findAll({ where: { userId } })
			return res.json(favoritess)
		} catch (error) {
			console.error('Ошибка при получении списка избранного', error)
			return res.status(500).json({ error: 'Внутренняя ошибка сервера' })
		}
	}
}

module.exports = new favoritesController()
