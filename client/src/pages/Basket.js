import React, { useEffect, useState, useContext } from 'react'
import BasketTovar from '../components/BasketTovar/BasketTovar'
import '../css/Main.css'
import { fetchBasket, fetchOneTovar, createZakaz } from '../http/productAPI'
import { Context } from '../index'
import inf from '../img/basket/значок_важно.jpg'
import { NavLink } from 'react-router-dom'
import Basket_img from '../img/basket/корзина.jpg'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'
import { jwtDecode } from 'jwt-decode'

const Basket = () => {
	const { user } = useContext(Context)
	const [address, setAddress] = useState('')
	const token = '7be78ce7494c045bea440f9b2cd026102530ce3c'
	const [tovars, setTovar] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [tovarDetails, setTovarDetails] = useState({})
	const [isDeliveryVisible, setDeliveryVisible] = useState(false)
	const [isOrderVisible, setOrderVisible] = useState(false)
	const [telephone, setTelephone] = useState('')
	const [name, setName] = useState('')
	const [selectedTovars, setSelectedTovars] = useState({})

	useEffect(() => {
		if (user.isAuth) {
			const loadBasket = async () => {
				const tokens = localStorage.getItem('token')
				if (!tokens) {
					throw new Error('Token not found')
				}
				const decodedToken = jwtDecode(tokens)
				const userId = decodedToken.id

				try {
					const basketProducts = await fetchBasket(userId)
					setTovar(basketProducts)

					const details = await Promise.all(
						basketProducts.map((tovar) => fetchOneTovar(tovar.tovarId))
					)

					const detailsMap = {}
					details.forEach((detail) => {
						detailsMap[detail.id] = detail
					})

					setTovarDetails(detailsMap)
					setIsLoading(false)
				} catch (error) {
					console.error('Error loading basket:', error)
					setIsLoading(false)
				}
			}

			loadBasket()
		} else {
			setIsLoading(false)
		}
	}, [user])

	const toggleDeliverySection = () => {
		setDeliveryVisible(!isDeliveryVisible)
	}
	const toggleOrderSection = () => {
		setOrderVisible(!isOrderVisible)
	}

	const handleSelectAll = (e) => {
		if (e.target.checked) {
			const newSelectedTovars = {}
			tovars.forEach((tovar) => {
				newSelectedTovars[tovar.tovarId] = true
			})
			setSelectedTovars(newSelectedTovars)
		} else {
			setSelectedTovars({})
		}
	}

	const handleSelectTovar = (tovarId) => {
		setSelectedTovars((prevSelectedTovars) => ({
			...prevSelectedTovars,
			[tovarId]: !prevSelectedTovars[tovarId],
		}))
	}

	const getTotalPrice = () => {
		return tovars.reduce((total, tovar) => {
			if (selectedTovars[tovar.tovarId]) {
				const details = tovarDetails[tovar.tovarId]
				return total + (details ? details.price : 0)
			}
			return total
		}, 0)
	}

	const handleRemoveProduct = (productIdToRemove) => {
		setTovar(tovars.filter((product) => product.tovarId !== productIdToRemove))
		user.setCartCount(user.cartCount - 1)

		const newDetails = { ...tovarDetails }
		delete newDetails[productIdToRemove]
		setTovarDetails(newDetails)
	}

	const handleSubmitOrder = async () => {
		const token = localStorage.getItem('token')
		if (!token) {
			throw new Error('Token not found')
		}
		const decodedToken = jwtDecode(token)
		const userId = decodedToken.id

		// Filter out only the selected products
		const selectedProducts = tovars.filter(
			(tovar) => selectedTovars[tovar.tovarId]
		)

		// Validate product details
		const productsWithDetails = await Promise.all(
			selectedProducts.map(async (tovar) => {
				const details = tovarDetails[tovar.tovarId]
				if (!details || details.price == null) {
					throw new Error(
						`Детали продукта по ID ${tovar.tovarId} не найдены или цена отсутствует`
					)
				}
				return {
					basketTovarId: tovar.id,
					price: details.price,
				}
			})
		)

		try {
			await createZakaz({
				userId: userId,
				products: productsWithDetails,
				address: address.value,
				status: 'Pending',
				telephone: telephone,
				name: name,
			})
			alert('Заказ успешно создан')
		} catch (error) {
			console.error('Ошибка создания заказа:', error)
			alert(`Не удалось создать заказ: ${error.message}`)
		}
	}
	if (isLoading) {
		return (
			<div className='card container'>Загрузка. Подождите пожалуйста...</div>
		)
	}
	return (
		<main className='basket container'>
			<section className='basket_all'>
				{tovars.length === 0 ? (
					<div className='basket_title'>
						<h2 className='medium-title'>
							<img src={Basket_img} alt='Картинка корзина' />
							<NavLink to="/catalog">Ваша корзина пуста! Вернуться к просмотру товаров</NavLink>
						</h2>
					</div>
				) : (
					<section className='basket_all'>
						<section className='basket_multiple_choice'>
							<input
								id='checkbox1'
								type='checkbox'
								className='checkbox'
								onChange={handleSelectAll}
								checked={Object.keys(selectedTovars).length === tovars.length}
							/>
							<p>Выбрать всё</p>
						</section>
						<section>
							<section className='Tovar_Itogo'>
								<section className='basket_tovar'>
									{tovars.map((tovar) => (
										<div key={tovar.tovarId}>
											<input
												type='checkbox'
												checked={!!selectedTovars[tovar.tovarId]}
												onChange={() => handleSelectTovar(tovar.tovarId)}
											/>
											<BasketTovar
												tovarDetails={tovarDetails[tovar.tovarId]}
												tovar={tovar}
												onRemove={handleRemoveProduct}
											/>
										</div>
									))}
								</section>
								<section className='basket_all_price_tovar'>
									{Object.keys(selectedTovars).map(
										(tovarId, index) =>
											selectedTovars[tovarId] && (
												<span
													style={{
														display: 'flex',
														marginBottom: '10px',
														justifyContent: 'space-between',
													}}
													key={tovarId}
												>
													<p>Товар {index + 1}: </p>
													<p>
														{tovarDetails[tovarId]
															? tovarDetails[tovarId].price
															: 'Цена не найдена'}
														руб.
													</p>
												</span>
											)
									)}
									<div>
										<span className='basket_line'></span>
										<div className='basket_text_all'>
											<p>Итого</p>
											<span className='basket_all_price'>
												{getTotalPrice()}
											</span>
										</div>
									</div>
								</section>
							</section>
							<section className='dostavka'>
								{user.isAuth ? (
									<div>
										<h1 className='text_zagolovok'>Доставка</h1>
										<div className='form-section'>
											<input
												type='radio'
												name='toggle'
												id='toggle-delivery'
												className='toggle-radio'
												onClick={toggleDeliverySection}
											/>
											<label htmlFor='toggle-delivery' className='toggle-label'>
												Почта России
											</label>
											{isDeliveryVisible && (
												<div id='delivery' className='toggle-content' style={{ padding: '10px' }}>
													<input
														type='text'
														value={name}
														onChange={(e) => setName(e.target.value)}
														placeholder='ФИО'
													/>
													<input
														type='text'
														name='telefone'
														placeholder='Телефон'
														value={telephone}
														onChange={(e) => setTelephone(e.target.value)}
													/>
													<p className='P_bask'>Адрес:</p>
													<AddressSuggestions
														token={token}
														value={address}
														onChange={setAddress}
													/>
												</div>
											)}

										</div>
										<div className='form-section'>
											<input
												type='radio'
												name='toggle'
												id='toggle-order'
												className='toggle-radio'
												onClick={toggleOrderSection}
											/>
											<label htmlFor='toggle-order' className='toggle-label'>
												Самовывоз
											</label>
											<div
												id='order'
												className={`toggle-content ${isOrderVisible ? 'show' : 'hidden'
													}`}
											>
												<input
													type='text'
													value={name}
													onChange={(e) => setName(e.target.value)}
													placeholder='ФИО'
												/>
												<input
													type='text'
													name='telefone'
													placeholder='Телефон'
													value={telephone}
													onChange={(e) => setTelephone(e.target.value)}
												/>
											</div>
										</div>
										<div className='basket_info'></div>
										<button
											style={{ display: 'block' }}
											type='submit'
											onClick={handleSubmitOrder}
										>
											Оформить заказ
										</button>
									</div>
								) : (
									<div>
										<div className='basket_info'>
											<img src={inf} alt='Важно!!!' />
											<p>
												Оформление заказа доступно только авторизованным
												пользователям
											</p>
										</div>
										<button style={{ display: 'block' }} type='submit'>
											<NavLink to='/login'>Авторизоваться</NavLink>
										</button>
									</div>
								)}
							</section>
						</section>
					</section>
				)}
			</section>
		</main>
	)
}

export default Basket
