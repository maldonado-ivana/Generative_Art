import FlowfieldsSketch from '../components/sketches/FlowfieldsSketch';

const FlowFields = () => {
	return (
		<section className="h-full ">
			<h1 className="pt-20 text-3xl md:text-5xl font-bold text-center text-white ">
				Flow Fields
			</h1>

			<section className="h-full py-0 px-100 self-center">
				<FlowfieldsSketch />
			</section>
		</section>
	);
};

export default FlowFields;
