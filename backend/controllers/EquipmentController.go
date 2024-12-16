package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateEquipment - Create a new Equipment
func CreateEquipment(c *gin.Context) {
	var equipment models.Equipment

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Create(&equipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create equipment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": equipment})
}

// GetEquipmentByID - Retrieve Equipment by ID
func GetEquipmentByID(c *gin.Context) {
	equipmentID := c.Param("id")

	var equipment models.Equipment
	// Removed Preload("Submissions") as it is no longer relevant
	if err := config.DB.First(&equipment, "equipment_id = ?", equipmentID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Equipment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving equipment details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": equipment})
}

// GetAllEquipments - Retrieve all Equipments
func GetAllEquipments(c *gin.Context) {
	var equipments []models.Equipment

	if err := config.DB.Find(&equipments).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"status":  "error",
			"message": "Error retrieving equipments",
			"error":   err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "success",
		"data":   equipments,
	})
}

// UpdateEquipment - Update an existing Equipment
func UpdateEquipment(c *gin.Context) {
	equipmentID := c.Param("id")

	var equipment models.Equipment
	if err := config.DB.First(&equipment, "equipment_id = ?", equipmentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Equipment not found"})
		return
	}

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Save(&equipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update equipment details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Equipment updated successfully", "data": equipment})
}

// DeleteEquipment - Delete an Equipment by ID
func DeleteEquipment(c *gin.Context) {
	equipmentID := c.Param("id")

	var equipment models.Equipment
	if err := config.DB.First(&equipment, "equipment_id = ?", equipmentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Equipment not found"})
		return
	}

	if err := config.DB.Delete(&equipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete equipment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Equipment deleted successfully"})
}
