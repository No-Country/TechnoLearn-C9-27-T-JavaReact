import React, { useState } from 'react';
import { useModal } from '../../hook/useModal';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import SearchBar from './SearchBar/SearchBar';
import Modal from '../Modal/Modal';
import Login from '../login/login';
import './Navbar.css';

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [loginModal, showLoginModal] = useModal(false);

	const handleMenuOpen = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);

	return (
		<nav>
			<Link to='/' onClick={closeMenu}>
				<h1>LOGO</h1>
			</Link>
			<SearchBar />
			<div className='menu-container'>
				<button className='menu-btn' onClick={handleMenuOpen}>
					{menuOpen ? <FaTimes /> : <FaBars />}
				</button>
			</div>
			<div className='nav-links'>
				<div
					className='flex items-center justify-center gap-2'
					onClick={showLoginModal}>
					<FaUserAlt />
					<p>LogIn</p>
				</div>
				<NavLink to='/'>Inicio</NavLink>
				<NavLink to='/cursos'>Cursos</NavLink>
				<NavLink to='/'>Contacto</NavLink>
			</div>
			<div className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
				<a
					className='flex align-center justify-center gap-2'
					onClick={showLoginModal}>
					Log In
				</a>
				<NavLink to='/' onClick={closeMenu}>
					Suscríbete
				</NavLink>
				<NavLink to='/' onClick={closeMenu}>
					Inicio
				</NavLink>
				<NavLink to='/cursos' onClick={closeMenu}>
					Cursos
				</NavLink>
				<NavLink to='/' onClick={closeMenu}>
					Contacto
				</NavLink>
			</div>
			<Modal isActive={loginModal} showModal={showLoginModal}>
				<Login showModal={showLoginModal} closeMenu={closeMenu} />
			</Modal>
		</nav>
	);
};

export default Navbar;