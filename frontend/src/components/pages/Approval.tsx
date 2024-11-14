// src/pages/Approval.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileDownload } from '@fortawesome/free-solid-svg-icons';


const Approval: React.FC = () => {
  return (
    <Layout>
      <div className="approval-content">
        <h2 className="text-center mb-4" style={{color: '#74045f', textDecoration: 'underline'}}><b>คำขอยืมอุปกรณ์</b></h2>
        <Table bordered hover responsive>
          <thead>
            <tr className='align-middle text-center'>
              <th>ลำดับที่</th>
              <th>ผู้ขอยืม</th>
              <th>เลขประจำตัวพนักงาน</th>
              <th>รายการ</th>
              <th>หมายเหตุ</th>
              <th style={{width: 200}}></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='align-middle text-center'>1</td>
              <td className='align-middle text-center'>นางสาวxxx xxxx</td>
              <td className='align-middle text-center'>123456</td>
              <td className='align-middle text-left'>Notebook : 1 <br/>Wireless Mouse : 1</td>
              <td className='align-middle text-left'>xxxxxxxxxxxxxxxxxxxx</td>
              <td className='align-middle text-center'>
                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="success"><FontAwesomeIcon icon={faFileDownload} /></Button>
              </td>
            </tr>
            <tr>
              <td  className='align-middle text-center'>2</td>
              <td  className='align-middle text-center'>นายxxx xxxx</td>
              <td  className='align-middle text-center'>543210</td>
              <td  className='align-middle text-left'>xxxxxxxxx : xx</td>
              <td className='align-middle text-left'></td>
              <td className='align-middle text-center'>
                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="success"><FontAwesomeIcon icon={faFileDownload} /></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Approval;
