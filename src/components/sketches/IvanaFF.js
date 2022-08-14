import Sketch from 'react-p5';
import {
	getStorage,
	ref,
	uploadString,
	getDownloadURL,
} from 'firebase/storage';
import { db } from '../../firebase-config';
import { addDoc, collection } from 'firebase/firestore';

const IvanaFF = () => {
	let storage = getStorage();
	let fileName = 'ff' + new Date().getTime();
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

				const docRef = addDoc(collection(db, 'images'), {
					imageUrl: url,
				});
				// console.log('Document written with ID: ', docRef.id);
			});
		});
	}
//////////////////////////////////////////////////////////////////////////////////////////
// ****** VARIABLES **********************************	
	let canvasWidth = 900;
	let canvasHeight = 900;
	let canvas;
	let buffer;
	let points = [];
	let density = 80; //changes the number of particles on grid

	let angle; //decimal number
	let angleSpeed; // This changes how the flow field looks (lower number, very flowy, higher number, root like)
	

	let r1 = Math.random() * 255;
	let r2 = Math.random() * 255;
	let g1 = Math.random() * 255;
	let g2 = Math.random() * 255;
	let b1 = Math.random() * 255;
	let b2 = Math.random() * 255;

	
// ****** BUTTONS AND SLIDERS **********************************
	let commenceDrawing = false;
	let drawBtn;
	
	let clear = false;
	let clearBtn;
	
	let circle = false;
	let circleBtn;
	
	let saveButton;
	
// Slider variables here, with the span variables to keep track of current setting
	let angleSpeedSlider;
	let currentSpeed;

	let upperMapSlider;
	let currentMap;
	let upperMapLimit;
	
	let densitySlider;
	let densitySpan;
	let curDensity;

	let radio;
	let noiseDetail = 1;



// ******** FUNCTIONS **********************************	
	function randomIntBetween(min, max) {
		// min and max included
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function createPointsRandom(p5) {
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
			const r = p5.map(points[i].x, 0, p5.width, r1, r2); // replace static values with random color values -- every flow will have different colors
			const g = p5.map(points[i].y, 0, p5.height, g2, g1);
			const b = p5.map(points[i].x, 0, p5.width, b1, b2);
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
				upperMapLimit  // lower value => less curves, higher value => loops galore
			);
			points[i].add(p5.createVector(p5.cos(angle), p5.sin(angle)));
		}
	}
// This function will disable the input option fields when drawing is happening so edits 
// can only be made when the drawing is paused.
	function disableEnableInputFields() {
		if (commenceDrawing) {
			angleSpeedSlider.attribute('disabled', 'true');
			upperMapSlider.attribute('disabled', 'true')
			// densitySlider.attribute('disabled', 'true')
		} else {
			angleSpeedSlider.removeAttribute('disabled');
			upperMapSlider.removeAttribute('disabled');
			// densitySlider.removeAttribute('disabled');
		}
	}

	function drawFlowField() {
		if (drawBtn.html().includes('Draw')) {
			drawBtn.html('Pause');
			commenceDrawing = true;
		} else if (drawBtn.html().includes('Pause')) {
			drawBtn.html('Draw');
			commenceDrawing = false;
		}
		disableEnableInputFields(); // draw/pausing changes happen here
	}

	function updateAngleSpeeed() {
		angleSpeed = angleSpeedSlider.value();
		currentSpeed.html(angleSpeed); //updates the label text used in setup to display current selection value
	}

	function updateUpperMap() {
		upperMapLimit = upperMapSlider.value();
		currentMap.html(upperMapLimit); //updates the label text used in setup to display current value
	}

	function updateSmoothness() { //updates  noise detail value with a radio button
		if (radio.selected().value == 'smooth') {
			console.log('Updating noise detail to be smooth')
			noiseDetail = 1;
		} else if (radio.selected().value == 'not smooth') {
			console.log('Updatig noise detail to not be smooth')
			noiseDetail = 100;
		}
	}

	function clearCanvas() {
		if (clearBtn.html().includes('Clear')) {
			clear = true;
			drawBtn.html('Draw');
		}
	}

	function displayCircle() {
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

	///////////////////////////////////////////////////////////////////
	//   This is where everything happens for creation and drawing
	//////////////////////////////////////////////////////////////////

	const setup = (p5, canvasParentRef) => {
		canvas = p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
		buffer = p5.createGraphics(canvasWidth, canvasHeight);
		p5.background(30);
		
		createPointsRandom(p5, density);
		p5.angleMode(p5.DEGREES);
		p5.noiseDetail(noiseDetail);
		p5.shuffle(points, true);

		let speedSpan = p5.createSpan('Angle-Speed'); //Top label
		speedSpan.position(100, 130)
		angleSpeedSlider = p5.createSlider(0, 0.1, 0.01, 0.001)
		angleSpeedSlider.position(100, 150)
		angleSpeedSlider.size(240)
 		angleSpeedSlider.input(updateAngleSpeeed); //calls the method above when the slider value changes
		// Updates the current value of the label
		currentSpeed = p5.createSpan(angleSpeed) 
		currentSpeed.position(100, 170)

		let mapSpan = p5.createSpan('Y-Offset');
		mapSpan.position(100,230)
		upperMapSlider = p5.createSlider(0, 5000, 500, 1)
		upperMapSlider.position(100, 250)
		upperMapSlider.size(240)
		upperMapSlider.input(updateUpperMap) //calls the method above when the slider value changes
		//updates the current value label
		currentMap = p5.createSpan(upperMapLimit)
		currentMap.position(100, 270)

		radio = p5.createRadio()
		radio.position(p5.windowWidth / 100, 450) //I added the windowWidth part
		radio.option('smooth')
		radio.option('not smooth')
		radio.selected('smooth')
		radio.changed(updateSmoothness)

		drawBtn = p5.createButton('Draw');
		drawBtn.position(p5.windowWidth / 100, 380);
		drawBtn.size(150);
		drawBtn.mousePressed(drawFlowField);

		clearBtn = p5.createButton('Clear');
		clearBtn.position(p5.windowWidth / 100, 250);
		clearBtn.size(150);
		clearBtn.mousePressed(clearCanvas);

		circleBtn = p5.createButton('Draw Circle');
		circleBtn.position(p5.windowWidth / 100, 300);
		circleBtn.size(150);
		circleBtn.mousePressed(displayCircle);

		saveButton = p5.createButton('Save Image');
		saveButton.position(p5.windowWidth / 100, 350);
		saveButton.size(150);
		saveButton.mousePressed(saveImage);
	};

	const draw = (p5) => {
		p5.noStroke();
		p5.noiseDetail(noiseDetail)
		// p5.fill(255);

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
