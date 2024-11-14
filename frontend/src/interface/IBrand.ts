import { ModelData } from './IModel';

export interface BrandData {
  brand_id: string;      // รหัสประจำตัวของยี่ห้อ
  brand_name: string;    // ชื่อของยี่ห้อ
  models: ModelData[];   // รายการของรุ่นที่เกี่ยวข้องกับยี่ห้อนี้
}
