package main

import (
	"os"

	"github.com/top002200/stockreversepea/controllers"
	// "github.com/top002200/stockreversepea/middlewares"
	"github.com/top002200/stockreversepea/config"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	// Initialize the database
	config.InitDatabase()

	// Apply CORS middleware globally
	// x

	// Public routes
	// publicRoutes := r.Group("/")
	// {
	// 	publicRoutes.POST("/login", controllers.Login)
	// 	// publicRoutes.POST("/signup", controllers.Signup) // หากต้องการเพิ่ม signup
	// }

	// Protected routes
	protectedRoutes := r.Group("/")

	// protectedRoutes.Use(middlewares.AuthMiddleware()) // ใช้ AuthMiddleware ใน protectedRoutes
	{
		// Admin routes
		protectedRoutes.POST("/admin", controllers.CreateAdmin)
		protectedRoutes.GET("/admin/:id", controllers.GetAdminByID)
		protectedRoutes.GET("/admins", controllers.GetAllAdmins)
		protectedRoutes.PUT("/admin/:id", controllers.UpdateAdmin)
		protectedRoutes.DELETE("/admin/:id", controllers.DeleteAdmin)

		// User routes
		protectedRoutes.POST("/equipment", controllers.CreateEquipment)
		protectedRoutes.GET("/equipment/:id", controllers.GetEquipmentByID)
		protectedRoutes.GET("/equipment", controllers.GetAllEquipments)
		protectedRoutes.PUT("/equipment/:id", controllers.UpdateEquipment)
		protectedRoutes.DELETE("/equipment/:id", controllers.DeleteEquipment)

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


	}

	// Determine the port to run on
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not set
	}

	// Run the server
	r.Run(":" + port)
}

// CORSMiddleware is a middleware function that adds CORS headers to the response
// func CORSMiddleware() gin.HandlerFunc {
//     return func(c *gin.Context) {
//         c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
//         c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
//         c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
//         c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH, DELETE")

//         if c.Request.Method == "OPTIONS" {
//             c.AbortWithStatus(204)
//             return
//         }

//         c.Next()
//     }
// }
