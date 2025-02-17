import { AdminData } from "../interface/IAdmin";
import { EquipmentData } from "../interface/IEquipment";
import { SubmissionData } from "../interface/ISubmission";
import { BrandData } from "../interface/IBrand";
import { ModelData } from "../interface/IModel";
import { TypeData } from "../interface/IType";
import { BorrowedEquipmentData } from "../interface/IBorrowedEquipment";
import { RepairData } from "../interface/IRepair";
import { DistributionData } from "../interface/IDistribution";

// const apiURL = "http://localhost:8080";
const apiURL = "http://localhost:8080";

// Admin API Functions

// Create Admin
async function createAdmin(data: AdminData) {
  try {
    const response = await fetch(`${apiURL}/admin`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to create admin" };
    }
  } catch (error: any) {
    console.error("Error creating admin:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All Admins
async function getAllAdmins() {
  try {
    const response = await fetch(`${apiURL}/admins`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch admins",
      };
    }
  } catch (error) {
    console.error("Error fetching admins:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Get Admin by ID
async function getAdminById(adminId: string) {
  try {
    const response = await fetch(`${apiURL}/admin/${adminId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch admin",
      };
    }
  } catch (error) {
    console.error("Error fetching admin by ID:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Update Admin
async function updateAdmin(adminId: string, data: AdminData) {
  try {
    const response = await fetch(`${apiURL}/admin/${adminId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to update admin" };
    }
  } catch (error: any) {
    console.error("Error updating admin:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Delete Admin
async function deleteAdmin(adminId: string) {
  try {
    const response = await fetch(`${apiURL}/admin/${adminId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { status: true, message: "Admin deleted successfully" };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to delete admin",
      };
    }
  } catch (error) {
    console.error("Error deleting admin:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Equipment API Functions

// Create Equipment
async function createEquipment(data: EquipmentData) {
  try {
    const response = await fetch(`${apiURL}/equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // กำหนด Content-Type เป็น application/json
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      // ตรวจสอบ error ที่ส่งจาก API
      return {
        status: false,
        message: res.error || res.message || "Failed to create equipment",
      };
    }
  } catch (error: any) {
    console.error("Error creating equipment:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

async function getAllEquipments() {
  try {
    const response = await fetch(`${apiURL}/equipment`, {
      method: "GET",
    });

    if (response.ok) {
      const result = await response.json(); // Handle full JSON response
      console.log("API Response:", result); // Debug API structure
      return { status: true, data: result.data }; // Extract `data` field
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch equipments",
      };
    }
  } catch (error) {
    console.error("Error fetching equipments:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Get Equipment by ID
async function getEquipmentById(equipmentId: string) {
  try {
    const response = await fetch(`${apiURL}/equipment/${equipmentId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch equipment",
      };
    }
  } catch (error) {
    console.error("Error fetching equipment by ID:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Update Equipment
async function updateEquipment(equipmentId: string, data: EquipmentData) {
  try {
    const response = await fetch(`${apiURL}/equipment/${equipmentId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to update equipment",
      };
    }
  } catch (error: any) {
    console.error("Error updating equipment:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Delete Equipment
async function deleteEquipment(equipmentId: string) {
  try {
    const response = await fetch(`${apiURL}/equipment/${equipmentId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { status: true, message: "Equipment deleted successfully" };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to delete equipment",
      };
    }
  } catch (error) {
    console.error("Error deleting equipment:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Submission API Functions

// Create Submission
async function createSubmission(data: SubmissionData) {
  try {
    const response = await fetch(`${apiURL}/submission`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to create submission",
      };
    }
  } catch (error: any) {
    console.error("Error creating submission:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All Submissions
async function getAllSubmissions() {
  try {
    const response = await fetch(`${apiURL}/submissions`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data: Array.isArray(data.data) ? data.data : [] }; // Ensure data is an array
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch submissions",
      };
    }
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { status: false, message: "An unexpected error occurred", data: [] }; // Return an empty array if error occurs
  }
}

async function updateSubmission(data: Partial<SubmissionData>) {

  try {
    // 🔥 Log ข้อมูลที่กำลังส่งไปยัง API
    console.log("🔹 Submitting data to API:", data);

    if (!data.submission_id) {
      throw new Error("❌ Missing submission_id");
    }

    const response = await fetch(`${apiURL}/submission/${data.submission_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // 🔥 Log response ก่อนแปลงเป็น JSON
    console.log("🔹 Raw API Response:", response);

    const res = await response.json();

    // 🔥 Log response หลังจากแปลง JSON
    console.log("🔹 API Response JSON:", res);

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to update submission",
      };
    }
  } catch (error: any) {
    console.error("❌ Error updating submission:", error);
    return {
      status: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}
async function deleteSubmission(submissionId: string) {
  try {
    const response = await fetch(`${apiURL}/submission/${submissionId}`, {
      method: "DELETE",
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message };
    } else {
      return {
        status: false,
        message: res.message || "Failed to delete submission",
      };
    }
  } catch (error: any) {
    console.error("Error deleting submission:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}



// Brand API Functions

// Create Brand
async function createBrand(data: BrandData) {
  try {
    const response = await fetch(`${apiURL}/brand`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to create brand" };
    }
  } catch (error: any) {
    console.error("Error creating brand:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All Brands
async function getAllBrands() {
  try {
    const response = await fetch(`${apiURL}/brands`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch brands",
      };
    }
  } catch (error) {
    console.error("Error fetching brands:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Model API Functions

// Create Model
async function createModel(data: ModelData) {
  try {
    const response = await fetch(`${apiURL}/model`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to create model" };
    }
  } catch (error: any) {
    console.error("Error creating model:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All Models
async function getAllModels() {
  try {
    const response = await fetch(`${apiURL}/models`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch models",
      };
    }
  } catch (error) {
    console.error("Error fetching models:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Type API Functions

// Create Type
async function createType(data: TypeData) {
  try {
    const response = await fetch(`${apiURL}/type`, {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to create type" };
    }
  } catch (error: any) {
    console.error("Error creating type:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All Types
async function getAllTypes() {
  try {
    const response = await fetch(`${apiURL}/types`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch types",
      };
    }
  } catch (error) {
    console.error("Error fetching types:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}
// Picture API Functions

// Create Picture
async function createPicture(pictureData: {
  picture_id: string;
  picture_data: string;
}) {
  try {
    const response = await fetch(`${apiURL}/picture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pictureData),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to create picture",
      };
    }
  } catch (error: any) {
    console.error("Error creating picture:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All Pictures
const getAllPictures = async () => {
  try {
    const response = await fetch(`${apiURL}/pictures`, {
      method: "GET",
    });
    const result = await response.json();
    return {
      status: response.ok,
      data: result.data || [],
      message: result.message || null,
    };
  } catch (error) {
    console.error("Error fetching pictures:", error);
    return {
      status: false,
      data: [],
      message: "Error fetching pictures",
    };
  }
};

// Get Picture by ID
async function getPictureById(pictureId: string) {
  try {
    const response = await fetch(`${apiURL}/picture/${pictureId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch picture",
      };
    }
  } catch (error) {
    console.error("Error fetching picture by ID:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Delete Picture
async function deletePicture(pictureId: string) {
  try {
    const response = await fetch(`${apiURL}/picture/${pictureId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return { status: true, message: "Picture deleted successfully" };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to delete picture",
      };
    }
  } catch (error) {
    console.error("Error deleting picture:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}
async function createBorrowedEquipment(data: BorrowedEquipmentData) {
  try {
    const response = await fetch(`${apiURL}/borrowed-equipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to create borrowed equipment",
      };
    }
  } catch (error: any) {
    console.error("Error creating borrowed equipment:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get All BorrowedEquipments
async function getAllBorrowedEquipments() {
  try {
    const response = await fetch(`${apiURL}/borrowed-equipments`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();

      // เพิ่มการดึงข้อมูลจาก data.data โดยตรง
      return { status: true, data: data.data };  // ใช้ data.data แทนการใช้ data
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch borrowed equipments",
      };
    }
  } catch (error) {
    console.error("Error fetching borrowed equipments:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Get BorrowedEquipment by ID
async function getBorrowedEquipmentById(borrowedEquipmentId: string) {
  try {
    const response = await fetch(
      `${apiURL}/borrowed-equipment/${borrowedEquipmentId}`,
      {
        method: "GET",
      }
    );

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch borrowed equipment",
      };
    }
  } catch (error) {
    console.error("Error fetching borrowed equipment by ID:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Update BorrowedEquipment
async function updateBorrowedEquipment(
  borrowedEquipmentId: string,
  data: BorrowedEquipmentData
) {
  try {
    const response = await fetch(
      `${apiURL}/borrowed-equipment/${borrowedEquipmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to update borrowed equipment",
      };
    }
  } catch (error: any) {
    console.error("Error updating borrowed equipment:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Delete BorrowedEquipment
async function deleteBorrowedEquipment(borrowedEquipmentId: string) {
  try {
    const response = await fetch(
      `${apiURL}/borrowed-equipment/${borrowedEquipmentId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      return {
        status: true,
        message: "Borrowed equipment deleted successfully",
      };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to delete borrowed equipment",
      };
    }
  } catch (error) {
    console.error("Error deleting borrowed equipment:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}
async function createRepair(data: RepairData) {
  try {
    // แปลงวันที่ให้อยู่ในรูปแบบ ISO ที่ backend รองรับ
    const formattedData = {
      ...data,
      date: data.date
        ? new Date(data.date).toISOString()
        : new Date().toISOString(),
    };

    console.log("Sending data:", formattedData);

    const response = await fetch(`${apiURL}/repair`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || "Failed to create repair");
    }

    const res = await response.json();
    return { status: true, message: res.message, data: res.data };
  } catch (error: any) {
    console.error("Error creating repair:", error.message);
    return { status: false, message: error.message };
  }
}

// Get All Repairs
async function getAllRepairs() {
  try {
    const response = await fetch(`${apiURL}/repairs`, { method: "GET" });

    if (response.ok) {
      const jsonData = await response.json();
      return { status: true, data: jsonData.data }; // Extract 'data' field
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch repairs",
      };
    }
  } catch (error) {
    console.error("Error fetching repairs:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Get Repair by ID
async function getRepairById(repairId: string) {
  try {
    const response = await fetch(`${apiURL}/repair/${repairId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch repair",
      };
    }
  } catch (error) {
    console.error("Error fetching repair by ID:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Update Repair
async function updateRepair(data: RepairData) {
  try {
    const response = await fetch(`${apiURL}/repair/${data.repair_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return { status: false, message: res.error || "Failed to update repair" };
    }
  } catch (error: any) {
    console.error("Error updating repair:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Delete Repair
async function deleteRepair(repair_id: number) {
  try {
    const response = await fetch(`${apiURL}/repair/${repair_id.toString()}`, {
      method: "DELETE",
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message };
    } else {
      return { status: false, message: res.error || "Failed to delete repair" };
    }
  } catch (error: any) {
    console.error("Error deleting repair:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Mark Repair as Completed
async function completeRepair(repairId: string) {
  try {
    const response = await fetch(`${apiURL}/repair/${repairId}/complete`, {
      method: "POST",
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to mark repair as completed",
      };
    }
  } catch (error: any) {
    console.error("Error marking repair as completed:", error);
    return { status: false, message: error.message || "An error occurred" };
  }
}

// Get Completed Repairs
async function getCompletedRepairs() {
  try {
    const response = await fetch(`${apiURL}/repairs/completed`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch completed repairs",
      };
    }
  } catch (error) {
    console.error("Error fetching completed repairs:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Get Repairs by Equipment
async function getRepairsByEquipment(equipmentId: string) {
  try {
    const response = await fetch(`${apiURL}/repairs/equipment/${equipmentId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch repairs for equipment",
      };
    }
  } catch (error) {
    console.error("Error fetching repairs for equipment:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}
const createDistribution = async (data: DistributionData) => {
  try {
    // แปลงข้อมูล equipment_id และ distribution_amount ให้เป็น number เพื่อความแน่นอน
    const formattedData: DistributionData = {
      ...data,
      equipment_id: Number(data.equipment_id),
      distribution_amount: Number(data.distribution_amount),
    };

    console.log("Formatted Data:", formattedData); // log ค่าก่อนส่งไปยัง backend

    const response = await fetch(`${apiURL}/distribution`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    });

    const res = await response.json();

    console.log("API Response:", res); // log ค่าที่ได้รับจาก API

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to create distribution",
      };
    }
  } catch (error: any) {
    console.error("Error creating distribution:", error);
    return {
      status: false,
      message: error.message || "An unexpected error occurred",
    };
  }
};

// Update Distribution
async function updateDistribution(data: DistributionData) {
  try {
    const response = await fetch(`${apiURL}/distribution/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to update distribution",
      };
    }
  } catch (error: any) {
    console.error("Error updating distribution:", error);
    return {
      status: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}

// Delete Distribution
async function deleteDistribution(distributionId: number) {
  try {
    const response = await fetch(`${apiURL}/distribution/${distributionId}`, {
      method: "DELETE",
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message };
    } else {
      return {
        status: false,
        message: res.error || "Failed to delete distribution",
      };
    }
  } catch (error: any) {
    console.error("Error deleting distribution:", error);
    return {
      status: false,
      message: error.message || "An unexpected error occurred",
    };
  }
}


// Get All Distributions
async function getAllDistributions() {
  try {
    const response = await fetch(`${apiURL}/distributions`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch distributions",
      };
    }
  } catch (error) {
    console.error("Error fetching distributions:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}

// Get Distribution by ID
async function getDistributionById(distributionId: string) {
  try {
    const response = await fetch(`${apiURL}/distribution/${distributionId}`, {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch distribution",
      };
    }
  } catch (error) {
    console.error("Error fetching distribution:", error);
    return { status: false, message: "An unexpected error occurred" };
  }
}
export {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  createEquipment,
  getAllEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  createSubmission,
  getAllSubmissions,
  updateSubmission,
  deleteSubmission,
  createBrand,
  getAllBrands,
  createModel,
  getAllModels,
  createType,
  getAllTypes,
  createPicture,
  getAllPictures,
  getPictureById,
  deletePicture,
  createBorrowedEquipment,
  getAllBorrowedEquipments,
  getBorrowedEquipmentById,
  updateBorrowedEquipment,
  deleteBorrowedEquipment,
  createRepair,
  getAllRepairs,
  getRepairById,
  updateRepair,
  deleteRepair,
  completeRepair,
  getCompletedRepairs,
  getRepairsByEquipment,
  getDistributionById,
  createDistribution,
  getAllDistributions,
  deleteDistribution,
  updateDistribution,
};
