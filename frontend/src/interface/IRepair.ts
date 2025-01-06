export interface RepairData {
  repair_id?: number; // เปลี่ยนจาก string เป็น number
  user_name: string;
  dept: string;
  type: string;
  device_name: string;
  brand: string;
  model: string;
  contract: string;
  problem: string;
  fixing: string;
  note: string;
  date?: string; // ยังคงเป็น string (ISO 8601 format)
}
