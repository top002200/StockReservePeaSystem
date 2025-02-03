import React, { useState, useEffect } from "react";
import User_Layout from "../Layout/User_Layout";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { BorrowedEquipmentData } from "../../interface/IBorrowedEquipment";
import { getAllBorrowedEquipments, getAllSubmissions, createSubmission } from "../../services/api";

const User_DB: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    (BorrowedEquipmentData & { quantity: number }) | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [borrowedequipmentData, setBorrowedEquipmentData] = useState<BorrowedEquipmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Fetching data...");
        const borrowedequipRes = await getAllBorrowedEquipments();
        const submissionsRes = await getAllSubmissions();
  
        console.log("📦 Borrowed Equipment Response:", borrowedequipRes);
        console.log("📦 Submissions Response:", submissionsRes);
  
        if (borrowedequipRes.status && Array.isArray(borrowedequipRes.data)) {
          setBorrowedEquipmentData(borrowedequipRes.data);
        }
        if (submissionsRes.status) {
          setSubmissions(submissionsRes.data);
        }
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  

  const [submissionData, setSubmissionData] = useState({
    title: "",
    submission_username: "",
    submission_userid: "",
    submission_position: "",
    submission_department: "",
    submission_division: "",
    submission_section: "",
    submission_internalnumber: "",
    equipment_type: selectedItem?.equipment_type || "",
    amount: 1,
    submitted_at: new Date().toISOString(),
    submission_note: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmissionData({ ...submissionData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    const response = await createSubmission(submissionData);
    if (response.status) {
      alert("บันทึกสำเร็จ!");
      setShowModal(false);
    } else {
      alert("เกิดข้อผิดพลาด: " + response.message);
    }
  };

 

  useEffect(() => {
    if (selectedItem) {
      setSubmissionData((prev) => ({
        ...prev,
        equipment_type: selectedItem.equipment_type,
      }));
    }
  }, [selectedItem]);
  

  const handleShowModal = (item: BorrowedEquipmentData & { quantity: number }) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const disabledAssets = new Map();
  submissions.forEach((sub) => {
    if (sub.is_urgent === 1) {
      const code = String(sub.asset_code || "");
      disabledAssets.set(code, (disabledAssets.get(code) || 0) + 1);
    }
  });
  const groupedData = borrowedequipmentData.reduce((acc: any[], currentItem) => {
    const existingItem = acc.find((item) => item.equipment_type === currentItem.equipment_type);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...currentItem, quantity: 1 });
    }
    return acc;
  }, []);
  const adjustedGroupedData = groupedData
  .map((item) => {
    const reduceCount = disabledAssets.get(String(item.equip_assetcode || "")) || 0;
    return {
      ...item,
      quantity: Math.max(0, item.quantity - reduceCount),
    };
  })
  .filter((item) => item.quantity > 0); // ซ่อนแถวที่จำนวนเหลือ 0
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredData = typeFilter
    ? adjustedGroupedData.filter((item) => item.equipment_type === typeFilter)
    : adjustedGroupedData;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);


  return (
    <User_Layout>
      <div className="user-dash-content">
        <h3
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลอุปกรณ์</b>
        </h3>
        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th style={{width: "100px"}}>ลำดับที่</th>
              <th style={{width: "200px"}}>อุปกรณ์</th>
              <th style={{width: "100px"}}>จำนวน</th>
              <th style={{width: "100px"}}>ส่งคำขอยืม</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.borrowed_equipment_id} className="align-middle text-center">
                <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td>{item.equipment_type}</td>
                <td>{item.quantity}</td> 
                <td>
                  <Button
                    variant="outline-secondary"
                    style={{ color: "#c7911b", borderColor: "#c7911b" }}
                    onClick={() => handleShowModal(item)}
                  >
                    <FontAwesomeIcon icon={faFileExport} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-center w-100">
              ส่งคำขอยืมอุปกรณ์
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ข้อมูลผู้ขอยืม */}
              <h6 className="border-bottom pb-2 text-secondary fw-bold">
                ข้อมูลผู้ส่งคำขอยืม
              </h6>
              <div className="row">
                <Form.Group className="col-md-2">
                  <Form.Label>คำนำหน้าชื่อ</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={submissionData.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-4">
                  <Form.Label>ชื่อ-สกุล</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_username"
                    value={submissionData.submission_username}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-3">
                  <Form.Label>เลขประจำตัวพนักงาน</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_userid"
                    value={submissionData.submission_userid}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-3">
                  <Form.Label>ตำแหน่ง</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_position"
                    value={submissionData.submission_position}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              <div className="row">
                <Form.Group className="col-md-3">
                  <Form.Label>หมวด/แผนก:</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_department"
                    value={submissionData.submission_department}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-3">
                  <Form.Label>กอง/เขต:</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_division"
                    value={submissionData.submission_division}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-3">
                  <Form.Label>ฝ่าย/ภาค:</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_section"
                    value={submissionData.submission_section}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="col-md-3">
                  <Form.Label>เบอร์ภายใน:</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_internalnumber"
                    value={submissionData.submission_internalnumber}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>

              {/* ข้อมูลอุปกรณ์ */}
              <h6 className="border-bottom pb-2 text-secondary fw-bold mt-3">
                ข้อมูลอุปกรณ์
              </h6>
              <div className="row">
                <Form.Group className="col-md-4">
                  <Form.Label>ประเภทอุปกรณ์</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={submissionData.equipment_type}
                  />
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>การใช้งาน</Form.Label>
                  <Form.Control
                    type="text"
                    name="submission_note"
                    value={submissionData.submission_note}
                    onChange={handleChange}
                  />
                </Form.Group>
                </div>
                <div className="row">
                <Form.Group className="col-md-2">
                  <Form.Label>จำนวน</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    min="1"
                    max={selectedItem?.quantity || 1}
                    value={submissionData.amount}
                    onChange={(e) =>
                      setSubmissionData({
                        ...submissionData,
                        amount: Number(e.target.value),
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="col-md-4">
                  <Form.Label>วันที่และเวลา</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="submitted_at"
                    value={submissionData.submitted_at.slice(0, 16)}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleSubmit}>
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </User_Layout>
  );
};

export default User_DB;
