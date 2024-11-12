package models

type Equipment struct {
	EquipmentID      uint         `gorm:"primaryKey;autoIncrement" json:"equipment_id"`
	EquipmentName    string       `json:"equipment_name"`
	CreatedByAdminID string       `json:"created_by_admin_id"` // ระบุ foreign key ตรงกับ AdminID
	ProfilePic       string       `json:"profile_pic"`
	Submissions      []Submission `gorm:"foreignKey:EquipmentID;references:EquipmentID" json:"submissions"`
}
