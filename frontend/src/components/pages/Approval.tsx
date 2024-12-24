import React from "react";
import Layout from "../Layout/Layout";
import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import backgroundImg from "../../assets/pdf/background.jpg"; // ใช้รูปที่แปลงจาก PDF
import "jspdf-autotable";
import { THSarabunFont } from "../../fonts/THSarabun"; // Import THSarabunFont

const Approval: React.FC = () => {
  const data = [
    {
      id: 1,
      user_id: "123456",
      user_name: "นางสาวxxx xxxx",
      b_item: "Notebook",
      quantity: "1",
      note: "xxxxxxxxxxxxxxxxxxxx",
    },
    {
      id: 2,
      user_id: "543210",
      user_name: "นางสาวxxx xxxx",
      b_item: "Wireless Mouse",
      quantity: "1",
      note: "xxxxxxxxxxxxxxxxxxxx",
    },
  ];

  const base64Data = THSarabunFont.normal.split(",")[1];
  console.log("Base64 Data Only:", base64Data);

  const generatePDF = (userData: any) => {
    const doc = new jsPDF();
      // เพิ่มรูปพื้นหลัง
      const imgWidth = 210; // ความกว้างของหน้า PDF (A4)
      const imgHeight = 297; // ความสูงของหน้า PDF (A4)
      doc.addImage(backgroundImg, "JPEG", 0, 0, imgWidth, imgHeight);
    try {
      // ตรวจสอบฟอนต์
      console.log("THSarabunFont.normal:", THSarabunFont.normal);
      const base64Data = THSarabunFont.normal.split(",")[1];
      console.log("Base64 Data Only:", base64Data);
      console.log("Base64 Length:", base64Data?.length || 0);

      if (!base64Data || !isValidBase64(THSarabunFont.normal)) {
        throw new Error("Font data is not valid Base64.");
      }

      // เพิ่มฟอนต์
      doc.addFileToVFS("THSarabunNew.ttf", base64Data);
      doc.addFont("THSarabunNew.ttf", "THSarabun", "normal");
      doc.setFont("THSarabun");

      // ตั้งค่าฟอนต์และข้อความ
      doc.setFontSize(16);
      //doc.text("คำขอยืมอุปกรณ์", 70, 20);

      // วาดกรอบหัวตาราง
   
      doc.text("ลำดับที่", 12, 37);
      doc.text("ผู้ขอยืม", 40, 37);
      doc.text("รายการ", 90, 37);
      doc.text("หมายเหตุ", 150, 37);

      // เพิ่มข้อมูลในตาราง
      const startY = 40;
     
      doc.text("1", 12, startY + 7);
      doc.text(userData.user_name || "-", 40, startY + 7);
      doc.text(
        `${userData.b_item || "-"} : ${userData.quantity || "-"}`,
        90,
        startY + 7
      );
      doc.text(userData.note || "-", 150, startY + 7);

      // ดาวน์โหลด PDF
      doc.save(`คำขอยืมอุปกรณ์_${userData.user_id}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  // Helper function to validate Base64
  function isValidBase64(str: string): boolean {
    try {
      const decoded = atob(str.split(",")[1]); // แยกส่วนข้อมูล Base64 ออกจาก "data:font/ttf;base64,"
      return !!decoded;
    } catch (e) {
      console.error("Base64 validation error:", e);
      return false;
    }
  }

  return (
    <Layout>
      <div className="approval-content">
        <h3
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>คำขอยืมอุปกรณ์</b>
        </h3>
        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th>ลำดับที่</th>
              <th>ผู้ขอยืม</th>
              <th>เลขประจำตัวพนักงาน</th>
              <th>รายการ</th>
              <th>หมายเหตุ</th>
              <th style={{ width: 200 }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="align-middle text-center">{index + 1}</td>
                <td className="align-middle text-center">{item.user_name}</td>
                <td className="align-middle text-center">{item.user_id}</td>
                <td className="align-middle text-left">
                  {item.b_item} : {item.quantity}
                </td>
                <td className="align-middle text-left">{item.note}</td>
                <td className="align-middle text-center">
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    style={{ width: "40px" }}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="outline-success"
                    onClick={() => generatePDF(item)}
                  >
                    <FontAwesomeIcon icon={faFileDownload} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Approval;
