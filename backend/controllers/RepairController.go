package controllers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateRepair - Controller for creating a new Repair record
func CreateRepair(c *gin.Context) {
	var repair models.Repair
	// Bind the JSON input to the repair struct
	if err := c.ShouldBindJSON(&repair); err != nil {
		// Log the error (optional for debugging purposes)
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	// Set the current date if not provided in the request
	if repair.Date.IsZero() {
		repair.Date = time.Now()
	}

	// Save the repair record into the database
	if err := config.DB.Create(&repair).Error; err != nil {
		// Log the error (optional)
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create repair record"})
		return
	}

	// Send a success response with the created repair data
	c.JSON(http.StatusCreated, gin.H{"status": "success", "data": repair})
}


// GetRepairByID - Get Repair details by ID
func GetRepairByID(c *gin.Context) {
	repairID := c.Param("id")

	var repair models.Repair
	if err := config.DB.First(&repair, "repair_id = ?", repairID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Repair record not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving repair details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": repair})
}

// GetAllRepairs - Get all Repair records
func GetAllRepairs(c *gin.Context) {
	var repairs []models.Repair
	if err := config.DB.Find(&repairs).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving repairs", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": repairs})
}

// UpdateRepair - Update Repair details by ID
func UpdateRepair(c *gin.Context) {
	repairID := c.Param("id")

	var repair models.Repair
	if err := config.DB.First(&repair, "repair_id = ?", repairID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Repair record not found"})
		return
	}

	if err := c.ShouldBindJSON(&repair); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Save(&repair).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update repair details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Repair updated successfully", "data": repair})
}

// DeleteRepair - Delete Repair record by ID
func DeleteRepair(c *gin.Context) {
	repairID := c.Param("id")

	var repair models.Repair
	if err := config.DB.First(&repair, "repair_id = ?", repairID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Repair record not found"})
		return
	}

	if err := config.DB.Delete(&repair).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete repair record"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Repair deleted successfully"})
}
