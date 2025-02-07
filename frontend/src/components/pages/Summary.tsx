import React, { useState, useEffect } from "react";
import Repair_Layout from "../Layout/Repair_Layout";
import { Card, Row, Col, Form } from "react-bootstrap";
import {
  getAllRepairs,
} from "../../services/api";
import { RepairData } from "../../interface/IRepair";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, Plugin } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, ChartDataLabels);

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
          backgroundColor: [
            "#00becd",
            "#0093ba",
            "#ffd700",
            "#d0df00",
            "#ff9e52",],
          borderColor: [
            "#00becd",
            "#0093ba",
            "#ffd700",
            "#d0df00",
            "#ff9e52",],
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
          "#00becd",
          "#0093ba",
          "#ffd700",
          "#d0df00",
          "#ff9e52",],
        borderColor: [
          "#00becd",
          "#0093ba",
          "#ffd700",
          "#d0df00",
          "#ff9e52",],
        borderWidth: 1,
      },
    ],
  };

  // กรองข้อมูลที่มี type เป็น "PC"
  const PCModelData = data.filter((item) => item.type === "PC");

  // สร้างข้อมูลสำหรับ Pie Chart
  const ModelData = PCModelData.reduce(
    (acc: { [key: string]: number }, item) => {
      if (item.model) {
        acc[item.model] = (acc[item.model] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const PCModelChart = {
    labels: Object.keys(ModelData),
    datasets: [
      {
        data: Object.values(ModelData),
        backgroundColor: ["#82ca9d", "#8884d8", "#ffc658", "#ff7300", "#ff8c00"],
      },
    ],
  };

  // กรองข้อมูลที่มี type เป็น "Notebook"
  const NBModelData = data.filter((item) => item.type === "Notebook");
  const NBData = NBModelData.reduce(
    (acc: { [key: string]: number }, item) => {
      if (item.model) {
        acc[item.model] = (acc[item.model] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const NBModelChart = {
    labels: Object.keys(NBData),
    datasets: [
      {
        data: Object.values(NBData),
        backgroundColor: ["#82ca9d", "#8884d8", "#ffc658", "#ff7300", "#ff8c00"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "right" },
      tooltip: { enabled: true },
    },
  };

// กรองข้อมูลที่มี type เป็น "Printer"
const PModelData = data.filter((item) => item.type === "Printer");
const PrinterData = PModelData.reduce(
  (acc: { [key: string]: number }, item) => {
    if (item.model) {
      acc[item.model] = (acc[item.model] || 0) + 1;
    }
    return acc;
  },
  {}
);

const PModelChart = {
  labels: Object.keys(PrinterData),
  datasets: [
    {
      data: Object.values(PrinterData),
      backgroundColor: ["#82ca9d", "#8884d8", "#ffc658", "#ff7300", "#ff8c00"],
    },
  ],
};

const [selectedChart, setSelectedChart] = useState("PCModelChart");

const getSelectedChartData = () => {
  switch (selectedChart) {
    case "PCModelChart":
      return PCModelChart;
    case "NBModelChart":
      return NBModelChart;
    case "PModelChart":
      return PModelChart;
    default:
      return PCModelChart;
  }
};
  
  return (
    <Repair_Layout>
      <div className="container py-4">
        <h4
          className="text-center"
          style={{ color: "#74045f", textDecoration: "underline", marginBottom: "20px" }}
        >
          <b>สรุปข้อมูลอุปกรณ์ส่งซ่อม</b>
        </h4>

        {/* Row 1: Equipment Type and Department Charts */}
        <Row className="gy-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-dark text-white text-center">
                ประเภทอุปกรณ์ที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <div style={{ width: "400px", height: "400px" }}>
                  <Pie
                    data={chartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: true, position: "right", labels: {
                            boxWidth: 60, // ปรับขนาดกล่องสี
                            padding: 10, // เพิ่มระยะห่างระหว่างแต่ละ item
                          },
                        },
                        tooltip: { enabled: true },
                        datalabels: {
                          color: "#000",
                          font: { weight: "normal" },
                          anchor: "end",
                          align: "start",
                        },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-dark text-white text-center">
                แผนกที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center">
                <div style={{ width: "400px", height: "400px" }}>
                  <Pie
                    data={chartDept}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          display: true, position: "right"
                          , labels: {
                            boxWidth: 10, // ปรับขนาดกล่องสี
                            padding: 10, // เพิ่มระยะห่างระหว่างแต่ละ item
                          },
                        },
                        tooltip: { enabled: true },
                        datalabels: {
                          color: "#000",
                          font: { weight: "normal" },
                          anchor: "end",
                          align: "start",
                        },
                      },
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Row 2: Model Charts */}
        <Row className="gy-4 mt-4 justify-content-center">
          <Col md={8}>
            <Card className="shadow-sm">
              <Card.Header className="bg-dark text-white text-center">
                รุ่นของอุปกรณ์ที่ส่งซ่อม
              </Card.Header>
              <Card.Body className="d-flex justify-content-center align-items-center position-relative">
                <Form.Group controlId="chartSelect"  className="position-absolute top-0 start-0 m-2">
                  <Form.Select value={selectedChart} onChange={(e) => setSelectedChart(e.target.value)}>
                    <option value="PCModelChart">รุ่นของ PC</option>
                    <option value="NBModelChart">รุ่นของ Notebook</option>
                    <option value="PModelChart">รุ่นของ Printer</option>
                  </Form.Select>
                </Form.Group>
                <div style={{ width: "400px", height: "400px" }}>
                  <Pie data={getSelectedChartData()} 
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        display: true, position: "right"
                        , labels: {
                          boxWidth: 10, // ปรับขนาดกล่องสี
                          padding: 10, // เพิ่มระยะห่างระหว่างแต่ละ item
                        },
                      },
                      tooltip: { enabled: true },
                      datalabels: {
                        color: "#000",
                        font: { weight: "normal" },
                        anchor: "end",
                        align: "start",
                      },
                    },
                  }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Row 3: Contract Chart */}
        <Row className="gy-4 mt-4">
          <Col md={12}>
            <Card className="shadow-sm">
              <Card.Header className="bg-dark text-white text-center">
                จำนวนอุปกรณ์ส่งซ่อมตามเลขที่สัญญา
              </Card.Header>
              <Card.Body>
                <div style={{ width: "100%", maxWidth: "600px", margin: "0 auto" }}>
                  <Bar
                    data={ContractData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: { display: true },
                        tooltip: { enabled: true },
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
