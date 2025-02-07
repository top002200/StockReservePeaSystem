import React, { useEffect, useState } from "react";
import Info_Layout from "../Layout/info_Layout";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getAllDistributions,
  deleteDistribution,
  updateDistribution,
} from "../../services/api";
import Swal from "sweetalert2";
import { DistributionData } from "../../interface/IDistribution";
const Distribution: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    equipment_type: "",
    g_name: "",
    equipment_brand: "",
    equipment_model: "",
    equip_contract: "",
    equip_assetcode: "",
    r_name: "",
    date: "",
  });
  const [data, setData] = useState<any[]>([]); // สำหรับเก็บข้อมูลที่ดึงมาจาก API

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchDistributions = async () => {
    try {
      const response = await getAllDistributions();
      if (response.status === true) {
        // ถ้า response.status เป็น boolean
        setData(response.data);
      } else {
        console.error("Failed to fetch distributions:", response.message);
      }
    } catch (error) {
      console.error("Error fetching distributions:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllDistributions();
      console.log("API Response:", response);

      if (response.status) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  const handleDelete = async (index: number) => {
    const idForFix = data[index]?.id_for_fix;

    // ตรวจสอบว่า idForFix มีค่าและไม่เป็นค่าว่าง
    if (!idForFix || idForFix === "") {
      console.error("IDForFix is empty or invalid:", idForFix); // เพิ่ม Debug
      Swal.fire("เกิดข้อผิดพลาด", "IDForFix ไม่มีค่าหรือไม่ถูกต้อง", "error");
      return; // ถ้าไม่มีค่า จะไม่ทำการส่งคำร้องขอ
    }

    console.log("🟡 กำลังพยายามลบ ID:", idForFix); // เพิ่มการ Debug ค่าที่จะลบ

    // ยืนยันการลบด้วย SweetAlert2
    const confirmResult = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "คุณต้องการลบรายการนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirmResult.isConfirmed) {
      return; // ถ้าผู้ใช้กด "ยกเลิก" จะไม่ทำการลบ
    }

    // ส่ง idForFix ที่แปลงเป็นหมายเลข
    const response = await deleteDistribution(Number(idForFix));
    console.log("ผลลัพธ์การลบ:", response);

    if (response.status) {
      const newData = data.filter((item) => item.id_for_fix !== idForFix);
      setData([...newData]);
      console.log("ข้อมูลที่อัปเดต:", newData);
      Swal.fire("ลบเสร็จสิ้น", "รายการนี้ถูกลบออกแล้ว", "success");
    } else {
      console.error("ลบไม่สำเร็จ:", response.message);
      Swal.fire(
        "เกิดข้อผิดพลาด",
        response.message || "ไม่สามารถลบรายการได้",
        "error"
      );
    }
  };

  interface Equipment {
    equipment_type: string;
    equipment_name: string;
    equipment_brand: string;
    equipment_model: string;
  }

  interface DistributionItem {
    equipment: Equipment;
    equip_contract: string;
    r_name: string;
    date: string;
    distribution_id: string;
    distribution_amount: number;
    g_name: string;
    equip_assetcode: string;
  }

  const handleOpenModal = (
    edit = false,
    item: DistributionItem | null = null
  ) => {
    setIsEdit(edit);
    setShowModal(true);

    if (edit && item) {
      setFormData({
        equipment_type: item.equipment?.equipment_type || "",
        g_name: item.g_name || "",
        equipment_brand: item.equipment?.equipment_brand || "",
        equipment_model: item.equipment?.equipment_model || "",
        equip_contract: item.equip_contract || "",
        equip_assetcode: item.equip_assetcode || "",
        r_name: item.r_name || "",
        date: item.date || "",
      });
    } else {
      setFormData({
        equipment_type: "",
        g_name: "",
        equipment_brand: "",
        equipment_model: "",
        equip_contract: "",
        equip_assetcode: "",
        r_name: "",
        date: "",
      });
    }
  };

  

  const handleEdit = async (index: number) => {
    const idForFix = data[index]?.id_for_fix;

    if (!idForFix || idForFix === "") {
      console.error("IDForFix is empty or invalid:", idForFix);
      Swal.fire("เกิดข้อผิดพลาด", "IDForFix ไม่มีค่าหรือไม่ถูกต้อง", "error");
      return;
    }

    console.log("🟡 กำลังแก้ไข ID:", idForFix);

    // เรียกใช้ SweetAlert2 เพื่อให้ผู้ใช้ยืนยันการแก้ไข
    const confirmResult = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "คุณต้องการแก้ไขข้อมูลนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, แก้ไขเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    // สร้างข้อมูลที่จะอัปเดต
    const updateData: DistributionData = {
      g_name: data[index]?.g_name || "",
      r_name: data[index]?.r_name || "",
      distribution_amount: data[index]?.distribution_amount || 0,
      equipment_id: data[index]?.equipment_id || 0,
      date: data[index]?.date || "",
      equip_contract: data[index]?.equip_contract || "",
      equip_assetcode: data[index]?.equip_assetcode || "",
    };

    // ส่งข้อมูลไปที่ API เพื่ออัปเดต
    const response = await updateDistribution(updateData);

    if (response.status) {
      Swal.fire("แก้ไขเสร็จสิ้น", "ข้อมูลได้รับการอัปเดตเรียบร้อย", "success");
      // อาจจะอัปเดตข้อมูลที่แสดงบนหน้า UI ตามการตอบกลับจาก API
    } else {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        response.message || "ไม่สามารถอัปเดตข้อมูลได้",
        "error"
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  return (
    <Info_Layout>
      <div className="distribute-content">
        <h4
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลการจัดสรรอุปกรณ์</b>
        </h4>

        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th>ลำดับที่</th>
              <th>อุปกรณ์</th>
              <th>จำนวน</th>
              <th>ผู้จัดสรร</th>
              <th>ผู้รับจัดสรร</th>
              <th>วันที่จัดสรร</th>
              <th style={{ width: 150 }}></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.distribution_id}>
                <td className="align-middle text-center">
                  {indexOfFirstRow + index + 1}
                </td>
                <td className="align-middle text-left">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        paddingRight: "5px",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <strong>ประเภท:</strong>{" "}
                      {item.equipment?.equipment_type || "-"}
                      <br />
                      <strong>ยี่ห้อ:</strong>{" "}
                      {item.equipment?.equipment_brand || "-"}
                      <br />
                      <strong>รุ่น:</strong>{" "}
                      {item.equipment?.equipment_model || "-"}
                      <br />
                    </div>
                    <div style={{ flex: 1, paddingLeft: "10px" }}>
                      <strong>รหัสทรัพย์สิน:</strong>{" "}
                      {item.equip_assetcode || "-"}
                      <br />
                      <strong>เลขที่สัญญา:</strong> {item.equip_contract || "-"}
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center">
                  {item.distribution_amount}
                </td>
                <td className="align-middle text-center">{item.g_name}</td>
                <td className="align-middle text-center">{item.r_name}</td>
                <td className="align-middle text-center">{item.date}</td>
                <td className="align-middle text-center">
                  {/* <Button
                    variant="outline-primary"
                    className="me-2"
                    style={{ width: "40px" }}
                    onClick={() => handleEdit(index)} // เรียกฟังก์ชัน handleEdit เมื่อคลิก
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button> */}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton className="modal-header-form">
            <Modal.Title>{isEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ฟิลด์สำหรับแก้ไขหรือเพิ่มข้อมูล */}
              <Form.Group className="mb-3">
                <Form.Label>ประเภท</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_type"
                  value={formData.equipment_type}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ผู้จัดสรร</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_name"
                  value={formData.g_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ยี่ห้อ</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_brand"
                  value={formData.equipment_brand}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รุ่น</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_model"
                  value={formData.equipment_model}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รหัสทรัพย์สิน</Form.Label>
                <Form.Control
                  type="text"
                  name="equip_assetcode"
                  value={formData.equip_assetcode}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>เลขที่สัญญา</Form.Label>
                <Form.Control
                  type="text"
                  name="equip_contract"
                  value={formData.equip_contract}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ผู้รับ</Form.Label>
                <Form.Control
                  type="text"
                  name="receiver"
                  value={formData.r_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>วันที่จำหน่าย</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
            <Button variant="success">บันทึก</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Info_Layout>
  );
};

export default Distribution;
