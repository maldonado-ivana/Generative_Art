import React from 'react';
import TrianglesSketch from '../components/sketches/TrianglesSketch';

const SierpinskiTriangles = () => {
	return (
		<section>
			<h1 className="text-3xl md:text-5xl font-bold text-center text-white ">
				Sierpinski Triangles
			</h1>

			<TrianglesSketch />
		</section>
	);
};

export default SierpinskiTriangles;
