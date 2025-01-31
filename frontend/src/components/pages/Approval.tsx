import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Table, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import backgroundImg from "../../assets/pdf/background.jpg"; // ใช้รูปที่แปลงจาก PDF
import "jspdf-autotable";
import { THSarabunFont } from "../../fonts/THSarabun"; // Import THSarabunFont
import { getAllSubmissions } from "../../services/api";
import { SubmissionData } from "../../interface/ISubmission"; // 

const Approval: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSubmissions();
        console.log("API Response:", response);  // Log the entire response
        setSubmissions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching submission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  

  const generatePDF = (submission: SubmissionData) => {
    const doc = new jsPDF();

    // เพิ่มรูปพื้นหลัง
    doc.addImage(backgroundImg, "JPEG", 0, 0, 210, 297);

    try {
      const base64Data = THSarabunFont.normal.split(",")[1];
      if (!base64Data) throw new Error("Invalid Font Data");

      doc.addFileToVFS("THSarabunNew.ttf", base64Data);
      doc.addFont("THSarabunNew.ttf", "THSarabun", "normal");
      doc.setFont("THSarabun");
      doc.setFontSize(16);

      // ข้อมูลใน PDF
      doc.text("ลำดับที่", 12, 37);
      doc.text("ผู้ขอยืม", 40, 37);
      doc.text("รายการ", 90, 37);
      doc.text("หมายเหตุ", 150, 37);

      const startY = 40;
      doc.text("1", 12, startY + 7);
      doc.text(submission.submission_username || "-", 40, startY + 7);
      doc.text(
        `${submission.title || "-"} : ${submission.amount || "-"}`,
        90,
        startY + 7
      );
      doc.text(submission.submission_note || "-", 150, startY + 7);

      // ดาวน์โหลด PDF
      doc.save(`คำขอยืมอุปกรณ์_${submission.submission_userid}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const getStatusColor = (status?: number) => {
    // กำหนดสีตามค่าของ status
    switch (status) {
      case 0:
        return "text-warning";  // สีเหลือง สำหรับ "รออนุมัติ"
      case 1:
        return "text-success";  // สีเขียว สำหรับ "อนุมัติ"
      case 2:
        return "text-danger";   // สีแดง สำหรับ "ไม่อนุมัติ"
      case 3:
        return "text-muted";    // สีเทา สำหรับ "คืนแล้ว"
      default:
        return "text-secondary"; // ถ้าไม่ตรงกับค่าที่กำหนด ใช้สีเริ่มต้น
    }
  };

  return (
    <Layout>
      <div className="approval-content">
        <h3
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>คำขอยืมอุปกรณ์</b>
        </h3>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>กำลังโหลดข้อมูล...</p>
          </div>
        ) : (
          <Table bordered hover responsive>
            <thead>
              <tr className="align-middle text-center">
                <th>ลำดับที่</th>
                <th>ผู้ขอยืม</th>
                <th>เลขประจำตัวพนักงาน</th>
                <th>เบอร์ภายใน</th>
                <th>สถานะ</th>
                <th style={{ width: 200 }}></th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((item, index) => (
                <tr key={item.submission_id}>
                  <td className="align-middle text-center">{index + 1}</td>
                  <td className="align-middle text-center">
                    {item.submission_username}
                  </td>
                  <td className="align-middle text-center">
                    {item.submission_userid}
                  </td>
                  <td className="align-middle text-left">
                    {item.submission_internalnumber} 
                  </td>
                  <td
                    className={`align-middle text-center ${getStatusColor(
                      item.is_urgent
                    )}`}
                  >
                    {item.is_urgent ? "ด่วน" : "รออนุมัติ"}
                  </td>
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
        )}
      </div>
    </Layout>
  );
};

export default Approval;
