package controllers

import (
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

// UpdateSubmission - อัปเดตข้อมูล submission
func UpdateSubmission(c *gin.Context) {
	submissionID := c.Param("id")

	var submission models.Submission
	if err := config.DB.First(&submission, "submission_id = ?", submissionID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"status": "error", "message": "Submission not found"})
		return
	}

	// เก็บค่าข้อมูลเดิมของ SubmittedAt สำหรับการอัปเดตหากยังไม่มีค่า
	originalSubmittedAt := submission.SubmittedAt

	if err := c.ShouldBindJSON(&submission); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": "error", "message": err.Error()})
		return
	}

	// อัปเดต `submitted_at` เป็นเวลาปัจจุบันถ้า `submitted_at` ยังไม่มีค่า
	if originalSubmittedAt.IsZero() && submission.SubmittedAt.IsZero() {
		submission.SubmittedAt = time.Now()
	}

	// อัปเดตข้อมูล submission ในฐานข้อมูล
	if err := config.DB.Save(&submission).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Failed to update submission details"})
		return
	}

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
