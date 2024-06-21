import Shop from './Shop'
import Auth from './Auth'
import Catalog from './Catalog'
import Basket from './Basket'
import AdminPanel from './AdminPanel'
import TovarPage from './TovarPage'
import Favorite from './Favorite'
import ONas from './FooterText/ONas'
import YxodZaOb from './FooterText/YxodZaOb'
import Oplata from './FooterText/Oplata'
import Sertif from './FooterText/Sertif'
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
	{
		path: '/ONas',
		Component: ONas,
	},
	{
		path: '/YxodZaOb',
		Component: YxodZaOb,
	},
	{
		path: '/Oplata',
		Component: Oplata,
	},
	{
		path: '/Sertif',
		Component: Sertif,
	},
]
