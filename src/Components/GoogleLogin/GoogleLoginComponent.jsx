// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// function GoogleLoginComponent() {
//   const navigate = useNavigate();

//   const handleGoogleSuccess = async (credentialResponse) => {
//     try {
//       const token = credentialResponse.credential;
//       const decoded = jwtDecode(token);
//       const email = decoded.email;
//       const username = decoded.name || email.split("@")[0];

//       const response = await axios.post(
//         "https://uniisphere-1.onrender.com/auth/register/google",
//         { email, username }
//       );
//       console.log("Google OTP sent:", response.data);

//       navigate("/signup", {
//         state: { email, username, step: 2 },
//       });
//     } catch (error) {
//       console.error("Google login failed:", error);
//     }
//   };

//   const handleGoogleFailure = (error) => {
//     console.error("Google login error:", error);
//   };

//   return (
//     <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
//       <GoogleOAuthProvider clientId="YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com">
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={handleGoogleFailure}
//           render={(renderProps) => (
//             <button
//               onClick={renderProps.onClick}
//               disabled={renderProps.disabled}
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 padding: "10px 20px",
//                 fontSize: "16px",
//                 border: "1px solid #4285f4",
//                 borderRadius: "4px",
//                 backgroundColor: "#4285f4",
//                 color: "white",
//                 cursor: "pointer",
//               }}
//             >
//               <img
//                 src="https://developers.google.com/identity/images/g-logo.png"
//                 alt="Google Icon"
//                 style={{ width: "20px", marginRight: "10px" }}
//               />
//               Continue with Google
//             </button>
//           )}
//         />
//       </GoogleOAuthProvider>
//     </div>
//   );
// }

// export default GoogleLoginComponent;