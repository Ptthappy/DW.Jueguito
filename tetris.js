//Variables globales

let loop;  //Variable que hace el bucle del juego
let speed;  //La velocidad a la que se mueven los cuadros
let score;  //Puntaje
//let maxScore;  //Esta variable se almacena en un archivo de texto
let level;  //El nivel que sube con el puntaje y define la velocidad
let thrower = true;
let isPlaying;
let pause = true;

let canvas = document.getElementById('tetrisbox');  //get canvas
let w = canvas.width;
let h = canvas.height;
let ctx = canvas.getContext('2d');  //get contexto del canvas

let pauseMenu = document.getElementById('pausemenu');
let gameOverMenu = document.getElementById('gameovermenu');
let doc = document.getElementById('introtetris');

let status = document.getElementById('statusbar');
let sw = status.width;
let sh = status.height;
let sctx = status.getContext('2d');
sctx.font = "lighter small-caps 20px Arial";

const iniSpeed = 1;                 //velocidad de caida inicial
const scaledSpeed = 0.2;              //velocidad obtenida cada vez que se sube de nivel
const toLevelUp = 100;              //cantidad de puntos necesarios para subir cada nivel
const squareSize = 40;              //Variable que define el tamaño constante que tendrán los cuadros
const constScore = 80;

let shapes = [];                    //Cache de figuras para mostrar la figura siguiente y marisqueras
let at = []; 	                    //Arreglo con el que se representará cada posible cuadro del tetris
let destroyer = false;   			//Boolean que se vuelve true cuando la figura en movimiento toca piso

//Clases
class Square { //Instancias de cada cuadrito
	constructor(positionY, positionX) {
		this.positionX = positionX;  //Posición en X
		this.positionY = positionY;  //Posición en Y (con respecto al canvas obviamente)
		this.color = null;
	}

	choqueH() {
		if(this.positionX > w - squareSize || this.positionX < 0)
			return true;
		return false;
	}

	choqueV() {
		if(this.positionY > h - squareSize)
			return true;
		return false;
	}

	choqueObj() {
		for (let i = 0; i < 200; i++) {
			if(at[i] == null)
				continue;
			if (this.positionX == at[i].positionX && this.positionY == at[i].positionY) {
				return true;
			}
		}
		return false;
	}
}

class Shape {
	constructor() {
		this.squares = [];
		this.state = 0;
		this.color = randomColor(Math.floor(Math.random()*6));  //Color daaaaa
	}
	moveV() {
		this.clear(ctx);
		let choque = false;

		for(let i = 0; i < this.squares.length; i++) {
			this.squares[i].positionY += squareSize;
			if(this.squares[i].choqueV() || this.squares[i].choqueObj()) {
				//console.log('choque');
				choque = true;
			}
		}
		if(choque) {
			destroyer = true;
			for(let i = 0; i < this.squares.length; i++) {
				this.squares[i].positionY -= squareSize;
			}
			if (isPlaying) {
				alterShapes();
			}
		}

		this.render(ctx)
	}

	moveRight(doClear, key) {
		if (doClear)
			this.clear(ctx);

		let choque = false;

		for (let i = 0; i < this.squares.length; i++) {
			this.squares[i].positionX += squareSize;
			if(this.squares[i].choqueH() || this.squares[i].choqueObj()) {
				//console.log('choque');
				choque = true;
			}
		}
		if(choque)
			this.moveLeft(false, key);

		render(ctx);

	}

	moveLeft(doClear, key) {
		if (doClear)
			this.clear(ctx);

		let choque = false;

		for (let i = 0; i < this.squares.length; i++) {
			this.squares[i].positionX -= squareSize;
			if(this.squares[i].choqueH() || this.squares[i].choqueObj()) {
				//console.log('choque');
				choque = true;
			}
		}
		if(choque)
			this.moveRight(false, key);

		render(ctx);
	}
	
	render() {
		for(let i = 0; i < this.squares.length; i++) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.squares[i].positionX, this.squares[i].positionY, squareSize, squareSize);
		}
	}

	clear(ctx) {
		for (let i = 0; i < this.squares.length; i++) {
			ctx.clearRect(this.squares[i].positionX, this.squares[i].positionY, squareSize, squareSize);
		}
	}
}

