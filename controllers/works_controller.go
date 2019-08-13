package controllers

import (
	"github.com/gin-gonic/gin"
	"go_heroku_test/db"
	. "go_heroku_test/models"
)

func WorksHandler(c *gin.Context) {
	works := []Work{}
	db.GetDB().Find(&works)
	c.Header("Cache-Control", "no-cache")
	c.HTML(200, "works/index.html", gin.H{
		"works": works,
	})
}
