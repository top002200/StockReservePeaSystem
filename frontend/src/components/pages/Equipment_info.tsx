import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Pagination,
  Modal,
  Form,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashCan,
  faPlus,
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
  createDistribution,
} from "../../services/api";
import { EquipmentData } from "../../interface/IEquipment";
import { PictureData } from "../../interface/IPicture"; // Interface for pictures
import Swal from "sweetalert2";
import { TypeData } from "../../interface/IType";
import { DistributionData } from "../../interface/IDistribution";

function Equipment_info() {
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([]);
  const [typeOptions, setTypeOptions] = useState<TypeData[]>([]);
  const [pictureOptions, setPictureOptions] = useState<PictureData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [distributionData, setDistributionData] = useState<DistributionData>({
    g_name: "", // ผู้จัดสรร
    r_name: "", // ผู้รับจัดสรร
    distribution_amount: 0, // จำนวนที่จัดสรร
    equipment_id: 0, // รหัสอุปกรณ์
    date: "", // วันที่
    equip_contract: "", // เลขที่สัญญา
    equip_assetcode: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false); // <-- Add this line
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [showModalPaid, setShowModalPaid] = useState(false); // To control visibility of ModalPaid
  const [customType, setCustomType] = useState(""); // เก็บค่าประเภทอุปกรณ์ที่กำหนดเอง
  const [isCustomType, setIsCustomType] = useState(false); // ตรวจสอบว่าผู้ใช้เลือก "อื่นๆ" หรือไม่

  // ฟังก์ชันการจัดการกรอกข้อมูล

  // Toggle ModalPaid visibility
  const ModalPaid = (equipmentId: number) => {
    setDistributionData((prevData) => ({
      ...prevData,
      equipment_id: equipmentId, // ตั้งค่า equipment_id จากปุ่มที่คลิก
    }));
    setShowModalPaid(true); // แสดง Modal
  };
  const handleOpenModal = () => {
    setShowModalPaid(true); // แสดง Modal
  };
  const handleCloseModal = () => {
    setShowModalPaid(false); // ปิด Modal
  };

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
  const handleInputChangePaid = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDistributionData((prevData) => ({
      ...prevData,
      [name]: name === "distribution_amount" ? Number(value) : value,
    }));
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

  const handleSubmitPaid = async () => {
    try {
      // แปลง equipment_id ให้เป็น number ก่อนส่ง
      const payload = {
        ...distributionData,
        equipment_id: Number(distributionData.equipment_id),
        distribution_amount: Number(distributionData.distribution_amount),
      };

      console.log("Before submitting:", payload);

      // เรียก API เพื่อบันทึกข้อมูลการจัดสรร
      const response = await createDistribution(payload);

      if (response.status) {
        console.log("Successfully created distribution:", response.data);

        // ลดจำนวน equip_amount ในฐานข้อมูลโดยใช้ค่าจาก payload
        const updatedEquipment = {
          ...response.data.equipment,
          equip_amount:
            response.data.equipment.equip_amount - payload.distribution_amount,
        };

        // เรียก API updateEquipment เพื่อลดจำนวนในฐานข้อมูล
        const updateResponse = await updateEquipment(
          updatedEquipment.equipment_id.toString(),
          updatedEquipment
        );

        if (updateResponse.status) {
          console.log("Equipment updated successfully:", updateResponse.data);
          setEquipmentData((prevData) =>
            prevData.map((item) =>
              item.equipment_id === updatedEquipment.equipment_id
                ? { ...item, equip_amount: updatedEquipment.equip_amount }
                : item
            )
          );

          Swal.fire("Success!", "บันทึกข้อมูลสำเร็จ", "success");
          handleCloseModal();
        } else {
          Swal.fire("Error!", "ไม่สามารถอัปเดตจำนวนอุปกรณ์ได้", "error");
        }
      } else {
        Swal.fire(
          "Error!",
          response.message || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
          "error"
        );
      }
    } catch (error) {
      console.error("Error submitting distribution:", error);
      Swal.fire("Error!", "เกิดข้อผิดพลาดในการบันทึกข้อมูล", "error");
    }
  };

  const handleSetEquipmentId = (equipmentId: number) => {
    setDistributionData((prevState) => ({
      ...prevState,
      equipment_id: equipmentId, // อัปเดตค่า equipment_id จากแถวที่คลิก
    }));
  };

  return (
    <Info_Layout>
      <div className="equipment-info-content">
        <h4
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลอุปกรณ์สำรอง</b>
        </h4>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{ maxWidth: "300px" }}
          >
            <option value="">แสดงทั้งหมด</option>
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
              <th>จำนวน</th>
              <th>จัดสรร</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item, index) => (
              <tr key={item.equipment_id} className="align-middle text-center">
                <td style={{ width: "100px" }}>
                  {index + 1 + (currentPage - 1) * rowsPerPage}
                </td>
                <td style={{ width: "150px" }}>{item.equipment_type}</td>
                <td>
                  <img
                    src={item.equip_img}
                    alt={item.equipment_name}
                    style={{ maxWidth: "60px", maxHeight: "60px" }}
                  />
                </td>
                <td>{item.equipment_brand}</td>
                <td className="word-break text-wrap" style={{ width: "300px" }}>
                  {item.equipment_model}
                </td>
                <td>{item.equip_amount}</td> {/* เพิ่มการแสดงเลขที่สัญญา */}
                <td>
                  <Button
                    variant="outline-warning"
                    className="me-2"
                    onClick={() => {
                      handleSetEquipmentId(item.equipment_id ?? 0); // กำหนด equipment_id ก่อนเปิด modal
                      handleOpenModal(); // เปิด modal
                    }}
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
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, pageIndex) => (
            <Pagination.Item
              key={pageIndex + 1}
              active={pageIndex + 1 === currentPage}
              onClick={() => paginate(pageIndex + 1)}
            >
              {pageIndex + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
          />
        </Pagination>
      </div>

      {/* Distrib Modal */}
      <Modal show={showModalPaid} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลการจัดสรรอุปกรณ์สำรอง</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ผู้จัดสรร</Form.Label>
              <Form.Control
                type="text"
                name="g_name"
                value={distributionData.g_name}
                onChange={handleInputChangePaid}
                placeholder="กรุณากรอกชื่อ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ผู้รับจัดสรร</Form.Label>
              <Form.Control
                type="text"
                name="r_name"
                value={distributionData.r_name}
                onChange={handleInputChangePaid}
                placeholder="กรุณากรอกชื่อ"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>จำนวน</Form.Label>
              <Form.Control
                type="number"
                name="distribution_amount" // ใช้ชื่อฟิลด์ที่ถูกต้อง
                value={distributionData.distribution_amount} // ใช้ชื่อฟิลด์ที่ถูกต้อง
                onChange={handleInputChangePaid}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>วันที่จัดสรร</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={distributionData.date}
                onChange={handleInputChangePaid}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>รหัสทรัพย์สิน</Form.Label>
              <Form.Control
                type="text"
                name="equip_assetcode"
                value={distributionData.equip_assetcode}
                onChange={handleInputChangePaid}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>เลขที่สัญญา</Form.Label>
              <Form.Control
                type="text"
                name="equip_contract"
                value={distributionData.equip_contract}
                onChange={handleInputChangePaid}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            ยกเลิก
          </Button>
          <Button variant="success" onClick={handleSubmitPaid}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>

      {/*Add Equip Modal*/}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ประเภทอุปกรณ์</Form.Label>

              {/* Dropdown เลือกประเภทอุปกรณ์ */}
              <Form.Select
                name="equipment_type"
                value={formData.equipment_type}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    equipment_type: e.target.value,
                  }));
                }}
              >
                <option value="">เลือกประเภท</option>
                {typeOptions.map((type) => (
                  <option key={type.type_id} value={type.type_name}>
                    {type.type_name}
                  </option>
                ))}
              </Form.Select>

              {/* "อื่นๆ" */}
              <span
                className="text-primary mt-2 d-block text-end"
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => setIsCustomType(true)}
              >
                อื่นๆ
              </span>

              {/* ช่องกรอกประเภทใหม่ (แสดงเมื่อกดลิงก์) */}
              {isCustomType && (
                <Form.Control
                  type="text"
                  placeholder="กรอกประเภทอุปกรณ์"
                  value={customType}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setCustomType(newType);

                    // บันทึกไปที่ formData.equipment_type และ type_name
                    setFormData((prev) => ({
                      ...prev,
                      equipment_type: newType, // ใช้เป็นค่าประเภทที่เลือก
                      type_name: newType, // บันทึกเป็นชื่อประเภท
                    }));
                  }}
                  className="mt-2"
                />
              )}
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

            <Form.Group className="mb-3">
              <Form.Label>เลือกรูปภาพ</Form.Label>
              <Form.Select
                name="equip_img"
                value={formData.equip_img}
                onChange={handleInputChange}
              >
                <option value="">เลือกรูปภาพ</option>
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