//Instancias de las figuras específicas
class Shape1 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(0, 160), new Square(0, 200), new Square(40, 160), new Square(40, 200)];
	}

	rotate() {
		//console.log('claro ya vas a darle vueltas al cuadrao');
	}
}

class Shape2 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(0, 120), new Square(0, 160), new Square(0, 200), new Square(0, 240)];
	}

	rotate(bol) {
		let choque = false;

		if (bol)
			this.clear(ctx);
		this.state++;

		if (this.state > 3)
			this.state -= 4;
		if (this.state < 0)
			this.state += 4;

		switch(this.state) {				//El cuadro 1 se mantiene constante
			case 0:
				southToWest(this.squares[0]);
				northToEast(this.squares[2]);
				northToEast(this.squares[3]);
				northToEast(this.squares[3]);
				break;

			case 1:
				westToNorth(this.squares[0]);
				eastToSouth(this.squares[2]);
				eastToSouth(this.squares[3]);
				eastToSouth(this.squares[3]);
				break;

			case 2:
				northToEast(this.squares[0]);
				southToWest(this.squares[2]);
				southToWest(this.squares[3]);
				southToWest(this.squares[3]);
				break;

			case 3:
				eastToSouth(this.squares[0]);
				westToNorth(this.squares[2]);
				westToNorth(this.squares[3]);
				westToNorth(this.squares[3]);
				break;

			default:
				throw new DOMException();
		}
		for (let i = 0; i < this.squares.length; i++) {
			if (this.squares[i].choqueObj() || this.squares[i].choqueV() || this.squares[i].choqueH()) {
				choque = true;
				break;
			}
		}
		if (choque && bol)
			for (let i = 0; i < 3; i++)
				this.rotate(false);

		if (bol)
			this.render(ctx);
	}
}

class Shape3 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(40, 200), new Square(0, 160), new Square(0, 200), new Square(0, 240)];
	}

	rotate(bol) {
		let choque = false;

		if (bol)
			this.clear(ctx);
		this.state++;

		if (this.state > 3)
			this.state -= 4;
		if (this.state < 0)
			this.state += 4;

		switch (this.state) {				//El cuadro 2 se mantiene constante
			case 0:
				eastToSouth(this.squares[0]);
				southToWest(this.squares[1]);
				northToEast(this.squares[3]);
				break;

			case 1:
				southToWest(this.squares[0]);
				westToNorth(this.squares[1]);
				eastToSouth(this.squares[3]);
				break;

			case 2:
				westToNorth(this.squares[0]);
				northToEast(this.squares[1]);
				southToWest(this.squares[3]);
				break;

			case 3:
				northToEast(this.squares[0]);
				eastToSouth(this.squares[1]);
				westToNorth(this.squares[3]);
				break;

			default:
				throw new DOMException();
		}
		for (let i = 0; i < this.squares.length; i++) {
			if (this.squares[i].choqueObj() || this.squares[i].choqueV() || this.squares[i].choqueH()) {
				choque = true;
				break;
			}
		}
		if (choque && bol)
			for (let i = 0; i < 3; i++)
				this.rotate(false);

		if (bol)
			this.render(ctx);
	}
}

class Shape4 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(0, 160), new Square(0, 200), new Square(40, 200), new Square(40, 240)];
	}

	rotate(bol) {
		let choque = false;

		if (bol)
			this.clear(ctx);
		this.state++;

		if (this.state > 3)
			this.state -= 4;
		if (this.state < 0)
			this.state += 4;

		switch(this.state) {				//El cuadro 2 se mantiene constante
			case 1:
				toRight(this.squares[0]);
				northToEast(this.squares[1]);
				eastToSouth(this.squares[3]);
				break;

			case 2:
				toDown(this.squares[0]);
				eastToSouth(this.squares[1]);
				southToWest(this.squares[3]);
				break;

			case 3:
				toLeft(this.squares[0]);
				southToWest(this.squares[1]);
				westToNorth(this.squares[3]);
				break;

			case 0:
				toUp(this.squares[0]);
				westToNorth(this.squares[1]);
				northToEast(this.squares[3]);
				break;

			default:
				throw new DOMException();
		}
		for (let i = 0; i < this.squares.length; i++) {
			if (this.squares[i].choqueObj() || this.squares[i].choqueV() || this.squares[i].choqueH()) {
				choque = true;
				break;
			}
		}
		if (choque && bol)
			for (let i = 0; i < 3; i++)
				this.rotate(false);

		if (bol)
			this.render(ctx);
	}
}

