const Card = (props) => {
	return (
		<section className="card">
			<h3 className="card-title">{props.artName}</h3>
		</section>
	);
};

export default Card;

// <img src="../images/${props.art.}" alt="Type of art" className="card--image" />
