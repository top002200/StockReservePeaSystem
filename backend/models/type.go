// models/type.go
package models

type Type struct {
	TypeID   string   `gorm:"primaryKey" json:"type_id"`    // รหัสประเภทของอุปกรณ์
	TypeName string   `json:"type_name"`                    // ชื่อประเภท เช่น มือถือ, โน้ตบุ๊ค, PC, เมาส์, อื่นๆ
	Brands   []Brand  `gorm:"foreignKey:TypeID" json:"brands"` // ความสัมพันธ์แบบ One-to-Many กับ Brand
}
