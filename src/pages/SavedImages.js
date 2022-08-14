import { Link } from 'react-router-dom';
import products from '../data';

const SavedImages = () => {
	return (
		<section className="section">
			<h2>Products</h2>
			<div className="images">
				{products.map((product) => {
					console.log(product);
					return (
						<article key={product.id}>
							<h5>{product.name}</h5>
							<Link to={`/user/${product.id}`}>more infor</Link>
						</article>
					);
				})}
			</div>
		</section>
	);
};
export default SavedImages;
