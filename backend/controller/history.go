package controller

import (
	"net/http"

	"github.com/MixGaming0959/project02/entity"
	"github.com/gin-gonic/gin"
)

// POST /histories
func CreateHistory(c *gin.Context) {
	var history entity.History
	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := entity.DB().Create(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": history})
}

// GET /history/:id
func GetHistory(c *gin.Context) {
	var history entity.History
	id := c.Param("id")
	if err := entity.DB().Preload("User").Preload("Cart").Preload("DMGLevel").Raw("SELECT * FROM histories WHERE id = ?", id).Find(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": history})
}

// GET /histories
func ListHistorys(c *gin.Context) {
	var histories []entity.History
	if err := entity.DB().Preload("User").Preload("Cart").Preload("Cart.Request").Preload("Cart.Request.User").Preload("DMGLevel").Raw("SELECT * FROM histories").Find(&histories).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": histories})
}

// DELETE /histories/:id
func DeleteHistory(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM histories WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "history not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /histories
func UpdateHistory(c *gin.Context) {
	var history entity.History
	if err := c.ShouldBindJSON(&history); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", history.ID).First(&history); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "history not found"})
		return
	}
	if err := entity.DB().Save(&history).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": history})
}
