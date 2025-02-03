import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Table, Button, Spinner, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import backgroundImg from "../../assets/pdf/background.jpg"; // ใช้รูปที่แปลงจาก PDF
import "jspdf-autotable";
import { THSarabunFont } from "../../fonts/THSarabun"; // Import THSarabunFont
import {
  getAllSubmissions,
  getAllBorrowedEquipments,
} from "../../services/api";
import { SubmissionData } from "../../interface/ISubmission"; //
import { BorrowedEquipmentData } from "../../interface/IBorrowedEquipment";
import { updateSubmission } from "../../services/api"; // นำเข้า API สำหรับอัปเดตข้อมูล

const Approval: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [borrowedEquipments, setBorrowedEquipments] = useState<
    BorrowedEquipmentData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedSubmission, setSelectedSubmission] =
    useState<SubmissionData | null>(null);
  const [is_urgent, setIsUrgent] = useState<string>("0");

  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedAsset, setSelectedAsset] = useState<string | undefined>(
    undefined
  );
  const [selectedContract, setSelectedContract] = useState<string | undefined>(
    undefined
  );
  const formatDateToISO = (dateStr: string | undefined) => {
    if (!dateStr) return undefined;
    return new Date(dateStr).toISOString(); // ✅ แปลงเป็น ISO 8601
  };

  /*const startDate = formatDateToISO(
    document.querySelector<HTMLInputElement>("[name='time_start']")?.value
  );
  const endDate = formatDateToISO(
    document.querySelector<HTMLInputElement>("[name='time_end']")?.value
  ); */

  const [timeStart, setTimeStart] = useState<string | undefined>(undefined);
  const [timeEnd, setTimeEnd] = useState<string | undefined>(undefined);

  const handleTimeStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeStart(formatDateToISO(e.target.value));
  };

  const handleTimeEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeEnd(formatDateToISO(e.target.value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllSubmissions();
        console.log("🔹 Loaded submission data:", response.data); // ✅ Debugging Log
        setSubmissions(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching submission data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await getAllBorrowedEquipments();
        setBorrowedEquipments(response.data);
      } catch (error) {
        console.error("Error fetching equipment data:", error);
      }
    };
    fetchEquipments();
  }, []);

  const filteredBrands = borrowedEquipments.filter(
    (e) => e.equipment_type === selectedType
  );
  const filteredModels = borrowedEquipments.filter(
    (e) =>
      e.equipment_brand === selectedBrand && e.equipment_type === selectedType
  );
  const filteredAssets = borrowedEquipments.filter(
    (e) =>
      e.equipment_model === selectedModel &&
      e.equipment_brand === selectedBrand &&
      e.equipment_type === selectedType
  );

  const handleConfirm = async () => {
    if (!selectedSubmission?.submission_id) {
      alert("ไม่พบ submission_id");
      return;
    }

    // ✅ กรองค่าที่เป็น undefined หรือ ""
    const updatedData: Partial<SubmissionData> = Object.fromEntries(
      Object.entries({
        submission_id: selectedSubmission.submission_id,
        is_urgent: Number(is_urgent),
        type: selectedType || undefined,
        brand: selectedBrand || undefined,
        model: selectedModel || undefined,
        asset_code: selectedAsset || undefined,
        contract_number: selectedContract || undefined,
        time_start: timeStart,
        time_end: timeEnd,
        submitted_at: selectedSubmission.submitted_at || "", // ✅ ป้องกัน undefined
      }).filter(([_, v]) => v !== undefined && v !== "")
    );

    console.log("🔹 Sending updated data:", JSON.stringify(updatedData, null, 2));

    try {
      const response = await updateSubmission(updatedData);

      if (response.status) {
        alert("✅ อัปเดตข้อมูลสำเร็จ");

        // ✅ รีโหลดข้อมูลหลังจากอัปเดต
        const updatedSubmissions = await getAllSubmissions();
        setSubmissions(updatedSubmissions.data);

        closeModal();
      } else {
        alert("❌ เกิดข้อผิดพลาดในการอัปเดตข้อมูล: " + response.message);
      }
    } catch (error) {
      console.error("❌ Error updating submission:", error);
      alert("❌ เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์");
    }
  };



  const openModal = (submission: SubmissionData) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedSubmission(null);
  };

  const generatePDF = (submission: SubmissionData) => {
    const doc = new jsPDF();

    try {
      // เพิ่มฟอนต์ TH Sarabun
      const base64Data = THSarabunFont.normal.split(",")[1];
      if (!base64Data) throw new Error("Invalid Font Data");

      doc.addFileToVFS("THSarabunNew.ttf", base64Data);
      doc.addFont("THSarabunNew.ttf", "THSarabun", "normal");
      doc.setFont("THSarabun");
      doc.setFontSize(16);

      // เพิ่มรูปพื้นหลัง (ถ้ามี)
      doc.addImage(backgroundImg, "JPEG", 0, 0, 210, 297);

      // ข้อมูลผู้ขอยืม
      doc.setFontSize(12);
      doc.text(`${submission.submission_username || "-"}`, 70, 37);
      doc.text(`${submission.submission_userid || "-"}`, 148, 37);
      doc.text(`${submission.submission_position || "-"}`, 180, 37);
      doc.text(`${submission.submission_department || "-"}`, 65, 42.5);
      doc.text(`${submission.submission_division || "-"}`, 105, 42.5);
      doc.text(`${submission.submission_section || "-"}`, 150, 42.5);
      doc.text(`${submission.submission_internalnumber || "-"}`, 185, 42.5);
      doc.text(`ผคข.`, 75, 47.5);
      doc.text(`${(submission.time_start || "-").split("T")[0]}`, 54, 112);
      doc.text(`${(submission.time_end || "-").split("T")[0]}`, 102, 112);


      const startTime = submission.time_start ? new Date(submission.time_start) : null;
      const endTime = submission.time_end ? new Date(submission.time_end) : null;

      if (startTime && endTime) {
        // รีเซ็ตเวลาเป็น 00:00:00 เพื่อให้คำนวณจากวันที่เท่านั้น
        startTime.setHours(0, 0, 0, 0);
        endTime.setHours(0, 0, 0, 0);

        const diffMs = endTime.getTime() - startTime.getTime(); // คำนวณส่วนต่าง
        const diffDays = Math.abs(diffMs / (1000 * 60 * 60 * 24)); // แปลงเป็นวัน

        doc.text(`${diffDays}`, 157, 112);
      } else {
        doc.text("-", 157, 112); // กรณีไม่มีค่าให้ใส่ "-" ใน PDF
      }

      // ในตาราง
      doc.setFontSize(10);
      doc.text(`${submission.type || "-"} ${submission.brand || "-"}  ${submission.model || "-"}`, 30, 65);
      doc.text(`${submission.asset_code || "-"}`, 102, 65);

      // ดาวน์โหลด PDF
      doc.save(`คำขอยืมอุปกรณ์_${submission.submission_userid}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  const getStatusColor = (is_urgent?: number) => {
    switch (is_urgent) {
      case 1:
        return "text-success";
      case 2:
        return "text-danger";
      case 3:
        return "text-muted";
      default:
        return "text-warning";
    }
  };

  const getApprovalText = (is_urgent?: number) => {
    switch (is_urgent) {
      case 1:
        return "อนุมัติ";
      case 2:
        return "ไม่อนุมัติ";
      case 3:
        return "คืนแล้ว";
      default:
        return "รออนุมัติ";
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
                <th style={{ width: 200 }}>เลขประจำตัวพนักงาน</th>
                <th>อุปกรณ์</th>
                <th style={{ width: 150 }}>เบอร์ภายใน</th>
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
                  <td></td>
                  <td className="align-middle text-left">
                    {item.submission_internalnumber}
                  </td>
                  <td
                    className={`align-middle text-center ${getStatusColor(
                      item.is_urgent
                    )}`}
                  >
                    {getApprovalText(item.is_urgent)}
                  </td>

                  <td className="align-middle text-center">
                    <Button
                      variant="outline-primary"
                      className="me-2"
                      style={{ width: "40px" }}
                      onClick={() => openModal(item)}
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

      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center w-100">การอนุมัติ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && (
            <div className="container">
              {/* ข้อมูลผู้ส่งคำขอยืม */}
              <div className="mb-3 p-3 rounded bg-light">
                <h6 className="border-bottom pb-2 text-secondary fw-bold">
                  ผู้ส่งคำขอยืม
                </h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <p>
                      <b>ชื่อ-สกุล :</b>{" "}
                      {selectedSubmission.submission_username}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <b>เลขพนักงาน :</b> {selectedSubmission.submission_userid}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <b>ตำแหน่ง :</b> {selectedSubmission.submission_position}
                    </p>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <p>
                      <b>หมวด/แผนก :</b>{" "}
                      {selectedSubmission.submission_department}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <b>เบอร์ภายใน :</b>{" "}
                      {selectedSubmission.submission_internalnumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* ข้อมูลอุปกรณ์ */}
              <div className="mb-3 p-3 rounded bg-light">
                <h6 className="border-bottom pb-2 text-secondary fw-bold">
                  รายละเอียดอุปกรณ์
                </h6>
                <div className="row g-3">
                  <div className="col-md-4">
                    <p>
                      <b>ประเภท :</b>

                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <b>จำนวน :</b>{" "}
                    </p>
                  </div>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <p>
                      <b>การใช้งาน :</b> {selectedSubmission.submission_note}
                    </p>
                  </div>
                </div>
              </div>

              {/* ฟอร์มการอนุมัติ */}
              <Form className="p-3 rounded bg-light">
                <h6 className="border-bottom pb-2 text-secondary fw-bold">
                  การอนุมัติ
                </h6>
                <div className="row g-5">
                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>สถานะ :</Form.Label>
                    <Form.Select
                      value={is_urgent}
                      onChange={(e) => setIsUrgent(e.target.value)}
                    >
                      <option value="0">รออนุมัติ</option>
                      <option value="1">อนุมัติ</option>
                      <option value="2">ไม่อนุมัติ</option>
                      <option value="3">คืนแล้ว</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>ประเภท :</Form.Label>
                    <Form.Select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="">เลือกประเภท</option>
                      {[
                        ...new Set(
                          borrowedEquipments.map((e) => e.equipment_type)
                        ),
                      ].map((type, index) => (
                        <option key={index} value={type}>
                          {type}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="row g-5">
                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>ยี่ห้อ :</Form.Label>
                    <Form.Select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      disabled={!selectedType}
                    >
                      <option value="">เลือกยี่ห้อ</option>
                      {[
                        ...new Set(
                          filteredBrands.map((e) => e.equipment_brand)
                        ),
                      ].map((brand, index) => (
                        <option key={index} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>รุ่น :</Form.Label>
                    <Form.Select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      disabled={!selectedBrand}
                    >
                      <option value="">เลือกรุ่น</option>
                      {[
                        ...new Set(
                          filteredModels.map((e) => e.equipment_model)
                        ),
                      ].map((model, index) => (
                        <option key={index} value={model}>
                          {model}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="row g-5">
                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>รหัสทรัพย์สิน :</Form.Label>
                    <Form.Select
                      value={selectedAsset}
                      onChange={(e) => setSelectedAsset(e.target.value)}
                      disabled={!selectedModel}
                    >
                      <option value="">เลือกรหัสทรัพย์สิน</option>
                      {filteredAssets.map((asset, index) => (
                        <option key={index} value={asset.equip_assetcode}>
                          {asset.equip_assetcode}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>เลขที่สัญญา :</Form.Label>
                    <Form.Select
                      value={selectedContract}
                      onChange={(e) => setSelectedContract(e.target.value)}
                      disabled={!selectedModel}
                    >
                      <option value="">เลือกเลขที่สัญญา</option>
                      {filteredAssets.map((asset, index) => (
                        <option key={index} value={asset.equip_contract}>
                          {asset.equip_contract}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="row g-5">
                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>ระหว่างวันที่ :</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={handleTimeStartChange}
                    />
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-2">
                    <Form.Label>ถึงวันที่ :</Form.Label>
                    <Form.Control
                      type="date"
                      onChange={handleTimeEndChange}
                    />
                  </Form.Group>
                </div>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            className="rounded px-4"
            onClick={closeModal}
          >
            ปิด
          </Button>
          <Button
            variant="success"
            className="rounded px-4"
            onClick={handleConfirm}
          >
            ยืนยัน
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Approval;
