package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateModel - Controller สำหรับสร้าง Model ใหม่
func CreateModel(c *gin.Context) {
	var model models.Model
	if err := c.ShouldBindJSON(&model); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Create(&model).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create model"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": model})
}

// GetModelByID - ดึงข้อมูล Model ตาม ID
func GetModelByID(c *gin.Context) {
	modelID := c.Param("id")

	var model models.Model
	if err := config.DB.First(&model, "model_id = ?", modelID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Model not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving model details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": model})
}

// GetAllModels - ดึงข้อมูล Model ทั้งหมด
func GetAllModels(c *gin.Context) {
	var models []models.Model
	if err := config.DB.Find(&models).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving models", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": models})
}

// UpdateModel - อัปเดตข้อมูล Model
func UpdateModel(c *gin.Context) {
	modelID := c.Param("id")

	var model models.Model
	if err := config.DB.First(&model, "model_id = ?", modelID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Model not found"})
		return
	}

	if err := c.ShouldBindJSON(&model); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Save(&model).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update model details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Model updated successfully", "data": model})
}

// DeleteModel - ลบ Model ตาม ID
func DeleteModel(c *gin.Context) {
	modelID := c.Param("id")

	var model models.Model
	if err := config.DB.First(&model, "model_id = ?", modelID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Model not found"})
		return
	}

	if err := config.DB.Delete(&model).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete model"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Model deleted successfully"})
}
