import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

export const registration = async ({ name, telephone, email, password }) => {
	const { data } = await $host.post('api/users/registration', {
		name,
		telephone,
		email,
		password,
		role_id: 1,
	})
	return data
}

export const login = async (telephone, password) => {
	const { data } = await $host.post('api/users/login', { telephone, password })
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}
export const check = async () => {
	const { data } = await $authHost.get('/api/users/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}
