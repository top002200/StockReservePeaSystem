package models

type Equipment struct {
	EquipmentID   uint         `gorm:"primaryKey;autoIncrement" json:"equipment_id"`
	EquipmentName string       `json:"equipment_name"`
	Type          string       `json:"equipment_type"`
	Model         string       `json:"equipment_model"`
	ProfilePic    string       `json:"profile_pic"`
	Submissions   []Submission `gorm:"foreignKey:EquipmentID;references:EquipmentID" json:"submissions"`
}
