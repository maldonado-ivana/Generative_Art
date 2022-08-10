import { Link, useParams } from 'react-router-dom';
import products from '../data';

const SavedFF = () => {
	// console.log(useParams());
	const { ffId } = useParams();
	const product = products.find((product) => product.id === ffId);
	const { image, name } = product;
	return (
		<div className="section product">
			<h3>Single Flow Field</h3>
			<img src={image} alt={name}></img>
			<h3>{name}</h3>
			<h5>{ffId}</h5>
			<Link to="/user">back to list of flow fields</Link>
		</div>
	);
};

export default SavedFF;
