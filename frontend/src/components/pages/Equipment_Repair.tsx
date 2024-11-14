// src/pages/Approval.tsx
import React from 'react';
import Repair_Layout from '../Layout/Repair_Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';


const Equipment_Repair: React.FC = () => {
    return (
        <Repair_Layout>
            <div className="equipment-info-content">
                <h2 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์ส่งซ่อม</b></h2>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 , paddingRight: 20}}>
                    <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPlus}/></button>
                </div>
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th>ลำดับที่</th>
                            <th>ประเภทอุปกรณ์</th>
                            <th>ผู้ส่งซ่อม</th>
                            <th>สาเหตุที่ส่งซ่อม</th>
                            <th>การแก้ไข</th>
                            <th style={{ width: 150 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='align-middle text-center'>1</td>
                            <td className='text-left'>Notebook <br/>ยี่ห้อ : <br/>รุ่น : <br/>รหัสทรัพย์สิน : </td>
                            <td className='text-left'>ชื่อ-สกุล : <br/>แผนก : <br/>กอง : <br/>ฝ่าย : <br/>เบอร์โทร : <br/></td>
                            <td className='text-left'>xxxxxxxxx</td>
                            <td className='text-left'>เปลี่ยนฮาร์ดดิสก์</td>
                            <td className='align-middle text-center'>
                                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                                <Button variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                            </td>
                        </tr>
                        <tr>
                            <td className='align-middle text-center'>2</td>
                            <td className='text-left'>Notebook <br/>ยี่ห้อ : <br/>รุ่น : <br/>รหัสทรัพย์สิน : </td>
                            <td className='text-left'>ชื่อ-สกุล : <br/>แผนก : <br/>กอง : <br/>ฝ่าย : <br/>เบอร์โทร : <br/></td>
                            <td className='text-left'>xxxxxxxxx</td>
                            <td className='text-left'>xxxxxxxx</td>
                            <td className='align-middle text-center'>
                                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                                <Button variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Repair_Layout>
    );
};

export default Equipment_Repair;
