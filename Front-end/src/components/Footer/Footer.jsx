import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/LogoLight.svg';
import './Footer.css';

function Footer() {
	return (
		<footer className='footer'>
			<div className='footer-text'>
				<p>Políticas de Privacidad</p>
				<p>Derechos Reservados</p>
			</div>
			<img src={Logo} alt='logo' />
			<div className='footer-redes'>
				<Link to='https://www.tiktok.com/es/' target={'_blank'}>
					<FaTiktok />
				</Link>
				<Link to='https://twitter.com/?lang=es' target={'_blank'}>
					<FaTwitter />
				</Link>
				<Link to='https://www.instagram.com/' target={'_blank'}>
					<FaInstagram />
				</Link>
				<Link to='https://www.facebook.com/' target={'_blank'}>
					<FaFacebookF />
				</Link>
			</div>
		</footer>
	);
}
export default Footer;
