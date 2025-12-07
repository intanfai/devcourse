import { Routes, Route, Link } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";

{
    /* Admin Routes */
}
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
import MyClassesPage from "../Pages/dashboard/instructor/MyClasses/MyClassesPage.jsx";
import EditClassPage from "../Pages/dashboard/instructor/MyClasses/EditClassPage.jsx";
import CreateClassPage from "../Pages/dashboard/instructor/CreateClass/CreateClassPage.jsx";
import StudentsPage from "../Pages/dashboard/instructor/Students/StudentsPage.jsx";
import EarningsPage from "../Pages/dashboard/instructor/Earnings/EarningsPage.jsx";
import InstructorNotificationsPage from "../Pages/dashboard/instructor/Notifications/InstructorNotificationsPage.jsx";
import InstructorProfilePage from "../Pages/dashboard/instructor/Profile/InstructorProfilePage.jsx";
import InstructorSettingsPage from "../Pages/dashboard/instructor/Settings/InstructorSettingsPage.jsx";
import InstructorEditProfile from "../Pages/dashboard/instructor/Profile/InstructorEditProfile.jsx";

import StudentDashboard from "../Pages/dashboard/student/Dashboard.jsx";
import StudentCourseDetail from "../Pages/dashboard/student/StudentCourseDetail.jsx";
import MaterialPage from "../Pages/dashboard/student/MaterialPage.jsx";
import QuizPage from "../Pages/dashboard/student/course/QuizPage.jsx";
import FinalQuizPage from "../Pages/dashboard/student/course/FinalQuizPage.jsx";
import CoursePreviewPage from "../Pages/dashboard/student/CoursePreviewPage.jsx";
import MyCoursesPage from "../Pages/dashboard/student/course/MyCourse.jsx";
import ProgressPage from "../Pages/dashboard/student/ProgressPage.jsx";
import StudentCertificatesPage from "../Pages/dashboard/student/Certificates/StudentCertificatesPage";
import ExploreCoursesPage from "../Pages/dashboard/student/ExploreCoursesPage.jsx";
import StudentNotificationsPage from "../Pages/dashboard/student/StudentNotificationsPage.jsx";
import StudentProfilePage from "../Pages/dashboard/student/Profile/StudentProfilePage.jsx";
import EditProfilePage from "../Pages/dashboard/student/Profile/EditProfilePage.jsx";
import StudentSettingsPage from "../Pages/dashboard/student/Settings/StudentSettingsPage.jsx";
import CheckoutPage from "../Pages/dashboard/student/CheckoutPage.jsx";


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
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/classes" element={<ClassesPage />} />
                <Route path="/admin/classes/:id" element={<ClassDetail />} />
                <Route
                    path="/admin/classes/:classId/materials/:materialId"
                    element={<MaterialDetail />}
                />
                <Route
                    path="/admin/classes/:classId/quizzes/:quizId"
                    element={<QuizDetail />}
                />
                <Route path="/admin/classes/add" element={<AddClass />} />
                <Route
                    path="/admin/certificates"
                    element={<CertificatesPage />}
                />
                <Route
                    path="/admin/certificates/:certificateId"
                    element={<CertificateDetail />}
                />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/role" element={<RolePage />} />
                <Route
                    path="/admin/role/edit/:roleId"
                    element={<RoleEditPage />}
                />
                <Route path="/admin/payments" element={<PaymentsPage />} />
                <Route
                    path="/admin/payments/:paymentId"
                    element={<PaymentDetail />}
                />
                <Route
                    path="/admin/notification"
                    element={<NotificationsPage />}
                />
                <Route path="/admin/help" element={<HelpPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
                <Route
                    path="/instructor/dashboard"
                    element={<InstructorDashboard />}
                />
                <Route path="/instructor/classes" element={<MyClassesPage />} />
                <Route
                    path="/instructor/classes/edit/:classId"
                    element={<EditClassPage />}
                />
                <Route
                    path="/instructor/classes/create"
                    element={<CreateClassPage />}
                />
                <Route path="/instructor/students" element={<StudentsPage />} />
                <Route path="/instructor/earnings" element={<EarningsPage />} />
                <Route
                    path="/instructor/notifications"
                    element={<InstructorNotificationsPage />}
                />
                <Route
                    path="/instructor/profile"
                    element={<InstructorProfilePage />}
                />
                <Route
                    path="/instructor/profile/edit"
                    element={<InstructorEditProfile />}
                />
                <Route
                    path="/instructor/settings"
                    element={<InstructorSettingsPage />}
                />

                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/student/course/:courseId"
                    element={<StudentCourseDetail />}
                />

                <Route
                    path="/student/course/:courseId/material/:materialId"
                    element={<MaterialPage />}
                />

                <Route
                    path="/student/course/:courseId/quiz/:quizId"
                    element={<QuizPage />}
                />

                <Route
                    path="/student/course/:courseId/final-quiz"
                    element={<FinalQuizPage />}
                />
                <Route
                    path="/student/course/:courseId/preview"
                    element={<CoursePreviewPage />}
                />
                <Route path="/student/progress" element={<ProgressPage />} />
                <Route
                    path="/student/certificates"
                    element={<StudentCertificatesPage />}
                />

                <Route
                    path="/student/explore"
                    element={<ExploreCoursesPage />}
                />
                <Route
                    path="/student/courses"
                    element={<MyCoursesPage />}
                />
                <Route
                    path="/student/notifications"
                    element={<StudentNotificationsPage />}
                />
                <Route
                    path="/student/profile"
                    element={<StudentProfilePage />}
                />

                <Route
                    path="/student/profile/edit"
                    element={<EditProfilePage />}
                />

                <Route
                    path="/student/settings"
                    element={<StudentSettingsPage />}
                />

                <Route
                    path="/student/checkout/:courseId"
                    element={<CheckoutPage />}
                />
            </Route>

            {/* optional: 404 */}
            <Route
                path="*"
                element={<h2 className="p-6">404 - Not Found</h2>}
            />
            
        </Routes>
    );
}
