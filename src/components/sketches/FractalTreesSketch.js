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

const FractalTreesSketch = () => {
	let storage = getStorage();
	let fileName = 'FF' + new Date().getTime();
	let storageRef = ref(storage, 'images/' + fileName);
	let savedImageBase64;

	function saveImage() {
		// Copy from canvas into buffer
		// (sourceCanvas, sourceX, sourceY, sourceWidth, sourceHeight, bufferX, bufferY, bufferWidth, bufferHeight)
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
				alert('Image Saved!');

				const docRef = addDoc(collection(db, 'images'), {
					imageUrl: url,
				});
				// console.log('Document written with ID: ', docRef.id);
			});
		});
	}

	const canvasWidth = 950;
	const canvasHeight = 650;
	let canvas;
	let buffer;

	let containerDiv;
	let inputDiv;
	let buttonsDiv;

	let clear = false;
	let clearBtn;

	let saveBtn;
	let downloadBtn;

	let numOfLeaves = 20;
	let leavesSlider;
	let currentLeaves;

	let seasonRadio;
	let finalR = 6;
	let finalG = 147;
	let finalB = 1;

	function updateLeaves() {
		numOfLeaves = leavesSlider.value();
		currentLeaves.html(numOfLeaves); //updates the label text
	}

	function changeSeasons() {
		console.log(seasonRadio.selected());
		if (seasonRadio.selected().value === 'Spring') {
			console.log('changing to spring');
			finalR = 220;
			finalG = 120;
			finalB = 170;
		} else if (seasonRadio.selected().value === 'Summer') {
			console.log('changing to summer');
			finalR = 92;
			finalG = 237;
			finalB = 115;
		} else if (seasonRadio.selected().value === 'Fall') {
			console.log('changing to fall');
			finalR = 212;
			finalG = 91;
			finalB = 18;
		} else if (seasonRadio.selected().value === 'Winter') {
			console.log('changing to winter');
			finalR = 240;
			finalG = 240;
			finalB = 240;
		}
	}

	function clearCanvas() {
		clear = true;
	}

	function downloadImage(p5) {
		p5.saveCanvas('flowfield', 'png');
	}

	function createInputFields(p5) {
		containerDiv = p5.createDiv();
		containerDiv.addClass('sketch');

		inputDiv = p5.createDiv();
		inputDiv.addClass('container');

		buttonsDiv = p5.createDiv();
		buttonsDiv.addClass('buttons');

		let leavesSpan = p5.createSpan('Branches'); //Top label
		leavesSpan.addClass('label');
		leavesSlider = p5.createSlider(11, 120, 20, 1);
		leavesSlider.changed(() => {
			p5.loop();
			updateLeaves();
			p5.noLoop();
		});
		currentLeaves = p5.createSpan(numOfLeaves);
		currentLeaves.addClass('label-update');

		seasonRadio = p5.createRadio();
		seasonRadio.addClass('radio-btns');
		seasonRadio.option('Spring');
		seasonRadio.option('Summer');
		seasonRadio.option('Fall');
		seasonRadio.option('Winter');
		seasonRadio.changed(() => {
			p5.loop();
			changeSeasons();
			p5.noLoop();
		});

		clearBtn = p5.createButton('Clear');
		clearBtn.addClass('button');
		clearBtn.mousePressed(() => {
			p5.loop();
			clearCanvas();
		});

		saveBtn = p5.createButton('Save');
		saveBtn.addClass('button');
		saveBtn.mousePressed(saveImage);

		downloadBtn = p5.createButton('Download');
		downloadBtn.addClass('button');
		downloadBtn.mousePressed(() => {
			p5.saveCanvas('flowfield', 'png');
		});

		leavesSpan.parent(inputDiv);
		leavesSlider.parent(inputDiv);
		currentLeaves.parent(inputDiv);
		seasonRadio.parent(inputDiv);

		clearBtn.parent(buttonsDiv);
		saveBtn.parent(buttonsDiv);
		downloadBtn.parent(buttonsDiv);

		buttonsDiv.parent(inputDiv);
		canvas.parent(containerDiv);
		inputDiv.parent(containerDiv);
	}

	const setup = (p5, canvasParentRef) => {
		canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		buffer = p5.createGraphics(canvasWidth, canvasHeight);
		p5.angleMode(p5.DEGREES);

		createInputFields(p5);

		p5.noLoop();
	};

	const draw = (p5) => {
		p5.background(10);

		p5.translate(canvasWidth / 2, canvasHeight / 2 + 300);
		branch(p5, numOfLeaves);

		if (clear) {
			p5.clear();
			p5.background(10);
			clear = false;
			p5.noLoop();
		}
	};

	function branch(p5, len) {
		//length of the branch
		p5.push();
		if (len > 10) {
			p5.strokeWeight(p5.map(len, 10, 100, 1, 15));
			p5.stroke(70, 40, 20);
			p5.line(0, 0, 0, -len);
			p5.translate(0, -len); //move to the end of the branch
			p5.rotate(p5.random(-20, -30));
			branch(p5, len * p5.random(0.7, 0.9));
			p5.rotate(p5.random(50, 60)); // creaete a new branch on the opposite direction
			branch(p5, len * p5.random(0.7, 0.9));
		} else {
			let r = finalR + p5.random(-20, 20);
			let g = finalG + p5.random(-20, 20);
			let b = finalB + p5.random(-20, 20);
			p5.fill(r, g, b, 150);
			// p5.noStroke();

			p5.beginShape();
			for (let i = 45; i < 135; i++) {
				//polar coordinates to only draw part of a circle
				let rad = 15;
				let x = rad * p5.cos(i);
				let y = rad * p5.sin(i);
				p5.vertex(x, y);
			}

			for (let i = 135; i < 45; i++) {
				let rad = 15;
				let x = rad * p5.cos(i);
				let y = rad * p5.sin(-i) + 20; //leaves face the opposite direction
				p5.vertex(x, y);
			}
			p5.endShape(p5.CLOSE);
		}
		p5.pop();
	}

	return (
		<div>
			<Sketch setup={setup} draw={draw} />
		</div>
	);
};

export default FractalTreesSketch;
