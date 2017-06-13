<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">

	<title>FlappyGo</title>

	<script src="static/js/sprite.js"></script>
	
	<style>

	footer {
      width: 960px;
      margin-left: auto;
      margin-right: auto;
    }

    footer {
      line-height: 1.8;
      text-align: center;
      padding: 520px 0 0px;
      color: #999;
    }

    a {
      color: #5882FA;
      text-decoration: none;
    }
    
    .titulo{
    	text-align: center;
    }

    .enlace{
    	text-align: center;
    }

	canvas {
		display: block;
		position: absolute;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	</style>
</head>
<body>
	<h3 class="titulo">Flappy Bird</h3>
	<div class="enlace">
		<a href="index">{{.Volver}}</a>
	</div>
	<script src="static/js/flappy.js"></script>
	<footer>
    <div class="author">
      Web Oficial:
      <a href="http://{{.Website}}">{{.Website}}</a> /
      Creador:
      <a href="mailto:{{.EmailName}}">{{.EmailName}}</a> /
      Contacto:
      <a class="email" href="mailto:{{.Email}}">{{.Email}}</a>
    </div>
  </footer>
</body>
</html>
