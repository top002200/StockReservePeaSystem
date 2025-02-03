package controllers

import (
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/models"
	"gorm.io/gorm"
)

// CreateSubmission - Controller สำหรับสร้างการส่งงานใหม่
func CreateSubmission(c *gin.Context) {
	var submission models.Submission

	// ผูกข้อมูล JSON กับ struct
	if err := c.ShouldBindJSON(&submission); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "Invalid input"})
		return
	}

	// ถ้าไม่มี `submitted_at` ให้ตั้งเป็นเวลาปัจจุบัน
	if submission.SubmittedAt.IsZero() {
		submission.SubmittedAt = time.Now()
	}

	// บันทึกลงฐานข้อมูล
	if err := config.DB.Create(&submission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to create submission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": submission})
}

// GetSubmissionByID - ดึงข้อมูล submission ตาม ID
func GetSubmissionByID(c *gin.Context) {
	submissionID := c.Param("id")

	var submission models.Submission
	if err := config.DB.First(&submission, "submission_id = ?", submissionID).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Submission not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving submission details"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": submission})
}

// GetAllSubmissions - ดึงข้อมูล submission ทั้งหมด
func GetAllSubmissions(c *gin.Context) {
	var submissions []models.Submission
	if err := config.DB.Find(&submissions).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Error retrieving submissions", "error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "data": submissions})
}



func UpdateSubmission(c *gin.Context) {
	submissionID := c.Param("id")

	// ค้นหาข้อมูล submission จากฐานข้อมูล
	var submission models.Submission
	if err := config.DB.First(&submission, "submission_id = ?", submissionID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Submission not found"})
		return
	}

	// ✅ Log ข้อมูลก่อนอัปเดต
	fmt.Println("🔹 Existing submission:", submission)

	// รับค่าข้อมูลใหม่จาก JSON
	var updatedData models.Submission
	if err := c.ShouldBindJSON(&updatedData); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
		return
	}

	// ✅ อัปเดตเฉพาะฟิลด์ที่ถูกส่งมา
	if updatedData.IsUrgent != 0 { // 🔹 ใช้ `is_urgent` แทน `approval_status`
		submission.IsUrgent = updatedData.IsUrgent
	}
	if updatedData.Type != nil {
		submission.Type = updatedData.Type
	}
	if updatedData.Brand != nil {
		submission.Brand = updatedData.Brand
	}
	if updatedData.Model != nil {
		submission.Model = updatedData.Model
	}
	if updatedData.AssetCode != nil {
		submission.AssetCode = updatedData.AssetCode
	}
	if updatedData.ContractNumber != nil {
		submission.ContractNumber = updatedData.ContractNumber
	}
	if updatedData.TimeStart != nil {
		submission.TimeStart = updatedData.TimeStart
	}
	if updatedData.TimeEnd != nil {
		submission.TimeEnd = updatedData.TimeEnd
	}

	// ✅ Log ข้อมูลที่อัปเดตก่อนบันทึกลงฐานข้อมูล
	fmt.Println("🔹 Updated submission before saving:", submission)

	// ✅ บันทึกข้อมูลที่อัปเดตลงในฐานข้อมูล
	result := config.DB.Save(&submission)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update submission details"})
		return
	}

	// ✅ ตรวจสอบว่ามีข้อมูลถูกอัปเดตหรือไม่
	if result.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": "No records updated"})
		return
	}

	// ✅ ส่งข้อมูลที่อัปเดตกลับไปยัง Frontend
	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Submission updated successfully", "data": submission})
}

// DeleteSubmission - ลบ submission ตาม ID
func DeleteSubmission(c *gin.Context) {
	submissionID := c.Param("id")

	var submission models.Submission
	if err := config.DB.First(&submission, "submission_id = ?", submissionID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Submission not found"})
		return
	}

	if err := config.DB.Delete(&submission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to delete submission"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "success", "message": "Submission deleted successfully"})
}
