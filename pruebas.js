prueba1 = function() {	
	console.log('CULO1');	
	tct.fillStyle = "rgb(0, 0, 0)";
	tct.beginPath();
	tct.moveTo(0, 0);
	tct.lineTo(800, 600);
	tct.stroke();
	tct.closePath();
}

prueba2 = function() {
	console.log('CULO2');
	tct.beginPath();
	tct.fillStyle = 'rgb(242, 249, 73)';
	tct.fillRect(0, 0, 200, 200);
	tct.stroke();
	tct.closePath();
}


prueba3 = function() {
	console.log('CULO3');
	tct.fillStyle = 'rgb(242, 249, 73)';
	tct.arc(100, 100, 50, 0, 1, true);  //no entiendo bien esta basura
	tct.stroke();
}


prueba4 = function() {
	console.log('CULO4');
	tct.fillStyle = 'rgb(255, 0, 0)';
	tct.font = "bold 25px Arial";
	tct.fillText("Hola Mundo", 20, 20);
	tct.strokeText("Hola Mundo otra vez XDDD", 50, 50);
}


prueba5 = function() {
	console.log('CULO5');
	var img = new Image();
	img.src = "C:\\Users\\Ptthappy\\Desktop\\Andresonic.jpg"
	img.onload = function() {
		console.log("ur gay lol");
		tct.drawImage(img, 100, 100, 600, 400);
	}
}


prueba6 = function() {
	console.log('CULO6');
	var grd = tct.createLinearGradient(0, 0, 300, 0);
	grd.addColorStop(0, "rgb(0, 0, 0)");
	grd.addColorStop(1, "rgb(255, 255, 255)");
	tct.fillStyle = grd;
	tct.fillRect(0, 0, 300, 300);

}


var tet = document.getElementById("tetrisbox");
var tct = tet.getContext("2d");

prueba6();















