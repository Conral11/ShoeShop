import React, { useState } from 'react'
import { createBrend } from '../../http/productAPI'

const CreateBrend = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('')
	const [img, setImg] = useState('')

	const addBrend = () => {
		createBrend({ name: value, img_url: img }).then((data) => {
			setValue('')
			setImg('')
			onClose()
		})
	}

	if (!isOpen) {
		return null
	}

	return (
		<section className='modal'>
			<div className='modal-content'>
				<span className='close-button' onClick={onClose}>
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
				<input
					className='input-custom-dark'
					value={img}
					onChange={(e) => setImg(e.target.value)}
					placeholder={'Введите url'}
				/>
				<div className='modal-footer'>
					<button className='button-custom' onClick={addBrend}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	)
}

export default CreateBrend