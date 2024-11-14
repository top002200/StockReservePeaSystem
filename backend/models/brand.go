// models/brand.go
package models

type Brand struct {
	BrandID   string   `gorm:"primaryKey" json:"brand_id"`
	BrandName string   `json:"brand_name"`
	TypeID    string   `json:"type_id"`                    // Foreign key อ้างอิงไปยัง Type
	Type      Type     `gorm:"foreignKey:TypeID" json:"type"` // เชื่อมกับ Type
	Models    []Model  `gorm:"foreignKey:BrandID" json:"models"` // ความสัมพันธ์แบบ One-to-Many
}
