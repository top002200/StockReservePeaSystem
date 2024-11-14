import { SubmissionData } from './ISubmission';

export interface EquipmentData {
  equipment_id: number;           // รหัสประจำตัวของอุปกรณ์
  equipment_name: string;         // ชื่อของอุปกรณ์
  type: string;                   // ประเภทของอุปกรณ์
  model: string;                  // รุ่นของอุปกรณ์
  profile_pic: string;            // URL ของรูปโปรไฟล์ของอุปกรณ์
  submissions: SubmissionData[];  // รายการการส่งที่เกี่ยวข้องกับอุปกรณ์นี้
}
