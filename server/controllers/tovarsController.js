const {
	Tovar,
	Brend,
	Color,
	Size,
	Material,
	Pol,
	Season,
} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Op } = require('sequelize')

class tovarsController {
	async create(req, res, next) {
		try {
			const {
				name,
				brendId,
				colorId,
				seasonId,
				sizeId,
				materialId,
				polId,
				image,
				price,
			} = req.body

			const tovars = await Tovar.create({
				name,
				seasonId,
				brendId,
				colorId,
				sizeId,
				polId,
				materialId,
				image,
				price,
			})

			return res.json(tovars)
		} catch (e) {
			next(ApiError.badRequest(e.message))
		}
	}
	async getAll(req, res) {
		let {
			brendId,
			colorId,
			polId,
			sizeId,
			materialId,
			seasonId,
			limit,
			page,
			name,
			price,
		} = req.query

		page = page || 1

		limit = limit || 9
		let offset = page * limit - limit
		const whereClause = {
			...(materialId && { materialId }),
			...(seasonId && { seasonId }),
			...(brendId && { brendId }),
			...(colorId && { colorId }),
			...(sizeId && { sizeId }),
			...(polId && { polId }),
			...(price && { price }),
			...(name && { name: { [Op.iLike]: `%${name}%` } }),
		}

		const tovar = await Tovar.findAndCountAll({
			where: whereClause,
			limit,
			offset,
		})
		return res.json(tovar)
	}
	async getOne(req, res, next) {
		try {
			const { id } = req.params
			const tovar = await Tovar.findOne({
				where: { id },
				include: [
					{ model: Brend, as: 'brend' },
					{ model: Color, as: 'color' },
					{ model: Size, as: 'size' },
					{ model: Material, as: 'material' },
					{ model: Season, as: 'season' },
					{ model: Pol, as: 'pol' },
				],
			})
			console.log(tovar) // Выводим данные товара в консоль для проверки
			if (!tovar) {
				return res.status(404).json({ message: 'Товар не найден' })
			}
			return res.json(tovar)
		} catch (error) {
			console.error('Ошибка при получении товара:', error)
			return res.status(500).json({ message: 'Ошибка при получении товара' })
		}
	}
}

module.exports = new tovarsController()
