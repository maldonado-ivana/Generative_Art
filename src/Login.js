import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase-config';

const Login = ({ setUser }) => {
	const [name, setName] = useState('');

	const [error, setError] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ..
			});

		if (!name || !email) return;
		setUser({ name: name, email: email });
		navigate('/dashboard');
	};

	return (
		<section>
			<form className="form" onSubmit={handleLogin}>
				<h5>Login</h5>

				<div className="form-row">
					<label htmlFor="email" className="form-label">
						email
					</label>
					<input
						type="email"
						className="form-input"
						id="email"
						value={email}
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
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button type="submit" className="btn btn-block">
					Login
				</button>
				{error && <span>Wrong email or password!</span>}
			</form>
		</section>
	);
};

export default Login;

/* <div className="form-row">
	<label htmlFor="name" className="form-label">
		name
	</label>
	<input
		type="text"
		className="form-input"
		id="name"
		value={name}
		onChange={(e) => setName(e.target.value)}
	/>
</div>; */
