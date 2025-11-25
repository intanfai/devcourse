import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes";
import '../css/app.css';
// import Register from "./Pages/Register";

function App() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
