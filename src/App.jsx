import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserLogin from "./Componets/UserLogin/UserLogin";
import UserSignupOtp from './Componets/UserSignupOtp/UserSignupOtp.jsx'
import  Userloginwithname from './Componets/UserSignupwithname/UserSignupwithname.jsx'
import AfterOtpSection1 from "./Componets/AfterOtpSection1/AfterOtpSection1.jsx";
import UserSignupwithpasss from "./Componets/UserSignupwithpasss/UserSignupwithpasss.jsx";
import DecktopView from './Componets/DesktopView/DesktopView.jsx'
import Mobileview from './Componets/Mobileview/Mobileview.jsx'
function App() {
  return (
    <div>
      <DecktopView/>
      
    </div>
    // <Router>
    //   <div className="app-container">
    //     <Routes>
    //       <Route path="/home" element={<UserLogin />} />
    //       <Route path="/" element={<UserLogin />} />
    //       <Route path="/signup" element={<Userloginwithname />} /> 
    //       <Route path="/UserSignupOtp" element={<UserSignupOtp />} /> 
    //       <Route path="/AfterOtpSection1" element={<AfterOtpSection1/>} /> 
    //     </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
