package routers

import (
	"gowepapp/controllers"
	"github.com/astaxie/beego"
)

func init() {
    beego.Router("/", &controllers.MainController{})
    beego.Router("/index", &controllers.MainController{}, "get:GoWepApp")
    beego.Router("/Flappy", &controllers.MainController{}, "get:Flappy")
}