class Shape5 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(40, 160), new Square(40, 200), new Square(0, 200), new Square(0, 240)];
	}

	rotate(bol) {
		let choque = false;

		if (bol)
			this.clear(ctx);
		this.state++;

		if (this.state > 3)
			this.state -= 4;
		if (this.state < 0)
			this.state += 4;

		switch(this.state) {				//El cuadro 2 se mantiene constante
			case 1:
				westToNorth(this.squares[0]);
				northToEast(this.squares[2]);
				toDown(this.squares[3]);
				break;

			case 2:
				northToEast(this.squares[0]);
				eastToSouth(this.squares[2]);
				toLeft(this.squares[3]);
				break;

			case 3:
				eastToSouth(this.squares[0]);
				southToWest(this.squares[2]);
				toUp(this.squares[3]);
				break;

			case 0:
				southToWest(this.squares[0]);
				westToNorth(this.squares[2]);
				toRight(this.squares[3]);
				break;

			default:
				throw new DOMException();
		}
		for (let i = 0; i < this.squares.length; i++) {
			if (this.squares[i].choqueObj() || this.squares[i].choqueV() || this.squares[i].choqueH()) {
				choque = true;
				break;
			}
		}
		if (choque && bol)
			for (let i = 0; i < 3; i++)
				this.rotate(false);

		if (bol)
			this.render(ctx);
	}
}

class Shape6 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(40, 160), new Square(0, 160), new Square(0, 200), new Square(0, 240)];
	}

	rotate(bol) {
		let choque = false;

		if (bol)
			this.clear(ctx);
		this.state++;

		if (this.state > 3)
			this.state -= 4;
		if (this.state < 0)
			this.state += 4;

		switch(this.state) {				//El cuadro 2 se mantiene constante
			case 1:
				toUp(this.squares[0]);
				westToNorth(this.squares[1]);
				eastToSouth(this.squares[3]);
				break;

			case 2:
				toRight(this.squares[0]);
				northToEast(this.squares[1]);
				southToWest(this.squares[3]);
				break;

			case 3:
				toDown(this.squares[0]);
				eastToSouth(this.squares[1]);
				westToNorth(this.squares[3]);
				break;

			case 0:
				toLeft(this.squares[0]);
				southToWest(this.squares[1]);
				northToEast(this.squares[3]);
				break;

			default:
				throw new DOMException();
		}
		for (let i = 0; i < this.squares.length; i++) {
			if (this.squares[i].choqueObj() || this.squares[i].choqueV() || this.squares[i].choqueH()) {
				choque = true;
				break;
			}
		}
		if (choque && bol)
			for (let i = 0; i < 3; i++)
				this.rotate(false);

		if (bol)
			this.render(ctx);
	}
}

class Shape7 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(0, 160), new Square(0, 200), new Square(0, 240), new Square(40, 240)];
	}

	rotate(bol) {
		let choque = false;

		if (bol)
			this.clear(ctx);
		this.state++;

		if (this.state > 3)
			this.state -= 4;
		if (this.state < 0)
			this.state += 4;

		switch(this.state) {				//El cuadro 2 se mantiene constante
			case 1:
				toLeft(this.squares[3]);
				westToNorth(this.squares[0]);
				eastToSouth(this.squares[2]);
				break;

			case 2:
				toUp(this.squares[3]);
				northToEast(this.squares[0]);
				southToWest(this.squares[2]);
				break;

			case 3:
				toRight(this.squares[3]);
				eastToSouth(this.squares[0]);
				westToNorth(this.squares[2]);
				break;

			case 0:
				toDown(this.squares[3]);
				southToWest(this.squares[0]);
				northToEast(this.squares[2]);
				break;

			default:
				throw new DOMException();
		}
		for (let i = 0; i < this.squares.length; i++) {
			if (this.squares[i].choqueObj() || this.squares[i].choqueV() || this.squares[i].choqueH()) {
				choque = true;
				break;
			}
		}
		if (choque && bol)
			for (let i = 0; i < 3; i++)
				this.rotate(false);

		if (bol)
			this.render(ctx);
	}
}

