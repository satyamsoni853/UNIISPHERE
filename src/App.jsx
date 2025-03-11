import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserLogin from "./Componets/UserLogin/UserLogin";

import AfterOtpSection1 from "./Componets/AfterOtpSection1/AfterOtpSection1.jsx";

import DecktopView from "./Componets/DesktopView/DesktopView.jsx";
import Mobileview from "./Componets/Mobileview/Mobileview.jsx";
import UserSignupwithemailandpass from "./Componets/UserSignupwithemailandpass/UserSignupwithemailandpass.jsx";
import UNIISPHERELOGO from "./Componets/UNIISPHERELOGO/UNIISPHERELOGO.jsx";
function App() {
  return (
    
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/home" element={<UserLogin />} />
          <Route path="/dashboard" element={<DecktopView />} />
          <Route path="/" element={<UserLogin />} />

          <Route path="/signup" element={<UserSignupwithemailandpass />} />

          <Route path="/AfterOtpSection1" element={<AfterOtpSection1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
