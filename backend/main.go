package main

import (
	"github.com/MixGaming0959/project02/controller"
	"github.com/MixGaming0959/project02/middlewares"

	"github.com/MixGaming0959/project02/entity"

	"github.com/gin-gonic/gin"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()
	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	{
		router.Use(middlewares.Authorizes())
		{
			// User Routes 1
			router.GET("/users", controller.ListUsers)
			router.GET("/user/:id", controller.GetUser)
			router.POST("/users", controller.CreateUser)
			router.PATCH("/users", controller.UpdateUser)
			router.DELETE("/users/:id", controller.DeleteUser)

			// Request Routes 2
			router.GET("/requests", controller.ListRequests)
			router.GET("/request/:id", controller.GetRequest)
			router.POST("/requests", controller.CreateRequest)
			router.PATCH("/requests", controller.UpdateRequest)
			router.DELETE("/requests/:id", controller.DeleteRequest)

			// Cart Routes 3
			router.GET("/carts", controller.ListCarts)
			router.GET("/cart/:id", controller.GetCart)
			router.POST("/carts", controller.CreateCart)
			router.PATCH("/carts", controller.UpdateCart)
			router.DELETE("/carts/:id", controller.DeleteCart)

			// Room has Device Routes 4
			router.GET("/room_has_devices", controller.ListRoom_has_Devices)
			router.GET("/room_has_device/:id", controller.GetRoom_has_Device)
			router.GET("/room_has_device/room/:id", controller.GetRHD_Device)
			router.POST("/room_has_devices", controller.CreateRoom_has_Device)
			router.PATCH("/room_has_devices", controller.UpdateRoom_has_Device)
			router.DELETE("/room_has_devices/:id", controller.DeleteRoom_has_Device)

			// Device Routes 5
			router.GET("/devices", controller.ListDevices)
			router.GET("/device/:id", controller.GetDevice)
			router.POST("/devices", controller.CreateDevice)
			router.PATCH("/devices", controller.UpdateDevice)
			router.DELETE("/devices/:id", controller.DeleteDevice)

			// History Routes 6
			router.GET("/histories", controller.ListHistorys)
			router.GET("/history/:id", controller.GetHistory)
			router.POST("/histories", controller.CreateHistory)
			router.PATCH("/histories", controller.UpdateHistory)
			router.DELETE("/histories/:id", controller.DeleteHistory)

			// Building Routes 7
			router.GET("/buildings", controller.ListBuildings)
			router.GET("/building/:id", controller.GetBuilding)

			// Room Routes 8
			router.GET("/rooms", controller.ListRooms)
			router.GET("/room/:id", controller.GetRoom)
			router.GET("/rooms/building/:id", controller.GetRoomBuilding)

			// Role Routes 9
			router.GET("/roles", controller.ListRoles)
			router.GET("/role/:id", controller.GetRole)

			// JobType Routes 10
			router.GET("/jobtypes", controller.ListJobTypes)
			router.GET("/jobtype/:id", controller.GetJobType)

			// DMG Level Routes 11
			router.GET("/dmglevels", controller.ListDMGLevels)
			router.GET("/dmglevel/:id", controller.GetDMGLevel)

			// gender Routes 12
			router.GET("/genders", controller.ListGenders)
			router.GET("/gender/:id", controller.GetGender)

			// estimate Routes 13
			router.GET("/estimates", controller.ListEstimates)
			router.GET("/estimate/:id", controller.GetEstimate)

			// Educational_background Routes 14
			router.GET("/educational_backgrounds", controller.ListEducational_backgrounds)
			router.GET("/educational_background/:id", controller.GetEducational_background)

			// brand Routes 15
			router.GET("/brands", controller.ListBrands)
			router.GET("/brand/:id", controller.GetBrand)

			// distributor Routes 16
			router.GET("/distributors", controller.ListDistributors)
			router.GET("/distributor/:id", controller.GetDistributor)

			// type Routes 17
			router.GET("/types", controller.ListTypes)
			router.GET("/type/:id", controller.GetType)
		}

	}
	// Signup User Route
	r.POST("/signup", controller.CreateUser)
	// login User Route
	r.POST("/login", controller.Login)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}
func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
