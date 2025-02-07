import React, { useEffect, useState } from "react";
import Info_Layout from "../Layout/info_Layout";
import { Button, Modal, Table, Form, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faFileExcel, faFilePdf, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getAllDistributions,
  deleteDistribution,
  updateDistribution,
} from "../../services/api";
import Swal from "sweetalert2";
import { DistributionData } from "../../interface/IDistribution";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { THSarabunFont } from "../../fonts/THSarabun";
import * as XLSX from "xlsx";

const Distribution: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    equipment_type: "",
    g_name: "",
    equipment_brand: "",
    equipment_model: "",
    equip_contract: "",
    equip_assetcode: "",
    r_name: "",
    date: "",
  });
  const [data, setData] = useState<any[]>([]); // สำหรับเก็บข้อมูลที่ดึงมาจาก API

  // ฟังก์ชันดึงข้อมูลจาก API
  const fetchDistributions = async () => {
    try {
      const response = await getAllDistributions();
      if (response.status === true) {
        // ถ้า response.status เป็น boolean
        setData(response.data);
      } else {
        console.error("Failed to fetch distributions:", response.message);
      }
    } catch (error) {
      console.error("Error fetching distributions:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllDistributions();
      console.log("API Response:", response);

      if (response.status) {
        setData(response.data);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("Data changed:", data);
  }, [data]);

  const handleDelete = async (index: number) => {
    const idForFix = data[index]?.id_for_fix;

    // ตรวจสอบว่า idForFix มีค่าและไม่เป็นค่าว่าง
    if (!idForFix || idForFix === "") {
      console.error("IDForFix is empty or invalid:", idForFix); // เพิ่ม Debug
      Swal.fire("เกิดข้อผิดพลาด", "IDForFix ไม่มีค่าหรือไม่ถูกต้อง", "error");
      return; // ถ้าไม่มีค่า จะไม่ทำการส่งคำร้องขอ
    }

    console.log("🟡 กำลังพยายามลบ ID:", idForFix); // เพิ่มการ Debug ค่าที่จะลบ

    // ยืนยันการลบด้วย SweetAlert2
    const confirmResult = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "คุณต้องการลบรายการนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirmResult.isConfirmed) {
      return; // ถ้าผู้ใช้กด "ยกเลิก" จะไม่ทำการลบ
    }

    // ส่ง idForFix ที่แปลงเป็นหมายเลข
    const response = await deleteDistribution(Number(idForFix));
    console.log("ผลลัพธ์การลบ:", response);

    if (response.status) {
      const newData = data.filter((item) => item.id_for_fix !== idForFix);
      setData([...newData]);
      console.log("ข้อมูลที่อัปเดต:", newData);
      Swal.fire("ลบเสร็จสิ้น", "รายการนี้ถูกลบออกแล้ว", "success");
    } else {
      console.error("ลบไม่สำเร็จ:", response.message);
      Swal.fire(
        "เกิดข้อผิดพลาด",
        response.message || "ไม่สามารถลบรายการได้",
        "error"
      );
    }
  };

  interface Equipment {
    equipment_type: string;
    equipment_name: string;
    equipment_brand: string;
    equipment_model: string;
  }

  interface DistributionItem {
    equipment: Equipment;
    equip_contract: string;
    r_name: string;
    date: string;
    distribution_id: string;
    distribution_amount: number;
    g_name: string;
    equip_assetcode: string;
  }

  const handleOpenModal = (
    edit = false,
    item: DistributionItem | null = null
  ) => {
    setIsEdit(edit);
    setShowModal(true);

    if (edit && item) {
      setFormData({
        equipment_type: item.equipment?.equipment_type || "",
        g_name: item.g_name || "",
        equipment_brand: item.equipment?.equipment_brand || "",
        equipment_model: item.equipment?.equipment_model || "",
        equip_contract: item.equip_contract || "",
        equip_assetcode: item.equip_assetcode || "",
        r_name: item.r_name || "",
        date: item.date || "",
      });
    } else {
      setFormData({
        equipment_type: "",
        g_name: "",
        equipment_brand: "",
        equipment_model: "",
        equip_contract: "",
        equip_assetcode: "",
        r_name: "",
        date: "",
      });
    }
  };



  const handleEdit = async (index: number) => {
    const idForFix = data[index]?.id_for_fix;

    if (!idForFix || idForFix === "") {
      console.error("IDForFix is empty or invalid:", idForFix);
      Swal.fire("เกิดข้อผิดพลาด", "IDForFix ไม่มีค่าหรือไม่ถูกต้อง", "error");
      return;
    }

    console.log("🟡 กำลังแก้ไข ID:", idForFix);

    // เรียกใช้ SweetAlert2 เพื่อให้ผู้ใช้ยืนยันการแก้ไข
    const confirmResult = await Swal.fire({
      title: "คุณแน่ใจไหม?",
      text: "คุณต้องการแก้ไขข้อมูลนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, แก้ไขเลย!",
      cancelButtonText: "ยกเลิก",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    // สร้างข้อมูลที่จะอัปเดต
    const updateData: DistributionData = {
      g_name: data[index]?.g_name || "",
      r_name: data[index]?.r_name || "",
      distribution_amount: data[index]?.distribution_amount || 0,
      equipment_id: data[index]?.equipment_id || 0,
      date: data[index]?.date || "",
      equip_contract: data[index]?.equip_contract || "",
      equip_assetcode: data[index]?.equip_assetcode || "",
    };

    // ส่งข้อมูลไปที่ API เพื่ออัปเดต
    const response = await updateDistribution(updateData);

    if (response.status) {
      Swal.fire("แก้ไขเสร็จสิ้น", "ข้อมูลได้รับการอัปเดตเรียบร้อย", "success");
      // อาจจะอัปเดตข้อมูลที่แสดงบนหน้า UI ตามการตอบกลับจาก API
    } else {
      Swal.fire(
        "เกิดข้อผิดพลาด",
        response.message || "ไม่สามารถอัปเดตข้อมูลได้",
        "error"
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [selectedMonth, setSelectedMonth] = useState(""); // State สำหรับเดือนที่เลือก
  const [selectedYear, setSelectedYear] = useState("");

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value); // อัปเดตเดือนที่เลือก
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };


  /// กรองข้อมูลตามปีและเดือน
  const filteredData = data
    .filter((item) => {
      if (!item.date || typeof item.date !== "string") return false; // ตรวจสอบค่า undefined หรือชนิดข้อมูล
      const date = new Date(item.date);
      const itemMonth = date.getMonth() + 1;
      const itemYear = date.getFullYear();
      const isMonthMatched =
        selectedMonth === "" || itemMonth === parseInt(selectedMonth);
      const isYearMatched =
        selectedYear === "" || itemYear === parseInt(selectedYear);
      return isMonthMatched && isYearMatched;
    });

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // การแบ่งหน้า
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const base64Data = THSarabunFont.normal.split(",")[1];
  console.log("Base64 Data Only:", base64Data);

  // Helper function to validate Base64
  function isValidBase64(str: string): boolean {
    try {
      const decoded = atob(str.split(",")[1]); // แยกส่วนข้อมูล Base64 ออกจาก "data:font/ttf;base64,"
      return !!decoded;
    } catch (e) {
      console.error("Base64 validation error:", e);
      return false;
    }
  }

  // เพิ่มฟังก์ชันสำหรับสร้าง PDF
  const exportToPDF = () => {
    // สร้าง PDF โดยกำหนดให้เป็นแนวนอน (Landscape)
    const doc = new jsPDF({
      orientation: "landscape", // กำหนด orientation เป็น "landscape"
    });

    try {
      // ตรวจสอบฟอนต์
      const base64Data = THSarabunFont.normal.split(",")[1];
      if (!base64Data || !isValidBase64(THSarabunFont.normal)) {
        throw new Error("Font data is not valid Base64.");
      }

      // เพิ่มฟอนต์
      doc.addFileToVFS("THSarabunNew.ttf", base64Data);
      doc.addFont("THSarabunNew.ttf", "THSarabun", "normal");
      doc.setFont("THSarabun");
      doc.setFontSize(16); // ขนาดฟอนต์เริ่มต้น

      // สร้างชื่อเดือนและปีจากตัวเลือก
      const monthNames = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];

      const selectedMonthName =
        selectedMonth !== "" ? monthNames[parseInt(selectedMonth) - 1] : "ทั้งหมด";
      const selectedYearText = selectedYear !== "" ? selectedYear : "ทั้งหมด";

      // ชื่อเอกสาร
      const documentTitle = `รายงานข้อมูลการจัดสรรอุปกรณ์: เดือน ${selectedMonthName} ปี ${selectedYearText}`;
      doc.text(documentTitle, 14, 10); // ตำแหน่งของชื่อเรื่อง

      // กรองข้อมูลตามเดือนและปีที่เลือก
      const filteredDataByMonthYear = filteredData.filter((item) => {
        if (!item.date) return false;
        const date = new Date(item.date);
        const itemMonth = date.getMonth() + 1;
        const itemYear = date.getFullYear();
        const isMonthMatched =
          selectedMonth === "" || itemMonth === parseInt(selectedMonth);
        const isYearMatched =
          selectedYear === "" || itemYear === parseInt(selectedYear);
        return isMonthMatched && isYearMatched;
      });

      // ข้อมูลตาราง
      const tableColumn = [
        "ลำดับ",
        "ผู้จัดสรร",
        "ผู้รับจัดสรร",
        "ประเภท",
        "ยี่ห้อ",
        "รุ่น",
        "รหัสทรัพย์สิน",
        "เลขที่สัญญา",
        "จำนวน",
        "วันที่จัดสรร",

      ];
      const tableRows: any[] = [];

      // เตรียมข้อมูลจาก `filteredDataByMonthYear`
      filteredDataByMonthYear.forEach((item, index) => {
        const rowData = [
          index + 1, // ลำดับที่
          item.g_name, // ผู้จัดสรร
          item.r_name, // ผู้รับจัดสรร
          item.equipment?.equipment_type,
          item.equipment?.equipment_brand,
          item.equipment?.equipment_model,
          item.equip_assetcode,
          item.equip_contract,
          item.distribution_amount,
          item.date ? new Date(item.date).toLocaleDateString() : "-", // วันที่จัดสรร
        ];
        tableRows.push(rowData);
      });

      // ตรวจสอบว่ามีข้อมูลหรือไม่
      if (tableRows.length === 0) {
        Swal.fire("แจ้งเตือน", "ไม่มีข้อมูลสำหรับเดือนและปีที่เลือก", "info");
        return;
      }

      // เพิ่มข้อมูลตารางลงใน PDF
      (doc as any).autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 15,
        styles: {
          font: "THSarabun", // กำหนดฟอนต์
          fontSize: 12, // ขนาดฟอนต์
          lineColor: [200, 200, 200], // สีเส้นขอบ
          lineWidth: 0.3, // ความหนาของเส้นขอบ
          overflow: "linebreak",
          minCellHeight: 10,
        },
        headStyles: {
          fillColor: [0, 102, 204], // สีพื้นหลังหัวตาราง
          textColor: [255, 255, 255], // สีข้อความหัวตาราง
          fontStyle: "bold", // รูปแบบข้อความหัวตาราง
          valign: "middle",
          halign: "center",
        },
        bodyStyles: {
          font: "THSarabun", // ฟอนต์ข้อความในตาราง
          textColor: [0, 0, 0], // สีข้อความ
          overflow: "linebreak",
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 10 }, // ลำดับ
          1: { halign: "center" }, //g_name
          2: { halign: "center" }, //r_name
          3: { halign: "center" }, //type
          4: { halign: "center" }, //brand
          5: { halign: "center" }, //model
          6: { halign: "center", cellWidth: 25 }, //assetcode
          7: { halign: "center", cellWidth: 25 }, //contract
          8: { halign: "center", cellWidth: 10 }, //amount
          9: { halign: "center", cellWidth: 20 }, //date
        },
      });

      // ชื่อไฟล์ PDF
      const fileName = `รายงานข้อมูลการจัดสรรอุปกรณ์_${selectedMonthName}_${selectedYearText}.pdf`;

      // ดาวน์โหลดไฟล์ PDF
      doc.save(fileName);
    } catch (error) {
      console.error("Failed to export PDF:", error);
    }
  };

  const exportToExcel = () => {
    try {
      const monthNames = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];

      const selectedMonthName =
        selectedMonth !== "" ? monthNames[parseInt(selectedMonth) - 1] : "ทั้งหมด";
      const selectedYearText = selectedYear !== "" ? selectedYear : "ทั้งหมด";
      const fileName = `รายงานข้อมูลการจัดสรรอุปกรณ์_${selectedMonthName}_${selectedYearText}.xlsx`;

      const filteredDataByMonthYear = filteredData.filter((item) => {
        if (!item.date) return false;
        const date = new Date(item.date);
        const itemMonth = date.getMonth() + 1;
        const itemYear = date.getFullYear();
        const isMonthMatched =
          selectedMonth === "" || itemMonth === parseInt(selectedMonth);
        const isYearMatched =
          selectedYear === "" || itemYear === parseInt(selectedYear);
        return isMonthMatched && isYearMatched;
      });

      if (filteredDataByMonthYear.length === 0) {
        Swal.fire("แจ้งเตือน", "ไม่มีข้อมูลสำหรับเดือนและปีที่เลือก", "info");
        return;
      }

      // เตรียมข้อมูลสำหรับ Excel
      const excelData = filteredDataByMonthYear.map((item, index) => ({
        "ลำดับ": index + 1,
        "ผู้จัดสรร": item.g_name,
        "ผู้รับจัดสรร": item.r_name,
        "ประเภท": item.equipment?.equipment_type,
        "ยี่ห้อ": item.equipment?.equipment_brand,
        "รุ่น": item.equipment?.equipment_model,
        "รหัสทรัพย์สิน": item.equip_assetcode,
        "เลขที่สัญญา": item.equip_contract,
        "จำนวน": item.distribution_amount,
        "วันที่จัดสรร": item.date
          ? new Date(item.date).toLocaleDateString()
          : "-",
      }));

      const worksheet = XLSX.utils.json_to_sheet(excelData);

      // เพิ่มการจัดสไตล์
      const range = XLSX.utils.decode_range(worksheet["!ref"] || "A1");
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
          if (!worksheet[cellAddress]) continue;
          worksheet[cellAddress].s = {
            font: { name: "Arial", sz: 12, bold: R === 0 }, // ฟอนต์และขนาด, หัวข้อหนา
            alignment: {
              horizontal: "center", // จัดข้อความแนวนอนกึ่งกลาง
              vertical: "center", // จัดข้อความแนวตั้งกึ่งกลาง
              wrapText: true, // รองรับข้อความยาว (break word)
            },
            border: {
              top: { style: "thin", color: { rgb: "000000" } },
              bottom: { style: "thin", color: { rgb: "000000" } },
              left: { style: "thin", color: { rgb: "000000" } },
              right: { style: "thin", color: { rgb: "000000" } },
            },
          };
        }
      }

      // กำหนดความกว้างของคอลัมน์
      const columnWidths = [
        { wch: 5 }, //ลำดับ
        { wch: 30 }, //g_name
        { wch: 30 }, //r_name
        { wch: 20 }, // type
        { wch: 20 }, //brand
        { wch: 20 }, //model
        { wch: 20 }, //assetcode
        { wch: 20 }, //contract
        { wch: 10 }, //amount
        { wch: 20 }, //date
      ];
      worksheet["!cols"] = columnWidths;

      // สร้าง workbook และเพิ่ม worksheet
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "รายงานข้อมูลการจัดสรรอุปกรณ์");

      // บันทึกไฟล์ Excel
      XLSX.writeFile(workbook, fileName);
    } catch (error) {
      console.error("Failed to export Excel:", error);
    }
  };

  return (
    <Info_Layout>
      <div className="distribute-content">
        <h4
          className="text-center mb-4"
          style={{ color: "#74045f", textDecoration: "underline" }}
        >
          <b>ข้อมูลการจัดสรรอุปกรณ์</b>
        </h4>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
            padding: "0 20px", // เพิ่ม padding ด้านข้างเพื่อความสมดุล
          }}
        >
          {/* Dropdown สำหรับเลือกเดือน และปี */}
          <div style={{ display: "flex", gap: "10px" }}>
            {/* Dropdown สำหรับเลือกเดือน */}
            <Form.Select
              aria-label="เลือกเดือน"
              onChange={handleMonthChange}
              value={selectedMonth}
              style={{ width: "200px" }}
            >
              <option value="">เลือกเดือน</option>
              <option value="1">มกราคม</option>
              <option value="2">กุมภาพันธ์</option>
              <option value="3">มีนาคม</option>
              <option value="4">เมษายน</option>
              <option value="5">พฤษภาคม</option>
              <option value="6">มิถุนายน</option>
              <option value="7">กรกฎาคม</option>
              <option value="8">สิงหาคม</option>
              <option value="9">กันยายน</option>
              <option value="10">ตุลาคม</option>
              <option value="11">พฤศจิกายน</option>
              <option value="12">ธันวาคม</option>
            </Form.Select>

            {/* Dropdown สำหรับเลือกปี */}
            <Form.Select
              aria-label="เลือกปี"
              onChange={handleYearChange}
              value={selectedYear}
              style={{ width: "200px" }}
            >
              <option value="">เลือกปี</option>
              {Array.from(
                new Set(
                  data
                    .filter((item) => {
                      // กรองข้อมูลตามเดือนก่อน
                      if (selectedMonth) {
                        const itemMonth = new Date(item.date as string).getMonth() + 1;
                        return itemMonth === parseInt(selectedMonth);
                      }
                      return true;
                    })
                    .filter((item) => item.date) // กรองเฉพาะข้อมูลที่มีวันที่
                    .map((item) => {
                      const date = new Date(item.date as string); // กำหนด item.date เป็น string
                      return date.getFullYear();
                    })
                )
              )
                .sort()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </Form.Select>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {/* Button Group สำหรับปุ่มดาวน์โหลด PDF และ Excel */}
            <div
              className="btn-group"
              role="group"
              aria-label="Export Buttons"
              style={{
                borderRadius: "8px", // มุมโค้งมน
                overflow: "hidden", // ป้องกันปุ่มล้น
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // เพิ่มเงาเล็กน้อย
              }}
            >
              {/* ปุ่มดาวน์โหลด PDF */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={exportToPDF}
                title="ดาวน์โหลดรายงาน PDF"
                style={{
                  fontSize: "20px", // ขนาดตัวอักษร
                }}
              >
                <FontAwesomeIcon icon={faFilePdf} />
              </button>

              {/* ปุ่มส่งออกเป็น Excel */}
              <button
                type="button"
                className="btn btn-success"
                onClick={exportToExcel}
                title="ดาวน์โหลดรายงาน Excel"
                style={{
                  fontSize: "20px",
                }}
              >
                <FontAwesomeIcon icon={faFileExcel} />
              </button>
            </div>
          </div>
        </div>

        <Table bordered hover responsive>
          <thead>
            <tr className="align-middle text-center">
              <th>ลำดับที่</th>
              <th>อุปกรณ์</th>
              <th>จำนวน</th>
              <th>ผู้จัดสรร</th>
              <th>ผู้รับจัดสรร</th>
              <th>วันที่จัดสรร</th>
              <th style={{ width: 150 }}></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={item.distribution_id}>
                <td className="align-middle text-center">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </td>
                <td className="align-middle text-left">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div
                      style={{
                        flex: 1,
                        paddingRight: "5px",
                        borderRight: "1px solid #ccc",
                      }}
                    >
                      <strong>ประเภท:</strong>{" "}
                      {item.equipment?.equipment_type || "-"}
                      <br />
                      <strong>ยี่ห้อ:</strong>{" "}
                      {item.equipment?.equipment_brand || "-"}
                      <br />
                      <strong>รุ่น:</strong>{" "}
                      {item.equipment?.equipment_model || "-"}
                      <br />
                    </div>
                    <div style={{ flex: 1, paddingLeft: "10px" }}>
                      <strong>รหัสทรัพย์สิน:</strong>{" "}
                      {item.equip_assetcode || "-"}
                      <br />
                      <strong>เลขที่สัญญา:</strong> {item.equip_contract || "-"}
                    </div>
                  </div>
                </td>
                <td className="align-middle text-center">
                  {item.distribution_amount}
                </td>
                <td className="align-middle text-center">{item.g_name}</td>
                <td className="align-middle text-center">{item.r_name}</td>
                <td className="align-middle text-center">{item.date}</td>
                <td className="align-middle text-center">
                  {/* <Button
                    variant="outline-primary"
                    className="me-2"
                    style={{ width: "40px" }}
                    onClick={() => handleEdit(index)} // เรียกฟังก์ชัน handleEdit เมื่อคลิก
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button> */}
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton className="modal-header-form">
            <Modal.Title>{isEdit ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* ฟิลด์สำหรับแก้ไขหรือเพิ่มข้อมูล */}
              <Form.Group className="mb-3">
                <Form.Label>ประเภท</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_type"
                  value={formData.equipment_type}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ผู้จัดสรร</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_name"
                  value={formData.g_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ยี่ห้อ</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_brand"
                  value={formData.equipment_brand}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รุ่น</Form.Label>
                <Form.Control
                  type="text"
                  name="equipment_model"
                  value={formData.equipment_model}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รหัสทรัพย์สิน</Form.Label>
                <Form.Control
                  type="text"
                  name="equip_assetcode"
                  value={formData.equip_assetcode}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>เลขที่สัญญา</Form.Label>
                <Form.Control
                  type="text"
                  name="equip_contract"
                  value={formData.equip_contract}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ผู้รับ</Form.Label>
                <Form.Control
                  type="text"
                  name="receiver"
                  value={formData.r_name}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>วันที่จำหน่าย</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              ปิด
            </Button>
            <Button variant="success">บันทึก</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Info_Layout>
  );
};

export default Distribution;