//Funciones para realizar la rotación de las figuras
function northToEast(sqr) {
	sqr.positionX += squareSize;
	sqr.positionY += squareSize;
}

function eastToSouth(sqr) {
	sqr.positionX -= squareSize;
	sqr.positionY += squareSize;
}

function southToWest(sqr) {
	sqr.positionX -= squareSize;
	sqr.positionY -= squareSize;
}

function westToNorth(sqr) {
	sqr.positionX += squareSize;
	sqr.positionY -= squareSize;
}

function toUp(sqr) {
	sqr.positionY -= squareSize * 2;
}

function toDown(sqr) {
	sqr.positionY += squareSize * 2;
}

function toRight(sqr) {
	sqr.positionX += squareSize * 2;
}

function toLeft(sqr) {
	sqr.positionX -= squareSize * 2;
}

//Funciones globales
function initialize() {
	ctx.clearRect(0, 0, w, h);
	shapes[0] = null;
	shapes[1] = null;
	speed = iniSpeed;
	score = 0;
	level = 1;
	for (let i = 0; i < 200; i++) {
		at[i] = null;
	}
	if (doc != null) {
		doc.parentNode.removeChild(doc);
		doc = null;
	}
	if (pauseMenu != null)
		pauseMenu.style.display = "none";
	if (gameOverMenu.style.display == 'block')
		gameOverMenu.style.display = 'none';
	isPlaying = true;
	checkShapes();
	iniStatus();
	render();
	frame();
}

function frame() {  //El loop
	loop = setTimeout(function() {
		shapes[0].moveV();
		render();
		requestAnimationFrame(frame);
	}, 1000 / speed);

}

function render() {  //Función que dibuja en el canvas
	shapes[0].render(ctx);
}

disarrange = function(shape) {
	for (let i = 0; i < shape.squares.length; i++) {
		at[(shape.squares[i].positionX / 40) + (shape.squares[i].positionY / 4)] = shape.squares[i];
		at[(shape.squares[i].positionX / 40) + (shape.squares[i].positionY / 4)].color = shape.color;
	}
	shapes[0] = null;
};

alterShapes = function() {
	if (destroyer) {
		destroyer = false;
		thrower = false;
		disarrange(shapes[0]);
		shapes[0] = shapes[1];
		shapes[1] = null;
		checkShapes();
		checkLines();
		showFig();
		gameOver();
		render(ctx);
	}
};

checkShapes = function() {
	for (let i = 0; i < 2; i++) {
		if(shapes[i] == null) {
			shapes[i] = getRandomShape();
		}
	}
};

getRandomShape = function() {
	let random = Math.floor(Math.random() * 5);
	let rand2;
	switch(random) {
		case 0:
			return new Shape1();

		case 1:
			return new Shape2();

		case 2:
			return new Shape3();

		case 3:
			rand2 = Math.floor(Math.random() * 2);
			if(rand2 == 0)
				return new Shape4();
			return new Shape5();

		case 4:
			rand2 = Math.floor(Math.random() * 2);
			if(rand2 == 0)
				return new Shape6();
			return new Shape7();

		default:
			throw new DOMException();
	}
};

function levelUp() {  //Función que se ejecuta cada vez que se sube de nivel
	console.log(score);
	console.log(toLevelUp);
	console.log(level);
	console.log(toLevelUp * level);
	if (score > toLevelUp * level) {
		level++;
		speed += scaledSpeed;
		console.log('Has subido de nivel yay');
	}
}

