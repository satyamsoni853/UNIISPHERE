import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import UserLogin from "./Componets/UserLogin/UserLogin.jsx";
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
import FullFlowerSectionPage from "./Componets/FullFlowerSectionPage/FullFlowerSectionPage.jsx";
import PersonalInfoUpdate from "./Componets/PersonalInfoUpdate/PersonalInfoUpdate.jsx";
import MessageFinalclass from "./Componets/MessageFinalClass/MessageFinalclass.jsx";
import SelfProfile from "./Componets/Self-Profile/SelfProfile.jsx";
import SelfSetting from "./Componets/SelfSetting/SelfSetting.jsx";
import MessageFinalClass2 from "./Componets/MessageFinalclass-2/MessageFinalClass2.jsx";
import NetworkPage from "./Componets/NetworkPage/NetworkPage.jsx";
import CollabPage from "./Componets/CollabPage/CollabPage.jsx";
import BottomMessagesWidget from "./Componets/BottomMessagesWidget/BottomMessagesWidget.jsx";
import UploadSection from "./Componets/UploadSection/UploadSection.jsx";

import MobileAddPost from "./Componets/MobileAddPost/MobileAddPost.jsx";
import MessageMobileInbox from "./Componets/MessageMobileInbox/MobileMessage.jsx";
import GoogleLoginComponent from './Componets/GoogleLogin/GoogleLoginComponent.jsx'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<UserLogin />} />
          <Route path="/home" element={<UserLogin />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path="/signup" element={<UserSignupwithemailandpass />} />
          <Route path="/AfterOtpSection1" element={<AfterOtpSection1 />} />

          {/* Protected Routes (require userId) */}
          <Route path="/View" element={<View />} />
          <Route
            path="/FollowerMiddleSectionPrivacy/:userId"
            element={<DesFollowerMiddleSectionPrivacy />}
          />
          <Route
            path="/ProfileEditSection/:userId"
            element={<ProfileEditSection />}
          />
          <Route
            path="/FullFlowerSectionPage/:userId"
            element={<FullFlowerSectionPage />}
          />
         
          <Route
            path="/PersonalInfoUpdate/:userId"
            element={<PersonalInfoUpdate />}
          />
          <Route path="/Skill/:userId" element={<SkillForm />} />
          <Route path="/Collab/:userId" element={<CollabForm />} />
          <Route path="/Interset/:userId" element={<Interset />} />
          <Route
            path="/AboutAndExperiance/:userId"
            element={<AboutAndExperiance />}
          />

          {/* Other Routes */}
          <Route path="/SelfProfile" element={<SelfProfile />} />
          <Route path="/SelfSetting" element={<SelfSetting />} />
          <Route path="/MessageFinalclass" element={<MessageFinalclass />} />
          <Route path="/MessageFinalClass2/:messageId" element={<MessageFinalClass2 />} />
          <Route path="/NetworkPage" element={<NetworkPage />} />
          <Route path="/CollabPage" element={<CollabPage />} />
          <Route
            path="/BottomMessagesWidget"
            element={<BottomMessagesWidget />}
          />
          <Route path="/uploadsection/:userId" element={<UploadSection />} />

          <Route path="/MobileAddPost" element={<MobileAddPost />} />
          <Route path="/MessageMobileInbox" element={<MessageMobileInbox />} />
          <Route path="/GoogleLoginComponent" element={<GoogleLoginComponent />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
