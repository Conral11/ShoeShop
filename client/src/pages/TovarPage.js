import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
	fetchOneTovar,
	createBasketProduct,
	createFavorites,
	/*fetchFavorites,*/
} from '../http/productAPI'
import { observer } from 'mobx-react-lite'
import '../css/Main.css'
import { jwtDecode } from 'jwt-decode' // Import correctly
import { Context } from '../index'
const TovarPage = observer(() => {
	const { user } = useContext(Context)

	const { id } = useParams()
	const [tovar, setTovar] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [isAddingTofavorites, setIsAddingTofavorites] = useState(false) // Состояние для блокировки кнопки избранного

	useEffect(() => {
		fetchOneTovar(id)
			.then((data) => {
				console.log('Данные товара:', data) // For debugging
				setTovar(data)
				setLoading(false)
			})
			.catch((error) => {
				console.error('Ошибка при загрузке продукта:', error)
				setError('Ошибка при загрузке продукта')
				setLoading(false)
			})
	}, [id])

	const handleAddToCart = () => {
		const token = localStorage.getItem('token')
		if (!token) {
			console.error('Пользователь не авторизован')
			return
		}
		const decodedToken = jwtDecode(token)
		const userId = decodedToken.id
		console.log(userId)
		createBasketProduct({ basketId: userId, tovarId: id })
			.then(() => {
				console.log('Товар добавлен в корзину')
			})
			.catch((error) => {
				console.error('Ошибка при добавлении товара в корзину:', error)
			})
	}
	const handleAddTofavorites = async () => {
		if (!isAddingTofavorites) {
			setIsAddingTofavorites(true)

			if (user.isAuth) {
				try {
					const token = localStorage.getItem('token')
					if (!token) {
						console.error('Пользователь не авторизован')
						return
					}
					const decodedToken = jwtDecode(token)
					const userId = decodedToken.id
					console.log(userId)

					await createFavorites(id, userId)
					console.log('Товар добавлен в избранное.')
				} catch (error) {
					console.log('Ошибка при добавлении в избранное.')
				}
			} else {
				console.log('Авторизуйтесь!')
			}

			setIsAddingTofavorites(false)
		}
	}

	if (loading) {
		return <div>Загрузка. Подождите пожалуйста...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!tovar) {
		return <div>Продукт не найден</div>
	}

	const {
		name = 'Название не указано',
		brend = { name: 'Бренд не указан' },
		price = 'Цена не указана',
		material = { name: 'Материал не указан' },
		color = { name: 'Цвет не указан' },
		pol = { name: 'Цвет не указан' },
		size = '',
	} = tovar

	return (
		<main className='main'>
			<section className='shoes-info container'>
				<img className='shoes-img' src={tovar.image || ''} alt={name} />
				<div className='shoes'>
					<div className='shoes-header'>
						<p className='shoes-model big-title'>{name}</p>
					</div>

					<table className='table'>
						<tr className='tableLine'>
							<th>БРЕНД</th>
							<td>{brend.name}</td>
						</tr>
						<tr className='tableLine'>
							<th>ЦВЕТ</th>
							<td>{color.name}</td>
						</tr>
						<tr className='tableLine'>
							<th>МАТЕРИАЛ</th>
							<td>{material.name}</td>
						</tr>
						<tr className='tableLine'>
							<th>ПОЛ</th>
							<td>{pol.name}</td>
						</tr>
						<tr className='tableLine'>
							<th>Размерный ряд</th>
							<td>{size.name}</td>
						</tr>
					</table>
					<p className='shoes-price'>{price} руб.</p>
					<button className='button-custom' onClick={handleAddToCart}>
						Добавить в корзину
					</button>
					<button
						onClick={handleAddTofavorites}
						className='button-custom'
						disabled={isAddingTofavorites}
					>
						{isAddingTofavorites ? 'Добавляется...' : 'В избранное'}
					</button>
				</div>
			</section>
		</main>
	)
})

export default TovarPage
