import React, { useState } from 'react'
import { createColor } from '../../http/productAPI'

const CreateColor = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')

	const addColor = () => {
		createColor({ name: value }).then((data) => {
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
					Добавить цвет
				</h2>
				<input
					className='input-custom-dark'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите цвет'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={addColor}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateColor
