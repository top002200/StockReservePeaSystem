package models

type BorrowedEquipment struct {
	BorrowedEquipmentID uint         `gorm:"primaryKey;autoIncrement" json:"borrowed_equipment_id"` // Primary key
	EquipmentName        string       `json:"equipment_name"`                                       // Name of the equipment
	Type                 string       `json:"equipment_type"`                                       // Type of equipment
	Brand                string       `json:"equipment_brand"`                                      // Brand of the equipment
	Model                string       `json:"equipment_model"`                                      // Model of the equipment
	Contract             string       `json:"equip_contract"`                                       // Contract number
	AssetCode            string       `json:"equip_assetcode"`                                      // Asset code
	EquipmentImg         string       `json:"equip_img"`                                            // Image of the equipment
	Submissions          []Submission `gorm:"foreignKey:BorrowedEquipmentID;references:BorrowedEquipmentID" json:"submissions"` // Relationships

}
