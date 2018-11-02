//Variables globales
let loop;  //Variable que hace el bucle del juego
let speed;  //La velocidad a la que se mueven los cuadros
let score;  //Puntaje
let maxScore;  //Esta variable se almacena en un archivo de texto
let level = 0;  //El nivel que sube con el puntaje y define la velocidad

let canvas = document.getElementById('tetrisbox');  //get canvas
let w = canvas.width;
let h = canvas.height;
let ctx = canvas.getContext('2d');  //get contexto del canvas

const iniSpeed = 3;                 //velocidad de caida inicial
const scaledSpeed = 1;              //velocidad obtenida cada vez que se sube de nivel
const userMov = 5;                  //cantidad de pixeles que el jugador se puede mover hacia los lados cada vez que llame a los evento
const toLevelUp = 100;              //cantidad de puntos necesarios para subir cada nivel
const pointsPerSquare = 2;          //cantidad de puntos conseguidos por eliminar cada cuadro
const squareSize = 40;              //Variable que define el tamaño constante que tendrán los cuadros

let shapes = [];                    //Cache de figuras para mostrar la figura siguiente y marisqueras
let squares = [];                   //Arreglo con el que se representará cada posible cuadro del tetris

//Clases
class Square { //Instancias de cada cuadrito
	constructor(positionY, positionX) {
		this.positionX = positionX;  //Posición en X
		this.positionY = positionY;  //Posición en Y (con respecto al canvas obviamente)
		this.color = randomColor(Math.floor(Math.random()*6));  //Color daaaaa
	}

	choqueH(obj) {
		if(this.positionX > w || this.positionX < 0)
			return false;
		return true;
	}

	choqueV(obj) {

	}
}

class Shape {
	constructor() {
		this.squares = [];
	}
	moveV() {
		this.clear(ctx);

		for(let i = 0; i < this.squares.length; i++) {
			this.squares[i].positionY += squareSize;
			console.log(this.squares[i].positionX);
		}

		this.render(ctx)
	}

	moveH(key) {
		this.clear(ctx);

		if(key == "a" || key == "A") {
			for (let i = 0; i < this.squares.length; i++) {
				this.squares[i].positionX -= squareSize;
			}
		}
		else {
			for (let i = 0; i < this.squares.length; i++) {
				this.squares[i].positionX += squareSize;
			}
		}
		render(ctx);

	}
	
	render(ctx) {
		for(let i = 0; i < this.squares.length; i++) {
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
		this.squares = [new Square(-80, 160), new Square(-80, 200), new Square(-40, 160), new Square(-40, 200)];
	}

	rotate() {

	}

}

class Shape2 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(-40, 120), new Square(-40, 160), new Square(-40, 200), new Square(-40, 240)];
	}

	rotate() {

	}
}

class Shape3 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(-40, 200), new Square(-80, 160), new Square(-80, 200), new Square(-80, 240)];
	}

	rotate() {

	}
}

class Shape4 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(-80, 160), new Square(-80, 200), new Square(-40, 200), new Square(-40, 240)];
	}

	rotate() {

	}
}

class Shape5 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(-40, 160), new Square(-40, 200), new Square(-80, 200), new Square(-80, 240)];
	}

	rotate() {

	}
}

class Shape6 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(-40, 160), new Square(-80, 160), new Square(-80, 200), new Square(-80, 240)];
	}

	rotate() {

	}
}

class Shape7 extends Shape {
	constructor() {
		super();
		this.squares = [new Square(-80, 160), new Square(-80, 200), new Square(-80, 240), new Square(-40, 240)];
	}

	rotate() {

	}
}

//Funciones globales
function render() {  //Función que dibuja en el canvas
	shapes[0].render(ctx);
}

culo = new Shape7();
function frame() {  //El loop
	setTimeout(function() {
		shapes[0].moveV();
		render();
		loop = requestAnimationFrame(frame);
		//alterShapes();
	}, 500);
}

/*alterShapes = function() {
	if (shapes[0].stopped) {
		turnIntoSquares();
		checkShapes();
	}
};
*/
checkShapes = function() {
	for (let i = 0; i < 2; i++) {
		if(shapes[i] == null)
			shapes[i] = getRandomShape();
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
}

function levelUp() {  //Función que se ejecuta cada vez que se sube de nivel

}

function clearLine() {  //Función que se ejecuta si hay una linea completa para eliminarla

}

function put() {  //Función que se ejecuta cuando la figura cae

}

function initialize() {
	speed = iniSpeed;
	score = 0;
	level = 1;
	checkShapes();
	frame();
}

onkeypress = function(evt) {
	switch(evt.key) {
		case "A":
		case "a":
			shapes[0].moveH(evt.key);
			break;

		case "S":
		case "s":
			shapes[0].moveV();
			break;

		case "D":
		case "d":
			shapes[0].moveH(evt.key);
			break;

		case "E":
		case "e":
			//Rotar de forma horaria
			break;

		case "Q":
		case "q":
			//Tirar la figura al piso
			break;

		default:
	}
};


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
			console.log(random);
			throw new DOMException();
	}
}

//Literalmente el código ahora sí 100% real
initialize();
/*
Ok pero se supone que haga lo siguiente:
-Primero muestra una pantalla que representa un menú en to do el canvas, con un botón I guess
-Después de esa pantalla se muestra la pantalla del juego con la barra de estado a un lado
-Van a haber 6 botones de listeners básicos (Es decir podrían haber más), que van a ser wasd para el movimiento, y <- y -> para rotar la 
figura
-A medida que el jugador juega se va subiendo de nivel (Ganando puntikos)
-Cuando la función de caida del cubo se de cuenta de que hay un cuadro que abarca el pixel vertical 0 debe salir una función que ejecute 
un game over (El cual puede que sea otro menucito gei)
-Al final se tendrá algo para almacenar el puntaje máximo (maxScore), si fuese un programa de Java se almacenaría en un archivo de texto
pero aja como es Javascript supongo que se almacena en un JSON o que coño e la madre sé yo

---ADICIONALES---
-Hacer un menú de inicio y un menú de pausa DECENTE
-Agregar listener para pausa o para funciones especiales (o sea pausa xddddddddddd No se me ocurre nada más)
-Que los cuadros se vean burde finos (porque en mi mente me los imagino más feos quer coño)
-Utilizar un gradiente para el contenedor del canvas para que cambie entre los colores del arcoiris pero con una base dominante negra,
suena muy kchuo ps
*/
