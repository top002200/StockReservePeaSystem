export interface AdminData {
    admin_id: string;       // รหัสประจำตัวของผู้ดูแล
    admin_name: string;     // ชื่อของผู้ดูแล
    phone_number: string;   // หมายเลขโทรศัพท์ของผู้ดูแล
    password: string;       // รหัสผ่าน (ควรจัดการด้วยความระมัดระวัง)
    profile_pic: string;    // URL ของรูปโปรไฟล์
  }
  