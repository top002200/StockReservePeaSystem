export interface DistributionData {
  g_name: string; // ผู้จัดสรร
  r_name: string; // ผู้รับจัดสรร
  distribution_amount: number; // จำนวนที่จัดสรร
  equipment_id: number; // รหัสอุปกรณ์
  date: string; // วันที่ในรูปแบบ YYYY-MM-DD
  equip_contract: string; // เลขที่สัญญา
  equip_assetcode: string; // รหัสทรัพย์สิน
}