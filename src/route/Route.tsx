import { Route, Routes } from "react-router-dom";
import DashboardPage from "../components/DashboardPage";
import LoginPage from "../components/LoginPage";
import HomePage from "../components/HomePage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/dashboard" element={<DashboardPage/>}/>
    </Routes>
  );
}

export default AppRoutes;
