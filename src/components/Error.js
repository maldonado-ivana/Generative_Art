import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<section className="pt-20 text-3xl md:text-5xl font-bold text-center text-white">
			<h2>404</h2>
			<p>Page not found</p>

			<p className=" pt-20 text-2xl">
				<Link to="/"> Go Back Home</Link>
			</p>
		</section>
	);
};

export default Error;
