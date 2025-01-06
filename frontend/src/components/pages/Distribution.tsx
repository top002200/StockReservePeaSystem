import React, { useState } from 'react';
import Info_Layout from '../Layout/info_Layout';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const Distribution: React.FC = () => {
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        equipment_type: "",
        equipment_name: "",
        equipment_brand: "",
        equipment_model: "",
        equip_contract: "",
        receiver: "",
        date: "",
    });

    const data = [
        {
            id: 1,
            equipment_type: "Notebook",
            equipment_name: "NE3XXXXXX",
            equipment_brand: "Lenovo",
            equipment_model: "V310",
            equip_contract: "sssss",
            receiver: "นางสาวxxx xxxx",
            date: "06-01-2025",
        },
    ];

    const handleOpenModal = (edit = false, item = null) => {
        setIsEdit(edit);
        setShowModal(true);
        if (edit && item) {
            setFormData(item);
        } else {
            setFormData({
                equipment_type: "",
                equipment_name: "",
                equipment_brand: "",
                equipment_model: "",
                equip_contract: "",
                receiver: "",
                date: "",
            });
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <Info_Layout>
            <div className="distribute-content">
                <h3
                    className="text-center mb-4"
                    style={{ color: "#74045f", textDecoration: "underline" }}
                >
                    <b>ข้อมูลการจำหน่ายอุปกรณ์</b>
                </h3>
                <div className="d-flex justify-content-end align-items-center mb-3">
                    <Button
                        variant="success"
                        style={{ width: "40px", height: "40px" }}
                        onClick={() => handleOpenModal(false)}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </div>

                <Table bordered hover responsive>
                    <thead>
                        <tr className="align-middle text-center">
                            <th>ลำดับที่</th>
                            <th>อุปกรณ์</th>
                            <th>ผู้รับ</th>
                            <th>วันที่จำหน่าย</th>
                            <th style={{ width: 150 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td className="align-middle text-center">{index + 1}</td>
                                <td className="align-middle text-left">
                                    ประเภท : {item.equipment_type}
                                    <br />
                                    ชื่ออุปกรณ์ : {item.equipment_name}
                                    <br />
                                    ยี่ห้อ : {item.equipment_brand}
                                    <br />
                                    รุ่น : {item.equipment_model}
                                    <br />
                                </td>
                                <td className="align-middle text-center">{item.receiver}</td>
                                <td className="align-middle text-center">{item.date}</td>
                                <td className="align-middle text-center">
                                    <Button
                                        variant="outline-primary"
                                        className="me-2"
                                        style={{ width: "40px" }}
                                        onClick={() => handleOpenModal(true)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button variant="outline-danger">
                                        <FontAwesomeIcon icon={faTrashCan} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton className="modal-header-form">
                        <Modal.Title>
                            {isEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
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
                                <Form.Label>ชื่ออุปกรณ์</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="equipment_name"
                                    value={formData.equipment_name}
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
                                <Form.Label>ผู้รับ</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="receiver"
                                    value={formData.receiver}
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
                        <Button variant="success">
                            บันทึก
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Info_Layout>
    );
};

export default Distribution;
