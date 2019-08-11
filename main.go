package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
)

func main() {
	port := os.Getenv("PORT")

	router := gin.New()
	router.Use(gin.Logger())
	router.Static("/assets", "./public/assets")
	router.LoadHTMLGlob("templates/*")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl.html", nil)
	})

	if port == "" {
		router.Run()
	} else {
		router.Run(":" + port)
	}
}
