package controller

import (
	"net/http"

	"github.com/MixGaming0959/project02/entity"
	"github.com/gin-gonic/gin"
)

// POST /requests
func CreateRequest(c *gin.Context) {

	var Request entity.Request
	var Room_has_Device entity.Room_has_Device
	var JobType entity.JobType
	var User entity.User

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 12 จะถูก bind เข้าตัวแปร Request
	if err := c.ShouldBindJSON(&Request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 13 ค้นหา Room_has_Device ด้วย id
	if tx := entity.DB().Where("id = ?", Request.Room_has_Device_ID).First(&Room_has_Device); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found device in room "})
		return
	}

	// 14: ค้นหา JobType ด้วย id
	if tx := entity.DB().Where("id = ?", Request.JobTypeID).First(&JobType); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found JobType"})
		return
	}

	// x: ค้นหา User ด้วย id ขั้นตอนนี้ไม่จำเป็น เพราะมีการเช็คตั้งแต่ ขั้นตอนที่3
	if tx := entity.DB().Where("id = ?", Request.UserID).First(&User); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "not found User"})
		return
	}
	// 15: สร้าง Request
	rq := entity.Request{
		Explain:    Request.Explain,
		Date_Start: Request.Date_Start,

		User:            User,
		Room_has_Device: Room_has_Device,
		JobType:         JobType,
	}

	// 16: บันทึก
	if err := entity.DB().Create(&rq).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": rq})
}

// GET /request/:id
func GetRequest(c *gin.Context) {
	var request entity.Request
	id := c.Param("id")
	if err := entity.DB().Preload("Cart").Preload("Cart.History").Preload("User").Preload("JobType").Preload("Room_has_Device").Raw("SELECT * FROM requests WHERE id = ?", id).Find(&request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}

// GET /requests
func ListRequests(c *gin.Context) {
	var requests []entity.Request
	if err := entity.DB().Preload("Cart").Preload("Cart.History").Preload("Room_has_Device").Preload("Room_has_Device.Device").Preload("Room_has_Device.Room").Preload("Room_has_Device.Room.Building").Raw("SELECT * FROM requests").Find(&requests).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": requests})
}

// DELETE /requests/:id
func DeleteRequest(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM requests WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /requests
func UpdateRequest(c *gin.Context) {
	var request entity.Request
	if err := c.ShouldBindJSON(&request); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", request.ID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request not found"})
		return
	}
	if err := entity.DB().Save(&request).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": request})
}
