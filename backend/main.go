package main

import (
	"os"

	"github.com/top002200/stockreversepea/config"
	"github.com/top002200/stockreversepea/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Initialize the database
	config.InitDatabase()

	// Apply CORS middleware globally
	r.Use(CORSMiddleware())

	// Protected routes
	protectedRoutes := r.Group("/")
	{
		// Admin routes
		protectedRoutes.POST("/admin", controllers.CreateAdmin)
		protectedRoutes.GET("/admin/:id", controllers.GetAdminByID)
		protectedRoutes.GET("/admins", controllers.GetAllAdmins)
		protectedRoutes.PUT("/admin/:id", controllers.UpdateAdmin)
		protectedRoutes.DELETE("/admin/:id", controllers.DeleteAdmin)

		// Equipment routes
		protectedRoutes.POST("/equipment", controllers.CreateEquipment)
		protectedRoutes.GET("/equipment/:id", controllers.GetEquipmentByID)
		protectedRoutes.GET("/equipment", controllers.GetAllEquipments)
		protectedRoutes.PUT("/equipment/:id", controllers.UpdateEquipment)
		protectedRoutes.DELETE("/equipment/:id", controllers.DeleteEquipment)

		// BorrowedEquipment routes
		protectedRoutes.POST("/borrowed-equipment", controllers.CreateBorrowedEquipment)
		protectedRoutes.GET("/borrowed-equipment/:id", controllers.GetBorrowedEquipmentByID)
		protectedRoutes.GET("/borrowed-equipments", controllers.GetAllBorrowedEquipments)
		protectedRoutes.PUT("/borrowed-equipment/:id", controllers.UpdateBorrowedEquipment)
		protectedRoutes.DELETE("/borrowed-equipment/:id", controllers.DeleteBorrowedEquipment)

		// Submission routes
		protectedRoutes.POST("/submission", controllers.CreateSubmission)
		protectedRoutes.GET("/submission/:id", controllers.GetSubmissionByID)
		protectedRoutes.GET("/submissions", controllers.GetAllSubmissions)
		protectedRoutes.PUT("/submission/:id", controllers.UpdateSubmission)
		protectedRoutes.DELETE("/submission/:id", controllers.DeleteSubmission)

		// Brand routes
		protectedRoutes.POST("/brand", controllers.CreateBrand)
		protectedRoutes.GET("/brand/:id", controllers.GetBrandByID)
		protectedRoutes.GET("/brands", controllers.GetAllBrands)
		protectedRoutes.PUT("/brand/:id", controllers.UpdateBrand)
		protectedRoutes.DELETE("/brand/:id", controllers.DeleteBrand)

		// Model routes
		protectedRoutes.POST("/model", controllers.CreateModel)
		protectedRoutes.GET("/model/:id", controllers.GetModelByID)
		protectedRoutes.GET("/models", controllers.GetAllModels)
		protectedRoutes.PUT("/model/:id", controllers.UpdateModel)
		protectedRoutes.DELETE("/model/:id", controllers.DeleteModel)

		// Type routes
		protectedRoutes.POST("/type", controllers.CreateType)
		protectedRoutes.GET("/type/:id", controllers.GetTypeByID)
		protectedRoutes.GET("/types", controllers.GetAllTypes)

		// Picture routes
		protectedRoutes.POST("/picture", controllers.CreatePicture)
		protectedRoutes.GET("/picture/:id", controllers.GetPictureByID)
		protectedRoutes.GET("/pictures", controllers.GetAllPictures)
		protectedRoutes.DELETE("/picture/:id", controllers.DeletePicture)

		// Repair routes
		protectedRoutes.POST("/repair", controllers.CreateRepair)
		protectedRoutes.GET("/repair/:id", controllers.GetRepairByID)
		protectedRoutes.GET("/repairs", controllers.GetAllRepairs)
		protectedRoutes.PUT("/repair/:id", controllers.UpdateRepair)
		protectedRoutes.DELETE("/repair/:id", controllers.DeleteRepair)

		// Distribution routes
		protectedRoutes.POST("/distribution", controllers.CreateDistribution)
		protectedRoutes.GET("/distribution/:id", controllers.GetDistributionByID)
		protectedRoutes.GET("/distributions", controllers.GetAllDistributions)
		protectedRoutes.PUT("/distribution/:id", controllers.UpdateDistribution)
		protectedRoutes.DELETE("/distribution/:id", controllers.DeleteDistribution)

	
	}

	// Determine the port to run on
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not set
	}

	// Run the server
	r.Run(":" + port)
}

// CORSMiddleware applies CORS headers to the response
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*") // Allow all origins
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
