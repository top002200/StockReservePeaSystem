// AppRoutes.tsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "../components/pages/Dashboard";
import Borrowitem from "../components/pages/Borrowitem";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Borrowitem" element={<Borrowitem />} />
        
      </Routes>
    </Router>
  );
}
