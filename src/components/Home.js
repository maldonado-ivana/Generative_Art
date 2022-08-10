import { Link } from 'react-router-dom';
import Card from './Card';

const Home = () => {
	const typesOfArt = [
		{ img: 'img', name: 'Flowfields' },
		{ img: 'img', name: 'Triangle' },
		{ img: 'img', name: 'Recursive' },
	];
	const cards = typesOfArt.map((art) => {
		return <Card key={art.id} artName={art.name} />;
	});

	return (
		<>
			<h1>Create Generative Art</h1>

			<h3>Choose the type of Art:</h3>
			<section className="card-list">{cards}</section>
		</>
	);
};

export default Home;
