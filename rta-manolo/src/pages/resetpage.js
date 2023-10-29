import React, { useState } from "react";
import axios from "../plugins/axios";

const ResetPage = ({ uid, token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("accounts/users/reset_password_confirm/", {
        uid,
        token,
        new_password: newPassword, // Adjust the field name as needed
      });

      // Handle success scenario
      setSuccess(true);
      alert('Password reset successful');
      // You can navigate to a different page or display a success message as needed
    } catch (error) {
      // Handle error scenario
      setError("An error occurred. Please try again later.");
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <p>{error}</p>}

        {success && <p>Password reset successful!</p>}

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPage;
