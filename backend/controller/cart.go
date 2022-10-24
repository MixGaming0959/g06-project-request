package controller

import (
	"net/http"

	"github.com/MixGaming0959/project02/entity"
	"github.com/gin-gonic/gin"
)

// POST /carts
func CreateCart(c *gin.Context) {
	var cart entity.Cart
	var user entity.User
	var request entity.Request
	var estimate entity.Estimate
	c.JSON(http.StatusOK, gin.H{"data": cart})

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร Cart

	if err := c.ShouldBindJSON(&cart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9.ค้นหารายการแจ้งซ่อม ด้วย id
	if tx := entity.DB().Where("id = ?", cart.RequestID).First(&request); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "request not found"})
		return
	}

	// 10.ค้นหาประเภทการซ่อมบำรุง ด้วย id
	if tx := entity.DB().Where("id = ?", cart.EstimateID).First(&estimate); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "estimate not found"})
		return
	}

	// 11.ค้นหาไอดีของช่าง ด้วย id
	if tx := entity.DB().Where("id = ?", cart.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	// 12: สร้าง Cart
	cr := entity.Cart{
		Request:   request,        // โยงความสัมพันธ์กับ Entity Request
		Estimate:  estimate,       // โยงความสัมพันธ์กับ Entity Estimate
		User:      user,           // โยงความสัมพันธ์กับ Entity User
		Work_Date: cart.Work_Date, // ตั้งค่าฟิลด์ Work_Date
	}

	// 13: บันทึก
	if err := entity.DB().Create(&cr).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cr})
}

// GET /cart/:id
func GetCart(c *gin.Context) {
	var cart entity.Cart
	id := c.Param("id")
	if err := entity.DB().Preload("Request").Preload("Estimate").Preload("User").Raw("SELECT * FROM carts WHERE id = ?", id).Find(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cart})
}

// GET /carts
func ListCarts(c *gin.Context) {
	var carts []entity.Cart
	if err := entity.DB().Preload("User").Preload("Estimate").Preload("Request").Preload("History").Preload("Request.Room_has_Device").Raw("SELECT * FROM carts").Find(&carts).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": carts})
}

// DELETE /carts/:id
func DeleteCart(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM carts WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /carts
func UpdateCart(c *gin.Context) {
	var cart entity.Cart
	if err := c.ShouldBindJSON(&cart); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", cart.ID).First(&cart); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "cart not found"})
		return
	}
	if err := entity.DB().Save(&cart).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": cart})
}
