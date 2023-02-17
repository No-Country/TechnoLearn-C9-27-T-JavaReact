import { Outlet } from 'react-router-dom';
import Navbar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
	return (
		<>
			<header>
				<Navbar />
			</header>
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default MainLayout;
