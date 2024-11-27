// src/pages/Approval.tsx
import React, { useState } from "react";
import Repair_Layout from '../Layout/Repair_Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileLines, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-bootstrap';
import { Form } from "react-bootstrap";


const Equipment_Repair: React.FC = () => {
    const [showModal, setShowModal] = useState(false); // State สำหรับ Modal
    const [selectedDetail, setSelectedDetail] = useState<any>(null); // เก็บข้อมูลที่เลือก
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        user_id: '',
        department: '',
        type: '',
        brand: '',
        model: '',
        contract: '',
        assetCode: '',
        problem: '',
        fixing: '',
        datetime: '',
    });

    const handleShowModal = (detail: any) => {
        setSelectedDetail(detail); // เก็บข้อมูลที่เกี่ยวข้องกับแถว
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDetail(null);
    };

    const handleFormSubmit = () => {
        console.log('Submitted Data:', formData);
        setShowAddModal(false);
        setFormData({
            user_name: '',
            user_id: '',
            department: '',
            type: '',
            brand: '',
            model: '',
            contract: '',
            assetCode: '',
            problem: '',
            fixing: '',
            datetime: '',
        });
    };


    const data = [
        {
            id: 1,
            type: 'Notebook',
            brand: 'Lenovo',
            model: 'V310',
            contract: 'บ.2/2560',
            assetCode: '532174391-0',
            user_name: 'นางสาวxxx xxxxx',
            user_idid: '123456',
            department: 'คอมพิวเตอร์และเครือข่าย',
            problem: 'เครื่องช้า',
            fixing: 'เปลี่ยนฮาร์ดดิสก์',
        },
        {
            id: 2,
            type: 'Printer',
            brand: 'Lexmark',
            model: 'MB2236adw',
            contract: '',
            assetCode: '',
            user_name: 'นายxxx xxxxx',
            user_id: '543210',
            department: '',
            problem: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            fixing: '',
        },

    ]

    return (
        <Repair_Layout>
            <div className="equipment-info-content">
                <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์ส่งซ่อม</b></h3>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, paddingRight: 20 }}>
                    <button type="button" className="btn btn-success" onClick={() => setShowAddModal(true)} ><FontAwesomeIcon icon={faPlus} /></button>
                </div>
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th>ลำดับที่</th>
                            <th>ผู้ส่งซ่อม</th>
                            <th>ประเภทอุปกรณ์</th>
                            {/*<th>สาเหตุที่ส่งซ่อม</th>
                            <th>การแก้ไข</th> */}
                            <th style={{ width: 100 }}>รายละเอียด</th>
                            <th style={{ width: 150 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="align-middle">
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-left'>{item.user_name}</td>
                                <td className='text-left'>{item.type}</td>
                                {/* <td className='text-left' style={{maxWidth: 200, whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{item.problem}</td>
                                <td className='text-left'style={{maxWidth: 200, whiteSpace: 'pre-wrap', overflowWrap: 'break-word'}}>{item.fix}</td> */}
                                <td className='text-center'>
                                    <Button variant="outline-info" onClick={() => handleShowModal(item)}>
                                        <FontAwesomeIcon icon={faFileLines} />
                                    </Button>
                                </td>
                                <td className='align-middle text-center'>
                                    <Button variant="outline-primary" className="me-2" style={{ width: '40px' }}><FontAwesomeIcon icon={faEdit} /></Button>
                                    <Button variant="outline-danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Add Modal */}
                <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg" centered>
                    <Modal.Header closeButton className="modal-header-form">
                        <Modal.Title>เพิ่มข้อมูลอุปกรณ์ส่งซ่อม</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* กลุ่มผู้ส่งซ่อม */}
                            <Form.Group className="mb-3 d-flex flex-wrap align-items-center">
                                <Form.Label className="me-2">ชื่อผู้ส่งซ่อม : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_name"
                                    /**value={formData.user_name}
                                    onChange={handleFormSubmit}*/
                                    className="me-3"
                                    style={{ width: '80%' }}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex flex-wrap align-items-center">
                                <Form.Label className="me-2">เลขประจำตัวพนักงาน : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user_id"
                                    /*value={formData.user_id}
                                    onChange={handleFormSubmit}*/
                                    className="me-3"
                                    style={{ width: '200px' }}
                                />
                                <Form.Label className="me-2">แผนก : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="department"
                                    /* value={formData.department}
                                     onChange={handleFormSubmit}*/
                                    style={{ width: '300px' }}
                                />
                            </Form.Group>

                            {/* ประเภทอุปกรณ์ */}
                            <Form.Group className="mb-3 d-flex flex-wrap align-items-center">
                                <Form.Label className="me-2">ประเภทอุปกรณ์ : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="type"
                                    /*value={formData.type}
                                    onChange={handleFormSubmit}*/
                                    className="me-3"
                                    style={{ width: '300px' }}
                                />
                                <Form.Label className="me-2">ยี่ห้อ : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="brand"
                                    /*value={formData.brand}
                                    onChange={handleFormSubmit}*/
                                    className="me-3"
                                    style={{ width: '250px' }}
                                />
                            </Form.Group>

                            {/* รายละเอียดอื่น ๆ */}
                            <Form.Group className="mb-3 d-flex flex-wrap align-items-center">
                                <Form.Label className="me-2">รุ่น : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="model"
                                    /*value={formData.model}
                                    onChange={handleFormSubmit}*/
                                    className="me-3"
                                    style={{ width: '200px' }}
                                />
                                <Form.Label className="me-2">เลขที่สัญญา : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contract"
                                    /*value={formData.contract}
                                    onChange={handleFormSubmit}*/
                                    className="me-3"
                                    style={{ width: '150px' }}
                                />
                                <Form.Label className="me-2">รหัสทรัพย์สิน : </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="assetCode"
                                    /*value={formData.assetCode}
                                    onChange={handleFormSubmit}*/
                                    style={{ width: '150px' }}
                                />
                            </Form.Group>

                            {/* สาเหตุและการแก้ไข */}
                            <Form.Group className="mb-3">
                                <Form.Label>สาเหตุที่ส่งซ่อม : </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="problem"
                                /*value={formData.problem}
                                onChange={handleFormSubmit}*/
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>การแก้ไข : </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="fix"
                                /*value={formData.fixing}
                                onChange={handleFormSubmit}*/
                                />
                            </Form.Group>

                            {/* วันที่และเวลา */}
                            <Form.Group className="mb-1 d-flex flex-wrap align-items-center">
                                <Form.Label className="me-2">วันที่และเวลา : </Form.Label>
                                <Form.Control
                                    type="datetime-local"
                                    name="datetime"
                                    /*value={formData.datetime}
                                    onChange={handleFormChange}*/
                                    style={{ width: '300px' }}
                                />
                            </Form.Group>
                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="success">
                            บันทึก
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Detail Modal */}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title><b>รายละเอียด</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedDetail ? (
                            <>
                                <p><b>ผู้ส่งซ่อม:</b> {selectedDetail.user}
                                    <br />เลขประจำตัวพนักงาน: {selectedDetail.userid}
                                    <br />แผนก: {selectedDetail.department}
                                </p>
                                <p><b>ประเภทอุปกรณ์:</b> {selectedDetail.type}
                                    <br />ยี่ห้อ: {selectedDetail.brand}
                                    <br />รุ่น: {selectedDetail.model}
                                    <br />เลขที่สัญญา: {selectedDetail.contract}
                                    <br />รหัสทรัพย์สิน: {selectedDetail.assetCode}
                                </p>
                                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}><b>สาเหตุที่ส่งซ่อม:</b> {selectedDetail.problem}</p>
                                <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}><b>การแก้ไข:</b> {selectedDetail.fixing}</p>
                                <p><b>วันที่/เวลา: </b></p>
                            </>
                        ) : (
                            <p>ไม่พบข้อมูล</p>
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
