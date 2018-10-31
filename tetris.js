//Variables globales
let loop;  //Variable que hace el bucle del juego
let speed;  //La velocidad a la que se mueven los cuadros
let score;  //Puntaje
let maxScore;  //Esta variable se almacena en un archivo de texto
let level = 0;  //El nivel que sube con el puntaje y define la velocidad
let isPlaying = false;  //Variable que determina si se está jugando o no
let squareSize = 40;  //Variable que define el tamaño constante que tendrán los cuadros

let canvas = document.getElementById('tetrisbox');  //get canvas
let w = canvas.width;
let h = canvas.height;
let ctx = canvas.getContext('2d');  //get contexto del canvas

const iniSpeed = 3;      //velocidad de caida inicial
const scaledSpeed = 1;   //velocidad obtenida cada vez que se sube de nivel
const userMov = 5;       //cantidad de pixeles que el jugador se puede mover hacia los lados cada vez que llame a los evento

//Clases
class Square { //Instancias de cada cuadrito
	constructor(positionY, positionX) {
		this.positionX = positionX;  //Posición en X
		this.positionY = positionY;  //Posición en Y
		this.size = 40;  //Tamaño
		this.color = randomColor((Math.random()*6).floor());  //Color daaaaa
	}
}

//Instancias de las figuras específicas
class Shape1 {
	constructor(isInverse) {
		this.squares = [new Square(), new Square(), new Square(), new Square()];
		this.isInverse = isInverse;

		function rotate() {

		}

		function moveVertical() {
			for(let i = 0; i < squares.length; i++) {
				squares[i].positionY += squareSize;
			}
		}
	}
}

class Shape2 extends shape {
	constructor() {
		super();
	}
}

class Shape3 extends shape {
	constructor() {
		super();
	}
}

class Shape4 extends shape {
	constructor() {
		super();
	}
}

class Shape5 extends shape {
	constructor() {
		super();
	}
}

//Funciones globales
function render() {  //Función que dibuja en el canvas
	ctx.clearRect(0, 0, w, h);
	requestAnimationFrame(render());
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

//Literalmente el código ahora sí 100% real
/*No hay nada XDDD*/
/*
Ok pero se supone que haga lo siguiente:
-Primero muestra una pantalla que representa un menú en todo el canvas, con un botón I guess
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







