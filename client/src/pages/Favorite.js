import React, { useEffect, useState, useContext } from 'react'
import {
	fetchFavorites,
	fetchOneTovar,
	createFavorites,
	removeFavorites,
} from '../http/productAPI'
import FavoritesTovar from '../components/FavoritesTovar/FavoritesTovar'
import '../css/Main.css'
import { Context } from '../index'
import { jwtDecode } from 'jwt-decode'

const Favorite = () => {
	const { user } = useContext(Context)
	const [favorites, setFavorites] = useState([])
	const [tovarDetails, setTovarDetails] = useState({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadfavorites = async () => {
			try {
				const token = localStorage.getItem('token')
				if (!token) {
					throw new Error('Token not found')
				}

				const decodedToken = jwtDecode(token)
				const userId = decodedToken.id

				const favoritesTovars = await fetchFavorites(userId)
				setFavorites(favoritesTovars)

				const details = await Promise.all(
					favoritesTovars.map((tovar) => fetchOneTovar(tovar.tovarId))
				)

				const detailsMap = {}
				details.forEach((detail) => {
					detailsMap[detail.id] = detail
				})

				setTovarDetails(detailsMap)
				setIsLoading(false) // Установка isLoading в false после успешной загрузки данных
			} catch (error) {
				console.error('Ошибка при загрузке избранных продуктов:', error)
				setIsLoading(false) // Установка isLoading в false в случае ошибки
			}
		}

		if (user.users) {
			loadfavorites()
		}
	}, [user.users]) // Изменил зависимость на user.user

	const handleAddfavorites = async (tovarId) => {
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			const decodedToken = jwtDecode(token)
			const userId = decodedToken.id
			const newfavorites = await createFavorites(tovarId, userId)
			setFavorites((prevfavorites) => [...prevfavorites, newfavorites])

			const productDetail = await fetchOneTovar(tovarId)
			setTovarDetails((prevDetails) => ({
				...prevDetails,
				[tovarId]: productDetail,
			}))
		} catch (error) {
			console.error('Ошибка при добавлении в избранное:', error)
		}
	}

	const handleRemoveProduct = async (tovarIdToRemove) => {
		console.log('Product ID to remove:', tovarIdToRemove)
		try {
			const token = localStorage.getItem('token')
			if (!token) {
				throw new Error('Token not found')
			}

			const decodedToken = jwtDecode(token)
			const userId = decodedToken.id
			setFavorites((prevfavorites) =>
				prevfavorites.filter((product) => product.tovarId !== tovarIdToRemove)
			)
			await removeFavorites(tovarIdToRemove, userId)
		} catch (error) {
			console.error('Ошибка при удалении продукта из избранного:', error)
		}
	}

	if (isLoading) {
		return <div className='card container'>Загрузка...</div>
	}

	return (
		<main className='main container'>
			{user.isAuth ? (
				<div>
					{favorites.length === 0 ? (
						<div className='empty-favorites'>
							<h2
								className='medium-title'
								style={{ textAlign: 'center', width: '1198px' }}
							>
								Ваш список избранного пуст!
							</h2>
						</div>
					) : (
						<div className=''>
							<div className='favorites-product'>
								{favorites.map((product) => (
									<FavoritesTovar
										key={product.tovarId}
										product={product}
										tovarDetails={tovarDetails[product.tovarId]}
										onRemove={handleRemoveProduct}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			) : (
				<div>Авторизуйтесь...</div>
			)}
		</main>
	)
}

export default Favorite
