//Variables globales
let loop;  //Variable que hace el bucle del juego
let speed;  //La velocidad a la que se mueven los cuadros
let score;  //Puntaje
let maxScore;  //Esta variable se almacena en un archivo de texto
let level = 0;  //El nivel que sube con el puntaje y define la velocidad
let isPlaying = false;  //Variable que determina si se está jugando o no

const iniSpeed = 3;      //velocidad de caida inicial
const scaledSpeed = 1;   //velocidad obtenida cada vez que se sube de nivel
const userMov = 5;       //cantidad de pixeles que el jugador se puede mover hacia los lados cada vez que llame a los evento

let canvas = document.getElementById('tetrisbox');  //get canvas
let w = canvas.width;
let h = canvas.height;
let ctx = canvas.getContext('2d');  //get contexto del canvas

//Clases
class square { //Instancias de cada cuadrito
	constructor() {
		let positionX;  //Posición en X
		let positionY;  //Posición en Y
		const size = 40;  //Tamaño
		let color = randomColor((Math.random()*6).floor());  //Color daaaaa
	}
}

class shape {  //Instancias de las figuras
	
	constructor() {
		let squares[];
		let isInverse;
		function rotate() {  //Función llamada cuando se rota a la derecha

		}

		function fall() {  //Función que cambia su propia posición vertical

		}

		function moveHorizontal() {  //Se mueve pa un lao XDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

		}
	}
}

static class shapeFactory {

}

//Instancias de las figuras específicas
class shape1 extends shape {
	constructor() {
		super();
	}
}

class shape2 extends shape {
	constructor() {
		super();
	}
}

class shape3 extends shape {
	constructor() {
		super();
	}
}

class shape4 extends shape {
	constructor() {
		super();
	}
}

class shape5 extends shape {
	constructor() {
		super();
	}
}

//Funciones globales
function render() {  //Función que dibuja en el canvas
	ctx.clearRect(0, 0, w, h);

}

function frame() {  //El loop

}

function levelUp() {  //Función que se ejecuta cada vez que se sube de nivel

}

function clearLine() {  //Función que se ejecuta si hay una linea completa para eliminarla

}

function put() {  //Función que se ejecuta cuando la figura cae

}

function randomColor(random) {  //Función genérica que genera un color aleatorio
	switch(random) {
		case 0:
			return 'rbg(255, 0, 0)';
		case 1:
			return 'rbg(0, 255, 0)';
		case 2:
			return 'rbg(0, 0, 255)';
		case 3:
			return 'rbg(255, 255, 0)';
		case 4:
			return 'rbg(255, 255, 255)';
		case 5:
			return 'rbg(255, 0, 255)';
		default:
			throw new Exception();
	}
}















