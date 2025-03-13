import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserLogin from "./Componets/UserLogin/UserLogin";

import AfterOtpSection1 from "./Componets/AfterOtpSection1/AfterOtpSection1.jsx";

import DecktopView from "./Componets/DesktopView/DesktopView.jsx";
import UserSignupwithemailandpass from "./Componets/UserSignupwithemailandpass/UserSignupwithemailandpass.jsx";
import ForgotPassword from "./Componets/ForgotPassword/ForgotPassword.jsx";
 

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/home" element={<UserLogin />} />
          {/* <Route path="/ShowFollowersMiddleSection" element={<ShowFollowersMiddleSection />} /> */}
         
          <Route path="/DecktopView" element={<DecktopView />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword/>} />

          <Route path="/signup" element={<UserSignupwithemailandpass />} />

          <Route path="/AfterOtpSection1" element={<AfterOtpSection1 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
