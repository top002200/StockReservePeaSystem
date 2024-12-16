// src/pages/Approval.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';


const User_Managment: React.FC = () => {
  return (
    <div>
      {/* Header with menu */}
      <header
        style={{
          width: '100%',
          backgroundImage: 'linear-gradient(to bottom, #74045f 40%, #c7911b 100%)',
          padding: '20px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <img
            src="src/assets/logo/PEA Logo on Violet.png"
            alt="PEA Logo"
            style={{ width: '180px', textAlign: 'left' }}
          />

          {/* Menu */}
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', margin: 0, padding: 0 }}>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/Dashboard"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/Dashboard" ? "active-link" : ""}
                >
                  หน้าหลัก
                </a>
              </li>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/personal-info"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/personal-info" ? "active-link" : ""}
                >
                  ข้อมูลส่วนตัว
                </a>
              </li>
              <li style={{ margin: '0 15px', paddingRight: '50px' }}>
                <a
                  href="/user-management"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/user-management" ? "active-link" : ""}
                >
                  ข้อมูลผู้ใช้งาน
                </a>
              </li>
              <li style={{ margin: '0 15px' }}>
                <a
                  href="/login"
                  style={{ textDecoration: 'none', color: 'white' }}
                  className={location.pathname === "/login" ? "active-link" : ""}
                >
                  ออกจากระบบ
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div className='content'>
        <main className='content-main'>
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
        </main>
      </div>
    </div>
  );
};

export default User_Managment;
