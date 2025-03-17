import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UserLogin from "./Componets/UserLogin/UserLogin";
import AfterOtpSection1 from "./Componets/AfterOtpSection1/AfterOtpSection1.jsx";
import UserSignupwithemailandpass from "./Componets/UserSignupwithemailandpass/UserSignupwithemailandpass.jsx";
import ForgotPassword from "./Componets/ForgotPassword/ForgotPassword.jsx";
import View from "./Componets/View/View.jsx";
import DesFollowerMiddleSectionPrivacy from "./Componets/Des-Follower-middle-section-privacy/DesFollowerMiddleSectionPrivacy.jsx";
import Interset from "./Componets/IntersetForm/Interset.jsx";
import CollabForm from "./Componets/CollabForm/CollabForm.jsx";
import AboutAndExperiance from "./Componets/AboutAndExperiance/AboutAndExperiance.jsx";
import SkillForm from "./Componets/SkillForm/SkillForm.jsx";
import ProfileEditSection from "./Componets/ProfileEditSection/ProfileEditSection.jsx";
import FullFlowerSectionPage from "./Componets/Full-Flower-SectionPage/FullFlowerSectionPage.jsx";
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/home" element={<UserLogin />} />
          <Route path="/" element={<UserLogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<UserSignupwithemailandpass />} />
          <Route path="/AfterOtpSection1" element={<AfterOtpSection1 />} />
          <Route path="/View" element={<View />} />
          <Route path="/FollowerMiddleSectionPrivacy" element={<DesFollowerMiddleSectionPrivacy />} />
          <Route path="/Interset" element={<Interset />} />
          <Route path="/Collab" element={<CollabForm />} />
          <Route path="/AboutAndExperiance" element={<AboutAndExperiance/>} />
          <Route path="/Skill" element={<SkillForm/>} />
          <Route path="/ProfileEditSection" element={<ProfileEditSection/>} />
          <Route path="/FullFlowerSectionPage" element={<FullFlowerSectionPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
