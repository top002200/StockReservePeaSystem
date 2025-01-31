package models

import (
	"time"
)

type Submission struct {
	SubmissionID        uint       `gorm:"primaryKey;autoIncrement" json:"submission_id"`
	BorrowedEquipmentID *uint      `json:"borrowed_equipment_id,omitempty"` // Foreign key, อาจเป็น `nil` ได้
	Title              *string    `json:"title,omitempty"`                  // ใช้ pointer เพื่อให้ `omitempty` ทำงาน
	UsernName          *string    `json:"submission_username,omitempty"`
	Usernid            *string    `json:"submission_userid,omitempty"`
	Position           *string    `json:"submission_position,omitempty"`
	Department         *string    `json:"submission_department,omitempty"`
	Division           *string    `json:"submission_division,omitempty"`
	Section            *string    `json:"submission_section,omitempty"`
	Internalnumber     *string    `json:"submission_internalnumber,omitempty"`
	Ouragency          *string    `json:"submission_ouragency,omitempty"`
	TimeStart          *time.Time `json:"time_start,omitempty"`
	TimeEnd            *time.Time `json:"time_end,omitempty"`
	Amount             *int       `json:"amount,omitempty"`
	Note               *string    `json:"submission_note,omitempty"`
	SubmittedAt        time.Time  `json:"submitted_at"` // ไม่ใช้ `omitempty` เพราะต้องมีค่าเสมอ
	IsUrgent 			int       `gorm:"default:0" json:"is_urgent"`

}
