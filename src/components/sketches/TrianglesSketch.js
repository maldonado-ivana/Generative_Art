import React from 'react';
import Sketch from 'react-p5';
import {
	getStorage,
	ref,
	uploadString,
	getDownloadURL,
} from 'firebase/storage';
import { db } from '../../firebase-config';
import { addDoc, collection } from 'firebase/firestore';
import './Styling.css';

const TrianglesSketch = () => {
	let storage = getStorage();
	let fileName = 'ST' + new Date().getTime();
	let storageRef = ref(storage, 'images/' + fileName);
	let savedImageBase64;

	function saveImage() {
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

		savedImageBase64 = buffer.get().canvas.toDataURL();
		// Function to save image in Firebase Storage and sent url to Firestore
		uploadString(storageRef, savedImageBase64, 'data_url').then((snapshot) => {
			getDownloadURL(storageRef).then((url) => {
				console.log('Uploaded a data_url string!', storageRef);

				const docRef = addDoc(collection(db, 'images'), {
					imageUrl: url,
				});
			});
		});
	}

	const canvasWidth = 900;
	const canvasHeight = 900;
	let canvas;
	let buffer;

	let containerDiv;
	let inputDiv;
	let buttonsDiv;

	let r1 = Math.random() * 255;
	let r2 = Math.random() * 255;
	let g1 = Math.random() * 255;
	let g2 = Math.random() * 255;
	let b1 = Math.random() * 255;
	let b2 = Math.random() * 255;

	let numPointsInput;
	let numPoints = 10000;
	let tri1 = [450, 100];
	let tri2 = [100, 800];
	let tri3 = [800, 800];
	let current = [300, 500];
	let startingPoints = [tri1, tri2, tri3];
	let pointsToDraw = [];
	pointsToDraw.push(current);

	let updateBtn;
	let clear = false;
	let clearBtn;
	let downloadBtn;
	let saveBtn;

	function generateFractalPoints() {
		r1 = Math.random() * 255;
		r2 = Math.random() * 255;
		g1 = Math.random() * 255;
		g2 = Math.random() * 255;
		b1 = Math.random() * 255;
		b2 = Math.random() * 255;

		// run through input field number of times to create points to draw
		for (let i = 0; i < numPoints; i++) {
			let random_point = Math.floor(Math.random() * 3);
			let outerPoint = startingPoints[random_point];
			current = [
				(outerPoint[0] + current[0]) / 2,
				(outerPoint[1] + current[1]) / 2,
			];
			pointsToDraw.push(current);
		}
	}

	function updateNumPoints() {
		numPoints = numPointsInput.value();
		console.log(numPoints);
		pointsToDraw = [];
		generateFractalPoints();
	}

	function drawParticles(p5, points) {
		for (let i = 0; i < points.length; i++) {
			const r = p5.map(points[i][0], 0, canvasWidth, r1, r2); // replace static values with random color values -- every flow will have different colors
			const g = p5.map(points[i][1], 0, canvasHeight, g2, g1);
			const b = p5.map(points[i][0], 0, canvasWidth, b1, b2);

			p5.fill(r, g, b);
			p5.ellipse(points[i][0], points[i][1], 1);
		}
	}

	function downloadImage(p5) {
		p5.saveCanvas('P_Triangle', 'png');
	}

	function clearCanvas() {
		if (clearBtn.html().includes('Clear')) {
			clear = true;
			updateBtn.html('Update');
		}
	}

	function createInputFields(p5) {
		containerDiv = p5.createDiv();
		containerDiv.addClass('sketch');

		inputDiv = p5.createDiv();
		inputDiv.addClass('container');

		buttonsDiv = p5.createDiv();
		buttonsDiv.addClass('buttons');

		numPointsInput = p5.createInput(numPoints);
		numPointsInput.addClass('input-box');

		updateBtn = p5.createButton('Update');
		updateBtn.addClass('button');
		updateBtn.mousePressed(updateNumPoints);

		clearBtn = p5.createButton('Clear');
		clearBtn.addClass('button');
		clearBtn.mousePressed(clearCanvas);

		saveBtn = p5.createButton('Save');
		saveBtn.addClass('button');
		saveBtn.mousePressed(saveImage);

		downloadBtn = p5.createButton('Download');
		downloadBtn.addClass('button');
		downloadBtn.mousePressed(() => {
			p5.saveCanvas('flowfield', 'png');
		});

		updateBtn.parent(buttonsDiv);
		clearBtn.parent(buttonsDiv);
		saveBtn.parent(buttonsDiv);
		downloadBtn.parent(buttonsDiv);

		numPointsInput.parent(inputDiv);
		buttonsDiv.parent(inputDiv);

		canvas.parent(containerDiv);
		inputDiv.parent(containerDiv);
	}

	const setup = (p5, canvasParentRef) => {
		// use parent to render the canvas in this ref
		// (without that p5 will render the canvas outside of your component)
		canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		buffer = p5.createGraphics(canvasWidth, canvasHeight);

		createInputFields(p5);
		generateFractalPoints();
	};

	const draw = (p5) => {
		p5.background(0);
		p5.noStroke();
		p5.fill(255);

		p5.circle(tri1[0], tri1[1], 1);
		p5.circle(tri2[0], tri2[1], 1);
		p5.circle(tri3[0], tri3[1], 1);
		p5.circle(current[0], current[1], 1);

		drawParticles(p5, pointsToDraw);

		if (clear) {
			numPoints = [];
			generateFractalPoints();
			startingPoints = [];
			pointsToDraw = [];
			p5.clear();

			p5.background(0);
			r1 = Math.random() * 255;
			r2 = Math.random() * 255;
			g1 = Math.random() * 255;
			g2 = Math.random() * 255;
			b1 = Math.random() * 255;
			b2 = Math.random() * 255;
		}
	};

	return (
		<div>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

export default TrianglesSketch;
