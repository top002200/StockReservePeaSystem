package models

type Distribution struct {
	DistributionID     uint      `json:"distribution_id"`
	DistributionAmount int       `json:"distribution_amount"`
	EquipmentID        uint      `json:"equipment_id"`
	Equipment          Equipment `json:"equipment" gorm:"foreignKey:EquipmentID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Contract           string    `json:"equip_contract"`
	AssetCode          string    `json:"equip_assetcode"`
	Date               string    `json:"date"`
	GName              string    `json:"g_name"`
	RName              string    `json:"r_name"`
}
