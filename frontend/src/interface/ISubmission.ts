export interface SubmissionData {
  submission_id?: number;
  borrowed_equipment_id?: number;
  title?: string;
  submission_username?: string;
  submission_userid?: string;
  submission_position?: string;
  submission_department?: string;
  submission_division?: string;
  submission_section?: string;
  submission_internalnumber?: string;
  submission_ouragency?: string;
  time_start?: string; // ใช้ string แทน Date เพื่อให้ตรงกับ JSON
  time_end?: string;
  amount?: number;
  submission_note?: string;
  submitted_at: string; // ต้องมีค่าเสมอ
  is_urgent?: number;
  approval_status?: number;
  type?: string;            // ประเภท
  brand?: string;           // ยี่ห้อ
  model?: string;           // รุ่น
  asset_code?: string;      // รหัสทรัพย์สิน
  contract_number?: string; // เลขที่สัญญา
}
