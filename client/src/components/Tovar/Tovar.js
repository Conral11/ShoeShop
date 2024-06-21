import React, { useState, useContext } from 'react'
import { Context } from '../../index'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { jwtDecode } from 'jwt-decode'
import { createFavorites, removeFavorites } from '../../http/productAPI'
import '../../css/Main.css'
import like from '../../img/header/header-button-image2.jpg'
import like_red from '../../img/header/like_red.jpg'
//import Comparison from '../../img/header/Comparison.jpg'

const Tovar = ({ id, image, name, price, brend, material, color, season }) => {
	const [isAddingToFavorite, setIsAddingToFavorite] = useState(false)
	const { user, tovar } = useContext(Context)
	const [isInFavorites, setIsInFavorites] = useState(false)

	const handleAddToFavorite = async () => {
		if (!isAddingToFavorite) {
			setIsAddingToFavorite(true)

			if (user.isAuth) {
				try {
					const token = localStorage.getItem('token')
					if (!token) {
						toast.error('Пользователь не авторизован')
						return
					}
					const decodedToken = jwtDecode(token)
					const userId = decodedToken.id

					if (isInFavorites) {
						await removeFavorites(id, userId)
						setIsInFavorites(false)
						toast.info('Товар удален из избранного')
					} else {
						await createFavorites(id, userId)
						setIsInFavorites(true)
						toast.info('Товар добавлен в избранное')
					}

					setIsAddingToFavorite(false)
				} catch (error) {
					setIsAddingToFavorite(false)
					toast.error('Ошибка при обновлении избранного.')
				}
			} else {
				setIsAddingToFavorite(false)
				toast.error('Авторизуйтесь!')
			}
		}
	}

	const handleLikeClick = () => {
		handleAddToFavorite()
	}

	const handleAddToComparison = () => {
		tovar.addToComparison({
			id,
			image,
			name,
			price,
			brend,
			material,
			color,
			season,
		})
		toast.info('Товар добавлен к сравнению')
	}

	const likeImage = isInFavorites ? like_red : like

	return (
		<NavLink className='card'>
			<div style={{ position: 'relative' }}>
				<div
					className='like-icon'
					onClick={handleLikeClick}
					style={{ position: 'absolute', top: 0, right: 0 }}
				>
					<img src={likeImage} alt='like' />
				</div>
				{/*<div
					className='compare-icon'
					onClick={handleAddToComparison}
					style={{ position: 'absolute', top: 40, right: 0 }}
				>
					<img src={Comparison} alt='compare' />
	</div>*/}
			</div>
			<NavLink to={`/product/${id}`}>
				<img className='card-img' src={image} alt={name} />
				<div className='card-text'>
					<div className='card-info'>
						<p className='card-name'>{name}</p>
						<p className='card-name'>{brend}</p>
					</div>
					<p className='card-price'>{price}</p>
				</div>
			</NavLink>
		</NavLink>
	)
}

export default Tovar
