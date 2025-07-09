import React, { useState} from 'react';
import axios from 'axios';
import './PaswordChange.css'; // Import CSS file for styles
import { useNavigate } from 'react-router-dom';

function PasswordChange() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     
      e.preventDefault();
  
      if (newPassword !== confirmNewPassword) {
        console.log("New password does not match...")
        alert("the new password and confir pass doesnot match...");
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:3001/pschange', {
          name:username,
          password,
          newPassword,
        });
        
        if (response.status === 200) {
          // Password changed successfully, navigate to homepage
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('email');
          navigate('/');
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error has occured...");
      }
    };

  return (
    <div className="password-change-container">
      <h2>Password Change</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Current Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmNewPassword">Confirm New Password:</label>
          <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
}

export default PasswordChange;
