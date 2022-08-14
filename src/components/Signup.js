import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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
		<section>
			<div>Signup</div>
			<form className="form" onSubmit={handleSubmit}>
				<h5>Signup</h5>
				<div className="form-row">
					<label htmlFor="email" className="form-label">
						email
					</label>
					<input
						type="email"
						className="form-input"
						id="email"
						// value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-row">
					<label htmlFor="password" className="form-label">
						password
					</label>
					<input
						type="password"
						className="form-input"
						id="password"
						// value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-block">
					Signup
				</button>
			</form>
		</section>
	);
};

export default Signup;
