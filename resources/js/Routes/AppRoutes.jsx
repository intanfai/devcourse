import { Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Login from "../Pages/Login";
import Landing from "../Pages/Landing";
import Register from "../Pages/Register";

const AppRoutes = () => {
    return (
        <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Landing />} />
            <Route path="/Register" element={<Register />} />
        </Routes>
    );
};

export default AppRoutes;
