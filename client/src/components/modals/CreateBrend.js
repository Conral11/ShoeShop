import React, { useState } from 'react';
import { createBrend } from '../../http/productAPI';

const CreateBrend = ({ isOpen, onClose }) => {
	const [name, setName] = useState('')
	const [image, setImage] = useState('')

	const addBrend = () => {
		createBrend({ name: name, image: image }).then((data) => {
			setName('')
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
					Добавить бренд
				</h2>
				<input
					className='input-custom-dark'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder={'Введите бренд'}
				/>
				<input
					className='input-custom-dark'
					value={image}
					onChange={(e) => setImage(e.target.value)}
					placeholder={'Введите ссылку на изображение'}
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
