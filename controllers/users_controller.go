package controllers

import (
	"github.com/gin-gonic/gin"
	"go_heroku_test/db"
	. "go_heroku_test/models"
)

func UsersHandler(c *gin.Context) {
	users := []User{}
	db.GetDB().Find(&users)
	c.HTML(200, "users/index.html", gin.H{
		"users": users,
	})
}
