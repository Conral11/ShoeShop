const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket } = require('../models/models')
const e = require('express')

const generateJWT = (id, telephone, role, email) => {
	return jwt.sign({ id, telephone, role, email }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	})
}

class UsersController {
	async registration(req, res, next) {
		const { name, telephone, password, roleId, email } = req.body

		if (!telephone || !password) {
			return next(ApiError.badRequest('Некорректный telephone или password'))
		}

		const candidate = await User.findOne({ where: { telephone } })

		if (candidate) {
			return next(
				ApiError.badRequest('Пользователь с таким telephone ужe существует !')
			)
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const users = await User.create({
			name,
			telephone,
			password: hashPassword,
			roleId,
			email,
		})
		const basket = await Basket.create({ userId: users.id })
		const token = generateJWT(
			users.id,
			users.telephone,
			users.roleId,
			users.email
		)
		return res.json({ token, basket })
	}
	async login(req, res, next) {
		const { telephone, password } = req.body

		const user = await User.findOne({ where: { telephone } })

		if (!user) {
			return next(ApiError.internal('Пользователь не найден'))
		}
		let comparePassword = bcrypt.compareSync(password, user.password)
		if (!comparePassword) {
			return next(ApiError.internal('Указан неверный пароль'))
		}
		const token = generateJWT(user.id, user.telephone, user.roleId, user.email)
		return res.json({ token })
	}
	async check(req, res, next) {
		const token = generateJWT(
			req.user.id,
			req.user.telephone,
			req.user.roleId,
			req.user.email
		)
		return res.json({ token })
	}
}

module.exports = new UsersController()
