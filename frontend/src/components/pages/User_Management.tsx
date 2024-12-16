// src/pages/Approval.tsx
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket, faUserGear, faUsers } from '@fortawesome/free-solid-svg-icons';


const User_Managment: React.FC = () => {
  return (
    <div>
      <header
              style={{
                width: '100%',
                backgroundImage: 'linear-gradient(to bottom, #74045f 40%, #c7911b 100%)',
                padding: '20px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 20px',
                }}
              >
                <a href="/Dashboard">
                  <img
                    src="src/assets/logo/PEA Logo on Violet.png"
                    alt="PEA Logo"
                    style={{ width: '180px', textAlign: 'left' }}
                  />
                </a>
      
                {/* Menu */}
                <nav style={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                  {/* Left-aligned menu */}
                  <ul style={{ listStyle: 'none', display: 'flex', marginTop: '40px', padding: 0 }}>
                    <li style={{ margin: '0 15px' }}>
                      <a
                        href="/personal-info"
                        style={{ textDecoration: 'none', color: 'white' }}
                        className={location.pathname === "/personal-info" ? "active-link" : ""}
                      >
                        <FontAwesomeIcon icon={faUserGear} style={{ color: '#fefcff', paddingRight: 5 }} />ข้อมูลส่วนตัว
                      </a>
                    </li>
                    <li style={{ margin: '0 15px' }}>
                      <a
                        href="/user-management"
                        style={{ textDecoration: 'none', color: 'white' }}
                        className={location.pathname === "/user-management" ? "active-link" : ""}
                      >
                        <FontAwesomeIcon icon={faUsers} style={{ color: '#fefcff', paddingRight: 5 }} />ข้อมูลผู้ใช้งาน
                      </a>
                    </li>
                  </ul>
      
                  {/* Right-aligned menu */}
                  <ul style={{ listStyle: 'none', marginTop: '40px', padding: 0 }}>
                    <li>
                      <a
                        href="/login"
                        style={{ textDecoration: 'none', color: 'white' }}
                        className={location.pathname === "/login" ? "active-link" : ""}
                      >
                        <FontAwesomeIcon icon={faRightFromBracket} style={{ color: '#fefcff', paddingRight: 5 }} />ออกจากระบบ
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
