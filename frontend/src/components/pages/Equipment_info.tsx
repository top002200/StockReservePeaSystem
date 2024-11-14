// src/pages/Approval.tsx
import React from 'react';
import Info_Layout from '../Layout/info_Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';


const Equipment_info: React.FC = () => {
    return (
        <Info_Layout>
            <div className="equipment-info-content">
                <h2 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์สำรอง</b></h2>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 , paddingRight: 20}}>
                    <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPlus}/></button>
                </div>
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th>ลำดับที่</th>
                            <th>รูปภาพ</th>
                            <th>ยี่ห้อ</th>
                            <th>รุ่น</th>
                            <th>เลขที่สัญญา</th>
                            <th>รหัสทรัพย์สิน</th>
                            <th style={{ width: 200 }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='align-middle text-center'>
                            <td>1</td>
                            <td><img src='src/assets/image/Lenovo-V310.jpg' className='logo-img' /></td>
                            <td>Lenovo</td>
                            <td>V310</td>
                            <td>บ.2/2560</td>
                            <td>532174391-0</td>
                            <td>
                                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                                <Button variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                            </td>
                        </tr>
                        <tr className='align-middle text-center'>
                            <td>2</td>
                            <td><img src='src/assets/image/Lenovo-V310.jpg' className='logo-img' /></td>
                            <td>Lenovo</td>
                            <td>V310</td>
                            <td>บ.2/2560</td>
                            <td>532174399-0</td>
                            <td>
                                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                                <Button variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Info_Layout>
    );
};

export default Equipment_info;
