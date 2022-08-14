import { Link } from 'react-router-dom';
import Card from '../components/Card';
import artTypes from '../data';

const Home = () => {
	return (
		<>
			<h1>Create Generative Art</h1>

			<h3>Choose One :</h3>
			<div className="img-grid">
				{artTypes.map((type) => (
					<div className="img-wrap" key={type.id}>
						<img src={type.image} alt="uploaded art" id="type-image" />
						<h5 id="type-name">{type.name}</h5>
					</div>
				))}
			</div>
		</>
	);
};

export default Home;
