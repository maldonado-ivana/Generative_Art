import React from 'react';

const Modal = ({ selectedImg, setSelectedImg, handleDelete }) => {
	const closeBackground = (e) => {
		if (e.target.classList.contains('backdrop')) {
			setSelectedImg(null);
		}
	};

	return (
		<div className="backdrop" onClick={closeBackground}>
			<img src={selectedImg} alt="link to art" />
			<button
				className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
				onClick={() => handleDelete(selectedImg)}
			>
				Delete
			</button>
		</div>
	);
};

export default Modal;
