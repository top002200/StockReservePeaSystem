package config

import (
	"log"
	"os"

	"github.com/top002200/stockreversepea/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDatabase initializes the SQLite database connection and performs schema migrations
func InitDatabase() {
	var err error

	// Use DATABASE_PATH environment variable or default to "./test.db"
	dbPath := os.Getenv("DATABASE_PATH")
	if dbPath == "" {
		dbPath = "./test.db"
	}

	// Open SQLite database connection
	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	} else {
		log.Println("Database connection successful")
	}

	// Run AutoMigrate for all models
	err = DB.AutoMigrate(
		&models.Admin{}, 
		&models.Equipment{}, 
		&models.Submission{}, 
		&models.Brand{}, 
		&models.Model{}, 
		&models.Type{}, 
		&models.Picture{},
		&models.BorrowedEquipment{},
		&models.Repair{}, // Added Repair model for migration
	)
	if err != nil {
		log.Fatal("Failed to migrate database schema:", err)
	}
}

// GetDB returns the database instance
func GetDB() *gorm.DB {
	return DB
}
