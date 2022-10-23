package controller

import (
	"net/http"

	"github.com/MixGaming0959/project02/entity"
	"github.com/gin-gonic/gin"
)

// POST /room_has_devices
func CreateRoom_has_Device(c *gin.Context) {
	var RD entity.Room_has_Device
	var room entity.Room
	var device entity.Device
	var user entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 9 จะถูก bind เข้าตัวแปร RHD
	if err := c.ShouldBindJSON(&RD); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 10: ค้นหา Room ด้วย id
	if tx := entity.DB().Where("id = ?", RD.RoomID).First(&room); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room not found"})
		return
	}

	// 11: ค้นหา Device ด้วย id
	if tx := entity.DB().Where("id = ?", RD.DeviceID).First(&device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "device not found"})
		return
	}

	// 12: ค้นหา user ด้วย id
	if tx := entity.DB().Where("id = ?", RD.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// 13: สร้าง Room has Device
	RHD := entity.Room_has_Device{
		Room:   room,   // โยงความสัมพันธ์กับ Entity Room
		Device: device, // โยงความสัมพันธ์กับ Entity Device
		User:   user,   // โยงความสัมพันธ์กับ Entity User

	}

	// 14: บันทึก
	if err := entity.DB().Create(&RHD).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": RHD})
}

// GET /room_has_device/:id
func GetRoom_has_Device(c *gin.Context) {
	var room_has_device entity.Room_has_Device
	id := c.Param("id")
	if err := entity.DB().Preload("Device").Preload("User").Preload("Room").Preload("Room.Building").Raw("SELECT * FROM room_has_devices WHERE id = ?", id).Find(&room_has_device).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_has_device})
}

// GET /room_has_device/room/:id
func GetRHD_Device(c *gin.Context) {
	var room_has_device []entity.Room_has_Device
	room_id := c.Param("id")
	if err := entity.DB().Preload("Device").Preload("User").Preload("Room").Preload("Room.Building").Raw("SELECT * FROM room_has_devices WHERE room_id = ?", room_id).Find(&room_has_device).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_has_device})
}

// GET /room_has_devices
func ListRoom_has_Devices(c *gin.Context) {
	var rhds []entity.Room_has_Device
	if err := entity.DB().Preload("User").Preload("Device").Preload("Room").Raw("SELECT * FROM room_has_devices").Find(&rhds).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": rhds})
}

// DELETE /room_has_devices/:id
func DeleteRoom_has_Device(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM room_has_devices WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_has_device not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /room_has_devices
func UpdateRoom_has_Device(c *gin.Context) {
	var room_has_device entity.Room_has_Device
	if err := c.ShouldBindJSON(&room_has_device); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", room_has_device.ID).First(&room_has_device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "room_has_device not found"})
		return
	}
	if err := entity.DB().Save(&room_has_device).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": room_has_device})
}
