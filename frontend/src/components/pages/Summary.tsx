import React, { useState, useEffect } from "react";
import Repair_Layout from "../Layout/Repair_Layout";
import { Table, Button, Modal, Form, Card, Row, Col } from "react-bootstrap";
import {
  getAllRepairs,
} from "../../services/api";
import { RepairData } from "../../interface/IRepair";

import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Summary: React.FC = () => {

  const [data, setData] = useState<RepairData[]>([]);



  // Fetch repairs data
  const fetchRepairs = async () => {
    const response = await getAllRepairs();

    if (response.status) {
      const data = response.data; // Extract the 'data' field

      if (Array.isArray(data)) {
        setData(data); // Set the extracted data
      } else {
        console.error(
          "Invalid data format. Expected an array, received:",
          data
        );
        setData([]); // Fallback to an empty array
      }
    } else {
      console.error("Failed to fetch repairs:", response.message);
      setData([]); // Fallback to an empty array
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, []);

  // Group data by type for the chart
  const equipmentTypeCounts = data.reduce(
    (acc: { [key: string]: number }, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = {
    labels: Object.keys(equipmentTypeCounts),
    datasets: [
      {
        data: Object.values(equipmentTypeCounts),
        backgroundColor: [
          "#ffa600",
          "#ff6361",
          "#bc5090",
          "#58508d",
          "#003f5c",
        ],
        hoverBackgroundColor: [
          "#ffa600",
          "#ff6361",
          "#bc5090",
          "#58508d",
          "#003f5c",
        ],
      },
    ],
  };

  const equipmentDeptCounts = data.reduce(
    (acc: { [key: string]: number }, item) => {
      acc[item.dept] = (acc[item.dept] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartDept = {
    labels: Object.keys(equipmentDeptCounts),
    datasets: [
      {
        data: Object.values(equipmentDeptCounts),
        backgroundColor: [
          "#fd7f6f",
          "#7eb0d5",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ],
        hoverBackgroundColor: [
          "#fd7f6f",
          "#7eb0d5",
          "#b2e061",
          "#bd7ebe",
          "#ffb55a",
          "#ffee65",
          "#beb9db",
          "#fdcce5",
          "#8bd3c7",
        ],
      },
    ],
  };

  return (
    <Repair_Layout>
      <div className="equipment-info-content">
        <h4
          className="text-center"
          style={{ color: "#74045f", textDecoration: "underline", marginBottom: "20px" }}
        >
          <b>สรุปข้อมูลอุปกรณ์ส่งซ่อม</b>
        </h4>

        {/* Type */}
        <Row>
          <Col md={4} sm={12} style={{ height: "100px" }}>
            <Card className="shadow-sm card-dash">
              <Card.Header className="text-center" style={{ backgroundColor: "#54504c", color: "#fff" }}>
                ประเภทอุปกรณ์ที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-between dash-body">
                <div
                  className="md-auto"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                >
                  <Doughnut
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        tooltip: { enabled: true },
                        legend: {
                          display: true,
                          position: "left",
                          labels: {
                            font: {
                              size: 10 // ปรับขนาดตัวอักษร
                            },
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/*Dept*/}
          <Col md={4} sm={12} style={{ height: "100px" }}>
            <Card className="shadow-sm card-dash">
              <Card.Header className="text-center" style={{ backgroundColor: "#54504c", color: "#fff" }}>
                แผนกที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-center dash-body">
                <div
                  className="md-auto"
                  style={{ width: "100%", maxWidth: "300px", height: "auto" }}
                >
                  <Pie
                    data={chartDept}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        tooltip: { enabled: true },
                        legend: {
                          display: true,
                          position: "left",
                          labels: {
                            font: {
                              size: 10 // ปรับขนาดตัวอักษร
                            },
                            color: "#333", // เปลี่ยนสีตัวอักษร
                          },
                        },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </div>
    </Repair_Layout>
  );
};

export default Summary;
