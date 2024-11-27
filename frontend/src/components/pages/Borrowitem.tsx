// src/pages/Borrowitem.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

const Borrowitem: React.FC = () => {
  const data = [
    {
      id: 1,
      type: 'Notebook',
      quantity: '3'
    },
    {
      id: 2,
      type: 'Wirless Mouse',
      quantity: '5'
    }
  ];


  return (
    <Layout>
      <div className="borrowitem-content">
        <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์</b></h3>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10, paddingRight: 20 }}>
          <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPlus} /></button>
        </div>
        <Table bordered hover responsive>
          <thead>
            <tr className='align-middle text-center'>
              <th>ลำดับที่</th>
              <th>อุปกรณ์</th>
              <th>จำนวน</th>
              <th style={{ width: 200 }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} className="align-middle text-center">
                <td>{index + 1}</td>
                <td>{item.type}</td>
                <td>{item.quantity}</td>
                <td>
                  <Button variant="outline-primary" className="me-2" style={{width: '40px'}}><FontAwesomeIcon icon={faEdit} /></Button>
                  <Button variant="outline-danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Borrowitem;
