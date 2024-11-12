package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateAdmin - Controller สำหรับสร้าง Admin ใหม่
func CreateAdmin(c *gin.Context) {
	var admin models.Admin
	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	if err := config.DB.Create(&admin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": admin})
}

// GetAdminByID - ดึงข้อมูล Admin ตาม ID
func GetAdminByID(c *gin.Context) {
	adminID := c.Param("id")

	var admin models.Admin
	if err := config.DB.First(&admin, "admin_id = ?", adminID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Admin not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving admin details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": admin})
}

// GetAllAdmins - ดึงข้อมูล Admin ทั้งหมด
func GetAllAdmins(c *gin.Context) {
	var admins []models.Admin
	if err := config.DB.Find(&admins).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving admins", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": admins})
}

// UpdateAdmin - อัปเดตข้อมูล Admin
func UpdateAdmin(c *gin.Context) {
	adminID := c.Param("id")

	var admin models.Admin
	if err := config.DB.First(&admin, "admin_id = ?", adminID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Admin not found"})
		return
	}

	if err := c.ShouldBindJSON(&admin); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	// อัปเดตข้อมูล admin ในฐานข้อมูล
	if err := config.DB.Save(&admin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update admin details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Admin updated successfully", "data": admin})
}

// DeleteAdmin - ลบ Admin ตาม ID
func DeleteAdmin(c *gin.Context) {
	adminID := c.Param("id")

	var admin models.Admin
	if err := config.DB.First(&admin, "admin_id = ?", adminID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Admin not found"})
		return
	}

	if err := config.DB.Delete(&admin).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete admin"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Admin deleted successfully"})
}
