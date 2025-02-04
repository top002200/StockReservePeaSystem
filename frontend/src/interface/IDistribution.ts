export interface DistributionData {
  g_name: string; // ผู้จัดสรร
  r_name: string; // ผู้รับจัดสรร
  distribution_amount: number; // จำนวนที่จัดสรร
  equipment_id: number; // รหัสอุปกรณ์ (ต้องเป็น number เท่านั้น)
  date: string; // วันที่ในรูปแบบ YYYY-MM-DD
  equip_contract: string; // เลขที่สัญญา
  equip_assetcode: string;
  idfordelete: string; // ID สำหรับลบ (อาจใช้เป็น Primary Key หรือ Auto Increment)
}
