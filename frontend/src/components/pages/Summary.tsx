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
  const [contractCounts, setContractCounts] = useState<{
    [key: string]: number;
  }>({});


  // Fetch repairs data
  const fetchRepairs = async () => {
    const response = await getAllRepairs();

    if (response.status) {
      const data = response.data; // Extract the 'data' field

      if (Array.isArray(data)) {
        setData(data); // Set the extracted data
        calculateContractCounts(response.data || []);
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

  // ฟังก์ชันคำนวณจำนวน `contract`
  const calculateContractCounts = (repairs: RepairData[]) => {
    const counts: { [key: string]: number } = {};
    repairs.forEach((repair) => {
      const contract = repair.contract || "ไม่ระบุ";
      counts[contract] = (counts[contract] || 0) + 1;
    });
    setContractCounts(counts);
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
          backgroundColor: "#ff096c",
          borderColor: "#2a3843",
          borderWidth: 1,
        },
      ],
    };
  };
  const ContractData = {
    labels: Object.keys(contractCounts), // ชื่อ `contract`
    datasets: [
      {
        label: "จำนวน",
        data: Object.values(contractCounts), // จำนวน `contract`
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const ContractOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
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

        {/*type chart*/}
        <Row className="mb-4 justify-content-center">
          <Col md={4} className="mb-4">
            <Card className="shadow-sm card-dash h-100">
              <Card.Header
                className="text-center"
                style={{ backgroundColor: "#54504c", color: "#fff" }}
              >
                ประเภทอุปกรณ์ที่ส่งซ่อม
              </Card.Header>
              <Card.Body
                className="d-flex justify-content-center align-items-center"
                style={{
                  display: "flex",
                  flexDirection: "row", // จัดเรียงแนวนอน
                  alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
                }}
              >
                {/* Container สำหรับ label */}
                <div
                  style={{
                    flex: 1, // ใช้พื้นที่ฝั่งซ้าย
                    display: "flex",
                    justifyContent: "flex-start", // ชิดซ้าย
                    alignItems: "center",
                    paddingRight: "20px", // เว้นระยะห่างระหว่าง label กับ chart
                  }}
                >
                  <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                    {chartData.labels.map((label, index) => (
                      <li key={index} style={{ marginBottom: "10px", fontSize: "12px" }}>
                        <span
                          style={{
                            display: "inline-block",
                            width: "10px",
                            height: "10px",
                            backgroundColor: chartData.datasets[0].backgroundColor[index],
                            marginRight: "10px",
                            borderRadius: "50%",
                          }}
                        ></span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Container สำหรับ Chart */}
                <div
                  style={{
                    flex: 3, // ใช้พื้นที่ฝั่งขวาสำหรับ Chart
                    display: "flex",
                    justifyContent: "center", // จัดให้อยู่ตรงกลาง
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "200px",
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
                            display: false, // ซ่อน legend ใน chart
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>


        <Row className="mb-4 justify-content-center">
          <Col md={8} className="mb-4">
            <Card className="shadow-sm card-dash h-100">
              <Card.Header
                className="text-center"
                style={{ backgroundColor: "#54504c", color: "#fff" }}
              >
                จำนวนอุปกรณ์ส่งซ่อมตามเลขที่ศัญญา
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <div
                  style={{
                    width: "100%",
                    maxWidth: "500px",
                    height: "auto",
                  }}
                >
                  <Bar data={ContractData} options={ContractOptions} />
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
