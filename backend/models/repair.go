package models

import (
	"time"
)

type Repair struct {
	RepairID   uint      `gorm:"primaryKey;autoIncrement" json:"repair_id"`
	UserName   string    `json:"user_name"`
	Department string    `json:"dept"`
	Type       string    `json:"type"`
	DeviceName string    `json:"device_name"`
	Brand      string    `json:"brand"`
	Model      string    `json:"model"`
	Contract   string    `json:"contract"`
	AssetCode  string    `json:"asset_code"`
	Problem    string    `json:"problem"`
	Fixing     string    `json:"fixing"`
	Note       string    `json:"note"`
	Date       time.Time `json:"date"`
}
