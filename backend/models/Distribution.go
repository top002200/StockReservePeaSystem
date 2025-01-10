package models

type Distribution struct {
    DistributionID uint       `gorm:"primaryKey;autoIncrement" json:"distribution_id"`
    DistributionAmount int    `json:"distribution_amount"` // เปลี่ยนจาก Amount เป็น DistributionAmount
    EquipmentID    uint       `json:"equipment_id"`
    Equipment      Equipment  `gorm:"foreignKey:EquipmentID" json:"equipment"`
    Name           string     `json:"name"`
    Date           string     `json:"date"`
    GName          string     `json:"g_name"` // เพิ่มฟิลด์สำหรับผู้จัดสรร
    RName          string     `json:"r_name"` // เพิ่มฟิลด์สำหรับผู้รับจัดสรร
}
