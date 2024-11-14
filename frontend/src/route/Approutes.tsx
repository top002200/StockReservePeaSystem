// AppRoutes.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../components/pages/Dashboard";
import Borrowitem from "../components/pages/Borrowitem";
import Approval from "../components/pages/Approval";
import User_Managment from "../components/pages/User_Management";
import Equipment_info from "../components/pages/Equipment_info";
import Equipment_Repair from "../components/pages/Equipment_Repair";
import Personal_info from "../components/pages/Personal_info";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Borrowitem" element={<Borrowitem />} />
        <Route path="/Approval" element={<Approval />} />
        <Route path="/user-management" element={<User_Managment />} />
        <Route path="/equipment-info" element={<Equipment_info />} />
        <Route path="/equipment-repair" element={<Equipment_Repair />} />
        <Route path="/personal-info" element={<Personal_info />} />
        
      </Routes>
    </Router>
  );
}
