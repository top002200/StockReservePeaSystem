// src/pages/Borrowitem.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

const Borrowitem: React.FC = () => {
  return (
    <Layout>
      <div className="borrowitem-content">
        <h2 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>ข้อมูลอุปกรณ์</b></h2>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 , paddingRight: 20}}>
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
            <tr className='align-middle text-center'>
              <td>1</td>
              <td>Notebook</td>
              <td>3</td>
              <td>
                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
              </td>
            </tr>
            <tr className='align-middle text-center'>
              <td>2</td>
              <td>xxxxxxxxx</td>
              <td>x</td>
              <td>
                <Button variant="primary" className="me-2"><FontAwesomeIcon icon={faEdit} /></Button>
                <Button variant="danger"><FontAwesomeIcon icon={faTrashCan} /></Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Borrowitem;
