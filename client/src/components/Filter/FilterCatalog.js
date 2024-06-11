import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../../index'
import Search from '../../img/header/Search.jpg'

const FilterCatalog = observer(() => {
	const { tovar } = useContext(Context)

	const [selectedBrend, setSelectedBrend] = useState('')
	const [selectedSize, setSelectedSize] = useState('')
	const [selectedColor, setSelectedColor] = useState('')
	const [selectedMaterial, setSelectedMaterial] = useState('')
	const [selectedPol, setSelectedPol] = useState('')
	const [selectedSeason, setSelectedSeason] = useState('')

	const handleFilter = () => {
		tovar.setSelectedBrend(selectedBrend)
		console.log(selectedBrend) //1
		tovar.setSelectedSize(selectedSize)
		console.log(selectedSize) //2
		tovar.setSelectedColor(selectedColor)
		console.log(selectedColor) //3
		tovar.setSelectedMaterial(selectedMaterial)
		console.log(selectedMaterial) //4
		tovar.setSelectedPol(selectedPol)
		console.log(selectedPol) //5
		tovar.setSelectedSeason(selectedSeason)
		console.log(selectedSeason) //6
	}

	const handleSelectBrand = (event) => {
		const selectedOption = event.target.value
		setSelectedBrend(selectedOption)
	}

	const handleSelectSize = (event) => {
		const selectedOption = event.target.value
		setSelectedSize(selectedOption)
	}

	const handleSelectColor = (event) => {
		const selectedOption = event.target.value
		setSelectedColor(selectedOption)
	}

	const handleSelectMaterial = (event) => {
		const selectedOption = event.target.value
		setSelectedMaterial(selectedOption)
	}

	const handleSelectPol = (event) => {
		const selectedOption = event.target.value
		setSelectedPol(selectedOption)
	}

	const handleSelectedSeason = (event) => {
		const selectedOption = event.target.value
		setSelectedSeason(selectedOption)
	}

	return (
		<section className='filter'>
			<select
				className='filter-params'
				value={selectedSize}
				onChange={handleSelectSize}
			>
				<option className='filter-param' value=''>
					Размер
				</option>
				{tovar.size.map((size) => (
					<option className='filter-param' key={size.id} value={size.id}>
						{size.name}
					</option>
				))}
			</select>
			<select
				className='filter-params'
				value={selectedBrend}
				onChange={handleSelectBrand}
			>
				<option className='filter-param' value=''>
					Бренд
				</option>
				{tovar.brend.map((brand) => (
					<option className='filter-param' key={brand.id} value={brand.id}>
						{brand.name}
					</option>
				))}
			</select>
			<select
				className='filter-params'
				value={selectedColor}
				onChange={handleSelectColor}
			>
				<option className='filter-param' value=''>
					Цвет
				</option>
				{tovar.color.map((color) => (
					<option className='filter-param' key={color.id} value={color.id}>
						{color.name}
					</option>
				))}
			</select>
			<select
				className='filter-params'
				value={selectedMaterial}
				onChange={handleSelectMaterial}
			>
				<option className='filter-param' value=''>
					Материал
				</option>
				{tovar.material.map((material) => (
					<option
						className='filter-param'
						key={material.id}
						value={material.id}
					>
						{material.name}
					</option>
				))}
			</select>
			<select
				className='filter-params'
				value={selectedPol}
				onChange={handleSelectPol}
			>
				<option className='filter-param' value=''>
					Категория
				</option>
				{tovar.pol.map((pol) => (
					<option className='filter-param' key={pol.id} value={pol.id}>
						{pol.name}
					</option>
				))}
			</select>
			<select
				className='filter-params'
				value={selectedSeason}
				onChange={handleSelectedSeason}
			>
				<option className='filter-param' value=''>
					Сезон
				</option>
				{tovar.season.map((season) => (
					<option className='filter-param' key={season.id} value={season.id}>
						{season.name}
					</option>
				))}
			</select>
			<div className='filter-param-input'>
				<button onClick={handleFilter}>
					<img src={Search} alt='Поиск' />
				</button>
			</div>
		</section>
	)
})

export default FilterCatalog
