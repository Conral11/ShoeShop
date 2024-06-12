import React, { useState } from 'react'
import { createMaterial } from '../../http/productAPI'

const CreateMaterial = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')

	const addMaterial = () => {
		createMaterial({ name: value }).then((data) => {
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
				<h2 style={{ textAlign: 'center' }} className='big-title-admin'>
					Добавить материал
				</h2>
				<input
					className='input-custom-dark'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите материал'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={addMaterial}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateMaterial
