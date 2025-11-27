import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import PrivateRoutes from "./PrivateRoutes";

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
                {/* kalau mau tambahkan route private lain, letakkan di sini */}
                {/* <Route path="/profile" element={<Profile />} /> */}
            </Route>

            {/* optional: 404 */}
            <Route
                path="*"
                element={<h2 className="p-6">404 - Not Found</h2>}
            />
        </Routes>
    );
}
