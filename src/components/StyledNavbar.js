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
				to="/signup"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				Signup
			</NavLink>
			<NavLink
				to="/login"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				Login
			</NavLink>
			<NavLink
				to="/dashboard"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				My Art
			</NavLink>
			<NavLink
				to="/account"
				className={({ isActive }) => (isActive ? 'link active' : 'link')}
			>
				My Acount
			</NavLink>
		</nav>
	);
};

export default Navbar;
