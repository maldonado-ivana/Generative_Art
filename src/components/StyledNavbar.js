import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { CgMenu, CgCloseO } from 'react-icons/cg';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
	const [nav, setNav] = useState(false);

	const { user, logout } = UserAuth();
	const navigate = useNavigate();

	const handleNav = () => {
		setNav(!nav);
	};

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<nav className=" flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white">
			<h1 className=" text-2xl font-bold text-[#70868C]">GENERATIVE ART</h1>
			<section className="hidden md:flex">
				<NavLink to="/" className="p-4">
					Home
				</NavLink>
				<NavLink to="/flowfields" className="p-4">
					Flow Fields
				</NavLink>
				<NavLink to="/triangles" className="p-4">
					Sierpinski Triangles
				</NavLink>
				{user?.email ? (
					<>
						<NavLink to="/dashboard" className="p-4">
							My Art
						</NavLink>
						<NavLink to="/account" className="p-4">
							My Acount
						</NavLink>
						<button
							onClick={handleLogout}
							className="bg-[#7B9596] px-6 h-12 rounded cursor-pointer text-white"
						>
							Log Out
						</button>
					</>
				) : (
					<>
						<NavLink to="/signup" className="p-4">
							Sign Up
						</NavLink>
						<NavLink to="/login" className="p-4">
							Log In
						</NavLink>
					</>
				)}
			</section>

			<section onClick={handleNav} className="block md:hidden">
				{nav ? <CgCloseO size={20} /> : <CgMenu size={20} />}
			</section>

			<ul
				className={
					nav
						? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
						: 'ease-in-out duration-500 fixed left-[-100%]'
				}
			>
				<h1 className=" w-full text-3xl font-bold text-[#70868C] m-4">LOGO</h1>
				<ul className="uppercase p-4">
					<li to="/" className="p-4">
						<NavLink to="/">Home</NavLink>
					</li>
					<li to="/flowfields" className="p-4 border-b border-gray-700">
						<NavLink to="/flowfields">Flow Fields</NavLink>
					</li>
					<li to="/triangles" className="p-4 border-b border-gray-700">
						<NavLink to="/triangles">Sierpinski Triangles</NavLink>
					</li>
					<li to="/signup" className="p-4 border-b border-gray-700">
						<NavLink to="/signup">Signup</NavLink>
					</li>
					<li to="/login" className="p-4 border-b border-gray-700">
						<NavLink to="/login">Login</NavLink>
					</li>
					<li to="/dashboard" className="p-4 border-b border-gray-700">
						<NavLink to="/dashboard">My Art</NavLink>
					</li>
					<li to="/account" className="p-4 border-b border-gray-700">
						<NavLink to="/account">My Acount</NavLink>
					</li>
				</ul>
			</ul>
		</nav>
	);
};

export default Navbar;
