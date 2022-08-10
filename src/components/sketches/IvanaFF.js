import React from 'react';
import Sketch from 'react-p5';

const IvanaFF = () => {
	let canvasWidth = 900;
	let canvasHeight = 900;

	let commenceDrawing = false;
	let drawBtn;
	let canvas;
	let buffer;
	let imageToUpload;
	let saveButton;

	let clear = false;
	let clearBtn;

	let circle = false;
	let circleBtn;

	let nSlider;

	let points = [];
	let density = 10; //change the number of particles on grid

	let angle; //decimal number
	let angleSpeed = 0.005;
	// Moving them up here allows them to be set once and then used in the draw - V
	let r1 = Math.random() * 255;
	let r2 = Math.random() * 255;
	let g1 = Math.random() * 255;
	let g2 = Math.random() * 255;
	let b1 = Math.random() * 255;
	let b2 = Math.random() * 255;

	// ***************************************
	// ***************************************
	function randomIntBetween(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function createPointsRandom(p5) {
		// function randomizes starting points - no longer a grid

		const space = canvasWidth / density;

		for (let x = 0; x < canvasWidth; x += space) {
			for (let y = 0; y < canvasHeight; y += space) {
				let point = p5.createVector(
					x + randomIntBetween(-canvasWidth, canvasWidth),
					y + randomIntBetween(-canvasHeight, canvasHeight)
				);
				points.push(point);
			}
		}
	}

	function drawParticles(p5, points) {
		for (let i = 0; i < points.length; i++) {
			const r = p5.map(points[i].x, 0, p5.width, r2, r1); // replace static values with random color values -- every flow will have different colors
			const g = p5.map(points[i].y, 0, p5.height, g2, g1);
			const b = p5.map(points[i].x, 0, p5.width, b2, b1);
			p5.fill(r, g, b);

			p5.ellipse(points[i].x, points[i].y, 1);
		}
	}

	function createMovement(p5, points) {
		// angleSpeed = p5.random(0.002, 0.001);
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
		if (drawBtn.html().includes('Draw')) {
			commenceDrawing = true;
			drawBtn.html('Pause');
		} else if (drawBtn.html().includes('Pause')) {
			commenceDrawing = false;
			drawBtn.html('Draw');
		}
	}

	function clearCanvas() {
		if (clearBtn.html().includes('Clear')) {
			clear = true;
			drawBtn.html('Draw');
		}
	}

	function drawCircle() {
		if (circleBtn.html().includes('Draw Circle')) {
			circle = true;
		}
	}

	function createCircle(p5, points) {
		// distance between middle of the canvas and point's coordinates
		for (let i = 0; i < points.length; i++) {
			if (
				p5.dist(p5.width / 2, p5.height / 2, points[i].x, points[i].y) < 300
			) {
				p5.ellipse(points[i].x, points[i].y, 1);
			}
		}
	}

	const setup = (p5, canvasParentRef) => {
		canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		p5.background(30);

		createPointsRandom(p5);
		p5.angleMode(p5.DEGREES);
		p5.noiseDetail(1);
		p5.shuffle(points, true);

		drawBtn = p5.createButton('Draw');
		drawBtn.position(p5.windowWidth / 100, 200);
		drawBtn.size(150);
		drawBtn.mousePressed(drawFlowField);

		clearBtn = p5.createButton('Clear');
		clearBtn.position(p5.windowWidth / 100, 250);
		clearBtn.size(150);
		clearBtn.mousePressed(clearCanvas);

		circleBtn = p5.createButton('Draw Circle');
		circleBtn.position(p5.windowWidth / 100, 300);
		circleBtn.size(150);
		circleBtn.mousePressed(drawCircle);

		nSlider = p5.createSlider(10, 900, 200, 50);
		nSlider.position(100, 350);
		nSlider.style('width', '80px');
	};

	const draw = (p5) => {
		p5.noStroke();
		p5.fill(255);
		// createMovement(p5, points);
		// drawParticles(p5, points);

		if (commenceDrawing) {
			createMovement(p5, points);
			drawParticles(p5, points);
		}

		if (clear) {
			points = [];
			createPointsRandom(p5);
			p5.shuffle(points, true);
			p5.clear();

			p5.background(30);
			r1 = Math.random() * 255;
			r2 = Math.random() * 255;
			g1 = Math.random() * 255;
			g2 = Math.random() * 255;
			b1 = Math.random() * 255;
			b2 = Math.random() * 255;

			commenceDrawing = false;

			clear = false;
		}

		if (circle) {
			createCircle(p5, points);
		}
	};

	return (
		<div>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

export default IvanaFF;

//
