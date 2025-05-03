import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import "./GoogleLoginComponent.css";

function GoogleLoginComponent() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token to get user info
      const decoded = jwtDecode(credentialResponse.credential);
      const { email } = decoded;

      if (email) {
        // Redirect to /AfterOtpSection1 with email in state
        navigate("/AfterOtpSection1", { state: { email } });
      } else {
        setError("Unable to retrieve email. Please try again.");
      }
    } catch (err) {
      console.error("Error decoding Google token:", err);
      setError("Authentication failed. Please try again.");
    }
  };

  const handleError = () => {
    setError("Google login failed. Please try again.");
  };

  return (
    <div className="google-login-container">
      <h2>Login with Google</h2>
      {error && <div className="error-message">{error}</div>}
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          useOneTap
          text="continue_with"
          shape="rectangular"
          theme="filled_blue"
          size="large"
        />
      </GoogleOAuthProvider>
    </div>
  );
}

export default GoogleLoginComponent;