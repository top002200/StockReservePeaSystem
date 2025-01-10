package models

type Equipment struct {
	EquipmentID   uint         `gorm:"primaryKey;autoIncrement" json:"equipment_id"`
	EquipmentName string       `json:"equipment_name"`
	Type          string       `json:"equipment_type"`
	Brand         string       `json:"equipment_brand"`
	Model         string       `json:"equipment_model"`
	Amount        int          `json:"equip_amount"`
	AssetCode     string       `json:"equip_assetcode"`
	EquipmentImg  string       `json:"equip_img"`

	Distributions []Distribution `gorm:"foreignKey:EquipmentID" json:"distributions"` // ความสัมพันธ์ย้อนกลับ
}
