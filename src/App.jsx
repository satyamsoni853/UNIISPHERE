import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import UserLogin from "./Components/UserLogin/UserLogin.jsx";
import AfterOtpSection1 from "./Components/AfterOtpSection1/AfterOtpSection1.jsx";
import UserSignupwithemailandpass from "./Components/UserSignupWithEmailAndPassword/UserSignupWithEmailAndPassword.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import View from "./Components/View/View.jsx";
import DesFollowerMiddleSectionPrivacy from "./Components/Des-Follower-middle-section-privacy/DesFollowerMiddleSectionPrivacy.jsx";
import InterestForm from "./Components/InterestForm/InterestForm.jsx";
import CollabForm from "./Components/CollabForm/CollabForm.jsx";
import AboutAndExperience from "./Components/AboutAndExperience/AboutAndExperience.jsx";
import SkillForm from "./Components/SkillForm/SkillForm.jsx";
import ProfileEditSection from "./Components/ProfileEditSection/ProfileEditSection.jsx";
import FullFlowerSectionPage from "./Components/FullFlowerSectionPage/FullFlowerSectionPage.jsx";
import PersonalInfoUpdate from "./Components/PersonalInfoUpdate/PersonalInfoUpdate.jsx";
import MessageFinalclass from "./Components/MessageFinalClass/MessageFinalclass.jsx";
import SelfProfile from "./Components/Self-Profile/SelfProfile.jsx";
import SelfSetting from "./Components/SelfSetting/SelfSetting.jsx";
import MessageFinalClass2 from "./Components/MessageFinalclass-2/MessageFinalClass2.jsx";
import NetworkPage from "./Components/NetworkPage/NetworkPage.jsx";
import CollabPage from "./Components/CollabPage/CollabPage.jsx";
import BottomMessagesWidget from "./Components/BottomMessagesWidget/BottomMessagesWidget.jsx";
import UploadSection from "./Components/UploadSection/UploadSection.jsx";
import MobileAddPost from "./Components/MobileAddPost/MobileAddPost.jsx";
import AfterConnecting from "./Components/AfterConnecting/AfterConnecting.jsx";
import MentorSection from "./Components/MentorSection/MentorSection.jsx";
import HumanLib from "./Components/HumanLib/HumanLib.jsx";
import EducationEdit from "./Components/EducationForm/EducationEdit.jsx";
import Blog from "./Components/Blog/Blog.jsx";
import MessageMobileInbox from "./Components/MessageMobileInbox/MessageMobileInbox.jsx";
import BlogCreate from "./Components/Blog/BlogCreate.jsx";

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
            path="/DesFollowerMiddleSectionPrivacy/:userId"
            element={<DesFollowerMiddleSectionPrivacy />}
          />
          {/* <Route
            path="/FollowerMiddleSectionPrivacy"
            element={<DesFollowerMiddleSectionPrivacy />}
          /> */}
          <Route
            path="/ProfileEditSection/:userId"
            element={<ProfileEditSection />}
          />
          <Route
            path="/FullFlowerSectionPage/:userId"
            element={<FullFlowerSectionPage />}
          />
          <Route
            path="/AfterConnecting/:userId"
            element={<AfterConnecting />}
          />
          <Route
            path="/PersonalInfoUpdate/:userId"
            element={<PersonalInfoUpdate />}
          />
          <Route path="/Skill/:userId" element={<SkillForm />} />
          <Route path="/Collab/:userId" element={<CollabForm />} />
          <Route path="/Interset/:userId" element={<Interset />} />
          <Route path="/EducationEdit/:userId" element={<EducationEdit />} />
          <Route path="/blog/:userId" element={<Blog />} />
          <Route path="/BlogCreate/:userId" element={<BlogCreate />} />
          <Route
            path="/AboutAndExperiance/:userId"
            element={<AboutAndExperiance />}
          />

          {/* Other Routes */}
          <Route path="/SelfProfile" element={<SelfProfile />} />
          <Route path="/SelfSetting" element={<SelfSetting />} />
          <Route path="/MessageFinalclass" element={<MessageFinalclass />} />
          <Route
            path="/MessageFinalClass2/:messageId"
            element={<MessageFinalClass2 />}
          />
          <Route path="/NetworkPage" element={<NetworkPage />} />
          <Route path="/CollabPage" element={<CollabPage />} />
          <Route
            path="/BottomMessagesWidget"
            element={<BottomMessagesWidget />}
          />
          <Route path="/uploadsection/:userId" element={<UploadSection />} />
          <Route path="/MobileAddPost" element={<MobileAddPost />} />
          <Route path="/MessageMobileInbox" element={<MessageMobileInbox />} />
          <Route path="/MentorSection" element={<MentorSection />} />
          <Route path="/HumanLib" element={<HumanLib />} />
          <Route path="/Blog" element={<Blog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;