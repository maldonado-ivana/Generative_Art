import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase-config';

const Login = ({ setUser }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);

	const navigate = useNavigate();

	const { signIn } = UserAuth();

	const handleLogin = async (e) => {
		e.preventDefault();
		setError('');
		try {
			await signIn(email, password);
			navigate('/account');
		} catch {
			setError(e.message);
			console.log(e.message);
		}
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
