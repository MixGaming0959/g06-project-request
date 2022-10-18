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
			// User Routes
			r.GET("/users", controller.ListUsers)
			r.GET("/user/:id", controller.GetUser)
			r.POST("/users", controller.CreateUser)
			r.PATCH("/users", controller.UpdateUser)
			r.DELETE("/users/:id", controller.DeleteUser)

			// Request Routes
			r.GET("/requests", controller.ListRequests)
			r.GET("/request/:id", controller.GetRequest)
			r.POST("/requests", controller.CreateRequest)
			r.PATCH("/requests", controller.UpdateRequest)
			r.DELETE("/requests/:id", controller.DeleteRequest)

			// Cart Routes
			r.GET("/carts", controller.ListCarts)
			r.GET("/cart/:id", controller.GetCart)
			r.POST("/carts", controller.CreateCart)
			r.PATCH("/carts", controller.UpdateCart)
			r.DELETE("/carts/:id", controller.DeleteCart)

			// Room has Device Routes
			r.GET("/room_has_devices", controller.ListRoom_has_Devices)
			r.GET("/room_has_device/:id", controller.GetRoom_has_Device)
			r.POST("/room_has_devices", controller.CreateRoom_has_Device)
			r.PATCH("/room_has_devices", controller.UpdateRoom_has_Device)
			r.DELETE("/room_has_devices/:id", controller.DeleteRoom_has_Device)

			// Device Routes
			r.GET("/devices", controller.ListDevices)
			r.GET("/device/:id", controller.GetDevice)
			r.POST("/devices", controller.CreateDevice)
			r.PATCH("/devices", controller.UpdateDevice)
			r.DELETE("/devices/:id", controller.DeleteDevice)

			// History Routes
			r.GET("/historys", controller.ListHistorys)
			r.GET("/history/:id", controller.GetHistory)
			r.POST("/historys", controller.CreateHistory)
			r.PATCH("/historys", controller.UpdateHistory)
			r.DELETE("/historys/:id", controller.DeleteHistory)

			// Get
			r.GET("/buildings", controller.ListBuildings)
			r.GET("/building/:id", controller.GetBuilding)
			r.GET("/rooms", controller.ListRooms)
			r.GET("/room/:id", controller.GetRoom)
			r.GET("/rooms/building/:id", controller.GetRoomBuilding)

			r.GET("/roles", controller.ListRoles)
			r.GET("/role/:id", controller.GetRole)
			r.GET("/statuss", controller.ListStatuss)
			r.GET("/status/:id", controller.GetStatus)
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
