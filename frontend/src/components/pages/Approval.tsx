// src/pages/Approval.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFileDownload } from '@fortawesome/free-solid-svg-icons';


const Approval: React.FC = () => {
  const data = [
    {
        id: 1,
        user_id: '123456',
        user_name: 'นางสาวxxx xxxx',
        b_item: 'Notebook',
        quantity: '1',
        note: 'xxxxxxxxxxxxxxxxxxxx'
    },
    {
      id: 2,
      user_id: '543210',
      user_name: 'นางสาวxxx xxxx',
      b_item: 'Wireless Mouse',
      quantity: '1',
      note: 'xxxxxxxxxxxxxxxxxxxx'
  }
    
];
  return (
    <Layout>
      <div className="approval-content">
        <h3 className="text-center mb-4" style={{color: '#74045f', textDecoration: 'underline'}}><b>คำขอยืมอุปกรณ์</b></h3>
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
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className='align-middle text-center'>{index + 1}</td>
              <td className='align-middle text-center'>{item.user_name}</td>
              <td className='align-middle text-center'>{item.user_id}</td>
              <td className='align-middle text-left'>{item.b_item} : {item.quantity}</td>
              <td className='align-middle text-left'>{item.note}</td>
              <td className='align-middle text-center'>
                <Button variant="outline-primary" className="me-2" style={{width: '40px'}}><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="outline-success"><FontAwesomeIcon icon={faFileDownload} /></Button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Approval;
