package models

type Model struct {
	ModelID   string `gorm:"primaryKey" json:"model_id"`
	ModelName string `json:"model_name"`
	BrandID   string `json:"brand_id"`  // Foreign key อ้างอิงไปยัง Brand
}
