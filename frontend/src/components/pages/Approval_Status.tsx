// src/pages/User_DB.tsx
import React from 'react';
import User_Layout from '../Layout/User_Layout';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


const Approval_Status: React.FC = () => {
    const data = [
        {
            id: 1,
            type: 'Notebook',
            quantity: '1',
            status: 'อนุมัติ'
        },
        {
            id: 2,
            type: 'Wirless Mouse',
            quantity: '1',
            status: 'รอการอนุมัติ'
        },
        {
            id: 3,
            type: 'Monitor',
            quantity: '1',
            status: 'ไม่อนุมัติ'
        },
        {
            id: 4,
            type: 'Monitor',
            quantity: '1',
            status: 'คืนแล้ว'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'อนุมัติ':
                return 'text-success'; // Green
            case 'ไม่อนุมัติ':
                return 'text-danger'; // Red
            case 'รอการอนุมัติ':
                return 'text-warning'; // Yellow
            case 'คืนแล้ว':
                return 'text-muted'; // gray
            default:
                return '';
        }
    };

    return (
        <User_Layout>
            <div className="user-dash-content">
                <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>สถานะคำขอยืม</b></h3>
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th style={{width: "150px"}}>ลำดับที่</th>
                            <th>อุปกรณ์</th>
                            <th style={{width: "150px"}}>จำนวน</th>
                            <th style={{width: "150px"}}>วันที่ส่งคำขอ</th>
                            <th style={{width: "150px"}}>สถานะ</th>
                            <th style={{width: "150px"}}>ยกเลิกคำขอ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="align-middle text-center">
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                <td></td>
                                <td className={getStatusColor(item.status)}>{item.status}</td>
                                <td>
                                    <Button variant='outline-secondary'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </User_Layout>
    );
};

export default Approval_Status;