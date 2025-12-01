import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../Pages/admin/AdminDashboard";
import Users from "../Pages/dashboard/admin/Users";
import ClassesPage from "../Pages/dashboard/admin/Classes/ClassesPage";
import ClassDetail from "../Pages/dashboard/admin/Classes/ClassDetail";
import MaterialDetail from "../Pages/dashboard/admin/Classes/MaterialDetail";
import QuizDetail from "../Pages/dashboard/admin/Classes/QuizDetail";
import AddClass from "../Pages/dashboard/admin/Classes/AddClass";
import CertificatesPage from "../Pages/dashboard/admin/Certificates/CertificatesPage";
import CertificateDetail from "../Pages/dashboard/admin/Certificates/CertificateDetail";
import ReportsPage from "../Pages/dashboard/admin/Reports/ReportsPage";
import RolePage from "../Pages/dashboard/admin/Role/RolePage";
import RoleEditPage from "../Pages/dashboard/admin/Role/RoleEditPage";  
import PaymentsPage from "../Pages/dashboard/admin/Payments/PaymentsPage";
import PaymentDetail from "../Pages/dashboard/admin/Payments/PaymentDetail";
import NotificationsPage from "../Pages/dashboard/admin/Notifications/NotificationsPage";
import HelpPage from "../Pages/dashboard/admin/Help/HelpPage";
import SettingsPage from "../Pages/dashboard/admin/Settings/SettingsPage";


export default function AdminRoutes() {
    return (
        <Routes>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/classes" element={<ClassesPage />} />
            <Route path="/admin/classes/:id" element={<ClassDetail />} />
            <Route path="/admin/classes/:classId/materials/:materialId" element={<MaterialDetail />} />
            <Route path="/admin/classes/:classId/quizzes/:quizId" element={<QuizDetail />} />
            <Route path="/admin/classes/add" element={<AddClass />} />
            <Route path="/admin/certificates" element={<CertificatesPage />} />
            <Route path="/admin/certificates/:certificateId"element={<CertificateDetail />} />
            <Route path="/admin/reports" element={<ReportsPage />} />
            <Route path="/admin/role" element={<RolePage />} /> 
            <Route path="/admin/role/edit/:roleId" element={<RoleEditPage />} />    
            <Route path="/admin/payments" element={<PaymentsPage />} /> 
            <Route path="/admin/payments/:paymentId" element={<PaymentDetail />} />
            <Route path="/admin/notification" element={<NotificationsPage />} />
            <Route path="/admin/help" element={<HelpPage />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
           
           
            {/* Add more admin routes here as needed */}
        </Routes>
    );
}
