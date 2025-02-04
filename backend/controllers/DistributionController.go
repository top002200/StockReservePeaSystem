package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
)

// CreateDistribution creates a new distribution
func CreateDistribution(c *gin.Context) {
	var distribution models.Distribution

	// รับข้อมูล JSON และ bind เข้ากับ distribution
	if err := c.ShouldBindJSON(&distribution); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	// ตรวจสอบว่า equipment_id ถูกต้องหรือไม่
	if distribution.EquipmentID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid equipment_id"})
		return
	}

	// ตรวจสอบว่า equipment มีอยู่จริง
	var equipment models.Equipment
	if err := config.DB.First(&equipment, "equipment_id = ?", distribution.EquipmentID).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Equipment not found"})
		return
	}

	// เชื่อมโยงข้อมูล equipment กับ distribution
	distribution.Equipment = equipment
	distribution.EquipmentID = equipment.EquipmentID

	// กำหนด distribution_id ให้ตรงกับ equipment_id
	distribution.DistributionID = distribution.EquipmentID

	// บันทึกข้อมูล distribution
	if err := config.DB.Create(&distribution).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create distribution"})
		return
	}

	// ใช้ Preload เพื่อดึงข้อมูล Equipment ที่เชื่อมโยงกับ Distribution
	if err := config.DB.Preload("Equipment").First(&distribution, distribution.DistributionID).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to load distribution with equipment"})
		return
	}

	// log ผลลัพธ์
	fmt.Printf("Successfully created distribution with Equipment: %+v\n", distribution)

	// ส่งข้อมูลกลับ
	c.JSON(http.StatusOK, gin.H{"status": "success", "data": distribution})
}

// GetAllDistributions retrieves all distributions and preloads the associated equipment
func GetAllDistributions(c *gin.Context) {
	var distributions []models.Distribution
	// Fetch all distributions with the associated Equipment data
	if err := config.DB.Preload("Equipment").Find(&distributions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch distributions"})
		return
	}

	// Return the list of distributions
	c.JSON(http.StatusOK, distributions)
}

// GetDistributionByID retrieves a single distribution by ID, including its equipment data
func GetDistributionByID(c *gin.Context) {
	id := c.Param("id") // Extract the ID from the URL parameters
	var distribution models.Distribution
	// Fetch the distribution by ID and preload its associated equipment
	if err := config.DB.Preload("Equipment").First(&distribution, "distribution_id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Distribution not found"})
		return
	}

	// Return the found distribution
	c.JSON(http.StatusOK, distribution)
}

// UpdateDistribution updates an existing distribution by its ID
func UpdateDistribution(c *gin.Context) {
	id := c.Param("id") // Extract the ID from the URL parameters
	var distribution models.Distribution

	// Find the distribution by ID
	if err := config.DB.First(&distribution, "distribution_id = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Distribution not found"})
		return
	}

	// Bind the new data to the distribution struct
	if err := c.ShouldBindJSON(&distribution); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Save the updated distribution data to the database
	if err := config.DB.Save(&distribution).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update distribution"})
		return
	}

	// Return the updated distribution
	c.JSON(http.StatusOK, distribution)
}

func DeleteDistribution(c *gin.Context) {
	id := c.Param("id") // ดึงค่า id จาก URL

	// ตรวจสอบว่ามีข้อมูลอยู่หรือไม่
	var distribution models.Distribution
	if err := config.DB.First(&distribution, "idfordelete = ?", id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Distribution not found"})
		return
	}

	// ลบข้อมูล
	if err := config.DB.Delete(&models.Distribution{}, "idfordelete = ?", id).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete distribution"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Distribution deleted successfully"})
}

// GetDistributionsByEquipmentID retrieves all distributions for a specific equipment ID
func GetDistributionsByEquipmentID(c *gin.Context) {
	equipmentID := c.Param("equipment_id") // Extract the equipment ID from the URL parameters
	var distributions []models.Distribution

	// Fetch distributions for the given equipment ID
	if err := config.DB.Where("equipment_id = ?", equipmentID).Find(&distributions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch distributions"})
		return
	}

	// Return the list of distributions
	c.JSON(http.StatusOK, distributions)
}
