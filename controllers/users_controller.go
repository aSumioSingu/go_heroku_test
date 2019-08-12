package controllers

import (
	"github.com/gin-gonic/gin"
)

func UsersHandler(c *gin.Context) {
	c.Header("Cache-Control", "no-cache")
	c.HTML(200, "users/index.html", nil)
}
