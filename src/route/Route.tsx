import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "../components/DashboardPage";
import LoginPage from "../components/LoginPage";
import Layout from "../components/Layout";
import ProductsPage from "../components/ProductsPage";
import OrdersPage from "../components/OrdersPage";
import UsersPage from "../components/UsersPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Layout><DashboardPage /></Layout>} />
      <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
      <Route path="/orders" element={<Layout><OrdersPage /></Layout>} />
      <Route path="/users" element={<Layout><UsersPage /></Layout>} />
      <Route path="/calendar" element={<Layout><div className="text-2xl font-semibold text-gray-900">Calendar - Coming Soon</div></Layout>} />
      <Route path="/documents" element={<Layout><div className="text-2xl font-semibold text-gray-900">Documents - Coming Soon</div></Layout>} />
      <Route path="/reports" element={<Layout><div className="text-2xl font-semibold text-gray-900">Reports - Coming Soon</div></Layout>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
