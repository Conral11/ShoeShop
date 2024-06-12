import { $authHost, $host } from './index'

export const createMaterial = async (material) => {
	const { data } = await $authHost.post('api/materials', material)
	return data
}
export const createSize = async (size) => {
	const { data } = await $authHost.post('api/sizes', size)
	return data
}
export const createBrend = async (brend) => {
	const { data } = await $authHost.post('api/brends', brend)
	return data
}
export const createColor = async (color) => {
	const { data } = await $authHost.post('api/colors', color)
	return data
}
export const createSeason = async (season) => {
	const { data } = await $authHost.post('api/seasons', season)
	return data
}
export const createPol = async (pol) => {
	const { data } = await $authHost.post('api/pols', pol)
	return data
}
export const createTovars = async (tovat) => {
	const { data } = await $authHost.post('/api/tovars', tovat)
	return data
}

export const createBasketProduct = async (basketTovars) => {
	const response = await $host.post('/api/basketTovars', basketTovars)
	return response
}
export const removeBasketTovar = async (userId, tovarId) => {
	try {
		const response = await $host.delete(
			`/api/basketTovars/${userId}/${tovarId}`
		)
		return response.data
	} catch (error) {
		console.error('Ошибка при удалении товара из корзины', error)
		throw error
	}
}
export const fetchSeason = async () => {
	const { data } = await $host.get('/api/seasons')
	return data
}
export const fetchBrend = async () => {
	const { data } = await $host.get('/api/brends')
	return data
}
export const fetchColor = async () => {
	const { data } = await $host.get('/api/colors')
	return data
}
export const fetchMaterial = async () => {
	const { data } = await $host.get('/api/materials')
	return data
}
export const fetchPol = async () => {
	const { data } = await $host.get('/api/pols')
	return data
}
export const fetchSize = async () => {
	const { data } = await $host.get('/api/sizes')
	return data
}

export const fetchTovars = async (
	brendId,
	colorId,
	polId,
	sizeId,
	materialId,
	seasonId,
	name,
	page,
	limit
) => {
	const { data } = await $host.get('/api/tovars', {
		params: {
			brendId,
			colorId,
			polId,
			sizeId,
			materialId,
			seasonId,
			name,
			page,
			limit,
		},
	})
	return data
}

export const fetchOneTovar = async (id) => {
	const { data } = await $host.get(`/api/tovars/${id}`)
	return data
}

export const fetchBasket = async (basketId) => {
	const { data } = await $authHost.get(`/api/basketTovars/${basketId}`)
	return data
}

export const createFavorites = async (tovarId, userId) => {
	const { data } = await $authHost.post(`/api/favorites`, {
		tovarId,
		userId,
	})
	return data
}
export const removeFavorites = async (tovarId, userId) => {
	await $authHost.delete(`/api/favorites`, {
		data: { tovarId, userId },
	})
}
export const fetchFavorites = async (userId) => {
	const { data } = await $authHost.get(`/api/favorites/${userId}`)
	return data
}

export const createZakaz = async (zakaz) => {
	const { data } = await $authHost.post('api/zakazs', zakaz)
	return data
}

export const fetchZakazs = async () => {
	const { data } = await $host.get('api/zakazs')
	return data
}
