import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";

{/* Admin Routes */}
import AdminDashboard from "../Pages/dashboard/admin/Dashboard";
import UsersPage from "../Pages/dashboard/admin/Users";
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


import InstructorDashboard from "../Pages/dashboard/instructor/Dashboard/InstructorDashboard.jsx";  
export default function AppRoutes() {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/Register" element={<Register />} />

            {/* PROTECTED ROUTE */}
            <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/classes" element={<ClassesPage />} />
                <Route path="/admin/classes/:id" element={<ClassDetail />} />
                <Route path="/admin/classes/:classId/materials/:materialId" element={<MaterialDetail />} />
                <Route path="/admin/classes/:classId/quizzes/:quizId" element={<QuizDetail />} />
                <Route path="/admin/classes/add" element={<AddClass />} />
                <Route path="/admin/certificates" element={<CertificatesPage />} />
                <Route path="/admin/certificates/:certificateId" element={<CertificateDetail />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/role" element={<RolePage />} />
                <Route path="/admin/role/edit/:roleId" element={<RoleEditPage />} /> 
                <Route path="/admin/payments" element={<PaymentsPage />} /> 
                <Route path="/admin/payments/:paymentId" element={<PaymentDetail />} /> 
                <Route path="/admin/notification" element={<NotificationsPage />} />
                <Route path="/admin/help" element={<HelpPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} /> 



                <Route path="/instructor/dashboard" element={<InstructorDashboard />} />    
            </Route>

            {/* optional: 404 */}
            <Route
                path="*"
                element={<h2 className="p-6">404 - Not Found</h2>}
            />
            <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
    );
}
