import { AdminData } from "../interface/IAdmin";
import { EquipmentData } from "../interface/IEquipment";
import { SubmissionData } from "../interface/ISubmission";
import { BrandData } from "../interface/IBrand";
import { ModelData } from "../interface/IModel";
import { TypeData } from "../interface/IType";
import { BorrowedEquipmentData } from "../interface/IBorrowedEquipment";

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
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (response.ok) {
      return { status: true, message: res.message, data: res.data };
    } else {
      return {
        status: false,
        message: res.error || "Failed to create equipment",
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
      return { status: true, data };
    } else {
      const error = await response.json();
      return {
        status: false,
        message: error.message || "Failed to fetch submissions",
      };
    }
  } catch (error) {
    console.error("Error fetching submissions:", error);
    return { status: false, message: "An unexpected error occurred" };
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
      return { status: true, data };
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
};
