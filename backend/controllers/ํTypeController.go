// controllers/type_controller.go
package controllers

import (
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/models"
	"github.com/top002200/stockreversepea/config" // import config for DB
)

// CreateType สร้างประเภทใหม่
func CreateType(c *gin.Context) {
	var newType models.Type
	if err := c.ShouldBindJSON(&newType); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if result := config.GetDB().Create(&newType); result.Error != nil { // ใช้ config.GetDB() สำหรับการเข้าถึงฐานข้อมูล
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusOK, newType)
}

// GetTypeByID รับข้อมูลประเภทตาม ID
func GetTypeByID(c *gin.Context) {
	id := c.Param("id")
	var typeData models.Type

	if err := config.GetDB().First(&typeData, "type_id = ?", id).Error; err != nil { // ใช้ config.GetDB()
		c.JSON(http.StatusNotFound, gin.H{"error": "Type not found"})
		return
	}

	c.JSON(http.StatusOK, typeData)
}

// GetAllTypes รับข้อมูลประเภททั้งหมด
func GetAllTypes(c *gin.Context) {
	var types []models.Type

	if err := config.GetDB().Find(&types).Error; err != nil { // ใช้ config.GetDB()
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, types)
}
