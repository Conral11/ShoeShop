import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../css/Main.css'

const Zacaz = ({ id, image, name, price, brendName }) => {
	return (
		<NavLink to={`/product/${id}`} className='card'>
			<img className='card-img' src={image} alt={name} />
			<div className='card-text'>
				<div className='card-info'>
					<p className='card-name'>{name}</p>
				</div>
				<p className='card-price'>{price}</p>
			</div>
		</NavLink>
	)
}

export default Zacaz
