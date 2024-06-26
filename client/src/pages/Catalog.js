import React, { useEffect, useContext } from 'react'
import { Context } from '../index'
import Tovar from '../components/Tovar/Tovar'
import Filter from '../components/Filter/FilterCatalog'
import { observer } from 'mobx-react-lite'
import {
	fetchBrend,
	fetchSize,
	fetchTovars,
	fetchColor,
	fetchMaterial,
	fetchPol,
	fetchSeason,
} from '../http/productAPI'
import Pagination from '../components/Pagination/Pagination'
//import Comparison from '../components/Comparison/Comparison' // Импортируем компонент

const Catalog = observer(() => {
	const { tovar } = useContext(Context)
	useEffect(() => {
		fetchBrend().then((data) => tovar.setBrend(data))
		fetchColor().then((data) => tovar.setColor(data))
		fetchSize().then((data) => tovar.setSize(data))
		fetchPol().then((data) => tovar.setPol(data))
		fetchMaterial().then((data) => tovar.setMaterial(data))
		fetchSeason().then((data) => tovar.setSeason(data))
		fetchTovars(null, null, null, null, null, null, null, tovar.page, 6).then(
			(data) => {
				tovar.setTovar(data.rows)
				tovar.setTotalCount(data.count)
			}
		)
	}, [tovar])

	useEffect(() => {
		fetchTovars(
			tovar.selectedBrend,
			tovar.selectedColor,
			tovar.selectedPol,
			tovar.selectedSize,
			tovar.selectedMaterial,
			tovar.selectedSeason,
			tovar.name,
			tovar.page,
			8
		).then((data) => {
			tovar.setTovar(data.rows)
			tovar.setTotalCount(data.count)
		})
	}, [
		tovar.selectedBrend,
		tovar.selectedColor,
		tovar.selectedPol,
		tovar.selectedSize,
		tovar.selectedMaterial,
		tovar.selectedSeason,
		tovar.name,
		tovar.page,
	])

	return (
		<main className='main'>
			<Filter />
			<section className='filter-catalog'>
				<div className='catalog-products'>
					{tovar.tovar.map((tovar) => (
						<Tovar
							id={tovar.id}
							image={tovar.image}
							name={tovar.name}
							price={tovar.price}
							brend={tovar.brend}
							key={tovar.id}
						/>
					))}
				</div>
				{/*<Comparison /> {/* Добавляем компонент для сравнения */}
				{<Pagination />}
			</section>
		</main>
	)
})

export default Catalog
