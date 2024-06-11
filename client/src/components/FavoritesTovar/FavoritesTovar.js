import React from 'react'
import { NavLink } from 'react-router-dom'

const FavoritesTovar = ({ product, tovarDetails, onRemove }) => {
	return (
		<NavLink to={`/product/${tovarDetails.id}`} className='card'>
			<img
				className='card-img'
				src={tovarDetails.image}
				alt={tovarDetails.name}
			/>
			<div className='card-text'>
				<div className='card-info'>
					<p className='card-name'>{tovarDetails.name}</p>
				</div>
				<p className='card-price'>{tovarDetails.price}</p>
			</div>
			<button
				className='button-custom'
				onClick={(e) => {
					e.preventDefault() // Предотвращение перехода при клике на кнопку
					onRemove(product.tovarId)
				}}
			>
				Удалить
			</button>
		</NavLink>
	)
}

export default FavoritesTovar
