import React from 'react'
import '../../css/Main.css'
import trash from '../../img/basket/trash.svg'
import fuv from '../../img/header/header-button-image2.jpg'
import { removeBasketTovar } from '../../http/productAPI'

const BasketTovar = ({ tovar, tovarDetails, onRemove }) => {
	const handleDecreaseQuantity = async () => {
		console.log()
		try {
			await removeBasketTovar(tovar.basketId, tovar.tovarId)
			onRemove(tovar.tovarId)
		} catch (error) {
			console.error('Ошибка при удалении товара из корзины', error)
		}
	}
	return (
		<section class='basket_tovar_card_mini'>
			<div class='card_mini-info'>
				<div class='basket_img_card'>
					<img
						class='basket_tovar_img'
						src={tovarDetails.image}
						alt='Фотография товара'
					/>
				</div>
				<div class='basket_text_card'>
					<p>{tovarDetails.name}</p>
					<p>{tovar.size}</p>
				</div>
			</div>
			<div class='basket_price_img'>
				<p class='basket_price_card'>{tovarDetails.price}</p>
				<img
					class='basket_img_k_l'
					onClick={handleDecreaseQuantity}
					src={trash}
					alt='Мусорка'
				/>
				<img class='basket_img_k_l' src={fuv} alt='Лайк' />
			</div>
		</section>
	)
}

export default BasketTovar
