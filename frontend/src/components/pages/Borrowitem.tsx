import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Pagination,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";
import Layout from "../Layout/Layout";
import {
  getAllBorrowedEquipments,
  createBorrowedEquipment,
  updateBorrowedEquipment,
  deleteBorrowedEquipment,
  getAllPictures,
  getAllTypes,
} from "../../services/api";
import { BorrowedEquipmentData } from "../../interface/IBorrowedEquipment";
import Swal from "sweetalert2";
import { PictureData } from "../../interface/IPicture";
import { TypeData } from "../../interface/IType";

const Borrowitem: React.FC = () => {
  const [borrowedEquipmentData, setBorrowedEquipmentData] = useState<
    BorrowedEquipmentData[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [typeOptions, setTypeOptions] = useState<TypeData[]>([]);
  const [pictureOptions, setPictureOptions] = useState<PictureData[]>([]);
  const [formData, setFormData] = useState<BorrowedEquipmentData>({
    equipment_name: "",
    equipment_type: "",
    equipment_brand: "",
    equipment_model: "",
    equip_contract: "",
    equip_assetcode: "",
    equip_img: "",
  });

  const rowsPerPage = 5;

  // Fetch Borrowed Equipment Data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [typesResponse, picturesResponse] = await Promise.all([
          getAllTypes(), // ดึงข้อมูลประเภทอุปกรณ์
          getAllPictures(), // ดึงข้อมูลรูปภาพ
        ]);

        // ตรวจสอบและตั้งค่า Type Options
        if (typesResponse.status && Array.isArray(typesResponse.data)) {
          setTypeOptions(typesResponse.data as TypeData[]);
        }

        // ตรวจสอบและตั้งค่า Picture Options
        if (picturesResponse.status && Array.isArray(picturesResponse.data)) {
          setPictureOptions(picturesResponse.data as PictureData[]);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    // เรียกใช้ฟังก์ชันใน useEffec

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllBorrowedEquipments();
        console.log("API Response:", response);
        if (
          response.status &&
          response.data &&
          Array.isArray(response.data.data)
        ) {
          setBorrowedEquipmentData(response.data.data);
        } else {
          console.error("Invalid API data:", response);
        }
      } catch (error) {
        console.error("Error fetching borrowed equipment data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
    fetchDropdownData();
  }, []);

  type FormControlElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

  const handleInputChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleModalOpen = () => {
    if (typeOptions.length === 0 || pictureOptions.length === 0) {
      const fetchDropdownData = async () => {
        try {
          const [typesResponse, picturesResponse] = await Promise.all([
            getAllTypes(),
            getAllPictures(),
          ]);

          if (typesResponse.status && Array.isArray(typesResponse.data)) {
            setTypeOptions(typesResponse.data);
          }

          if (picturesResponse.status && Array.isArray(picturesResponse.data)) {
            setPictureOptions(picturesResponse.data);
          }
        } catch (error) {
          console.error("Error fetching dropdown data:", error);
        }
      };

      fetchDropdownData();
    }
    setShowModal(true);
  };
  const handleSubmit = async () => {
    console.log("Form Data:", formData);

    if (
      !formData.equipment_name ||
      !formData.equipment_type ||
      !formData.equipment_brand ||
      !formData.equipment_model ||
      !formData.equip_assetcode ||
      !formData.equip_img
    ) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "กรุณากรอกข้อมูลให้ครบถ้วน",
      });
      return;
    }

    try {
      if (isEdit && editingId !== null) {
        await updateBorrowedEquipment(editingId.toString(), formData);
        Swal.fire("สำเร็จ", "แก้ไขข้อมูลสำเร็จ", "success");
      } else {
        await createBorrowedEquipment(formData);
        Swal.fire("สำเร็จ", "เพิ่มข้อมูลสำเร็จ", "success");
      }

      setShowModal(false);
      setFormData({
        equipment_name: "",
        equipment_type: "",
        equipment_brand: "",
        equipment_model: "",
        equip_contract: "",
        equip_assetcode: "",
        equip_img: "",
      });

      // โหลดข้อมูลใหม่
      setIsLoading(true);
      const response = await getAllBorrowedEquipments();
      if (response.status && Array.isArray(response.data.data)) {
        setBorrowedEquipmentData(response.data.data);
      } else {
        console.error("API response invalid:", response);
      }
    } catch (error) {
      console.error("Error saving borrowed equipment:", error);
      Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถบันทึกข้อมูลได้", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditRow = (item: BorrowedEquipmentData) => {
    setEditingId(item.borrowed_equipment_id || null);
    setFormData(item);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDeleteRow = async (id: number) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณต้องการลบข้อมูลนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteBorrowedEquipment(id.toString());
          Swal.fire("ลบข้อมูลสำเร็จ!", "", "success");
          const updatedData = await getAllBorrowedEquipments();
          if (updatedData.status) setBorrowedEquipmentData(updatedData.data);
        } catch (error) {
          console.error("Error deleting borrowed equipment:", error);
          Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถลบข้อมูลได้", "error");
        }
      }
    });
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = Array.isArray(borrowedEquipmentData)
    ? borrowedEquipmentData.slice(indexOfFirstRow, indexOfLastRow)
    : []; // Fallback to an empty array if not an array

  console.log("Current Rows:", currentRows); // Debug current rows

  const totalPages = Array.isArray(borrowedEquipmentData)
    ? Math.ceil(borrowedEquipmentData.length / rowsPerPage)
    : 0; // Fallback to 0 pages if not an array

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div className="borrowitem-content">
        <h3
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลอุปกรณ์ที่ยืม</b>
        </h3>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Button variant="success" onClick={handleModalOpen}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th>ลำดับที่</th>
              <th>ชื่ออุปกรณ์</th>
              <th>ประเภท</th>
              <th>ยี่ห้อ</th>
              <th>รุ่น</th>
              <th>รหัสทรัพย์สิน</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="text-center">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            ) : currentRows.length > 0 ? (
              currentRows.map((item, index) => (
                <tr
                  key={item.borrowed_equipment_id}
                  className="align-middle text-center"
                >
                  <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                  <td>{item.equipment_name}</td>
                  <td>{item.equipment_type}</td>
                  <td>{item.equipment_brand}</td>
                  <td>{item.equipment_model}</td>
                  <td>{item.equip_assetcode}</td>
                  <td>
                    {item.equip_img && (
                      <img
                        src={item.equip_img}
                        alt="Equipment Image"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => handleEditRow(item)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() =>
                        handleDeleteRow(item.borrowed_equipment_id || 0)
                      }
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  ไม่มีข้อมูล
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pagination className="justify-content-center">
          {[...Array(totalPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex + 1}
              active={pageIndex + 1 === currentPage}
              onClick={() => paginate(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ชื่ออุปกรณ์</Form.Label>
              <Form.Control
                type="text"
                name="equipment_name"
                value={formData.equipment_name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ประเภท</Form.Label>
              <Form.Select
                name="equipment_type"
                value={formData.equipment_type}
                onChange={handleInputChange}
              >
                <option value="">-- เลือกประเภท --</option>
                {typeOptions.map((type) => (
                  <option key={type.type_id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>
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
              <Form.Label>เลขที่สัญญา (ถ้ามี)</Form.Label>
              <Form.Control
                type="text"
                name="equip_contract"
                placeholder="กรอกเลขที่สัญญา (ถ้ามี)"
                value={formData.equip_contract}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เลือกรูปภาพ</Form.Label>
              <Form.Select
                name="equip_img"
                value={formData.equip_img}
                onChange={handleInputChange}
              >
                <option value="">-- เลือกรูปภาพ --</option>
                {pictureOptions.map((picture) => (
                  <option key={picture.picture_id} value={picture.picture_data}>
                    รูปภาพ {picture.picture_id}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Borrowitem;
