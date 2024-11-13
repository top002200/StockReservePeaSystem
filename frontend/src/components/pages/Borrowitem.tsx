// src/pages/Borrowitem.tsx
import React from 'react';
import Layout from '../Layout/Layout';
import { Table, Button } from 'react-bootstrap';

const Borrowitem: React.FC = () => {
  return (
    <Layout>
      <div className="borrowitem-content">
        <h2 className="text-center mb-4">ข้อมูลอุปกรณ์</h2>
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ลำดับ</th>
              <th>อุปกรณ์</th>
              <th>จำนวน</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Notebook</td>
              <td>3</td>
              <td>
                <Button variant="primary" className="me-2">Edit</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>xxxxxxxxx</td>
              <td>x</td>
              <td>
                <Button variant="primary" className="me-2">Edit</Button>
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Layout>
  );
};

export default Borrowitem;
