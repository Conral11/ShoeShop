import Shop from './Shop'
import Auth from './Auth'
import Catalog from './Catalog'
import Basket from './Basket'
import AdminPanel from './AdminPanel'
import TovarPage from './TovarPage'
import Favorite from './Favorite'

export const authRoutes = [
	// {
	// 	path: '/cart',
	// 	Component: Cart,
	// },
]

export const publicRoutes = [
	{
		path: '/',
		Component: Shop,
	},
	{
		path: '/login',
		Component: Auth,
	},
	{
		path: '/registration',
		Component: Auth,
	},
	{
		path: '/basket',
		Component: Basket,
	},
	{
		path: '/favorites',
		Component: Favorite,
	},
	{
		path: '/admin',
		Component: AdminPanel,
	},
	{
		path: '/product/:id',
		Component: TovarPage,
	},
	{
		path: '/catalog',
		Component: Catalog,
	},
]
