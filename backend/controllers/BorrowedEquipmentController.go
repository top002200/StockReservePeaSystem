package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateBorrowedEquipment - รับข้อมูล BorrowedEquipment พร้อมรูปแบบ Base64
func CreateBorrowedEquipment(c *gin.Context) {
	var borrowedEquipment models.BorrowedEquipment

	// Bind JSON to the BorrowedEquipment struct
	if err := c.ShouldBindJSON(&borrowedEquipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	// Save borrowedEquipment to the database
	if err := config.DB.Create(&borrowedEquipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create borrowed equipment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": borrowedEquipment})
}

// GetBorrowedEquipmentByID - ดึงข้อมูล BorrowedEquipment ตาม ID
func GetBorrowedEquipmentByID(c *gin.Context) {
	borrowedEquipmentID := c.Param("id")

	var borrowedEquipment models.BorrowedEquipment
	if err := config.DB.Preload("Submissions").First(&borrowedEquipment, "borrowed_equipment_id = ?", borrowedEquipmentID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Borrowed Equipment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving borrowed equipment details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": borrowedEquipment})
}

// GetAllBorrowedEquipments - ดึงข้อมูล BorrowedEquipment ทั้งหมด
func GetAllBorrowedEquipments(c *gin.Context) {
    var borrowedEquipments []models.BorrowedEquipment
    if err := config.DB.Preload("Submissions").Find(&borrowedEquipments).Error; err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving borrowed equipments", "error": err.Error()})
        return
    }

    // Log ข้อมูลที่ส่งออกไป
    fmt.Println("Fetched Data:", borrowedEquipments)

    c.JSON(http.StatusOK, gin.H{"status": "success", "data": borrowedEquipments})
}


// UpdateBorrowedEquipment - อัปเดตข้อมูล BorrowedEquipment
func UpdateBorrowedEquipment(c *gin.Context) {
	borrowedEquipmentID := c.Param("id")

	var borrowedEquipment models.BorrowedEquipment
	if err := config.DB.First(&borrowedEquipment, "borrowed_equipment_id = ?", borrowedEquipmentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Borrowed Equipment not found"})
		return
	}

	if err := c.ShouldBindJSON(&borrowedEquipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	// อัปเดตข้อมูล borrowedEquipment ในฐานข้อมูล
	if err := config.DB.Save(&borrowedEquipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update borrowed equipment details"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Borrowed Equipment updated successfully", "data": borrowedEquipment})
}

// DeleteBorrowedEquipment - ลบ BorrowedEquipment ตาม ID
func DeleteBorrowedEquipment(c *gin.Context) {
	borrowedEquipmentID := c.Param("id")

	var borrowedEquipment models.BorrowedEquipment
	if err := config.DB.First(&borrowedEquipment, "borrowed_equipment_id = ?", borrowedEquipmentID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Borrowed Equipment not found"})
		return
	}

	if err := config.DB.Delete(&borrowedEquipment).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete borrowed equipment"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Borrowed Equipment deleted successfully"})
}
