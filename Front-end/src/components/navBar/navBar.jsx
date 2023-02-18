import React, { useState } from 'react';
import { useModal } from '../../hook/useModal';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaUserAlt } from 'react-icons/fa';
import svgLogo from '../../assets/img/TECHLEARN.svg';
import SearchBar from './SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import Login from '../login/loginUser';
import './Navbar.css';
import Button from '../Button/Button';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [loginModal, showLoginModal] = useModal(false);

	const handleMenuOpen = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);

	return (
		<nav>
			<Link to='/' onClick={closeMenu}>
				<img src={svgLogo} alt='' />
			</Link>
			<SearchBar />
			<div className='menu-container'>
				<button className='menu-btn' onClick={handleMenuOpen}>
					{menuOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>
			<div className='nav-links'>
				<NavLink to='/'>Inicio</NavLink>
				<NavLink to='/'>Planes</NavLink>
				<NavLink to='/courses'>Cursos</NavLink>
				<div className='flex items-center justify-center gap-2'>
					{/* <FaUserAlt /> */}
					<NavLink to='/login'>
						<p>Log In</p>
					</NavLink>
				</div>
				<Button fontSize={'base'} padX={4} padY={2}>
					<NavLink to='/'>Get Started</NavLink>
				</Button>
			</div>
			<div className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
				<NavLink to='/' onClick={closeMenu}>
					Inicio
				</NavLink>
				<NavLink to='/' onClick={closeMenu}>
					Planes
				</NavLink>
				<NavLink to='/courses' onClick={closeMenu}>
					Cursos
				</NavLink>
				<NavLink
					to='/login'
					className='flex align-center justify-center gap-2'
					onClick={closeMenu}>
					Log In
				</NavLink>
				<NavLink to='/' onClick={closeMenu}>
					Get Started
				</NavLink>
			</div>
			<Modal isActive={loginModal} showModal={showLoginModal}>
				<Login showModal={showLoginModal} closeMenu={closeMenu} />
			</Modal>
		</nav>
	);
};

export default Navbar;
