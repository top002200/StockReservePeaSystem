// src/pages/Approval.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';


const User_Managment: React.FC = () => {
  return (
    <Layout>
      <div className="user-management-content">
        <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>จัดการข้อมูลผู้ใช้งาน</b></h3>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, paddingRight: 20 }}>
          <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <Table bordered hover responsive>
          <thead>
            <tr className='align-middle text-center'>
              <th>ลำดับที่</th>
              <th>เลขประจำตัวพนักงาน</th>
              <th>ชื่อ-สกุล</th>
              <th>เบอร์โทร</th>
              <th>รหัสผ่าน</th>
              <th style={{ width: 200 }}></th>
            </tr>
          </thead>
          <tbody>
            <tr className='align-middle text-center'>
              <td>1</td>
              <td>123456</td>
              <td>นางสาวxxx xxxx</td>
              <td>xxx-xxx-xxxx</td>
              <td>******</td>
              <td>
                <Button variant="outline-primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="outline-danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
              </td>
            </tr>
            <tr className='align-middle text-center'>
              <td>2</td>
              <td>543210</td>
              <td>นายxxx xxxx</td>
              <td>xxx-xxx-xxxx</td>
              <td>******</td>
              <td>
                <Button variant="outline-primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="outline-danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default User_Managment;
