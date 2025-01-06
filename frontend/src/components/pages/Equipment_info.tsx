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
import {
  faEdit,
  faTrashCan,
  faPlus,
  faArrowRightToBracket,
  faArrowUpRightFromSquare,
  faArrowRightFromBracket,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
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
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<
    string | number | null
  >(null); // เก็บ ID ของอุปกรณ์ที่เลือก

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // <-- Add this line
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [showModalPaid, setShowModalPaid] = useState(false); // To control visibility of ModalPaid
  const [formDataPaid, setFormDataPaid] = useState({
    equipment_id: "", // เพิ่ม equipment_id
    name: "",
    date: "",
    amount: "",
  });

  const handleRowClick = (equipmentId: string | number) => {
    setSelectedEquipmentId(equipmentId); // บันทึก ID ของอุปกรณ์ที่เลือก
    setShowModalPaid(true); // เปิด Modal สำหรับข้อมูลการขาย
  };

  // ฟังก์ชันการจัดการกรอกข้อมูล
  const handleInputChangePaid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataPaid((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitPaid = async () => {
    const equipmentIdPaid = parseInt(formDataPaid.equipment_id, 10);

    // ตรวจสอบว่า equipmentIdPaid เป็นตัวเลขที่ถูกต้อง
    if (isNaN(equipmentIdPaid)) {
      alert("รหัสอุปกรณ์ไม่ถูกต้อง");
      return;
    }

    // ค้นหาข้อมูลอุปกรณ์จาก equipmentData ตาม ID ที่เลือก
    const selectedEquipment = equipmentData.find(
      (item: EquipmentData) => item.equipment_id === equipmentIdPaid
    );

    if (!selectedEquipment) {
      alert("ไม่พบอุปกรณ์ที่เลือก");
      return;
    }

    // แปลง equip_contract จาก string เป็น number
    const availableAmount = selectedEquipment.equip_amount;

    // Convert formDataPaid.amount to a number
    const amountToReduce = parseInt(formDataPaid.amount, 10);

    if (isNaN(amountToReduce)) {
      alert("กรุณากรอกจำนวนที่ถูกต้อง");
      return;
    }

    if (amountToReduce > availableAmount) {
      alert("คุณใส่จำนวนเกิน Stock อุปกรณ์");
    } else {
      // ลดจำนวนใน equip_contract
      selectedEquipment.equip_amount = availableAmount - amountToReduce;

      // เรียกใช้ updateEquipment API เพื่ออัปเดตข้อมูลในฐานข้อมูล
      const result = await updateEquipment(
        String(selectedEquipment.equipment_id), // Convert to string
        selectedEquipment
      );

      if (result.status) {
        alert("ข้อมูลถูกอัปเดตสำเร็จ");
        setShowModalPaid(false);
        setFormDataPaid({
          equipment_id: "", // รีเซ็ตค่า
          name: "",
          date: "",
          amount: "", // รีเซ็ตจำนวน
        });
      } else {
        alert(result.message);
      }
    }
  };

  // Toggle ModalPaid visibility
  const ModalPaid = (equipment_id?: number | undefined) =>
    setShowModalPaid(true);

  const [formData, setFormData] = useState({
    equipment_type: "",
    equipment_brand: "",
    equipment_model: "",
    equip_amount: 0,
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
        const [equipmentRes, typesResponse, picturesResponse] =
          await Promise.all([
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

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    // ถ้าเป็นค่าจำนวน (equip_amount) ให้แปลงเป็นตัวเลข
    if (name === "equip_amount") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value ? Number(value) : "", // ถ้ามีค่า ก็แปลงเป็นตัวเลข ถ้าไม่มีค่า ให้เป็นค่าว่าง
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditRow = (item: EquipmentData) => {
    setEditingId(item.equipment_id ?? null); // Save the ID of the item being edited
    setFormData({
      equipment_type: item.equipment_type,
      equipment_brand: item.equipment_brand,
      equipment_model: item.equipment_model,
      equip_amount: item.equip_amount,
      equip_assetcode: item.equip_assetcode,
      equip_img: item.equip_img,
    });
    setIsEdit(true); // Indicate that the modal is in edit mode
    setShowModal(true); // Open the modal
  };

  const handleDeleteRow = async (id: number) => {
    Swal.fire({
      title: "ต้องการลบข้อมูลนี้หรือไม่?",
      text: "ยืนยันการลบ",
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
            Swal.fire({
              icon: "success",
              title: "สำเร็จ",
              text: "ลบข้อมูลสำเร็จ", // Alert สำหรับการแก้ไขสำเร็จ
              showConfirmButton: false,
              timer: 2000, // ปิดอัตโนมัติใน 2 วินาที
            });
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
      !formData.equip_amount ||
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
            onClick={() => {
              setFormData({
                equipment_type: "",
                equipment_brand: "",
                equipment_model: "",
                equip_amount: 0,
                equip_assetcode: "",
                equip_img: "",
              }); // Reset formData
              setIsEdit(false); // Indicate Add Mode
              setShowModal(true); // Open the Modal
            }}
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
              <th>จำนวน</th> {/* เพิ่มเลขที่สัญญา */}
              <th>จัดสรร</th> {/* เพิ่มเลขที่สัญญา */}
              <th>จำหน่าย</th>
            
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
                <td>{item.equip_amount}</td> {/* เพิ่มการแสดงเลขที่สัญญา */}
                <td>
                  <Button
                    variant="outline-warning"
                    className="me-2"
                    onClick={() => ModalPaid(item.equipment_id)} // ส่ง equipment_id ไปที่ ModalPaid
                  >
                    <FontAwesomeIcon icon={faArrowUp} />{" "}
                  </Button>
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
                    className="me-2"
                    onClick={() => handleDeleteRow(item.equipment_id ?? 0)}
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

      {/* Distrib Modal */}
      <Modal
        show={showModalPaid}
        onHide={() => setShowModalPaid(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลการจำหน่ายอุปกรณ์สำรอง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formDataPaid.name}
                onChange={handleInputChangePaid}
                placeholder="กรุณากรอกชื่อ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>วันที่</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={formDataPaid.date}
                onChange={handleInputChangePaid}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>จำนวน</Form.Label>
              <Form.Control
                type="number" // ใช้ type="number"
                name="equip_amount"
                value={formData.equip_amount} // ค่านี้จะเป็น string หรือ number ขึ้นอยู่กับการกรอก
                onChange={handleInputChange} // ฟังก์ชันอัปเดตค่า
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalPaid(false)}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleSubmitPaid}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

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
              <Form.Label>จำนวน</Form.Label>
              <Form.Control
                type="number"
                name="equip_amount"
                value={formData.equip_amount}
                onChange={handleInputChange}
              />
            </Form.Group>

            {/* เพิ่มฟิลด์ Asset code ที่นี่ */}
            <Form.Group className="mb-3">
              <Form.Label>Asset Code</Form.Label>
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
