import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

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
		<>
			<div className="w-full h-screen">
				<img
					className="hidden sm:block absolute w-full h-full object-cover"
					src="https://firebasestorage.googleapis.com/v0/b/generative-art-app.appspot.com/o/images%2FFF1660646825853?alt=media&token=d53965f0-6d81-468e-8e53-435442118b15"
					alt="/"
				/>

				<div className="fixed w-full px-4 py-24 z-50">
					<div className="max-w-[450px] h-[450px] mx-auto bg-black/90 text-white">
						<div className="max-w-[320px] mx-auto py-16">
							<h1 className="text-3xl font-bold text-center">Login</h1>

							<form
								onSubmit={handleLogin}
								className="w-full flex flex-col py-4"
							>
								<input
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									className="py-3 pl-2 my-2 bg-gray-700 rounded"
									type="email"
									placeholder="Email"
									autoComplete="email"
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
									Log In
								</button>
								{error && <span>Wrong email or password!</span>}

								<div className="flex justify-between items-center text-sm text-gray-600">
									<p>
										<input className="mr-2" type="checkbox" />
										Remember me
									</p>
									<p>Need Help?</p>
								</div>
								<p className="py-4">
									<span className="text-sm text-gray-600">
										Dont have an account?
									</span>{' '}
									<Link to="/login">Sign In</Link>
								</p>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
