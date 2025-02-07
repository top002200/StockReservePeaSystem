package models

import "gorm.io/gorm"

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
	IDForFix           uint      `json:"id_for_fix" gorm:"column:id_for_fix;unique"` // เปลี่ยนเป็น unique แทน primaryKey
}



func (d *Distribution) BeforeCreate(tx *gorm.DB) (err error) {
	var maxID uint
	tx.Model(&Distribution{}).Select("COALESCE(MAX(id_for_fix), 0)").Scan(&maxID)
	d.IDForFix = maxID + 1
	return
}