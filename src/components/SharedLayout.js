import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import StyledNavbar from './StyledNavbar';

const Home = () => {
	return (
		<>
			<StyledNavbar />
			<Outlet />
		</>
	);
};

export default Home;
