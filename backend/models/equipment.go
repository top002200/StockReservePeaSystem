package models

type Equipment struct {
	EquipmentID   uint         `gorm:"primaryKey;autoIncrement" json:"equipment_id"`
	EquipmentName string       `json:"equipment_name"`
	Type          string       `json:"equipment_type"`
	Brand         string       `json:"equipment_brand"`
	Model         string       `json:"equipment_model"`
	Contract      string       `json:"equip_contract"`
	AssetCode     string       `json:"equip_assetcode"`
	EquipmentImg  string       `json:"equip_img"`

}	
