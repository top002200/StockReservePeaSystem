import React, { useState } from "react";
import Repair_Layout from '../Layout/Repair_Layout';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';

// Sample data, you might replace this with actual data fetching logic
const sampleData = [
    {
        repair_id: 1,
        type: 'PC',
        brand: 'DELL',
        model: 'Optiplex 7020',
        eq_name: 'E3PSCXX03',
        contract: 'บ.30/2558',
        user_name: 'จ่าโอ',
        dept: 'กรย.',
        problem: 'Power supply เสีย',
        fixing: 'เปลี่ยนPower supply',
        note: 'ซื้อมาเปลี่ยนเอง',
        date: '2024-11-22',
    },
    {
        repair_id: 2,
        type: 'Printer',
        brand: 'Brother',
        model: 'MFC-8910 DW printer',
        eq_name: '',
        contract: 'สต.099/2556',
        user_name: '497440',
        dept: 'กสข.',
        problem: 'กระดาษติดอยู่ในเครื่อง printer',
        fixing: 'เช็คเครื่อง นำกระดาษที่ติดออก ทำความสะอาดเครื่อง Printer',
        note: '',
        date: '2024-11-29',
    },
];

const Equipment_Repair: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedDetail, setSelectedDetail] = useState<any>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        user_name: '',
        dept: '',
        type: '',
        eq_name: '',
        brand: '',
        model: '',
        contract: '',
        problem: '',
        fixing: '',
        note: '',
        date: '',
    });
    const [data, setData] = useState(sampleData);  // Set initial data

    const handleShowModal = (detail: any) => {
        setSelectedDetail(detail);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDetail(null);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddData = () => {
        const newData = { ...formData, repair_id: data.length + 1 };
        setData((prevData) => [...prevData, newData]);  // Add new data to the state
        setShowAddModal(false);  // Close modal after adding data
        setFormData({  // Reset the form data after submission
            user_name: '',
            dept: '',
            type: '',
            eq_name: '',
            brand: '',
            model: '',
            contract: '',
            problem: '',
            fixing: '',
            note: '',
            date: '',
        });
    };


    return (
        <Repair_Layout>
            <div className="equipment-info-content">
                <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์ส่งซ่อม</b></h3>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, paddingRight: 20 }}>
                    <button type="button" className="btn btn-success" onClick={() => setShowAddModal(true)} ><FontAwesomeIcon icon={faPlus} /></button>
                </div>

                {/*Table*/}
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th>ลำดับที่</th>
                            <th>ผู้ส่งซ่อม</th>
                            <th>ประเภทอุปกรณ์</th>
                            <th>ชื่ออุปกรณ์</th>
                            <th style={{ width: 100 }}>รายละเอียด</th>
                            <th style={{ width: 150 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.repair_id} className="align-middle text-center">
                                <td>{index + 1}</td>
                                <td>{item.user_name}</td>
                                <td>{item.type}</td>
                                <td>{item.eq_name}</td>
                                <td>
                                    <Button variant="outline-info" onClick={() => handleShowModal(item)}>
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </Button>
                                </td>
                                <td>
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
                        <Modal.Title className="text-center w-100">
                            <b>เพิ่มข้อมูลอุปกรณ์ส่งซ่อม</b>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            {/* Section: ข้อมูลผู้ส่งซ่อม */}
                            <div className="mb-4">
                                <h6 className="border-bottom pb-2 text-secondary fw-bold">ข้อมูลผู้ส่งซ่อม</h6>
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

                            {/* Section: ข้อมูลอุปกรณ์ */}
                            <div className="mb-4">
                                <h6 className="border-bottom pb-2 text-secondary fw-bold">ข้อมูลอุปกรณ์</h6>
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
                                            name="eq_name"
                                            value={formData.eq_name}
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

                            {/* Section: รายละเอียดการซ่อม */}
                            <div className="mb-4">
                                <h6 className="border-bottom pb-2 text-secondary fw-bold">รายละเอียดการซ่อม</h6>
                                <Form.Group className="col-md-4">
                                    <Form.Label>วันที่ส่งซ่อม:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleFormChange}
                                        placeholder="yyyy-MM-dd"  // Enforce the date format
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
                                {/* Section: ข้อมูลผู้ส่งซ่อม */}
                                <div className="mb-4">
                                    <h5 className="border-bottom pb-2 text-secondary fw-bold">ข้อมูลผู้ส่งซ่อม</h5>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p><b>ผู้ส่งซ่อม :</b> {selectedDetail.user_name}</p>
                                        </div>
                                        <div className="col-4">
                                            <p><b>แผนก :</b> {selectedDetail.dept}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: ข้อมูลอุปกรณ์ */}
                                <div className="mb-4">
                                    <h5 className="border-bottom pb-2 text-secondary fw-bold">ข้อมูลอุปกรณ์</h5>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <p><b>ประเภท :</b> {selectedDetail.type}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><b>ชื่ออุปกรณ์ :</b> {selectedDetail.eq_name}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p><b>ยี่ห้อ :</b> {selectedDetail.brand}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p><b>รุ่น :</b> {selectedDetail.model}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <p><b>เลขที่สัญญา :</b> {selectedDetail.contract}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Section: รายละเอียดการซ่อม */}
                                <div className="mb-4">
                                    <h5 className="border-bottom pb-2 text-secondary fw-bold">รายละเอียดการซ่อม</h5>
                                    <p>
                                        <b>ปี-เดือน-วัน ที่ส่งซ่อม :</b> {selectedDetail.date}
                                    </p>
                                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                        <b>สาเหตุที่ส่งซ่อม :</b> {selectedDetail.problem}
                                    </p>
                                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
                                        <b>การแก้ไข :</b> {selectedDetail.fixing}
                                    </p>
                                    <p style={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word' }}>
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
