import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from 'react';
import "./App.css";

// Eagerly load critical components
import UserLogin from "./Components/UserLogin/UserLogin.jsx";
import AfterOtpSection1 from "./Components/AfterOtpSection1/AfterOtpSection1.jsx";
import UserSignupWithEmailAndPassword from "./Components/UserSignupWithEmailAndPassword/UserSignupWithEmailAndPassword.jsx";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword.jsx";
import EduValt from "./Components/EduValt/EduValt.jsx";
import LibBlog from "./Components/Libblog/LibBlog.jsx";
import Guiednest from "./Components/Guiednest/Guiednest.jsx";
import ComingSoon from "./Components/CommingSoon/CommingSoon.jsx";

// Lazy load other components
const View = lazy(() => import("./Components/View/View.jsx"));
const DesFollowerMiddleSectionPrivacy = lazy(() => import('./Components/DesFollowerMiddleSectionPrivacy/DesFollowerMiddleSectionPrivacy.jsx'));
const InterestForm = lazy(() => import('./Components/IntersetForm/InterestForm.jsx'));
const CollabForm = lazy(() => import("./Components/CollabForm/CollabForm.jsx"));
const AboutAndExperience = lazy(() => import("./Components/AboutAndExperience/AboutAndExperience.jsx"));
const SkillForm = lazy(() => import("./Components/SkillForm/SkillForm.jsx"));
const ProfileEditSection = lazy(() => import("./Components/ProfileEditSection/ProfileEditSection.jsx"));
const FullFlowerSectionPage = lazy(() => import("./Components/FullFlowerSectionPage/FullFlowerSectionPage.jsx"));
const PersonalInfoUpdate = lazy(() => import("./Components/PersonalInfoUpdate/PersonalInfoUpdate.jsx"));
const MessageFinalClass = lazy(() => import('./Components/MessageFinalClass/MessageFinalclass.jsx'));
const MessageFinalClass2 = lazy(() => import('./Components/MessageFinalclass-2/MessageFinalClass2.jsx'));
const SelfProfile = lazy(() => import("./Components/Self-Profile/SelfProfile.jsx"));
const SelfSetting = lazy(() => import("./Components/SelfSetting/SelfSetting.jsx"));
const CollabPage = lazy(() => import("./Components/CollabPage/CollabPage.jsx"));
const BottomMessagesWidget = lazy(() => import("./Components/BottomMessagesWidget/BottomMessagesWidget.jsx"));
const UploadSection = lazy(() => import("./Components/UploadSection/UploadSection.jsx"));
const MobileAddPost = lazy(() => import("./Components/MobileAddPost/MobileAddPost.jsx"));
const AfterConnecting = lazy(() => import("./Components/AfterConnecting/AfterConnecting.jsx"));
const MentorSection = lazy(() => import("./Components/MentorSection/MentorSection.jsx"));
const HumanLib = lazy(() => import("./Components/HumanLib/HumanLib.jsx"));
const EducationEdit = lazy(() => import("./Components/EducationForm/EducationEdit.jsx"));
const Blog = lazy(() => import("./Components/Blog/Blog.jsx"));
const MessageMobileInbox = lazy(() => import("./Components/MessageMobileInbox/MessageMobileInbox.jsx"));
const BlogCreate = lazy(() => import("./Components/Blog/BlogCreate.jsx"));
const NetworkPageSection = lazy(() => import('./Components/NetworkPageSection/NetworkPageSection.jsx'));
const Resources = lazy(() => import("./Components/Resources/Resources.jsx"));
const Books = lazy(() => import("./Components/Resources/Books.jsx"));
const EventNews = lazy(() => import('./Components/Resources/EventNews.jsx'));
const EventDesc = lazy(() => import("./Components/Resources/EventDescription.jsx"));
const HumanLibGuidelines = lazy(() => import('./Components/HumanLibGuidlines/HumanLibGuidlines.jsx'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh' 
  }}>
    Loading...
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<UserLogin />} />
            <Route path="/home" element={<UserLogin />} />
            <Route path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<UserSignupWithEmailAndPassword />} />
            <Route path="/AfterOtpSection1" element={<AfterOtpSection1 />} />

            {/* Protected Routes (require userId) */}
            <Route path="/view" element={<View />} />
            <Route path="/follower-privacy/:userId" element={<DesFollowerMiddleSectionPrivacy />} />
            <Route path="/ProfileEditSection/:userId" element={<ProfileEditSection />} />
            <Route path="/follower-section" element={<FullFlowerSectionPage />} />
            <Route path="/AfterConnecting/:userId" element={<AfterConnecting />} />
            <Route path="/PersonalInfoUpdate/:userId" element={<PersonalInfoUpdate />} />
            <Route path="/skills/:userId" element={<SkillForm />} />
            <Route path="/collab/:userId" element={<CollabForm />} />
            <Route path="/interests/:userId" element={<InterestForm />} />
            <Route path="/education/:userId" element={<EducationEdit />} />
            <Route path="/uploadsection/:userId" element={<UploadSection />} />
            <Route path="/AboutAndExperience/:userId" element={<AboutAndExperience />} />
            <Route path="/about/:userId" element={<AboutAndExperience />} />
            <Route path="/blog/:userId" element={<Blog />} />
            <Route path="/blogcreate/:userId" element={<BlogCreate />} />

            {/* Other Routes */}
            <Route path="/self-profile" element={<SelfProfile />} />
            <Route path="/settings" element={<SelfSetting />} />
            <Route path="/messages" element={<MessageFinalClass />} />
            <Route path="/MessageFinalClass2/:messageId" element={<MessageFinalClass2 />} />
            <Route path="/NetworkPage" element={<NetworkPageSection />} />
            <Route path="/collabs" element={<CollabPage />} />
            <Route path="/messages-widget" element={<BottomMessagesWidget />} />
            <Route path="/add-post" element={<MobileAddPost />} />
            <Route path="/MessageMobileInbox" element={<MessageMobileInbox />} />
            <Route path="/MentorSection" element={<MentorSection />} />
            <Route path="/HumanLib" element={<HumanLib />} />
            <Route path="/Resources" element={<Resources />} />
            <Route path="/books" element={<Books />} />
            <Route path="/EventNews" element={<EventNews />} />
            <Route path="/EventDescription" element={<EventDesc />} />
            <Route path="/HumanLibGuidelines" element={<HumanLibGuidelines />} />
            <Route path="/EduValt" element={<EduValt/>} />
            <Route path="/Guiednest" element={<Guiednest />} />
            <Route path="/libblog" element={< LibBlog />} />
            <Route path="/coming-soon" element={< ComingSoon />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;