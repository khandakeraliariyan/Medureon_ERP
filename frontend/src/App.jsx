import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import InventoryPage from './pages/inventory/InventoryPage';
import StockInPage from './pages/inventory/StockInPage';
import SuppliersPage from './pages/suppliers/SuppliersPage';
import POSPage from './pages/pos/POSPage';
import SalesHistoryPage from './pages/analytics/SalesHistoryPage';
import CustomersPage from './pages/patients/CustomersPage';
import LendingPage from './pages/lending/LendingPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import UserManagementPage from './pages/users/UserManagementPage';
import SettingsPage from './pages/settings/SettingsPage';
import InvoicePage from './pages/invoice/InvoicePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route path="/app/dashboard" element={<DashboardPage />} />
      <Route path="/app/inventory" element={<InventoryPage />} />
      <Route path="/app/inventory/stock-in" element={<StockInPage />} />
      <Route path="/app/suppliers" element={<SuppliersPage />} />
      <Route path="/app/pos" element={<POSPage />} />
      <Route path="/app/analytics" element={<SalesHistoryPage />} />
      <Route path="/app/patients" element={<CustomersPage />} />
      <Route path="/app/lending" element={<LendingPage />} />
      <Route path="/app/notifications" element={<NotificationsPage />} />
      <Route path="/app/users" element={<UserManagementPage />} />
      <Route path="/app/settings" element={<SettingsPage />} />
      <Route path="/app/invoice/:id" element={<InvoicePage />} />
    </Routes>
  );
}
