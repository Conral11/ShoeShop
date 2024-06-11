import React, { useState } from 'react';
import { createSize } from '../../http/productAPI';

const CreateSize = ({ isOpen, onClose }) => {
	const [value, setValue] = useState('');

	const addSize = () => {
		createSize({ name: value }).then((data) => {
			setValue('');
			onClose();
		});
	};

	if (!isOpen) {
		return null;
	}

	return (
		<section className="modal">
			<div className="modal-content">
				<span className="close-button" onClick={onClose}>
					&times;
				</span>
				<h2 style={{ textAlign: 'center' }} className="big-title">
					Добавить размер
				</h2>
				<input
					className="input-custom-dark"
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder={'Введите размер'}
				/>
				<div className="modal-footer">
					<button className="button-custom" onClick={addSize}>
						Добавить
					</button>
				</div>
			</div>
		</section>
	);
};

export default CreateSize;
