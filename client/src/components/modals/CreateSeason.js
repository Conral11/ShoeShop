import React, { useState } from 'react'
import { createSeason } from '../../http/productAPI'

const CreateSeason = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')

	const addSeason = () => {
		createSeason({ name: value }).then((data) => {
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
					Добавить сезон
				</h2>
				<input
					className='input-custom-dark'
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите сезон'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={addSeason}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateSeason
