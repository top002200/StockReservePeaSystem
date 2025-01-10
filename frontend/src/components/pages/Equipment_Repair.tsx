import React, { useState, useEffect } from "react";
import Repair_Layout from "../Layout/Repair_Layout";
import { Table, Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
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
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

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


  // Fetch repairs data
  const fetchRepairs = async () => {
    const response = await getAllRepairs();

    if (response.status) {
      const data = response.data; // Extract the 'data' field

      if (Array.isArray(data)) {
        setData(data); // Set the extracted data
      } else {
        console.error(
          "Invalid data format. Expected an array, received:",
          data
        );
        setData([]); // Fallback to an empty array
      }
    } else {
      console.error("Failed to fetch repairs:", response.message);
      setData([]); // Fallback to an empty array
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
      title: 'คุณแน่ใจหรือไม่ที่จะลบข้อมูลนี้?',
      text: "ข้อมูลจะถูกลบไปและไม่สามารถกู้คืนได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ลบ',
      cancelButtonText: 'ยกเลิก',
    });

    if (result.isConfirmed) {
      // เรียกฟังก์ชันลบข้อมูลจาก API
      const deleteResult = await deleteRepair(repair_id);

      if (deleteResult.status) {
        // ลบข้อมูลออกจาก state
        setData((prevData) => prevData.filter((item) => item.repair_id !== repair_id));
        Swal.fire(
          'ลบสำเร็จ!',
          'ข้อมูลอุปกรณ์ได้ถูกลบเรียบร้อยแล้ว.',
          'success'
        );
      } else {
        Swal.fire(
          'ลบไม่สำเร็จ!',
          'ไม่สามารถลบข้อมูลได้, โปรดลองใหม่อีกครั้ง.',
          'error'
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

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Get data for the current page
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Group data by type for the chart
  const equipmentTypeCounts = data.reduce((acc: { [key: string]: number }, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(equipmentTypeCounts),
    datasets: [
      {
        data: Object.values(equipmentTypeCounts),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const equipmentModelCounts = data.reduce((acc: { [key: string]: number }, item) => {
    acc[item.model] = (acc[item.model] || 0) + 1;
    return acc;
  }, {});

  return (
    <Repair_Layout>
      <div className="equipment-info-content">
        <h3
          className="text-center"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลอุปกรณ์ส่งซ่อม</b>
        </h3>

        {/* Row for Overview Cards */}
        <Row>
          <Col md={4} sm={3} className="">
            <Card className="shadow-sm card-dash">
              <Card.Body className="d-flex justify-content-between align-items-center dash-body">
                {/* ข้อมูลด้านซ้าย */}
                <div className="text-start">
                  <p className="mb-2"><b>ประเภทอุปกรณ์ที่ส่งซ่อม</b></p>
                  {/* Legend ด้านล่าง */}
                  <div className="mb-3 text-start">
                    <ul className="list-unstyled d-flex flex-column">
                      <li className="d-flex align-items-center mb-1">
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#FF6384",
                            display: "inline-block",
                            marginRight: "8px",
                            borderRadius: "50%",
                          }}
                        ></span>
                        <span>PC</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#36A2EB",
                            display: "inline-block",
                            marginRight: "8px",
                            borderRadius: "50%",
                          }}
                        ></span>
                        <span>Printer</span>
                      </li>
                      <li className="d-flex align-items-center">
                        <span
                          style={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: "#FFCE56",
                            display: "inline-block",
                            marginRight: "8px",
                            borderRadius: "50%",
                          }}
                        ></span>
                        <span>Notebook</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* แผนภูมิด้านขวา */}
                <div className="ms-auto" style={{ width: "100%", maxWidth: "100px", height: "auto" }}>
                  <Doughnut
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        tooltip: { enabled: true },
                        legend: { display: false },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 10,
            paddingRight: 20,
          }}
        >
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
                <td>{item.date}</td>
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
                    <b>วันที่ส่งซ่อม :</b> {selectedDetail.date}
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
