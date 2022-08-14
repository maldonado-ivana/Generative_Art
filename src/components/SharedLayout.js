import { Outlet } from 'react-router-dom';

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
