// models/brand.go
package models

type Brand struct {
	BrandID   string   `gorm:"primaryKey" json:"brand_id"`
	BrandName string   `json:"brand_name"`
	Models    []Model  `gorm:"foreignKey:BrandID" json:"models"` // ความสัมพันธ์แบบ One-to-Many
}
