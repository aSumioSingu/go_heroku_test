package db

import (
	"os"

    "github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
    _ "github.com/jinzhu/gorm/dialects/postgres"
)

var (
    db  *gorm.DB
    err error
)

// Init is initialize db from main function
func Init() {
	database_url := os.Getenv("DATABASE_URL")
	var err interface{}
	if database_url != "" {
		db, err = gorm.Open("postgres", database_url)
	} else {
		db, err = gorm.Open("sqlite3", "development.db")
	}
	if err != nil {
		panic(err)
	}
}

func Close() {
	db.Close()
}

// GetDB is called in models
func GetDB() *gorm.DB {
    return db
}
