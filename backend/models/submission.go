package models

import (
	"time"
)

type Submission struct {
	SubmissionID   uint      `gorm:"primaryKey;autoIncrement" json:"submission_id"`
	EquipmentID      uint      `json:"heading_id"` // Foreign key เชื่อมโยงกับ Heading
	UsernName      string    `json:"submission_username"`
	Usernid        string    `json:"submission_userid"`
	Position       string    `json:"submission_position"`
	Department     string    `json:"submission_department"`
	Division       string    `json:"submission_division"`
	Section        string    `json:"submission_section"`
	Internalnumber string    `json:"submission_internalnumber"`
	Ouragency      string    `json:"submission_ouragency"`
	TimeStart      time.Time `json:"time_start"`
	TimeEnd        time.Time `json:"time_end"`
	Note           string    `json:"submission_note"`
	SubmittedAt    time.Time `json:"submitted_at"` // วันที่และเวลาที่ส่ง

}
