import React from 'react';
import Typed from 'react-typed';

const Hero = () => {
	return (
		<div className="text-white">
			<div className="max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center">
				<h1 className="md:text-7xl sm:text-6xl text-4xl font-bold md:py-6">
					Generative Art.
				</h1>
				<div className="flex justify-center items-center">
					<Typed
						className=" text-gray-500 md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2"
						strings={['Flow Fields', 'Fractal Trees', 'Noise Loops']}
						typeSpeed={120}
						backSpeed={140}
						showCursor={false}
						loop
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
