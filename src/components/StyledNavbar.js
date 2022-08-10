import { NavLink } from 'react-router-dom';

const Navbar = () => {
	return (
		<nav className="navbar">
			<NavLink
				to="/"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				Home
			</NavLink>
			<NavLink
				to="/about"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				About
			</NavLink>
			<NavLink
				to="/flowfields"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				Flow Fields
			</NavLink>
			<NavLink
				to="/products"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				User Saved Art
			</NavLink>
			<NavLink
				to="/login"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				Login
			</NavLink>
		</nav>
	);
};

export default Navbar;
