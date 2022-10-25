package controller

import (
	"net/http"

	"github.com/MixGaming0959/project02/entity"
	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

// POST /create
func CreateUser(c *gin.Context) {
	var payload SignUpPayload
	// var user entity.User
	var gender entity.Gender
	var role entity.Role
	var educational_background entity.Educational_background

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา gender ด้วย id
	if tx := entity.DB().Where("id = ?", payload.GenderID).First(&gender); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// 10: ค้นหา role ด้วย id
	if tx := entity.DB().Where("id = ?", payload.RoleID).First(&role); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role not found"})
		return
	}

	// 11: ค้นหา Educational_background ด้วย id
	if tx := entity.DB().Where("id = ?", payload.Educational_backgroundID).First(&educational_background); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "educational_background not found"})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}
	//12: สร้าง WatchVideo
	wv := entity.User{
		Role:                   role,                   // โยงความสัมพันธ์กับ Entity Role
		Gender:                 gender,                 // โยงความสัมพันธ์กับ Entity Gender
		Educational_background: educational_background, // โยงความสัมพันธ์กับ Entity Educational_background

		Name:        payload.Name,
		Email:       payload.Email,
		Password:    string(hashPassword),
		Phonenumber: payload.Phonenumber,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": wv})

}

// GET /user/:id
func GetUser(c *gin.Context) {
	var user entity.User
	id := c.Param("id")
	if err := entity.DB().Preload("Role").Raw("SELECT * FROM users WHERE id = ?", id).Find(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}

// GET /users
func ListUsers(c *gin.Context) {
	var users []entity.User
	if err := entity.DB().Preload("Gender").Preload("Role").Preload("Educational_background").Raw("SELECT * FROM users").Find(&users).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": users})
}

// DELETE /users/:id
func DeleteUser(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM users WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /users
func UpdateUser(c *gin.Context) {
	var user entity.User
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if tx := entity.DB().Where("id = ?", user.ID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}
	if err := entity.DB().Save(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": user})
}
