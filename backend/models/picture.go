package models

type Picture struct {
	PictureID   string `gorm:"primaryKey" json:"picture_id"` // Primary key for the picture
	PictureData string `json:"picture_data"`                // Base64-encoded image data

}
