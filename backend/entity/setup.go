package entity

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {

	return db

}

func SetupDatabase() {

	database, err := gorm.Open(sqlite.Open("sa-65.db"), &gorm.Config{})

	if err != nil {

		panic("failed to connect database")

	}

	// Migrate the schema

	database.AutoMigrate(
		&Role{},
		&Gender{},
		&Position{},
		&JobType{},
		&Status{},
		&Bill{},
		&Cause{},
		&Distributor{},
		&Building{},
		&Room{},

		&User{},
		&Device{},
		&Room_has_Device{},
		&Request{},
		&Cart{},
		&History{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Role{}).Create(&Role{Name: "User"})
	db.Model(&Role{}).Create(&Role{Name: "Tech"})
	db.Model(&Role{}).Create(&Role{Name: "Admin"})
	db.Model(&Gender{}).Create(&Gender{Name: "Male"})
	db.Model(&Gender{}).Create(&Gender{Name: "Female"})
	db.Model(&Position{}).Create(&Position{Position: "A"})
	db.Model(&Position{}).Create(&Position{Position: "B"})

	var male, female Gender
	db.Raw("SELECT * FROM genders WHERE name = ?", "Male").Scan(&male)
	db.Raw("SELECT * FROM genders WHERE name = ?", "Female").Scan(&female)

	var r_user, r_tech, r_admin Role
	db.Raw("SELECT * FROM roles WHERE name = ?", "user").Scan(&r_user)
	db.Raw("SELECT * FROM roles WHERE name = ?", "tech").Scan(&r_tech)
	db.Raw("SELECT * FROM roles WHERE name = ?", "admin").Scan(&r_admin)

	var position Position
	db.Raw("SELECT * FROM Positions WHERE Position = ?", "A").Scan(&position)

	db.Model(&User{}).Create(&User{
		Name:         "Test",
		Email:        "test",
		Phone_number: "0555555555",
		Password:     string(password),
		Role:         r_user,
		Gender:       male,
		Position:     position,
	})

	var user User
	db.Raw("SELECT * FROM users WHERE email = ?", "test@gmail.com").Scan(&user)

	db.Model(&Building{}).Create(&Building{Name: "ตึกA"})
	db.Model(&Building{}).Create(&Building{Name: "ตึกB"})

	var buildingA, buildingB Building
	db.Raw("SELECT * FROM buildings WHERE name = ?", "ตึกA").Scan(&buildingA)
	db.Raw("SELECT * FROM buildings WHERE name = ?", "ตึกB").Scan(&buildingB)

	db.Model(&Room{}).Create(&Room{Name: "ห้องA", Building: buildingA})
	db.Model(&Room{}).Create(&Room{Name: "ห้องB", Building: buildingB})
	db.Model(&Room{}).Create(&Room{Name: "ห้องA1", Building: buildingA})
	db.Model(&Room{}).Create(&Room{Name: "ห้องB1", Building: buildingB})

	db.Model(&JobType{}).Create(&JobType{Name: "ซ่อมคอม"})
	db.Model(&JobType{}).Create(&JobType{Name: "ซ่อมรถ"})

	db.Model(&Device{}).Create(&Device{Name: "เครื่องA"})

}
