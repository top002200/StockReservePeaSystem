import React, { useState, useEffect } from "react";
import Repair_Layout from "../Layout/Repair_Layout";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faEdit,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  createRepair,
  deleteRepair,
  getAllRepairs,
  updateRepair,
} from "../../services/api";
import { RepairData } from "../../interface/IRepair";
import Swal from "sweetalert2";
import { Pagination } from "react-bootstrap";

const Equipment_Repair: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState<RepairData | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<RepairData>({
    repair_id: 0,
    user_name: "",
    dept: "",
    type: "",
    device_name: "",
    brand: "",
    model: "",
    contract: "",
    problem: "",
    fixing: "",
    note: "",
    date: "",
  });
  const [data, setData] = useState<RepairData[]>([]);
  // Add these states and functions to handle editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState<RepairData | null>(null);
  const [selectedMonth, setSelectedMonth] = useState(""); // State สำหรับเดือนที่เลือก
  const [selectedYear, setSelectedYear] = useState("");

  const handleShowEditModal = (repair: RepairData) => {
    setEditFormData(repair);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditFormData(null);
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editFormData) {
      setEditFormData((prevData) => ({
        ...prevData!,
        [name]: value,
      }));
    }
  };

  const handleSaveEdit = async () => {
    if (editFormData) {
      const result = await updateRepair(editFormData);
      if (result.status) {
        setData((prevData) =>
          prevData.map((item) =>
            item.repair_id === editFormData.repair_id ? editFormData : item
          )
        );
        Swal.fire("สำเร็จ", "ข้อมูลได้รับการแก้ไขเรียบร้อยแล้ว", "success");
        handleCloseEditModal();
      } else {
        Swal.fire("ผิดพลาด", "ไม่สามารถแก้ไขข้อมูลได้", "error");
      }
    }
  };

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchRepairs = async () => {
    const response = await getAllRepairs();
    if (response.status) {
      setData(response.data || []);
    } else {
      console.error("Failed to fetch repairs:", response.message);
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  const handleShowModal = (detail: RepairData) => {
    setSelectedDetail(detail);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDetail(null);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = async (repair: RepairData) => {
    const updatedData = { ...repair, note: "Updated Note" }; // ตัวอย่างการแก้ไข
    const result = await updateRepair(updatedData);

    if (result.status) {
      console.log("Repair updated successfully:", result.data);
      // อัปเดต state `data` เพื่อรีเฟรชตาราง
      setData((prevData) =>
        prevData.map((item) =>
          item.repair_id === updatedData.repair_id ? updatedData : item
        )
      );
    } else {
      console.error(result.message);
    }
  };

  const handleDelete = async (repair_id: number) => {
    // ใช้ SweetAlert2 แทน window.confirm
    const result = await Swal.fire({
      title: "คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?",
      text: "ข้อมูลจะถูกลบไปและไม่สามารถกู้คืนได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      // เรียกฟังก์ชันลบข้อมูลจาก API
      const deleteResult = await deleteRepair(repair_id);

      if (deleteResult.status) {
        // ลบข้อมูลออกจาก state
        setData((prevData) =>
          prevData.filter((item) => item.repair_id !== repair_id)
        );
        Swal.fire(
          "ลบสำเร็จ!",
          "ข้อมูลอุปกรณ์ได้ถูกลบเรียบร้อยแล้ว.",
          "success"
        );
      } else {
        Swal.fire(
          "ลบไม่สำเร็จ!",
          "ไม่สามารถลบข้อมูลได้, โปรดลองใหม่อีกครั้ง.",
          "error"
        );
      }
    }
  };

  const handleAddData = async () => {
    const { repair_id, ...rest } = formData;
    try {
      const response = await createRepair(rest);
      if (response?.status) {
        fetchRepairs();
        setShowAddModal(false);
        setFormData({
          repair_id: undefined,
          user_name: "",
          dept: "",
          type: "",
          device_name: "",
          brand: "",
          model: "",
          contract: "",
          problem: "",
          fixing: "",
          note: "",
          date: "",
        });
      } else {
        console.error(
          "Failed to create repair:",
          response?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error creating repair:", error);
    }
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value); // อัปเดตเดือนที่เลือก
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };

  /// กรองข้อมูลตามปีและเดือน
  const filteredData = data.filter((item) => {
    if (!item.date) return false;
    const date = new Date(item.date);
    const itemMonth = date.getMonth() + 1;
    const itemYear = date.getFullYear();
    const isMonthMatched =
      selectedMonth === "" || itemMonth === parseInt(selectedMonth);
    const isYearMatched =
      selectedYear === "" || itemYear === parseInt(selectedYear);
    return isMonthMatched && isYearMatched;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // การแบ่งหน้า
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };


  return (
    <Repair_Layout>
      <div className="equipment-info-content">
        <h4
          className="text-center"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลอุปกรณ์ส่งซ่อม</b>
        </h4>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
            padding: "0 20px", // เพิ่ม padding ด้านข้างเพื่อความสมดุล
          }}
        >
          {/* Dropdown สำหรับเลือกเดือน และปี */}
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Dropdown สำหรับเลือกเดือน */}
            <Form.Select
              aria-label="เลือกเดือน"
              onChange={handleMonthChange}
              value={selectedMonth}
              style={{ width: "200px" }}
            >
              <option value="">เลือกเดือน</option>
              <option value="1">มกราคม</option>
              <option value="2">กุมภาพันธ์</option>
              <option value="3">มีนาคม</option>
              <option value="4">เมษายน</option>
              <option value="5">พฤษภาคม</option>
              <option value="6">มิถุนายน</option>
              <option value="7">กรกฎาคม</option>
              <option value="8">สิงหาคม</option>
              <option value="9">กันยายน</option>
              <option value="10">ตุลาคม</option>
              <option value="11">พฤศจิกายน</option>
              <option value="12">ธันวาคม</option>
            </Form.Select>

            {/* Dropdown สำหรับเลือกปี */}
            <Form.Select
              aria-label="เลือกปี"
              onChange={handleYearChange}
              value={selectedYear}
              style={{ width: "200px" }}
            >
              <option value="">เลือกปี</option>
              {Array.from(
                new Set(
                  data
                    .filter((item) => {
                      // กรองข้อมูลตามเดือนก่อน
                      if (selectedMonth) {
                        const itemMonth = new Date(item.date as string).getMonth() + 1;
                        return itemMonth === parseInt(selectedMonth);
                      }
                      return true;
                    })
                    .filter((item) => item.date) // กรองเฉพาะข้อมูลที่มีวันที่
                    .map((item) => {
                      const date = new Date(item.date as string); // กำหนด item.date เป็น string
                      return date.getFullYear();
                    })
                )
              )
                .sort()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </Form.Select>
          </div>

          <button
            type="button"
            className="btn btn-success"
            onClick={() => setShowAddModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {/* Existing content */}
        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th>ลำดับที่</th>
              <th>ผู้ส่งซ่อม</th>
              <th>ประเภทอุปกรณ์</th>
              <th>ชื่ออุปกรณ์</th>
              <th>วันที่ส่งซ่อม</th>
              <th style={{ width: 100 }}>รายละเอียด</th>
              <th style={{ width: 150 }}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.repair_id} className="align-middle text-center">
                <td>{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td>{item.user_name}</td>
                <td>{item.type}</td>
                <td>{item.device_name}</td>
                <td>
                  {item.date ? new Date(item.date).toLocaleDateString() : ""}
                </td>
                <td>
                  <Button
                    variant="outline-info"
                    onClick={() => handleShowModal(item)}
                  >
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </Button>
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    style={{ width: "40px" }}
                    onClick={() => handleShowEditModal(item)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(item.repair_id!)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination Controls */}
        <Pagination className="justify-content-center">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          />
        </Pagination>

        {/* Add Modal */}
        <Modal
          show={showAddModal}
          onHide={() => setShowAddModal(false)}
          size="lg"
          centered
        >
          <Modal.Header closeButton className="modal-header-form">
            <Modal.Title className="text-center w-100">
              <b>เพิ่มข้อมูลอุปกรณ์ส่งซ่อม</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ข้อมูลผู้ส่งซ่อม */}
              <div className="mb-4">
                <h6 className="border-bottom pb-2 text-secondary fw-bold">
                  ข้อมูลผู้ส่งซ่อม
                </h6>
                <div className="row">
                  <Form.Group className="col-md-5 mb-3">
                    <Form.Label>ผู้ส่งซ่อม:</Form.Label>
                    <Form.Control
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="col-md-5 mb-3">
                    <Form.Label>แผนก:</Form.Label>
                    <Form.Control
                      type="text"
                      name="dept"
                      value={formData.dept}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* ข้อมูลอุปกรณ์ */}
              <div className="mb-4">
                <h6 className="border-bottom pb-2 text-secondary fw-bold">
                  ข้อมูลอุปกรณ์
                </h6>
                <div className="row">
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>ประเภท:</Form.Label>
                    <Form.Control
                      type="text"
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>ชื่ออุปกรณ์:</Form.Label>
                    <Form.Control
                      type="text"
                      name="device_name"
                      value={formData.device_name}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>ยี่ห้อ:</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>รุ่น:</Form.Label>
                    <Form.Control
                      type="text"
                      name="model"
                      value={formData.model}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>เลขที่สัญญา:</Form.Label>
                    <Form.Control
                      type="text"
                      name="contract"
                      value={formData.contract}
                      onChange={handleFormChange}
                    />
                  </Form.Group>
                </div>
              </div>

              {/* รายละเอียดการซ่อม */}
              <div className="mb-4">
                <h6 className="border-bottom pb-2 text-secondary fw-bold">
                  รายละเอียดการซ่อม
                </h6>
                <Form.Group className="col-md-4">
                  <Form.Label>วันที่ส่งซ่อม:</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>สาเหตุที่ส่งซ่อม:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="problem"
                    value={formData.problem}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>การแก้ไข:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="fixing"
                    value={formData.fixing}
                    onChange={handleFormChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>หมายเหตุ:</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    name="note"
                    value={formData.note}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleAddData}>
              บันทึก
            </Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              ยกเลิก
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showEditModal}
          onHide={handleCloseEditModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <b>แก้ไขข้อมูลอุปกรณ์</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editFormData && (
              <Form>
                {/* ข้อมูลผู้ส่งซ่อม */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2 text-secondary fw-bold">
                    ข้อมูลผู้ส่งซ่อม
                  </h6>
                  <div className="row">
                    <Form.Group className="col-md-5 mb-3">
                      <Form.Label>ผู้ส่งซ่อม:</Form.Label>
                      <Form.Control
                        type="text"
                        name="user_name"
                        value={editFormData.user_name}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                    <Form.Group className="col-md-5 mb-3">
                      <Form.Label>แผนก:</Form.Label>
                      <Form.Control
                        type="text"
                        name="dept"
                        value={editFormData.dept}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                  </div>
                </div>

                {/* ข้อมูลอุปกรณ์ */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2 text-secondary fw-bold">
                    ข้อมูลอุปกรณ์
                  </h6>
                  <div className="row">
                    <Form.Group className="col-md-4 mb-3">
                      <Form.Label>ประเภท:</Form.Label>
                      <Form.Control
                        type="text"
                        name="type"
                        value={editFormData.type}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                    <Form.Group className="col-md-4 mb-3">
                      <Form.Label>ชื่ออุปกรณ์:</Form.Label>
                      <Form.Control
                        type="text"
                        name="device_name"
                        value={editFormData.device_name}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                  </div>
                  <div className="row">
                    <Form.Group className="col-md-4 mb-3">
                      <Form.Label>ยี่ห้อ:</Form.Label>
                      <Form.Control
                        type="text"
                        name="brand"
                        value={editFormData.brand}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                    <Form.Group className="col-md-4 mb-3">
                      <Form.Label>รุ่น:</Form.Label>
                      <Form.Control
                        type="text"
                        name="model"
                        value={editFormData.model}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                    <Form.Group className="col-md-4 mb-3">
                      <Form.Label>เลขที่สัญญา:</Form.Label>
                      <Form.Control
                        type="text"
                        name="contract"
                        value={editFormData.contract}
                        onChange={handleEditFormChange}
                      />
                    </Form.Group>
                  </div>
                </div>

                {/* รายละเอียดการซ่อม */}
                <div className="mb-4">
                  <h6 className="border-bottom pb-2 text-secondary fw-bold">
                    รายละเอียดการซ่อม
                  </h6>
                  <Form.Group className="col-md-4 mb-3">
                    <Form.Label>วันที่ส่งซ่อม:</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={editFormData.date}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>สาเหตุที่ส่งซ่อม:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="problem"
                      value={editFormData.problem}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>การแก้ไข:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      name="fixing"
                      value={editFormData.fixing}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>หมายเหตุ:</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={1}
                      name="note"
                      value={editFormData.note}
                      onChange={handleEditFormChange}
                    />
                  </Form.Group>
                </div>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              ยกเลิก
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              บันทึก
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Detail Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title className="text-center w-100">
              <b>รายละเอียดการซ่อม</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDetail ? (
              <div className="container">
                {/* ข้อมูลผู้ส่งซ่อม */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 text-secondary fw-bold">
                    ข้อมูลผู้ส่งซ่อม
                  </h5>
                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <b>ผู้ส่งซ่อม :</b> {selectedDetail.user_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>แผนก :</b> {selectedDetail.dept}
                      </p>
                    </div>
                  </div>
                </div>

                {/* ข้อมูลอุปกรณ์ */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 text-secondary fw-bold">
                    ข้อมูลอุปกรณ์
                  </h5>
                  <div className="row">
                    <div className="col-md-4">
                      <p>
                        <b>ประเภท :</b> {selectedDetail.type}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <b>ชื่ออุปกรณ์ :</b> {selectedDetail.device_name}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>ยี่ห้อ :</b> {selectedDetail.brand}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>รุ่น :</b> {selectedDetail.model}
                      </p>
                    </div>
                    <div className="col-md-4">
                      <p>
                        <b>เลขที่สัญญา :</b> {selectedDetail.contract}
                      </p>
                    </div>
                  </div>
                </div>

                {/* รายละเอียดการซ่อม */}
                <div className="mb-4">
                  <h5 className="border-bottom pb-2 text-secondary fw-bold">
                    รายละเอียดการซ่อม
                  </h5>
                  <p>
                    <b>วันที่ส่งซ่อม :</b>{" "}
                    {selectedDetail.date
                      ? new Date(selectedDetail.date)
                        .toISOString()
                        .split("T")[0]
                      : "วันที่ไม่ระบุ"}
                  </p>
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                    }}
                  >
                    <b>สาเหตุที่ส่งซ่อม :</b> {selectedDetail.problem}
                  </p>
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                    }}
                  >
                    <b>การแก้ไข :</b> {selectedDetail.fixing}
                  </p>
                  <p
                    style={{
                      whiteSpace: "pre-wrap",
                      overflowWrap: "break-word",
                    }}
                  >
                    <b>หมายเหตุ :</b> {selectedDetail.note}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-danger text-center">ไม่พบข้อมูล</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Repair_Layout>
  );
};

export default Equipment_Repair;
