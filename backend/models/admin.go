	// models/admin.go
	package models

	type Admin struct {
		AdminID     string     `gorm:"primaryKey" json:"admin_id"`
		AdminName   string     `json:"admin_name"`
		PhoneNumber string     `json:"phone_number"`
		Password    string     `json:"password"`
		ProfilePic  string     `json:"profile_pic"`
	}