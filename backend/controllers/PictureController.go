	package controllers

	import (
		"encoding/base64"
		"io/ioutil"
		"net/http"

		"github.com/gin-gonic/gin"
		"github.com/top002200/stockreversepea/config"
		"github.com/top002200/stockreversepea/models"
	)

	// CreatePicture - Save a picture in Base64 format to the database
	func CreatePicture(c *gin.Context) {
		var picture models.Picture

		// Bind JSON to the Picture struct
		if err := c.ShouldBindJSON(&picture); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Validate PictureData
		if picture.PictureData == "" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Picture data is required"})
			return
		}

		// Save the picture to the database
		if err := config.GetDB().Create(&picture).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Picture saved successfully", "data": picture})
	}

	// GetPictureByID - Retrieve a picture by ID
	func GetPictureByID(c *gin.Context) {
		pictureID := c.Param("id")

		var picture models.Picture
		if err := config.GetDB().First(&picture, "picture_id = ?", pictureID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Picture not found"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": picture})
	}

	// GetAllPictures - Retrieve all pictures
	func GetAllPictures(c *gin.Context) {
		var pictures []models.Picture
		if err := config.GetDB().Find(&pictures).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve pictures"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"data": pictures})
	}

	// DeletePicture - Delete a picture by ID
	func DeletePicture(c *gin.Context) {
		pictureID := c.Param("id")

		var picture models.Picture
		if err := config.GetDB().First(&picture, "picture_id = ?", pictureID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Picture not found"})
			return
		}

		if err := config.GetDB().Delete(&picture).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete picture"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Picture deleted successfully"})
	}

	// SaveBase64ToFile - Utility function to save Base64 image as a file
	func SaveBase64ToFile(base64Data, filePath string) error {
		decodedData, err := base64.StdEncoding.DecodeString(base64Data)
		if err != nil {
			return err
		}

		err = ioutil.WriteFile(filePath, decodedData, 0644)
		if err != nil {
			return err
		}

		return nil
	}
