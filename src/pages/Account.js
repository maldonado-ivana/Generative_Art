import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Account = () => {
	const { user, logout } = UserAuth();
	const navigate = useNavigate();

	const handleLogout = async () => {
		try {
			await logout();
			navigate('/');
			console.log('You are logged out');
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<section className=" text-white">
			<div className="h-full absolute top-[20%] p-4 m-20 ml-40 md:p-8">
				<h1 className="text-3xl md:text-5xl font-bold">My Account</h1>
				<h3 className="text-xl md:sm py-5">User: {user && user.email}</h3>
			</div>
		</section>
	);
};

export default Account;
