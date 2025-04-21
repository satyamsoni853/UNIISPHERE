import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import UserLogin from "./Components/UserLogin/UserLogin.jsx";
import AfterOtpSection1 from "./Components/AfterOtpSection1/AfterOtpSection1.jsx";
import UserSignupWithEmailAndPassword from "./Components/UserSignupWithEmailAndPassword/UserSignupWithEmailAndPassword.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import View from "./Components/View/View.jsx";
import DesFollowerMiddleSectionPrivacy from "./Components/Des-Follower-middle-section-privacy/DesFollowerMiddleSectionPrivacy.jsx";
import InterestForm from './Components/IntersetForm/InterestForm.jsx'
import CollabForm from "./Components/CollabForm/CollabForm.jsx";
import AboutAndExperience from "./Components/AboutAndExperience/AboutAndExperience.jsx";
import SkillForm from "./Components/SkillForm/SkillForm.jsx";
import ProfileEditSection from "./Components/ProfileEditSection/ProfileEditSection.jsx";
import FullFlowerSectionPage from "./Components/FullFlowerSectionPage/FullFlowerSectionPage.jsx";
import PersonalInfoUpdate from "./Components/PersonalInfoUpdate/PersonalInfoUpdate.jsx";
import MessageFinalClass from './Components/MessageFinalClass/MessageFinalclass.jsx';
import MessageFinalClass2 from './Components/MessageFinalclass-2/MessageFinalClass2.jsx'
import SelfProfile from "./Components/Self-Profile/SelfProfile.jsx";
import SelfSetting from "./Components/SelfSetting/SelfSetting.jsx";

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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/signup" element={<UserSignupWithEmailAndPassword />} />
          <Route path="/after-otp" element={<AfterOtpSection1 />} />

          {/* Protected Routes (require userId) */}
          <Route path="/view" element={<View />} />
          <Route
            path="/follower-privacy/:userId"
            element={<DesFollowerMiddleSectionPrivacy />}
          />
          <Route
            path="/profile-edit/:userId"
            element={<ProfileEditSection />}
          />
          <Route
            path="/follower-section/:userId"
            element={<FullFlowerSectionPage />}
          />
          <Route
            path="/after-connecting/:userId"
            element={<AfterConnecting />}
          />
          <Route
            path="/personal-info/:userId"
            element={<PersonalInfoUpdate />}
          />
          <Route path="/skills/:userId" element={<SkillForm />} />
          <Route path="/collab/:userId" element={<CollabForm />} />
          <Route path="/interests/:userId" element={<InterestForm />} />
          <Route path="/education/:userId" element={<EducationEdit />} />
          <Route path="/blog/:userId" element={<Blog />} />
          <Route path="/blog-create/:userId" element={<BlogCreate />} />
          <Route
            path="/about-experience/:userId"
            element={<AboutAndExperience />}
          />

          {/* Other Routes */}
          <Route path="/self-profile" element={<SelfProfile />} />
          <Route path="/settings" element={<SelfSetting />} />
          <Route path="/messages" element={<MessageFinalClass />} />
          <Route
            path="/messages/:messageId"
            element={<MessageFinalClass2 />}
          />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/collabs" element={<CollabPage />} />
          <Route
            path="/messages-widget"
            element={<BottomMessagesWidget />}
          />
          <Route path="/upload/:userId" element={<UploadSection />} />
          <Route path="/add-post" element={<MobileAddPost />} />
          <Route path="/inbox" element={<MessageMobileInbox />} />
          <Route path="/mentors" element={<MentorSection />} />
          <Route path="/human-lib" element={<HumanLib />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;