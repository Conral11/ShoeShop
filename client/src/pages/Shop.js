import React, { useEffect, useState, useContext } from 'react'
import Swiper from '../components/Swiper/Swiper'

import { Context } from '../index'
import { NavLink } from 'react-router-dom'

import Brends from '../components/Brends/Brends'
import { fetchTovars, fetchBrend, fetchPol, fetchSeason } from '../http/productAPI'

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
//import connectionShoes from '../img/body/connection/connection.jpg'

import '../css/Main.css'

const Shop = () => {
	const { tovar } = useContext(Context)
	const [tovars, setTovars] = useState([])

	const handleFilter = (pol) => {
		tovar.setSelectedPol(pol.id)
	}
	const handleFilter2 = (season) => {
		tovar.setSelectedSeason(season.id)
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const TovarData = await fetchTovars()
				fetchBrend().then((data) => tovar.setBrend(data))
				fetchPol().then((data) => tovar.setPol(data))
				fetchSeason().then((data) => tovar.setSeason(data))
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
			<div className='body-links'>
				<div className='links'>
					<a href='#sectionCategory'>Каталог</a>
					<a href='#sectionNew'>Новинки</a>
					<a href='#sectionCollection'>Коллекции</a>
					<a href='#sectionPopylBrend'>Наши бренды</a>
					<a href='#sectionActyality'>Актуальное</a>
					<a href='#sectionMassag'>Написать нам</a>
				</div>
			</div>
			<div className='body-conteiner-img' style={{ position: 'relative' }}>
				<img src={bodyConteinerImg} alt='Описание картинки' />
				<div className='text-body-conteiner-img'>
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
				<h2 id='sectionCategory' className='category big-title'>
					Каталог
				</h2>
			</NavLink>
			<section className='body-conteiner-category'>
				<div className='body-category'>
					<img src={categoryAcsesyar} alt='Аксессуары' className='img' />
					<NavLink
						to='/catalog'
						key={tovar.pol.id}
						onClick={() => handleFilter(tovar.pol[2])}
					>
						<h2>Аксессуары</h2>
					</NavLink>
				</div>
				<div className='body-category'>
					<img src={categoryGirl} alt='Женщинам' />
					<NavLink
						to='/catalog'
						key={tovar.pol.id}
						onClick={() => handleFilter(tovar.pol[0])}
					>
						<h2>Женщинам</h2>
					</NavLink>
				</div>
				<div className='body-category'>
					<img src={categoryMan} alt='Мужчинам' />
					<NavLink
						to='/catalog'
						key={tovar.pol.id}
						onClick={() => handleFilter(tovar.pol[1])}
					>
						<h2>Мужчинам</h2>
					</NavLink>
				</div>
				<div className='body-category'>
					<img src={categorySport} alt='Спорт' />
					<NavLink
						to='/catalog'
						key={tovar.pol.id}
						onClick={() => handleFilter(tovar.pol[4])}
					>
						<h2>Спорт</h2>
					</NavLink>
				</div>
			</section>
			<h2 id='sectionNew' className='category big-title'>
				Новинки
			</h2>
			<section className='body-conteiner-new'>
				<Swiper items={tovars} itemsPerPage={4} />
			</section>
			<h2 id='sectionCollection' className='category big-title'>
				Коллекции
			</h2>
			<section className='body-conteiner-collections'>
				<div className='body-collection'>
					<img src={colectionWinter} alt='Winter' />
					<div className='body-left-card-text'>
						<p className='season'>Зима</p>
						<NavLink
							to='/catalog'
							key={tovar.season.id}
							onClick={() => handleFilter2(tovar.season[2])}
						>
							<p className='custom-link' href=''>
								смотреть
							</p>
						</NavLink>

					</div>
				</div>
				<div className='body-collection'>
					<img src={colectionAutumnString} alt='Autumn-Spring' />
					<div className='body-left-card-text'>
						<p className='season'>Осень - Весна</p>
						<NavLink
							to='/catalog'
							key={tovar.season.id}
							onClick={() => handleFilter2(tovar.season[1])}
						>
							<p className='custom-link' href=''>
								смотреть
							</p>
						</NavLink>
					</div>
				</div>
				<div className='body-collection'>
					<img src={colectionSummer} alt='Summer' />
					<div className='body-left-card-text'>
						<p className='season'>Лето</p>
						<NavLink
							to='/catalog'
							key={tovar.season.id}
							onClick={() => handleFilter2(tovar.season[0])}
						>
							<p className='custom-link' href=''>
								смотреть
							</p>
						</NavLink>
					</div>
				</div>
			</section>
			<h2 id='sectionPopylBrend' className='category big-title'>
				Список наших брендов
			</h2>
			<Brends />
			<h2 id='sectionActyality' className='category big-title'>
				Актуально
			</h2>
			<div className='body-conteiner-actyale'>
				<div className='body-actyale'>
					<img src={actyaleBags} alt='Bags' />
					<div className='body-collection-card-text'>
						<p>Эффектные сумки на любой день</p>
						<NavLink
							to='/catalog'
							key={tovar.pol.id}
							onClick={() => handleFilter(tovar.pol[2])}
						>
							<p className='custom-link' href=''>
								смотреть
							</p>
						</NavLink>

					</div>
				</div>
				<div className='body-actyale'>
					<img src={actyaleShoes} alt='Shoes' />
					<div className='body-left-card-text'>
						<p>Всегда чистая и удобная обувь</p>
						<NavLink
							to='/catalog'
							key={tovar.pol.id}
							onClick={() => handleFilter(tovar.pol[3])}
						>
							<p className='custom-link'>
								смотреть
							</p>
						</NavLink>
					</div>
				</div>
			</div>
			{/* 
			<div id='sectionMassag' className='body-conteiner-connection'>
				<div className='image-connection'>
					<img src={connectionShoes} alt='Stylish Shoes' />
				</div>
				<div className='form-connection'>
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
			*/}
		</main>
	)
}

export default Shop
