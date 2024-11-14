import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import Info_Layout from '../Layout/info_Layout';

function Equipment_info() {
    const [typeFilter, setTypeFilter] = useState('');

    const data = [
        {
            id: 1,
            image: 'src/assets/image/Lenovo-V310.jpg',
            type: 'Notebook',
            brand: 'Lenovo',
            model: 'V310',
            contract: 'บ.2/2560',
            assetCode: '532174391-0'
        },
        {
            id: 2,
            image: 'src/assets/image/Lenovo-V310.jpg',
            type: 'Notebook',
            brand: 'Lenovo',
            model: 'V310',
            contract: 'บ.2/2560',
            assetCode: '532174399-0'
        },
        {
            id: 3,
            image: 'src/assets/image/oker v17.webp',
            type: 'Wireless Mouse',
            brand: 'OKER',
            model: 'V17 Bluetooth & 2.4G double channels',
            contract: 'xxxxxxx',
            assetCode: 'xxxxxxxxxxxx'
        },

    ];

    // ฟิลเตอร์ข้อมูลตามยี่ห้อ
    const filteredData = typeFilter
        ? data.filter((item) => item.type === typeFilter)
        : data;

    return (
        <Info_Layout>
            <div className="equipment-info-content">
                <h2 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์สำรอง</b></h2>

                <div>
                    {/* Dropdown สำหรับกรองตามยี่ห้อ */}
                    <Form.Group className="mb-3 " controlId="typeFilter">
                        <Form.Label>Filter by Type</Form.Label>
                        <Form.Control
                            as="select"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            style={{ width: 200 }}
                        >
                            <option value="">All</option>
                            <option value="Notebook">Notebook</option>
                            <option value="Wireless Mouse">Wireless Mouse</option>
                        </Form.Control>
                    </Form.Group>

                    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, paddingRight: 20 }}>
                        <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPlus} /></button>
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
                            {filteredData.map((item, index) => (
                                <tr key={item.id} className="align-middle text-center">
                                    <td>{index + 1}</td>
                                    <td>{item.type}</td>
                                    <td><img src={item.image} className="logo-img" alt={item.brand} /></td>
                                    <td>{item.brand}</td>
                                    <td>{item.model}</td>
                                    <td>{item.contract}</td>
                                    <td>{item.assetCode}</td>
                                    <td>
                                        <Button variant="primary" className="me-2">
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button variant="danger">
                                            <FontAwesomeIcon icon={faTrashCan} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </Info_Layout>
    );
}

export default Equipment_info;
