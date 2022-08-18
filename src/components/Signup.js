import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const { createUser } = UserAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const res = await createUser(email, password);
			await setDoc(doc(db, 'users', res.user.uid), {
				email: email,
				password: password,
			});
			navigate('/account');
		} catch (e) {
			setError(e.message);
			console.log(e.message);
		}
	};

	return (
		<section className="w-full h-screen">
			<img
				className="hidden sm:block absolute w-full h-full object-cover"
				src="https://firebasestorage.googleapis.com/v0/b/generative-art-app.appspot.com/o/images%2Fff1660320960523?alt=media&token=c1ee0257-e931-4897-b5b1-49619da6256c"
				alt="green background"
			/>
			<div className="fixed w-full px-4 py-24 z-50">
				<div className="max-w-[450px] h-[450px] mx-auto bg-black/90 text-white ">
					<div className="max-w-[320px] mx-auto py-16">
						<h1 className="text-3xl font-bold text-center">Signup</h1>

						<form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
							<input
								onChange={(e) => setEmail(e.target.value)}
								id="email"
								className="py-3 pl-2 my-2 bg-gray-700 rounded"
								type="email"
								placeholder="Email"
								autoComple="email"
							/>

							<input
								onChange={(e) => setPassword(e.target.value)}
								id="password"
								className="py-3 pl-2 my-2 bg-gray-700 rounded"
								type="password"
								placeholder="Password"
								autoComplete="password"
							/>
							<button
								className="bg-[#70868C] py-3 my-6 rounded font-bold w-[150px] mx-auto"
								type="submit"
							>
								Sign Up
							</button>

							<p className="py-4">
								<span className="text-sm text-gray-600">
									Already have an account?
								</span>{' '}
								<Link to="/login">Sign In</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signup;
