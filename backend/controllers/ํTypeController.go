// controllers/type_controller.go
package controllers

import (
	"fmt"
	"time"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/models"
	"github.com/top002200/stockreversepea/config" // import config for DB
)

// CreateType สร้างประเภทใหม่
// CreateType เพิ่มประเภทใหม่หากยังไม่มีอยู่ในระบบ
func CreateType(c *gin.Context) {
	var input struct {
		TypeName string `json:"type_name" binding:"required"`
	}

	// รับข้อมูล JSON ที่ส่งมา
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// ตรวจสอบว่ามีประเภทนี้อยู่แล้วหรือไม่
	var existingType models.Type
	if err := config.GetDB().Where("type_name = ?", input.TypeName).First(&existingType).Error; err == nil {
		// ถ้าพบข้อมูลประเภทเดิม ให้ส่งคืนโดยไม่เพิ่มใหม่
		c.JSON(http.StatusOK, existingType)
		return
	}

	// ถ้าไม่พบ ให้เพิ่มประเภทใหม่
	newType := models.Type{
		TypeID:   generateUUID(), // ใช้ UUID หรือสร้าง ID อัตโนมัติ
		TypeName: input.TypeName,
		Amount:   0, // ค่าเริ่มต้น
	}

	if err := config.GetDB().Create(&newType).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "ไม่สามารถเพิ่มประเภทได้"})
		return
	}

	c.JSON(http.StatusOK, newType)
}

// ฟังก์ชันช่วยสร้าง UUID (ใช้ timestamp หรือ library เช่น github.com/google/uuid)
func generateUUID() string {
	return fmt.Sprintf("%d", time.Now().UnixNano()) // ใช้ timestamp เป็น id
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


