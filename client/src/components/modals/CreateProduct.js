import React, { useState, useEffect } from 'react'
import {
	createTovars,
	fetchBrend,
	fetchColor,
	fetchSeason,
	fetchMaterial,
	fetchPol,
	fetchSize,
} from '../../http/productAPI'

const CreateProduct = ({ isOpen, onClose }) => {
	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState('')
	const [selectedBrend, setSelectedBrend] = useState('')
	const [selectedColor, setSelectedColor] = useState('')
	const [SelectedSeason, setSelectedSeason] = useState('')
	const [selectedMaterial, setSelectedMaterial] = useState('')
	const [selectedPol, setSelectedPol] = useState('')
	const [selectedSize, setSelectedSize] = useState('')
	const [brends, setBrends] = useState([])
	const [colors, setColors] = useState([])
	const [seasons, setSeasons] = useState([])
	const [materials, setMaterials] = useState([])
	const [pols, setPols] = useState([])
	const [sizes, setSizes] = useState([])

	useEffect(() => {
		fetchBrend().then((data) => setBrends(data))
		fetchColor().then((data) => setColors(data))
		fetchSeason().then((data) => setSeasons(data))
		fetchMaterial().then((data) => setMaterials(data))
		fetchPol().then((data) => setPols(data))
		fetchSize().then((data) => setSizes(data))
	}, [])

	const addProduct = () => {
		const productData = {
			name,
			price,
			image,
			brendId: selectedBrend,
			colorId: selectedColor,
			seasonId: SelectedSeason,
			materialId: selectedMaterial,
			polId: selectedPol,
			sizeId: selectedSize,
		}
		createTovars(productData)
			.then((data) => {
				setName('')
				setPrice('')
				setImage('')
				setSelectedBrend('')
				setSelectedColor('')
				setSelectedSeason('')
				setSelectedMaterial('')
				setSelectedPol('')
				setSelectedSize('')
				onClose()
			})
			.catch((error) => {
				console.error('Ошибка при создании продукта:', error)
			})
	}

	if (!isOpen) {
		return null
	}

	return (
		<section className='modal'>
			<div className='modal-content'>
				<span className="close-button" onClick={onClose}>
					&times;
				</span>
				<h2 style={{ textAlign: 'center' }} className='big-title-admin'>
					Добавить продукт
				</h2>
				<input
					className='input-custom-dark'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={'Введите название продукта'}
				/>
				<input
					className='input-custom-dark'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					placeholder={'Введите цену продукта'}
				/>
				<input
					className='input-custom-dark'
					value={image}
					onChange={(e) => setImage(e.target.value)}
					placeholder={'Введите ссылку на изображение'}
				/>
				<select
					className='input-custom-dark'
					value={selectedBrend}
					onChange={(e) => setSelectedBrend(e.target.value)}
				>
					<option value=''>Выберите бренд</option>
					{brends.map((brend) => (
						<option key={brend.id} value={brend.id}>
							{brend.name}
						</option>
					))}
				</select>
				<select
					className='input-custom-dark'
					value={selectedColor}
					onChange={(e) => setSelectedColor(e.target.value)}
				>
					<option value=''>Выберите цвет</option>
					{colors.map((color) => (
						<option key={color.id} value={color.id}>
							{color.name}
						</option>
					))}
				</select>
				<select
					className='input-custom-dark'
					value={SelectedSeason}
					onChange={(e) => setSelectedSeason(e.target.value)}
				>
					<option value=''>Выберите сезон</option>
					{seasons.map((season) => (
						<option key={season.id} value={season.id}>
							{season.name}
						</option>
					))}
				</select>
				<select
					className='input-custom-dark'
					value={selectedMaterial}
					onChange={(e) => setSelectedMaterial(e.target.value)}
				>
					<option value=''>Выберите материал</option>
					{materials.map((material) => (
						<option key={material.id} value={material.id}>
							{material.name}
						</option>
					))}
				</select>
				<select
					className='input-custom-dark'
					value={selectedPol}
					onChange={(e) => setSelectedPol(e.target.value)}
				>
					<option value=''>Выберите пол</option>
					{pols.map((pol) => (
						<option key={pol.id} value={pol.id}>
							{pol.name}
						</option>
					))}
				</select>
				<select
					className='input-custom-dark'
					value={selectedSize}
					onChange={(e) => setSelectedSize(e.target.value)}
				>
					<option value=''>Выберите размер</option>
					{sizes.map((size) => (
						<option key={size.id} value={size.id}>
							{size.name}
						</option>
					))}
				</select>
				<div className='modal-footer'>
					<button className='button-custom' onClick={addProduct}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateProduct
