var 

// Sprite vars //

s_pajaro,
s_bg,
s_fg,
s_tuboNorte,
s_tuboSur,
s_texto,
s_puntaje,
s_inicio,
s_botones,
s_numberS,
s_numberB;


function Sprite(img, x, y, width, height) {
	this.img = img;
	this.x = x*2;
	this.y = y*2;
	this.width = width*2;
	this.height = height*2;
};

Sprite.prototype.draw = function(ctx, x, y) {
	ctx.drawImage(this.img, this.x, this.y, this.width, this.height,
		x, y, this.width, this.height);
};


function initSprites(img) {

	s_pajaro = [
		new Sprite(img, 156, 115, 17, 12),
		new Sprite(img, 156, 128, 17, 12),
		new Sprite(img, 156, 141, 17, 12)
	];
	
	s_bg = new Sprite(img,   0, 0, 138, 114);
	s_bg.color = "#70C5CF"; 
	s_fg = new Sprite(img, 138, 0, 112,  56);
	
	s_tuboNorte = new Sprite(img, 251, 0, 26, 200);
	s_tuboSur = new Sprite(img, 277, 0, 26, 200);
	
	s_texto = {
		FlappyBird: new Sprite(img, 59, 114, 96, 22),
		FinJuego:   new Sprite(img, 59, 136, 94, 19),
		Preparado:   new Sprite(img, 59, 155, 87, 22)
	}
	s_botones = {
		Rate:  new Sprite(img,  79, 177, 40, 14),
		Menu:  new Sprite(img, 119, 177, 40, 14),
		Share: new Sprite(img, 159, 177, 40, 14),
		Puntaje: new Sprite(img,  79, 191, 40, 14),
		Ok:    new Sprite(img, 119, 191, 40, 14),
		Start: new Sprite(img, 159, 191, 40, 14)
	}

	s_puntaje  = new Sprite(img, 138,  56, 113, 58);
	s_inicio = new Sprite(img,   0, 114,  59, 49);

	s_numberS = new Sprite(img, 0, 177, 6,  7);
	s_numberB = new Sprite(img, 0, 188, 7, 10);

	
	s_numberS.draw = s_numberB.draw = function(ctx, x, y, num, center, offset) {
		num = num.toString();

		var step = this.width + 2;
		
		if (center) {
			x = center - (num.length*step-2)/2;
		}
		if (offset) {
			x += step*(offset - num.length);
		}

		for (var i = 0, len = num.length; i < len; i++) {
			var n = parseInt(num[i]);
			ctx.drawImage(img, step*n, this.y, this.width, this.height,
				x, y, this.width, this.height)
			x += step;
		}
	}
}