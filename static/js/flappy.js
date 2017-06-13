
var

canvas,
ctx,
width,
height,

fgpos = 0,
frames = 0,
puntaje = 0,
best = localStorage.getItem("best") || 0,


estadoactual,
estados = {
	Inicio: 0, Juego: 1, Puntaje: 2
},

okbtn,


pajaro = {

	x: 60,
	y: 0,

	frame: 0,
	velocidad: 0,
	animacion: [0, 1, 2, 1], 
	rotacion: 0,
	radio: 12,
	gravedad: 0.25,
	_salto: 4.6,

	saltar: function() {
		this.velocidad = -this._salto;
	},

	actualizar: function() {

		var n = estadoactual === estados.Inicio ? 10 : 5;
		this.frame += frames % n === 0 ? 1 : 0;
		this.frame %= this.animacion.length;

		if (estadoactual === estados.Inicio) {
			this.y = height - 280 + 5*Math.cos(frames/10);
			this.rotacion = 0;

		} else {

			this.velocidad += this.gravedad;
			this.y += this.velocidad;

			if (this.y >= height - s_fg.height-10) {
				this.y = height - s_fg.height-10;
				if (estadoactual === estados.Juego) {
					estadoactual = estados.Puntaje;
				}
				this.velocidad = this._salto;
			}

			if (this.velocidad >= this._salto) {

				this.frame = 1;
				this.rotacion = Math.min(Math.PI/2, this.rotacion + 0.3);

			} else {

				this.rotacion = -0.3;

			}
		}
	},

	draw: function(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.rotacion);
		
		var n = this.animacion[this.frame];
		s_pajaro[n].draw(ctx, -s_pajaro[n].width/2, -s_pajaro[n].height/2);

		ctx.restore();
	}
},

tubos = {

	_tubos: [],
	reset: function() {
		this._tubos = [];
	},

	actualizar: function() {
		if (frames % 100 === 0) {
			var _y = height - (s_tuboSur.height+s_fg.height+120+200*Math.random());
			this._tubos.push({
				x: 500,
				y: _y,
				width: s_tuboSur.width,
				height: s_tuboSur.height
			});
		}
		for (var i = 0, len = this._tubos.length; i < len; i++) {
			var p = this._tubos[i];

			if (i === 0) {

				puntaje += p.x === pajaro.x ? 1 : 0;

				var cx  = Math.min(Math.max(pajaro.x, p.x), p.x+p.width);
				var cy1 = Math.min(Math.max(pajaro.y, p.y), p.y+p.height);
				var cy2 = Math.min(Math.max(pajaro.y, p.y+p.height+80), p.y+2*p.height+80);
				var dx  = pajaro.x - cx;
				var dy1 = pajaro.y - cy1;
				var dy2 = pajaro.y - cy2;
				var d1 = dx*dx + dy1*dy1;
				var d2 = dx*dx + dy2*dy2;
				var r = pajaro.radio*pajaro.radio;
				if (r > d1 || r > d2) {
					estadoactual = estados.Puntaje;
				}
			}

			p.x -= 2;
			if (p.x < -p.width) {
				this._tubos.splice(i, 1);
				i--;
				len--;
			}
		}
	},

	draw: function(ctx) {
		for (var i = 0, len = this._tubos.length; i < len; i++) {
			var p = this._tubos[i];
			s_tuboSur.draw(ctx, p.x, p.y);
			s_tuboNorte.draw(ctx, p.x, p.y+80+p.height);
		}
	}
};

function onpress(evt) {

	switch (estadoactual) {

		case estados.Inicio:
			estadoactual = estados.Juego;
			pajaro.saltar();
			break;

		case estados.Juego:
			pajaro.saltar();
			break;

		case estados.Puntaje:
			var mx = evt.offsetX, my = evt.offsetY;

			if (mx == null || my == null) {
				mx = evt.touches[0].clientX;
				my = evt.touches[0].clientY;
			}

			if (okbtn.x < mx && mx < okbtn.x + okbtn.width &&
				okbtn.y < my && my < okbtn.y + okbtn.height
			) {
				tubos.reset();
				estadoactual = estados.Inicio;
				puntaje = 0;
			}
			break;

	}
}

function main() {
	canvas = document.createElement("canvas");

	width = window.innerWidth;
	height = window.innerHeight;

	var evt = "touchstart";
	if (width >= 500) {
		width  = 320;
		height = 480;
		canvas.style.border = "1px solid #000";
		evt = "mousedown";
	}

	document.addEventListener(evt, onpress);

	canvas.width = width;
	canvas.height = height;
	if (!(!!canvas.getContext && canvas.getContext("2d"))) {
		alert("Your browser doesn't support HTML5, please update to latest version");
	}
	ctx = canvas.getContext("2d");

	estadoactual = estados.Inicio;
	document.body.appendChild(canvas);

	var img = new Image();
	img.onload = function() {
		initSprites(this);
		ctx.fillStyle = s_bg.color;

		okbtn = {
			x: (width - s_botones.Ok.width)/2,
			y: height - 200,
			width: s_botones.Ok.width,
			height: s_botones.Ok.height
		}

		run();
	}
	img.src = "static/img/flappy.png";
}

function run() {
	var loop = function() {
		actualizar();
		render();
		window.requestAnimationFrame(loop, canvas);
	}
	window.requestAnimationFrame(loop, canvas);
}

function actualizar() {
	frames++;

	if (estadoactual !== estados.Puntaje) {
		fgpos = (fgpos - 2) % 14;
	} else {
		best = Math.max(best, puntaje);
		localStorage.setItem("best", best);
	}
	if (estadoactual === estados.Juego) {
		tubos.actualizar();
	}

	pajaro.actualizar();
}

function render() {
	ctx.fillRect(0, 0, width, height);
	s_bg.draw(ctx, 0, height - s_bg.height);
	s_bg.draw(ctx, s_bg.width, height - s_bg.height);

	tubos.draw(ctx);
	pajaro.draw(ctx);

	s_fg.draw(ctx, fgpos, height - s_fg.height);
	s_fg.draw(ctx, fgpos+s_fg.width, height - s_fg.height);

	var width2 = width/2; 

	if (estadoactual === estados.Inicio) {
		s_inicio.draw(ctx, width2 - s_inicio.width/2, height - 300);
		s_texto.Preparado.draw(ctx, width2 - s_texto.Preparado.width/2, height-380);

	}
	if (estadoactual === estados.Puntaje) {
		s_texto.FinJuego.draw(ctx, width2 - s_texto.FinJuego.width/2, height-400);
		s_puntaje.draw(ctx, width2 - s_puntaje.width/2, height-340);
		s_botones.Ok.draw(ctx, okbtn.x, okbtn.y);
		s_numberS.draw(ctx, width2-47, height-304, puntaje, null, 10);
		s_numberS.draw(ctx, width2-47, height-262, best, null, 10);

	} else {
		s_numberB.draw(ctx, null, 20, puntaje, width2);

	}
}

main();