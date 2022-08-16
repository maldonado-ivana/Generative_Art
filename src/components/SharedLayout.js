import { Outlet } from 'react-router-dom';
import Navbar from './StyledNavbar';

const Home = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	);
};

export default Home;
