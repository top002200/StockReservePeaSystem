import React, { useState } from 'react';
import Info_Layout from '../Layout/info_Layout';
import { Button, Modal, Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan } from '@fortawesome/free-solid-svg-icons';

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
                        {data.map((item, index) => (
                            <tr key={item.id}>
                                <td className="align-middle text-center">{index + 1}</td>
                                <td className="align-middle text-left">
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div style={{ flex: 1, paddingRight: '5px', borderRight: '1px solid #ccc' }}>
                                            <strong>ประเภท:</strong> {item.equipment_type}
                                            <br />
                                            <strong>ชื่ออุปกรณ์:</strong> {item.equipment_name}
                                        </div>
                                        <div style={{ flex: 1, paddingLeft: '10px' }}>
                                            <strong>ยี่ห้อ:</strong> {item.equipment_brand}
                                            <br />
                                            <strong>รุ่น:</strong> {item.equipment_model}
                                        </div>
                                    </div>
                                </td>
                                <td className="align-middle text-center"></td>
                                <td className="align-middle text-center"></td>
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
