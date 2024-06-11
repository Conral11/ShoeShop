const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const Zakaz = sequelize.define('zakaz', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	userId: { type: DataTypes.INTEGER, allowNull: false },
	name: { type: DataTypes.STRING, allowNull: false },
	address: { type: DataTypes.STRING, allowNull: false },
	telephone: { type: DataTypes.STRING, allowNull: false },
	status: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
})

const Role = sequelize.define('role', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	telephone: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false },
	password: { type: DataTypes.STRING, allowNull: false },
})
const Favorites = sequelize.define('favorites', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	tovarId: { type: DataTypes.INTEGER, allowNull: false },
	userId: { type: DataTypes.INTEGER, allowNull: false },
})

const Basket = sequelize.define('basket', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const BasketTovar = sequelize.define('basket_tovar', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Brend = sequelize.define('brend', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	img_url: { type: DataTypes.STRING, allowNull: false },
})

const Season = sequelize.define('season', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})
const Size = sequelize.define('size', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Color = sequelize.define('color', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Material = sequelize.define('material', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Pol = sequelize.define('pol', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
})

const Tovar = sequelize.define('tovar', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, allowNull: false },
	price: { type: DataTypes.INTEGER, allowNull: false },
	image: { type: DataTypes.STRING, allowNull: false },
})

// Определение отношений
Role.hasMany(User)
User.belongsTo(Role)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketTovar)
BasketTovar.belongsTo(Basket)

BasketTovar.hasMany(Zakaz)
Zakaz.belongsTo(BasketTovar)

Tovar.hasOne(BasketTovar)
BasketTovar.belongsTo(Tovar)

Brend.hasMany(Tovar)
Tovar.belongsTo(Brend)

Size.hasMany(Tovar)
Tovar.belongsTo(Size)

Color.hasMany(Tovar)
Tovar.belongsTo(Color)

Material.hasMany(Tovar)
Tovar.belongsTo(Material)

Pol.hasMany(Tovar)
Tovar.belongsTo(Pol)
Season.hasMany(Tovar)
Tovar.belongsTo(Season)
module.exports = {
	Favorites,
	Season,
	Material,
	Role,
	User,
	Basket,
	BasketTovar,
	Zakaz,
	Tovar,
	Pol,
	Color,
	Brend,
	Size,
}
