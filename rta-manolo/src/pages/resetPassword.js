import React, { useState } from "react";
import axios from "../plugins/axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const [new_password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (new_password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post("accounts/users/reset_password_confirm/", {
        uid,
        token,
        new_password,
      });
      
      // Handle success scenario
      setSuccess(true);
      alert('Successfully Changed Password')
      navigation("/")
    } catch (error) {
      // Handle error scenario
      setError("An error occurred. Please try again later.");
      console.log(error)
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        {/* Password field */}
        <label htmlFor="password">New Password</label>
        <input
          type="password"
          id="password"
          value={new_password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Confirm password field */}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {/* Error message */}
        {error && <p>{error}</p>}

        {/* Success message */}
        {success && <p>Password reset successful!</p>}

        {/* Submit button */}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
