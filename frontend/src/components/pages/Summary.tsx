import React, { useState, useEffect } from "react";
import Repair_Layout from "../Layout/Repair_Layout";
import { Card, Row, Col, Form } from "react-bootstrap";
import {
  getAllRepairs,
} from "../../services/api";
import { RepairData } from "../../interface/IRepair";

import { Doughnut, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Summary: React.FC = () => {

  const [data, setData] = useState<RepairData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // State สำหรับเดือนที่เลือก
  const [selectedYears, setSelectedYears] = useState<number[]>([]); // รองรับการเลือกหลายปี



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

  const handleYearChange = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year)
        ? prev.filter((y) => y !== year) // ลบปีออกถ้าถูกเลือกอยู่
        : [...prev, year] // เพิ่มปีใหม่ถ้ายังไม่ได้เลือก
    );
  };

  const filteredData = data.filter((item) => {
    if (!item.date) return false;
    const date = new Date(item.date);
    const itemMonth = date.getMonth() + 1;
    const itemYear = date.getFullYear();
    const isMonthMatched =
      selectedMonth === "" || itemMonth === parseInt(selectedMonth);
    const isYearMatched =
      selectedYears.length === 0 || selectedYears.includes(itemYear);
    return isMonthMatched && isYearMatched;
  });

  const getBarChartData = () => {
    const monthlyCounts = Array(12).fill(0); // จำนวน 12 เดือน
    filteredData.forEach((item) => {
      if (item.date) {
        const month = new Date(item.date).getMonth(); // หาค่าเดือน (0-11)
        monthlyCounts[month]++;
      }
    });

    return {
      labels: [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ],
      datasets: [
        {
          label: "จำนวนอุปกรณ์ส่งซ่อม",
          data: monthlyCounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
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

        <Row className="mb-4 justify-content-center">
          <Col md={4} lg={4} sm={12} className="mb-4">
            <Card className="shadow-sm card-dash h-100">
              <Card.Header
                className="text-center"
                style={{ backgroundColor: "#54504c", color: "#fff" }}
              >
                ประเภทอุปกรณ์ที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                  }}
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
                              size: 10,
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

          <Col md={4} lg={4} sm={12} className="mb-4">
            <Card className="shadow-sm card-dash h-100">
              <Card.Header
                className="text-center"
                style={{ backgroundColor: "#54504c", color: "#fff" }}
              >
                แผนกที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <div
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    height: "auto",
                  }}
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
                              size: 10,
                            },
                            color: "#333",
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

        {/* BarChart Card */}
        <Row className="mb-4  justify-content-center">
          <Col md={8} className="mb-4">
            <Card
              className="shadow-sm card-dash h-100"
              style={{ height: "200px", width: "100%" }} // เพิ่มขนาด Card
            >
              <Card.Header
                className="text-center"
                style={{ backgroundColor: "#54504c", color: "#fff" }}
              >
                จำนวนการส่งซ่อมอุปกรณ์
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <div
                  className="chart-container"
                  style={{
                    width: "100%",
                    maxWidth: "500px", // เพิ่มขนาด BarChart
                    height: "auto",
                    margin: "20px 0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row", // เปลี่ยนเป็นเรียงแนวนอน
                      gap: "10px", // ระยะห่างระหว่าง radio
                      flexWrap: "wrap", // รองรับการแสดงผลเมื่อพื้นที่ไม่พอ
                    }}
                  >
                    {Array.from(
                      new Set(
                        data
                          .filter((item) => {
                            if (selectedMonth) {
                              const itemMonth = new Date(item.date as string).getMonth() + 1;
                              return itemMonth === parseInt(selectedMonth);
                            }
                            return true;
                          })
                          .filter((item) => item.date)
                          .map((item) => {
                            const date = new Date(item.date as string);
                            return date.getFullYear();
                          })
                      )
                    )
                      .sort()
                      .map((year) => (
                        <div key={year} style={{ display: "flex", alignItems: "center" }}>
                          <input
                            type="radio"
                            id={`year-${year}`}
                            name="selectedYear"
                            value={year}
                            checked={selectedYears.includes(year)}
                            onChange={() => setSelectedYears([year])}
                            style={{
                              appearance: "none",
                              width: "10px",
                              height: "10px",
                              border: "2px solid #555",
                              borderRadius: "50%",
                              outline: "none",
                              cursor: "pointer",
                              backgroundColor: selectedYears.includes(year) ? "#555" : "#fff", // สีที่เลือก
                              transition: "background-color 0.3s",
                            }}
                          />
                          <label htmlFor={`year-${year}`} style={{ marginLeft: "5px" }}>
                            {year}
                          </label>
                        </div>
                      ))}
                  </div>
                  <Bar data={getBarChartData()} />
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