function gameOver() {
	for (let i = 0; i < shapes[0].squares.length; i++) {
		if (shapes[0].squares[i].choqueObj()) {
			clearTimeout(loop);
			gameOverMenu.style.display= "block";
			isPlaying = false;
		}
	}
}

function pauseGame() {
	isPlaying = false;
	clearTimeout(loop);
	pauseMenu.style.display = "block";
}

function resumeGame() {
	if (isPlaying == false) {
		isPlaying = true;
		frame();
		pauseMenu.style.display = "none";
	}
}

function checkLines() {
	//console.log('ola');
	for (let i = 0; i < 20; i++) {
		for (let j = 0; j < 10; j++) {
			if(at[(i * 10) + j] == null)
				break;
			if (j == 9)
				clearLine(i);
		}
	}
}

function clearLine(line) {  //Función que se ejecuta si hay una linea completa para eliminarla
	score += constScore;
	levelUp();
	//console.log(score);
	ctx.clearRect(0, at[(line * 10)].positionY, w, squareSize);
	for (let i = 0; i < 10; i++) {
		at[(line * 10) + i] = null;
	}

	for (let i = line - 1; i > 0; i--) {
		for (let j = 0; j < 10; j++) {
			if (at[(i * 10) + j] == null)
				continue;
			console.log('a');
			ctx.clearRect(at[(i * 10) + j].positionX, at[(i * 10) + j].positionY, squareSize, squareSize);
			at[((i + 1) * 10) + j] = at[(i * 10) + j];
			at[((i + 1) * 10) + j].positionY += squareSize;
			at[(i * 10) + j] = null;
			ctx.fillStyle = at[((i + 1) * 10) + j].color;
			ctx.fillRect(at[((i + 1) * 10) + j].positionX, at[((i + 1) * 10) + j].positionY, squareSize, squareSize);
		}
	}
}

function throwIt() {
	while (thrower) {
		shapes[0].moveV();
	}
	thrower = true;
}

onkeydown = function(evt) {
	if (isPlaying) {
		switch (evt.keyCode) {
			case 65:
			case 37:
				shapes[0].moveLeft(true, evt.keyCode);
				break;

			case 83:
			case 40:
				shapes[0].moveV();
				break;

			case 68:
			case 39:
				shapes[0].moveRight(true, evt.keyCode);
				break;

			case 69:
			case 38:
				shapes[0].rotate(true);
				break;

			case 81:
			case 16:
				throwIt();
				break;

			case 80:
				pauseGame();
				break;

			default:
		}
	}
	else if(evt.keyCode == 80)
		resumeGame();
};

function randomColor(random) {  //Función genérica que genera un color aleatorio
	switch(random) {
		case 0:
			return '#990505';
		case 1:
			return '#109918';
		case 2:
			return '#1E208A';
		case 3:
			return '#E3D410';
		case 4:
			return '#FF0066';
		case 5:
			return '#1DB8A0';
		default:
			throw new DOMException();
	}
}

//Funciones para el canvas de estado
function showFig() {
	sctx.clearRect(0, 300, w, 150);  //Limpia el sitio donde aparece la figura siguiente
	sctx.clearRect(0, 0, w, 249);   //Limpia el sitio donde va el texto
	sctx.strokeText("Level: " + level, 5, 40);
	sctx.strokeText("Score: " + score, 5, 75);
//	sctx.strokeText("Max Score: " + maxScore, 5, 110);
	sctx.fillStyle = shapes[1].color;
	for(let i = 0; i < shapes[1].squares.length; i++) {
		sctx.fillRect(shapes[1].squares[i].positionX - 102, shapes[1].squares[i].positionY + 345, squareSize, squareSize);
	}
}

function iniStatus() {
	sctx.beginPath();
	sctx.moveTo(0, 300);
	sctx.lineTo(sw, 300);
	sctx.stroke();
	sctx.moveTo(0, 470);
	sctx.lineTo(sw, 470);
	sctx.stroke();
	sctx.closePath();
	showFig();
}

function showHelp() {
	window.href = "www.google.com";
}