import { Outlet } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<h3>Shared Art Layout</h3>
			<Outlet />
		</>
	);
};

export default Home;
