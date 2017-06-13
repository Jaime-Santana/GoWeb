package controllers

import (
	"github.com/astaxie/beego"
)

type MainController struct {
	beego.Controller
}

func (c *MainController) Get() {
	c.Data["Website"] = "beego.me"
	c.Data["Email"] = "astaxie@gmail.com"
	c.TplName = "index.tpl"
}

func (main *MainController) GoWepApp() {
    main.Data["Website"] = "localhost:8080/index"
    main.Data["Email"] = "jsantanas@correo.udistrital.edu.co"
    main.Data["EmailName"] = "Jaime Santana 20132020212"
    main.TplName = "index.tpl"
}

func (main *MainController) Flappy() {
    main.Data["Website"] = "localhost:8080/index"
    main.Data["Email"] = "jsantanas@correo.udistrital.edu.co"
    main.Data["EmailName"] = "Jaime Santana 20132020212"
    main.Data["Volver"] = "<<Volver"
    main.TplName = "default/Flappy.tpl"
}