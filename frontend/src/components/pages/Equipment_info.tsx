import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Info_Layout from '../Layout/info_Layout';
import { Modal } from 'react-bootstrap';
import { createEquipment } from '../../services/api';
import { EquipmentData } from '../../interface/IEquipment';
import { Pagination } from 'react-bootstrap';

function Equipment_info() {
    const [typeFilter, setTypeFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1); // Current page
    const rowsPerPage = 5; // Rows per page

    const data = [
        {
            id: 1,
            equip_img: 'src/assets/image/Lenovo-V310.jpg',
            type: 'Notebook',
            brand: 'Lenovo',
            model: 'V310',
            contract: 'บ.2/2560',
            assetCode: '532174391-0'
        },
        {
            id: 2,
            equip_img: 'src/assets/image/Lenovo-V310.jpg',
            type: 'Notebook',
            brand: 'Lenovo',
            model: 'V310',
            contract: 'บ.2/2560',
            assetCode: '532174399-0'
        },
        {
            id: 3,
            equip_img: 'src/assets/image/oker v17.webp',
            type: 'Wireless Mouse',
            brand: 'OKER',
            model: 'V17 Bluetooth & 2.4G double channels',
            contract: 'xxxxxxx',
            assetCode: 'xxxxxxxxxxxx'
        },
        {
            id: 4,
            equip_img: 'src/assets/image/Transcend RAM.jpg',
            type: 'RAM',
            brand: 'Transcend',
            model: 'RAM 4G 1Rx8 DDR3L 1600 U',
            contract: 'xxxxxxx',
            assetCode: 'xxxxxxxxxxxx'
        },
        {
            id: 5,
            equip_img: 'src/assets/image/UGREEN-DP.webp',
            type: 'DisplayPort',
            brand: 'UGREEN',
            model: 'DisplayPort to HDMI Adapter',
            contract: 'xxxxxxx',
            assetCode: 'xxxxxxxxxxxx'
        },
        {
            id: 6,
            equip_img: 'src/assets/image/oker v17.webp',
            type: 'Wireless Mouse',
            brand: 'OKER',
            model: 'V17 Bluetooth & 2.4G double channels',
            contract: 'xxxxxxx',
            assetCode: 'xxxxxxxxxxxx'
        },
        {
            id: 7,
            equip_img: 'src/assets/image/UGREEN-DP.webp',
            type: 'DisplayPort',
            brand: 'UGREEN',
            model: 'DisplayPort to HDMI Adapter',
            contract: 'xxxxxxx',
            assetCode: 'xxxxxxxxxxxx'
        },

    ];

    //add equipment
    /*const AddEquipment = () => {
        const [equipImage, setEquipImage] = useState('');
        const [equipType, setEquipType] = useState('');
        const [equipBrand, setEquipBrand] = useState('');
        const [equipModel, setEquipModel] = useState('');
        const [equipContract, setEquipContract] = useState('');
        const [equipAssetCode, setEquipAssetCode] = useState('');

        const handleAddEquipment = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
                const newEquipment: EquipmentData = {
                    equip_img: equipImage,
                    type: equipType,
                    brand: equipBrand,
                    model: equipModel,
                    contract: equipContract,
                    assetcode: equipAssetCode,
                };
                await createEquipment(newEquipment);

                setEquipImage('');
                setEquipType('');
                setEquipBrand('');
                setEquipModel('');
                setEquipContract('');
                setEquipAssetCode('');

            } catch (error) {
                console.error('Error creating heading:', error);
                alert('Failed to create heading.');
            }
        };
     } */

    // ฟิลเตอร์ข้อมูลตามยี่ห้อ
    const filteredData = typeFilter
        ? data.filter((item) => item.type === typeFilter)
        : data;

    // Paginated data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

    // Number of pages
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


    return (
        <Info_Layout>
            <div className="equipment-info-content">
                <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์สำรอง</b></h3>

                <div>
                    <div className="d-flex mb-3">
                        {/* Dropdown สำหรับกรองตามยี่ห้อ */}
                        <select className="form-select ms-auto"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={{ maxWidth: '300px', justifyContent: 'left' }}
                        >
                            <option value="">All</option>
                            {[...new Set(data.map((item) => item.type))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>

                        <button type="button" className="btn btn-success justify-content-end" onClick={() => setShowModal(true)} style={{ marginLeft: '900px', width: '40px', height: '40px' }}>
                            <FontAwesomeIcon icon={faPlus} /></button>
                    </div>

                    {/* Table */}
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
                                <tr key={item.id} className="align-middle text-center">
                                    <td>{index + 1}</td>
                                    <td>{item.type}</td>
                                    <td><img src={item.equip_img} className="equip-img" alt={item.brand} /></td>
                                    <td>{item.brand}</td>
                                    <td>{item.model}</td>
                                    <td>{item.contract}</td>
                                    <td>{item.assetCode}</td>
                                    <td>
                                        <Button variant="outline-primary" className="me-2" style={{width: '40px'}}>
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

                    {/* Pagination */}
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
            </div>

            {/* Modal for adding equipment */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="modal-header-form">
                    <Modal.Title>เพิ่มข้อมูลอุปกรณ์สำรอง</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="equipImage">
                            <Form.Label>รูปภาพ :</Form.Label>
                            <Form.Control
                                type="file"
                            /*value={equipImage}
                            onChange={(e) => setEquipImage(e.target.value)} */
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="equipType">
                            <Form.Label>ประเภทอุปกรณ์ :</Form.Label>
                            <Form.Control
                                type="text"
                            /*value={equipType}
                            onChange={(e) => setEquipType(e.target.value)} */
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="equipBrand">
                            <Form.Label>ยี่ห้อ :</Form.Label>
                            <Form.Control
                                type="text"
                            /*value={equipBrand}
                            onChange={(e) => setEquipBrand(e.target.value)} */
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="equipModel">
                            <Form.Label>รุ่น :</Form.Label>
                            <Form.Control
                                type="text"
                            /*value={equipModel}
                            onChange={(e) => setEquipModel(e.target.value)} */
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="equipContract">
                            <Form.Label>เลขที่สัญญา :</Form.Label>
                            <Form.Control
                                type="text"
                            /*value={equipContract}
                            onChange={(e) => setEquipContract(e.target.value)} */
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="equipAssetCode">
                            <Form.Label>รหัสทรัพย์สิน :</Form.Label>
                            <Form.Control
                                type="text"
                            /*value={equipAssetCode}
                            onChange={(e) => setEquipAssetCode(e.target.value)}*/
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

        </Info_Layout>
    );
}

export default Equipment_info;
