// src/pages/User_DB.tsx
import React, { useState, useEffect } from 'react';
import User_Layout from '../Layout/User_Layout';
import { Button, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { getAllSubmissions } from '../../services/api';
import { SubmissionData } from '../../interface/ISubmission';
import Swal from "sweetalert2";


const Approval_Status: React.FC = () => {
    const [submissions, setSubmissions] = useState<SubmissionData[]>([]);

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await getAllSubmissions();
                console.log("📦 Submissions Response:", response); // Debug ดูค่าที่ได้จาก API

                if (response.status && Array.isArray(response.data)) {
                    setSubmissions(response.data); // ใช้เฉพาะ `data` ที่เป็น array เท่านั้น
                } else {
                    setSubmissions([]); // ถ้าไม่ใช่ array ให้ตั้งเป็น `[]` เพื่อป้องกัน error
                }

            } catch (error) {
                console.error("🚨 Error fetching submissions:", error);
                setSubmissions([]); // ถ้ามี error ให้ใช้ `[]` เพื่อป้องกันปัญหา
            }
        };

        fetchSubmissions();
    }, []);
    
    const getStatusColor = (is_urgent?: number) => {
        switch (is_urgent) {
            case 1:
                return "text-success";
            case 2:
                return "text-danger";
            case 3:
                return "text-muted";
            default:
                return "text-warning";
        }
    };

    const getApprovalText = (is_urgent?: number) => {
        switch (is_urgent) {
            case 1:
                return "อนุมัติ";
            case 2:
                return "ไม่อนุมัติ";
            case 3:
                return "คืนแล้ว";
            default:
                return "รออนุมัติ";
        }
    };

    return (
        <User_Layout>
            <div className="user-dash-content">
                <h3 className="text-center mb-4" style={{ color: '#74045f', textDecoration: 'underline' }}><b>สถานะคำขอยืม</b></h3>
                <Table bordered hover responsive>
                    <thead>
                        <tr className='align-middle text-center'>
                            <th style={{ width: "150px" }}>ลำดับที่</th>
                            <th>อุปกรณ์</th>
                            <th style={{ width: "150px" }}>จำนวน</th>
                            <th style={{ width: "150px" }}>วันที่ส่งคำขอ</th>
                            <th style={{ width: "150px" }}>สถานะ</th>
                            <th style={{ width: "150px" }}>ยกเลิกคำขอ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((item, index) => (
                            <tr key={item.submission_id} className="align-middle text-center">
                                <td>{index + 1}</td>
                                <td>{item.type}</td>
                                <td>{item.amount}</td>
                                <td>{new Date(item.submitted_at).toLocaleDateString()}</td>
                                <td
                                    className={`align-middle text-center ${getStatusColor(
                                        item.is_urgent
                                    )}`}
                                >
                                    {getApprovalText(item.is_urgent)}
                                </td>
                                <td>
                                    <Button variant='outline-secondary'>
                                        <FontAwesomeIcon icon={faXmark} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </User_Layout>
    );
};

export default Approval_Status;