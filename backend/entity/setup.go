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
		&Educational_background{},
		&JobType{},
		&Distributor{},
		&Building{},
		&Room{},
		&User{},
		&Device{},
		&Room_has_Device{},
		&Request{},
		&Cart{},
		&History{},
		&DMGLevel{},
		&Estimate{}, // 15
		&Brand{},
		&Type{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	db.Model(&Role{}).Create(&Role{Name: "User"})
	db.Model(&Role{}).Create(&Role{Name: "Tech"})
	db.Model(&Role{}).Create(&Role{Name: "Admin"})
	db.Model(&Gender{}).Create(&Gender{Name: "Male"})
	db.Model(&Gender{}).Create(&Gender{Name: "Female"})
	db.Model(&Educational_background{}).Create(&Educational_background{Name: "ปริญญาเอก"})
	db.Model(&Educational_background{}).Create(&Educational_background{Name: "ปริญญาโท"})
	db.Model(&Educational_background{}).Create(&Educational_background{Name: "ปริญญาตรี"})
	db.Model(&Distributor{}).Create(&Distributor{Name: "ร้านA", Location: ".."})
	db.Model(&Distributor{}).Create(&Distributor{Name: "ร้านB", Location: ".."})
	db.Model(&Brand{}).Create(&Brand{Name: "Brand A"})
	db.Model(&Brand{}).Create(&Brand{Name: "Brand B"})
	db.Model(&Type{}).Create(&Type{Name: "คอม"})
	db.Model(&Type{}).Create(&Type{Name: "โน็ตบุ๊ค"})
	db.Model(&Estimate{}).Create(&Estimate{Name: "การบำรุงรักษาโดยการซ่อมแซมส่วนที่เสีย"})
	db.Model(&Estimate{}).Create(&Estimate{Name: "การบำรุงรักษาตามแผน"})
	db.Model(&Estimate{}).Create(&Estimate{Name: "การบำรุงรักษาโดยการคาดคะเน"})
	db.Model(&Estimate{}).Create(&Estimate{Name: "แนวคิดใหม่ในวงการบำรุงรักษา"})
	db.Model(&DMGLevel{}).Create(&DMGLevel{DMGLevel: "ซ่อมได้"})
	db.Model(&DMGLevel{}).Create(&DMGLevel{DMGLevel: "ต้องเปลี่ยนอุปกรณ์บางส่วน"})
	db.Model(&DMGLevel{}).Create(&DMGLevel{DMGLevel: "ไม่สามารถซ่อมได้"})
	db.Model(&JobType{}).Create(&JobType{Name: "ไม่แน่ใจว่าชำรุดที่ไหน"})
	db.Model(&JobType{}).Create(&JobType{Name: "ซ่อมจอคอม"})
	db.Model(&Building{}).Create(&Building{Name: "F01"})
	db.Model(&Building{}).Create(&Building{Name: "F02"})
	db.Model(&Building{}).Create(&Building{Name: "F03"})
	db.Model(&Building{}).Create(&Building{Name: "F04"})

	var building1, building2, building3, building4 Building
	db.Raw("SELECT * FROM buildings WHERE name = ?", "F01").Scan(&building1)
	db.Raw("SELECT * FROM buildings WHERE name = ?", "F02").Scan(&building2)
	db.Raw("SELECT * FROM buildings WHERE name = ?", "F03").Scan(&building3)
	db.Raw("SELECT * FROM buildings WHERE name = ?", "F04").Scan(&building4)

	db.Model(&Room{}).Create(&Room{Name: "B101", Building: building1})
	db.Model(&Room{}).Create(&Room{Name: "B102", Building: building1})
	db.Model(&Room{}).Create(&Room{Name: "B201", Building: building2})
	db.Model(&Room{}).Create(&Room{Name: "B202", Building: building2})
	db.Model(&Room{}).Create(&Room{Name: "B301", Building: building3})
	db.Model(&Room{}).Create(&Room{Name: "B302", Building: building3})
	db.Model(&Room{}).Create(&Room{Name: "B401", Building: building4})
	db.Model(&Room{}).Create(&Room{Name: "B402", Building: building4})

	var male, female Gender
	db.Raw("SELECT * FROM genders WHERE name = ?", "Male").Scan(&male)
	db.Raw("SELECT * FROM genders WHERE name = ?", "Female").Scan(&female)

	var r_user, r_tech, r_admin Role
	db.Raw("SELECT * FROM roles WHERE name = ?", "User").Scan(&r_user)
	db.Raw("SELECT * FROM roles WHERE name = ?", "Tech").Scan(&r_tech)
	db.Raw("SELECT * FROM roles WHERE name = ?", "Admin").Scan(&r_admin)

	var position Educational_background
	db.Raw("SELECT * FROM Educational_backgrounds WHERE Name = ?", "ปริญญาโท").Scan(&position)

	db.Model(&User{}).Create(&User{
		Name:                   "นาย A",
		Email:                  "user@gmail.com",
		Phonenumber:            "0555555555",
		Password:               string(password),
		Role:                   r_user,
		Gender:                 male,
		Educational_background: position,
	})

	db.Model(&User{}).Create(&User{
		Name:                   "นาง C",
		Email:                  "tech@gmail.com",
		Phonenumber:            "0555555551",
		Password:               string(password),
		Role:                   r_tech,
		Gender:                 female,
		Educational_background: position,
	})

	db.Model(&User{}).Create(&User{
		Name:                   "Admin",
		Email:                  "admin@gmail.com",
		Phonenumber:            "0555555552",
		Password:               string(password),
		Role:                   r_admin,
		Gender:                 male,
		Educational_background: position,
	})

	// มีการ add ข้อมูล user RHD Device แค่นั้น (รวม Entityลูกด้วยนะ เช่น role Gender DMGLevel อะไรแบบนี้)
}
