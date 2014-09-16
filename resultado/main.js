window.onload = function()
{
	x = 0;
	y = 0;
	speed = 5;
	angle = 0;
	mod = 0;
	id = 0;

	canvas = document.getElementById("canvas");
	context = canvas.getContext("2d");
	car = new Image();
    car.src="myimage.png";

    window.addEventListener("keydown", keypress_handler, false);
    window.addEventListener("keyup", keyup_handler, false);

	var move = setInterval(function()
	{
		draw();
	}, 30);

	/* INÍCIO: Implementação para Aplicação Carro Online */
	var load = setInterval(function()
	{
	 mod = 0;
	 var xhReq = new XMLHttpRequest();
	 xhReq.open("GET", "http://localhost/carro/servidor/busca_movimentos.php?id="+ id, false);
 	 xhReq.send(null);
 	 var serverResponse = xhReq.responseText;
	 json = JSON.parse(serverResponse);

	 for(var i = 0; i < json.length; i++) {
 	   var movimento = json[i];
 	   if(movimento.tipo == 1)  mod = 1;
 	   if(movimento.tipo == 2)  mod = -1;
 	   if(movimento.tipo == 3)  angle -= 5;
 	   if(movimento.tipo == 4)  angle+=5;
       id = movimento.id;
       console.log(movimento.tipo);
	 }
	   

 	}, 2000);
 	/* FIM */


};

function draw()
{
	context = canvas.getContext("2d");
	context.clearRect(0, 0, 800, 800);

	context.fillStyle = "rgb(200, 100, 220)";
	context.fillRect(50, 50, 100, 100);

	x += (speed*mod) * Math.cos(Math.PI/180 * angle);
	y += (speed*mod) * Math.sin(Math.PI/180 * angle);

	context.save();
	context.translate(x, y);
	context.rotate(Math.PI/180 * angle);
	context.drawImage(car, -(car.width/2), -(car.height/2));	
	context.restore();
}

function keyup_handler(event)
{
	if(event.keyCode == 87 || event.keyCode == 83)
	{
		mod = 0;
	}
}

function keypress_handler(event)
{
	console.log(event.keyCode);
	if(event.keyCode == 87)
	{
		mod = 1;
	}
	if(event.keyCode == 83)
	{
		mod = -1;
	}
	if(event.keyCode == 65)
	{
		angle -= 5;
	}
	if(event.keyCode == 68)
	{
		angle+=5;
	}
}