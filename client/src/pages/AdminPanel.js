import React, { useState } from 'react'
import CreateSize from '../components/modals/CreateSize'
import CreateBrend from '../components/modals/CreateBrend'
import CreateProduct from '../components/modals/CreateProduct'
import CreateColor from '../components/modals/CreateColor'
import CreateSeason from '../components/modals/CreateSeason'
import CreateMaterial from '../components/modals/CreateMaterial'

const AdminPanel = () => {
	const [sizeVisible, setSizeVisible] = useState(false)
	const [brendVisible, setBrendVisible] = useState(false)
	const [productVisible, setProductVisible] = useState(false)
	const [colorVisible, setColorVisible] = useState(false)
	const [materialVisible, setMaterialVisible] = useState(false)
	const [seasonVisible, setSeasonVisible] = useState(false)

	const openSizeModal = () => {
		setSizeVisible(true)
		setBrendVisible(false)
		setProductVisible(false)
		setColorVisible(false)
		setMaterialVisible(false)
		setSeasonVisible(false)
	}

	const openBrendModal = () => {
		setSizeVisible(false)
		setBrendVisible(true)
		setProductVisible(false)
		setColorVisible(false)
		setMaterialVisible(false)
		setSeasonVisible(false)
	}

	const openProductModal = () => {
		setSizeVisible(false)
		setBrendVisible(false)
		setProductVisible(true)
		setColorVisible(false)
		setMaterialVisible(false)
		setSeasonVisible(false)
	}

	const openColorModal = () => {
		setSizeVisible(false)
		setBrendVisible(false)
		setProductVisible(false)
		setColorVisible(true)
		setMaterialVisible(false)
		setSeasonVisible(false)
	}

	const openMaterialModal = () => {
		setSizeVisible(false)
		setBrendVisible(false)
		setProductVisible(false)
		setColorVisible(false)
		setMaterialVisible(true)
		setSeasonVisible(false)
	}
	const openSeasonModal = () => {
		setSizeVisible(false)
		setBrendVisible(false)
		setProductVisible(false)
		setColorVisible(false)
		setMaterialVisible(false)
		setSeasonVisible(true)
	}

	const closeModal = () => {
		setSizeVisible(false)
		setBrendVisible(false)
		setProductVisible(false)
		setColorVisible(false)
		setMaterialVisible(false)
		setSeasonVisible(false)
	}

	return (
		<main className='main container'>
			<button className='button-custom-admin' onClick={openSizeModal}>
				Добавить размер
			</button>
			<button className='button-custom-admin' onClick={openBrendModal}>
				Добавить бренд
			</button>
			<button className='button-custom-admin' onClick={openProductModal}>
				Добавить продукт
			</button>
			<button className='button-custom-admin' onClick={openColorModal}>
				Добавить цвет
			</button>
			<button className='button-custom-admin' onClick={openMaterialModal}>
				Добавить материал
			</button>
			<button className='button-custom-admin' onClick={openSeasonModal}>
				Добавить сезон
			</button>
			<CreateSize isOpen={sizeVisible} onClose={closeModal} />
			<CreateBrend isOpen={brendVisible} onClose={closeModal} />
			<CreateProduct isOpen={productVisible} onClose={closeModal} />
			<CreateColor isOpen={colorVisible} onClose={closeModal} />
			<CreateMaterial isOpen={materialVisible} onClose={closeModal} />
			<CreateSeason isOpen={seasonVisible} onClose={closeModal} />
		</main>
	)
}

export default AdminPanel
