package entity

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name         string
	Email        string `gorm:"uniqueIndex"`
	Phone_number string `gorm:"uniqueIndex"`
	Password     string `json:"-"`

	RoleID     *uint
	GenderID   *uint
	PositionID *uint
	Role       Role     `gorm:"references:id"`
	Gender     Gender   `gorm:"references:id"`
	Position   Position `gorm:"references:id"`

	Request         []Request          `gorm:"foreignkey:UserID"`
	Cart            []Cart             `gorm:"foreignkey:UserID"`
	Room_has_Device []*Room_has_Device `gorm:"foreignkey:UserID"`
}

type Request struct {
	gorm.Model
	Explain    string
	Date_Start time.Time

	UserID             *uint
	JobTypeID          *uint
	Room_has_Device_ID *uint
	User               User            `gorm:"references:id"`
	Room_has_Device    Room_has_Device `gorm:"references:id"`
	JobType            JobType         `gorm:"references:id"`

	Cart *Cart `gorm:"foreignkey:RequestID"`
}

type Room_has_Device struct {
	gorm.Model

	UserID   *uint
	DeviceID *uint
	RoomID   *uint
	StatusID *uint
	Device   Device `gorm:"references:id"`
	Room     Room   `gorm:"references:id"`
	Status   Status `gorm:"references:id"`
	User     User   `gorm:"references:id"`

	Request []Request `gorm:"foreignkey:Room_has_Device_ID"`
}

type Device struct {
	gorm.Model

	Name string

	DistributorID *uint
	TypeID        *uint
	BrandID       *uint
	Distributor   Distributor `gorm:"references:id"`
	Type          Type        `gorm:"references:id"`
	Brand         Brand       `gorm:"references:id"`

	Room_has_Device []*Room_has_Device `gorm:"foreignkey:DeviceID"`
}

type Cart struct {
	gorm.Model
	Started_At time.Time
	Work_Date  time.Time

	UserID    *uint
	LevelID   *uint
	RequestID *uint
	HistoryID *uint
	User      User     `gorm:"references:id"`
	Level     Level    `gorm:"references:id"`
	Request   Request  `gorm:"references:id"`
	History   *History `gorm:"references:id"`
}

type History struct {
	gorm.Model

	CartID  *uint
	BillID  *uint
	CauseID *uint
	Cart    Cart  `gorm:"references:id"`
	Bill    Bill  `gorm:"references:id"`
	Cause   Cause `gorm:"references:id"`
}

type Role struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	User []User `gorm:"foreignkey:RoleID"`
}

type Gender struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`
	User []User `gorm:"foreignkey:GenderID"`
}

// หน้าที่ทับซ่อมกับ Role หรือเปล่า ?
type Position struct {
	gorm.Model
	Position string `gorm:"uniqueIndex"`
	User     []User `gorm:"foreignkey:PositionID"`
}

type Building struct {
	gorm.Model
	Name     string `gorm:"uniqueIndex"`
	Location string
	Room     []Room `gorm:"foreignkey:BuildingID"`
}

type Room struct {
	gorm.Model
	Name     string `gorm:"uniqueIndex"`
	Location string

	BuildingID *uint
	Building   Building `gorm:"references:id"`

	Room_has_Device []Room_has_Device `gorm:"foreignkey:RoomID"`
}

type Distributor struct {
	gorm.Model
	Name     string `gorm:"uniqueIndex"`
	Location string

	Device []Device `gorm:"foreignkey:DistributorID"`
}

type Brand struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Device []Device `gorm:"foreignkey:BrandID"`
}

type Status struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Room_has_Device []Room_has_Device `gorm:"foreignkey:StatusID"`
}

type Bill struct {
	gorm.Model
	Price float64
}

type Cause struct {
	gorm.Model
	Caused   string
	Solution string
}

type Type struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Device []Device `gorm:"foreignkey:TypeID"`
}

type Level struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Cart []Cart `gorm:"foreignkey:LevelID"`
}

type JobType struct {
	gorm.Model
	Name string `gorm:"uniqueIndex"`

	Request []Request `gorm:"foreignkey:JobTypeID"`
}
