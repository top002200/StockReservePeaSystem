export interface EquipmentData {
  equipment_id?: number; // Make optional
  equipment_name?: string; // Make optional
  equipment_type: string;
  equipment_brand: string;
  equipment_model: string;
  equip_contract: string;
  equip_assetcode: string;
  equip_img: string;
  submissions?: any[]; // Make optional
}
