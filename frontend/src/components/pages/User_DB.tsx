import React, { useState, useEffect } from "react";
import User_Layout from "../Layout/User_Layout";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import { BorrowedEquipmentData } from "../../interface/IBorrowedEquipment";
import { getAllBorrowedEquipments } from "../../services/api";

const User_DB: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BorrowedEquipmentData & { quantity: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [borrowedequipmentData, setBorrowedEquipmentData] = useState<BorrowedEquipmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("📡 Fetching data...");
        const borrowedequipRes = await getAllBorrowedEquipments();
        console.log("🔄 API Response:", borrowedequipRes);

        if (borrowedequipRes.status && Array.isArray(borrowedequipRes.data)) {
          console.log("✅ Data received:", borrowedequipRes.data);
          setBorrowedEquipmentData(borrowedequipRes.data);
        } else {
          console.error("❌ Error fetching equipment: ", borrowedequipRes);
        }
      } catch (error) {
        console.error("🚨 Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Group data by equipment type and calculate quantity
  const groupedData = borrowedequipmentData.reduce((acc: any[], currentItem) => {
    const existingItem = acc.find(
      (item) => item.equipment_type === currentItem.equipment_type
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...currentItem, quantity: 1 });
    }
    return acc;
  }, []);

  const handleShowModal = (item: BorrowedEquipmentData & { quantity: number }) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredData = typeFilter
    ? groupedData.filter((item) => item.equipment_type === typeFilter)
    : groupedData;
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
              <th>ลำดับที่</th>
              <th>อุปกรณ์</th>
              <th>จำนวน</th>
              <th style={{ width: 200 }}>ส่งคำขอยืม</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr
                key={item.borrowed_equipment_id}
                className="align-middle text-center"
              >
                <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td>{item.equipment_type}</td>
                <td>{item.quantity}</td> {/* Display quantity */}
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
        <Modal show={showModal} onHide={handleCloseModal} size="xl" centered>
          <Modal.Header closeButton>
            <Modal.Title>ส่งคำขอยืมอุปกรณ์</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedItem ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>ประเภทอุปกรณ์</Form.Label>
                  <Form.Control
                    type="text"
                    readOnly
                    value={selectedItem.equipment_type}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>จำนวน</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    max={selectedItem.quantity} 
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>วันที่และเวลา</Form.Label>
                  <Form.Control type="datetime-local" />
                </Form.Group>
              </Form>
            ) : (
              <p>ไม่พบข้อมูล</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="success">
              ยืนยัน
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </User_Layout>
  );
};

export default User_DB;
