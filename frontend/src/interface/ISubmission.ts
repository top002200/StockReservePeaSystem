export interface SubmissionData {
    submission_id: number;          // รหัสประจำตัวของการส่ง
    equipment_id: number;           // รหัสประจำตัวของอุปกรณ์ที่เกี่ยวข้อง
    username: string;               // ชื่อผู้ใช้ที่ส่ง
    user_id: string;                // รหัสประจำตัวของผู้ใช้ที่ส่ง
    position: string;               // ตำแหน่งของผู้ส่ง
    department: string;             // แผนกของผู้ส่ง
    division: string;               // แผนกย่อยของผู้ส่ง
    section: string;                // ส่วนของผู้ส่ง
    internal_number: string;        // เบอร์ภายใน
    our_agency: string;             // หน่วยงานของเรา
    time_start: Date;               // เวลาเริ่มต้น
    time_end: Date;                 // เวลาสิ้นสุด
    note: string;                   // หมายเหตุ
    submitted_at: Date;             // วันที่และเวลาที่ส่ง
  }
      