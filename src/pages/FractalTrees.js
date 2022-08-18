import React from 'react';
import FractalTreesSketch from '../components/sketches/FractalTreesSketch';

const SierpinskiTriangles = () => {
	return (
		<section>
			<h1 className="pt-20 text-3xl md:text-5xl font-bold text-center text-white ">
				Sierpinski Triangle
				<FractalTreesSketch />
			</h1>
		</section>
	);
};

export default SierpinskiTriangles;
