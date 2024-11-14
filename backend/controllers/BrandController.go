package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateBrand - Controller สำหรับสร้าง Brand ใหม่
func CreateBrand(c *gin.Context) {
	var brand models.Brand
	if err := c.ShouldBindJSON(&brand); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Create(&brand).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create brand"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": brand})
}

// GetBrandByID - ดึงข้อมูล Brand ตาม ID
func GetBrandByID(c *gin.Context) {
	brandID := c.Param("id")

	var brand models.Brand
	if err := config.DB.Preload("Models").First(&brand, "brand_id = ?", brandID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Brand not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving brand details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": brand})
}

// GetAllBrands - ดึงข้อมูล Brand ทั้งหมด
func GetAllBrands(c *gin.Context) {
	var brands []models.Brand
	if err := config.DB.Preload("Models").Find(&brands).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving brands", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": brands})
}

// UpdateBrand - อัปเดตข้อมูล Brand
func UpdateBrand(c *gin.Context) {
	brandID := c.Param("id")

	var brand models.Brand
	if err := config.DB.First(&brand, "brand_id = ?", brandID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Brand not found"})
		return
	}

	if err := c.ShouldBindJSON(&brand); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Save(&brand).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update brand details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Brand updated successfully", "data": brand})
}

// DeleteBrand - ลบ Brand ตาม ID
func DeleteBrand(c *gin.Context) {
	brandID := c.Param("id")

	var brand models.Brand
	if err := config.DB.First(&brand, "brand_id = ?", brandID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Brand not found"})
		return
	}

	if err := config.DB.Delete(&brand).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete brand"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Brand deleted successfully"})
}
