import React, { useEffect, useState } from 'react'
import Swiper from '../components/Swiper/Swiper'
import '../css/Main.css'
import { NavLink } from 'react-router-dom'
import categoryAcsesyar from '../img/body/category/category-acsesyar.jpg'
import categoryMan from '../img/body/category/category-man.jpg'
import categorySport from '../img/body/category/category-sport.jpg'
import categoryGirl from '../img/body/category/category-girl.jpg'
import bodyConteinerImg from '../img/body/body-conteiner-img.jpg'
import colectionWinter from '../img/body/collection/Winter.jpg'
import colectionAutumnString from '../img/body/collection/Autumn-Spring.jpg'
import colectionSummer from '../img/body/collection/Summer.jpg'
import actyaleBags from '../img/body/actyale/symki.jpg'
import actyaleShoes from '../img/body/actyale/credctva.jpg'
import connectionShoes from '../img/body/connection/connection.jpg'
import Brends from '../components/Brends/Brends'
import { fetchTovars } from '../http/productAPI'

const Shop = () => {
	const [tovars, setTovars] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Получаем бестселлеры и новинки
				const TovarData = await fetchTovars()

				// Проверка данных и вывод в консоль для отладки
				console.log('Bestsellers data:', TovarData)
				if (TovarData && Array.isArray(TovarData.rows)) {
					setTovars(TovarData.rows)
				} else {
					console.error('Tovar data is not an array')
				}
			} catch (error) {
				console.error('Ошибка при загрузке продуктов:', error)
			}
		}
		fetchData()
	}, [])
	return (
		<main>
			<div class='body-links'>
				<div class='links'>
					<a href='#sectionCategory'>Каталог</a>
					<a href='#sectionNew'>Новинки</a>
					<a href='#sectionCollection'>Коллекции</a>
					<a href='#sectionPopylBrend'>Наши бренды</a>
					<a href='#sectionActyality'>Актуальное</a>
					<a href='#sectionMassag'>Написать нам</a>
				</div>
			</div>
			<div class='body-conteiner-img' style={{ position: 'relative' }}>
				<img src={bodyConteinerImg} alt='Описание картинки' />
				<div class='text-body-conteiner-img'>
					<h1 className='h1'>Современные и качественные</h1>
					<h2 className='h2'> ФИРМЕННЫЕ КРОССОВКИ</h2>
					<p>Стиль</p>
					<p>Постоянное обновление ассортимента</p>
					<p>Удобство и высокое качество</p>
					<p>Скидки</p>
					<NavLink to='/catalog'>
						<button>Перейти в каталог</button>
					</NavLink>
				</div>
			</div>
			<NavLink to={'/catalog'}>
				<h2 id='sectionCategory' class='category big-title'>
					Каталог
				</h2>
			</NavLink>
			<section class='body-conteiner-category'>
				<div class='body-category'>
					<img src={categoryAcsesyar} alt='Аксессуары' class='img' />
					<h2>Аксессуары</h2>
				</div>
				<div class='body-category'>
					<img src={categoryGirl} alt='Женщинам' />
					<h2>Женщинам</h2>
				</div>
				<div class='body-category'>
					<img src={categoryMan} alt='Мужчинам' />
					<h2>Мужчинам</h2>
				</div>
				<div class='body-category'>
					<img src={categorySport} alt='Спорт' />
					<h2>Спорт</h2>
				</div>
			</section>
			<h2 id='sectionNew' class='category big-title'>
				Новинки
			</h2>
			<section class='body-conteiner-new'>
				<Swiper items={tovars} itemsPerPage={4} />
			</section>
			<h2 id='sectionCollection' class='category big-title'>
				Коллекции
			</h2>
			<section class='body-conteiner-collections'>
				<div class='body-collection'>
					<img src={colectionWinter} alt='Winter' />
					<div class='body-left-card-text'>
						<p class='season'>Зима</p>
						<a class='custom-link' href=''>
							смотреть
						</a>
					</div>
				</div>
				<div class='body-collection'>
					<img src={colectionAutumnString} alt='Autumn-Spring' />
					<div class='body-left-card-text'>
						<p class='season'>Осень - Весна</p>
						<a class='custom-link' href=''>
							смотреть
						</a>
					</div>
				</div>
				<div class='body-collection'>
					<img src={colectionSummer} alt='Summer' />
					<div class='body-left-card-text'>
						<p class='season'>Лето</p>
						<a class='custom-link' href=''>
							смотреть
						</a>
					</div>
				</div>
			</section>
			<h2 id='sectionPopylBrend' class='category big-title'>
				Список наших брендов
			</h2>
			<Brends />
			<h2 id='sectionActyality' class='category big-title'>
				Актуально
			</h2>
			<div class='body-conteiner-actyale'>
				<div class='body-actyale'>
					<img src={actyaleBags} alt='Bags' />
					<div class='body-collection-card-text'>
						<p>Эффектные сумки на любой день</p>
						<a class='custom-link' href=''>
							смотреть
						</a>
					</div>
				</div>
				<div class='body-actyale'>
					<img src={actyaleShoes} alt='Shoes' />
					<div class='body-left-card-text'>
						<p>Всегда чистая и удобная обувь</p>
						<a class='custom-link' href=''>
							смотреть
						</a>
					</div>
				</div>
			</div>
			<div id='sectionMassag' class='body-conteiner-connection'>
				<div class='image-connection'>
					<img src={connectionShoes} alt='Stylish Shoes' />
				</div>
				<div class='form-connection'>
					<h2>Хотите задать вопрос? </h2>
					<h2>НАПИШИТЕ НАМ</h2>
					<p>Наш менеджер свяжется с вами в ближайшее время.</p>
					<form>
						<input type='text' name='name' placeholder='Введите имя' />
						<input type='email' name='email' placeholder='Введите email' />
						<button type='submit'>Написать</button>
					</form>
				</div>
			</div>
		</main>
	)
}

export default Shop
