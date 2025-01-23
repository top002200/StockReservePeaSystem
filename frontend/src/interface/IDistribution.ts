export interface DistributionData {
  g_name: string; // ผู้จัดสรร
  r_name: string; // ผู้รับจัดสรร
  distribution_amount: number; // จำนวนที่จัดสรร
  equipment_id: number; // รหัสอุปกรณ์ (ต้องเป็น number เท่านั้น)
  date: string; // วันที่ในรูปแบบ YYYY-MM-DD
  name: string; // ชื่อผู้จัดสรร
}
