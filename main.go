package main

import (
	"net/http"
	"os"
	"strings"

	"github.com/gin-contrib/multitemplate"
	"github.com/gin-gonic/gin"
	_ "github.com/heroku/x/hmetrics/onload"
	"github.com/mattn/go-zglob"

	"go_heroku_test/controllers"
)

func main() {
	port := os.Getenv("PORT")

	router := gin.New()
	router.Use(gin.Logger())

	router.Static("/assets", "./dst/assets")
	router.HTMLRender = loadTemplates()

	router.GET("/", func(c *gin.Context) {
		c.Header("Cache-Control", "no-cache")
		c.HTML(http.StatusOK, "index.html", nil)
	})
	router.GET("/users", controllers.UsersHandler)

	if port == "" {
		router.Run()
	} else {
		router.Run(":" + port)
	}
}

func loadTemplates() multitemplate.Renderer {
	r := multitemplate.NewRenderer()

	layouts, err := zglob.Glob("dst/tmpl/layouts/**/*.html")
	if err != nil {
		panic(err.Error())
	}

	includes, err := zglob.Glob("dst/tmpl/includes/**/*.html")
	if err != nil {
		panic(err.Error())
	}

	// Generate our templates map from our layouts/ and includes/ directories
	for _, include := range includes {
		layoutCopy := make([]string, len(layouts))
		copy(layoutCopy, layouts)
		files := append(layoutCopy, include)
		r.AddFromFiles(strings.Replace(include, "dst/tmpl/includes/", "", -1), files...)
	}
	return r
}
