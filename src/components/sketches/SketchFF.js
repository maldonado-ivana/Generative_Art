import React from 'react';
import Sketch from 'react-p5';

const SketchFF = () => {
	let canvasWidth = 600;
	let canvasHeight = 500;

	let canvas;
	let buffer;
	let imageToUpload;

	let commenceDrawing = false;
	let drawButton;
	let saveButton;

	let points = [];
	let density = 10; //change the number of particles on grid
	// let width;
	// let height;

	let angle; //decimal number
	let angleSpeed = 0.03;
	// Moving them up here allows them to be set once and then used in the draw - V
	let r1 = Math.random() * 255;
	let r2 = Math.random() * 255;
	let g1 = Math.random() * 255;
	let g2 = Math.random() * 255;
	let b1 = Math.random() * 255;
	let b2 = Math.random() * 255;

	function createPointsRandom(p5, width, height) {
		// function randomizes starting points - no longer a grid
		const space = p5.width / density;

		for (let x = 0; x < p5.width; x += space) {
			for (let y = 0; y < p5.height; y += space) {
				let point = p5.createVector(
					x + p5.random(-10, 10),
					y + p5.random(-10, 10)
				);
				points.push(point);
			}
		}
	}

	function drawParticles(p5, points) {
		for (let i = 0; i < p5.width; i++) {
			const r = p5.map(points[i].x, 0, p5.width, r1, r2); // replace static values with random color values -- every flow will have different colors
			const g = p5.map(points[i].y, 0, p5.height, g2, g1);
			const b = p5.map(points[i].x, 0, p5.width, b1, b2);
			p5.fill(r, g, b);

			p5.ellipse(points[i].x, points[i].y, 1);
		}
	}

	function createMovement(p5, points) {
		// angleSpeed = p5.random(0.002, 0.01);
		for (let i = 0; i < points.length; i++) {
			angle = p5.map(
				p5.noise(points[i].x * angleSpeed, points[i].y * angleSpeed),
				0,
				1,
				0,
				720
			);
			points[i].add(p5.createVector(p5.cos(angle), p5.sin(angle)));
		}
	}

	function drawFlowField() {
		if (drawButton.html().includes('Draw')) {
			commenceDrawing = true;
		}
	}

	const setup = (p5, canvasParentRef) => {
		canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		buffer = p5.createGraphics(canvasWidth, canvasHeight);
		p5.background(30);

		createPointsRandom(p5, p5.width, p5.height);
		p5.angleMode(p5.DEGREES);
		p5.noiseDetail(1);
		p5.shuffle(points, true);

		drawButton = p5.createButton('Draw');
		drawButton.position(p5.windowWidth / 2 - 75, 200);
		drawButton.size(150);
		drawButton.mousePressed(drawFlowField);

		saveButton = p5.createButton('Save');
		saveButton.position(p5.windowWidth / 2 - 75, 250);
		saveButton.size(150);
		saveButton.mousePressed(() => {
			buffer.copy(
				canvas,
				0,
				0,
				canvasWidth,
				canvasHeight,

				0,
				0,
				buffer.width,
				buffer.height
			);
			imageToUpload = buffer.get().canvas.toDataURL();
			console.log(imageToUpload);
		});
	};

	const draw = (p5) => {
		p5.noStroke();
		p5.fill(255);

		if (commenceDrawing) {
			createMovement(p5, points);
			drawParticles(p5, points);
		}
	};

	return (
		<div>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

export default SketchFF;
