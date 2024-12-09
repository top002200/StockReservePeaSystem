// TypeData.ts
import { BrandData } from './IBrand';

export interface TypeData {
  type_id: string;       // รหัสประเภทของอุปกรณ์
  type_name: string;     // ชื่อประเภท เช่น มือถือ, โน้ตบุ๊ค
  type_amount: number; 
  brands: BrandData[];   // รายการยี่ห้อที่เกี่ยวข้องกับประเภทนี้
}
    