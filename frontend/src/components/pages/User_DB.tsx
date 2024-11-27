// src/pages/User_DB.tsx
import React, { useState } from 'react';
import User_Layout from '../Layout/User_Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form } from 'react-bootstrap';

const User_DB: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const data = [
        {
            id: 1,
            type: 'Notebook',
            quantity: '3'
        },
        {
            id: 2,
            type: 'Wirless Mouse',
            quantity: '5'
        }
    ];

    const handleShowModal = (type: any) => {
        setSelectedItem(type); // เก็บข้อมูลที่เกี่ยวข้องกับแถว
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedItem(null);
    };

    return (
        <User_Layout>
            <div className="user-dash-content">
                <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์</b></h3>
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th>ลำดับที่</th>
                            <th>อุปกรณ์</th>
                            <th>จำนวน</th>
                            <th style={{ width: 200 }}>ส่งคำขอยืม</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="align-middle text-center">
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                <td>
                                    <Button variant="outline-secondary" className="me-1" style={{ color: '#c7911b', borderColor: '#c7911b', width: '40px' }}
                                        onClick={() => handleShowModal(item)} >
                                        <FontAwesomeIcon icon={faFileExport} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Add Modal */}
                <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
                    <Modal.Header closeButton className="modal-header-form">
                        <Modal.Title>ส่งคำขอยืมอุปกรณ์</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedItem ? (
                            <Form>
                                {/* กลุ่มผู้ส่งซ่อม */}
                                <Form.Group className="mb-3 d-flex flex-wrap align-items-center">
                                    <Form.Label className="me-2">คำนำหน้าชื่อ : </Form.Label>
                                    <Form.Control
                                        name="title"
                                        /*value={formData.gender}
                                        onChange={handleFormSubmit}*/
                                        className="me-3"
                                        style={{ width: '150px' }} disabled
                                        placeholder="นางสาว"
                                    />
                                    <Form.Label className="me-2">ชื่อ-สกุล : </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user_name"
                                        /**value={formData.user_name}
                                        onChange={handleFormSubmit}*/
                                        className="me-3"
                                        style={{ width: '350px' }} disabled
                                        placeholder='xxxx xxxxxxx'
                                    />
                                    <Form.Label className="me-2">เลขประจำตัวพนักงาน : </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="user_id"
                                        /*value={formData.user_id}
                                        onChange={handleFormSubmit}*/
                                        style={{ width: '200px' }} disabled
                                        placeholder='123456'
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
                                        style={{ width: '300px' }} disabled
                                        placeholder={selectedItem.type}
                                    />
                                    <Form.Label className="me-2">จำนวน : </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="b_quantity"
                                        className="me-3" 
                                        style={{ width: '100px' }} min="1" max={selectedItem.quantity}
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