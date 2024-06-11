import React, { useState } from 'react'
import { createBrand } from '../../http/productAPI'

const CreateBrand = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')

	const addBrand = () => {
		createBrand({ name: value }).then((data) => {
			setValue('')
			onClose()
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
				<h2 style={{ textAlign: 'center' }} className='big-title'>
					Добавить бренд
				</h2>
				<input
					className='input-custom-dark'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите бренд'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={addBrand}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateBrand
