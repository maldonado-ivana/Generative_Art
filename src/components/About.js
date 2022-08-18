import React from 'react';
// import image from '../assets/image'

const About = () => {
	return (
		<div className="w-full py-16 px-4 mb-20">
			<div className="max-w-[1240px] mx-auto grid md:grid-cols-2">
				<div className="flex flex-col justify-center">
					<h1 className="text-white md:text-5xl sm:text-4xl text-3xl text-center font-bold py-2">
						WHAT IS IT?
					</h1>
				</div>
				<div className="flex flex-col justify-center">
					<p className="text-white md:text-2xl sm:text-1xl text-1xl ">
						Generative Art is a process of algorithmically generating new ideas,
						forms, shapes, colors or patterns.
						<br />
						First, you create rules that provide boundaries for the creation
						process.
						<br /> Then a computer follows those rules to produce new works on
						your behalf.
					</p>
					<p className="text-[#7B9596] text-right font-bold">- AIArtists.org</p>
				</div>
			</div>
		</div>
	);
};

export default About;
