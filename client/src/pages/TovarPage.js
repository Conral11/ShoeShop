import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import {
	fetchOneTovar,
	fetchBasket,
	createBasketProduct,
	createFavorites,
} from '../http/productAPI'
import { observer } from 'mobx-react-lite'
import '../css/Main.css'
import { jwtDecode } from 'jwt-decode'
import { Context } from '../index'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

	const handleAddToCart = async () => {
		if (user.isAuth) {
			const token = localStorage.getItem('token')
			if (!token) {
				toast.error('Пользователь не авторизован')
				return
			}
			const decodedToken = jwtDecode(token)
			const userId = decodedToken.id
			// Поиск товара в корзине
			const basket = await fetchBasket(userId)
			const basketTovar = basket.find((p) => p.tovarId === parseInt(id))
			if (basketTovar) {
				toast.info('Товар уже в корзине.')
			} else {
				toast.info('Товар добавлен в корзину')
				createBasketProduct({ basketId: userId, tovarId: id })
			}
		} else {
			toast.error('Авторизуйтесь!')
		}
	}
	const handleAddTofavorites = async () => {
		if (!isAddingTofavorites) {
			setIsAddingTofavorites(true)

			if (user.isAuth) {
				try {
					const token = localStorage.getItem('token')
					if (!token) {
						toast.error('Пользователь не авторизован')
						return
					}
					const decodedToken = jwtDecode(token)
					const userId = decodedToken.id
					// Поиск товара в корзине
					const basket = await fetchBasket(userId)
					const favoriteTovar = basket.find((p) => p.tovarId === parseInt(id))
					if (favoriteTovar) {
						toast.error('Товар уже в избранном.')
						setIsAddingTofavorites(false)
						return
					}
					await createFavorites(id, userId)
					toast.info('Товар добавлен в избранное')
				} catch (error) {
					toast.error('Ошибка при добавлении в избранное.')
				}
			} else {
				toast.error('Авторизуйтесь!')
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
			<ToastContainer />
		</main>
	)
})

export default TovarPage
