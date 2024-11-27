// src/pages/User_DB.tsx
import React from 'react';
import User_Layout from '../Layout/User_Layout';
import { Table } from 'react-bootstrap';


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
                            <th>ลำดับที่</th>
                            <th>อุปกรณ์</th>
                            <th>จำนวน</th>
                            <th>สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="align-middle text-center">
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.quantity}</td>
                                <td className={getStatusColor(item.status)}>{item.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </User_Layout>
    );
};

export default Approval_Status;