import { useState } from 'react';

const Dropdown = ({ index, titulo, miniatura, descripcion }) => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const handleDropdown = () => {
		setOpenDropdown(!openDropdown);
	};

	return (
		<div className='dropdown-item' key={index} onClick={handleDropdown}>
			<p className='dropdown-item-title'>{titulo}</p>
			<div
				className={
					openDropdown ? 'dropdown-item-info active' : 'dropdown-item-info'
				}>
				<img src={miniatura} alt='miniatura' />
				<p>{descripcion}</p>
			</div>
		</div>
	);
};

export default Dropdown;
