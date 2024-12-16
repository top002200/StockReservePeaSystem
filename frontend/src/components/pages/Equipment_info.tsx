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
import Info_Layout from "../Layout/info_Layout";
import {
  getAllEquipments,
  getAllTypes,
  createEquipment,
  getAllPictures,
  deleteEquipment,
  updateEquipment,
} from "../../services/api";
import { EquipmentData } from "../../interface/IEquipment";
import { PictureData } from "../../interface/IPicture"; // Interface for pictures
import Swal from "sweetalert2";
import { TypeData } from "../../interface/IType";


function Equipment_info() {
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([]);
  const [typeOptions, setTypeOptions] = useState<TypeData[]>([]);
  const [pictureOptions, setPictureOptions] = useState<PictureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // <-- Add this line
  const [editingId, setEditingId] = useState<number | string | null>(null);

  const [formData, setFormData] = useState({
    equipment_type: "",
    equipment_brand: "",
    equipment_model: "",
    equip_contract: "",
    equip_assetcode: "",
    equip_img: "",
  });

  const [typeFilter, setTypeFilter] = useState<string>("");

  // Fetch initial data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [typesResponse, picturesResponse] = await Promise.all([
          getAllTypes(),
          getAllPictures(),
        ]);
  
        if (typesResponse.status && Array.isArray(typesResponse.data)) {
          setTypeOptions(typesResponse.data as TypeData[]);
        }
  
        if (picturesResponse.status && Array.isArray(picturesResponse.data)) {
          setPictureOptions(picturesResponse.data as PictureData[]);
        }
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };
  
    const fetchData = async () => {
      try {
        // เรียก API ทั้งหมดพร้อมกัน
        const [equipmentRes, typesResponse, picturesResponse] = await Promise.all([
          getAllEquipments(),
          getAllTypes(),
          getAllPictures(),
        ]);
  
        // จัดการข้อมูลของอุปกรณ์
        if (equipmentRes.status && Array.isArray(equipmentRes.data)) {
          setEquipmentData(equipmentRes.data as EquipmentData[]);
        } else {
          console.error("Error fetching equipment:", equipmentRes.message);
        }
  
        // จัดการข้อมูล Dropdown (ประเภทอุปกรณ์)
        if (typesResponse.status && Array.isArray(typesResponse.data)) {
          setTypeOptions(typesResponse.data as TypeData[]);
        }
  
        // จัดการข้อมูล Dropdown (รูปภาพ)
        if (picturesResponse.status && Array.isArray(picturesResponse.data)) {
          setPictureOptions(picturesResponse.data as PictureData[]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // ปิดสถานะ Loading
      }
    };
  
    fetchData(); // เรียกใช้ฟังก์ชัน fetchData
    fetchDropdownData();
  }, []);

  type FormControlElement =
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement;

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredData = typeFilter
    ? equipmentData.filter((item) => item.equipment_type === typeFilter)
    : equipmentData;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleInputChange = (e: React.ChangeEvent<FormControlElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // บันทึกค่า `picture_data` หรืออื่นๆที่เลือกใน dropdown
    }));
  };

  const handleEditRow = (item: EquipmentData) => {
    setEditingId(item.equipment_id ?? null); // Save the ID of the item being edited
    setFormData({
      equipment_type: item.equipment_type,
      equipment_brand: item.equipment_brand,
      equipment_model: item.equipment_model,
      equip_contract: item.equip_contract,
      equip_assetcode: item.equip_assetcode,
      equip_img: item.equip_img,
    });
    setIsEdit(true); // Indicate that the modal is in edit mode
    setShowModal(true); // Open the modal
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
          const response = await deleteEquipment(id.toString());
          if (response.status) {
            Swal.fire("ลบข้อมูลสำเร็จ!", "", "success");
            const updatedData = await getAllEquipments();
            if (updatedData.status) setEquipmentData(updatedData.data);
          } else {
            Swal.fire("เกิดข้อผิดพลาด", response.message, "error");
          }
        } catch (error) {
          console.error("Error deleting equipment:", error);
          Swal.fire("เกิดข้อผิดพลาด", "ไม่สามารถลบข้อมูลได้", "error");
        }
      }
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.equipment_type ||
      !formData.equipment_brand ||
      !formData.equipment_model ||
      !formData.equip_contract ||
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
      const payload = { ...formData };

      if (isEdit && editingId !== null) {
        // Update existing item
        await updateEquipment(editingId.toString(), payload);
        Swal.fire({
          icon: "success",
          title: "แก้ไขข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload(); // Refresh the page after success
        });
      } else {
        // Create new item
        const response = await createEquipment(payload);
        if (response?.status) {
          Swal.fire({
            icon: "success",
            title: "เพิ่มข้อมูลสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            window.location.reload(); // Refresh the page after success
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: response?.message || "ไม่สามารถบันทึกข้อมูลได้",
          });
          return;
        }
      }

      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Error submitting equipment:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "ไม่สามารถบันทึกข้อมูลได้",
      });
    }
  };

  return (
    <Info_Layout>
      <div className="equipment-info-content">
        <h3
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลอุปกรณ์สำรอง</b>
        </h3>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ maxWidth: "300px" }}
          >
            <option value="">-- แสดงทั้งหมด --</option>
            {typeOptions.map((type) => (
              <option key={type.type_id} value={type.type_id}>
                {type.type_name}
              </option>
            ))}
          </Form.Select>

          <Button
            variant="success"
            onClick={() => setShowModal(true)}
            style={{ width: "40px", height: "40px" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th>ลำดับที่</th>
              <th>ประเภทอุปกรณ์</th>
              <th>รูปภาพ</th>
              <th>ยี่ห้อ</th>
              <th>รุ่น</th>
              <th>เลขที่สัญญา</th>
              <th>รหัสทรัพย์สิน</th>
              <th style={{ width: 150 }}></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.equipment_id} className="align-middle text-center">
                <td>{index + 1 + (currentPage - 1) * rowsPerPage}</td>
                <td>{item.equipment_type}</td>
                <td>
                  <img
                    src={item.equip_img}
                    alt={item.equipment_name}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{item.equipment_brand}</td>
                <td>{item.equipment_model}</td>
                <td>{item.equip_contract}</td>
                <td>{item.equip_assetcode}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => handleEditRow(item)} // Calls the edit handler with the current row's data
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDeleteRow(item.equipment_id ?? 0)} // Calls the delete handler with the current row's ID
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </td>
              </tr>
            ))}
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
              <Form.Label>ประเภทอุปกรณ์</Form.Label>
              <Form.Select
                name="equipment_type"
                value={formData.equipment_type}
                onChange={handleInputChange}
              >
                <option value="">-- เลือกประเภท --</option>
                {typeOptions.map((type) => (
                  <option key={type.type_id} value={type.type_id}>
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
              <Form.Label>เลขที่สัญญา</Form.Label>
              <Form.Control
                type="text"
                name="equip_contract"
                value={formData.equip_contract}
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

              {formData.equip_img && (
                <div className="mt-2 text-center">
                  <img
                    src={formData.equip_img}
                    alt="Selected"
                    style={{ maxWidth: "200px", maxHeight: "200px" }}
                  />
                </div>
              )}
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
    </Info_Layout>
  );
}

export default Equipment_info;
