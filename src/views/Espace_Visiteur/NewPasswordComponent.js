import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './StyleForgetPassword.css'
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setSuccessMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/password/reset/update/${code}`, {
        password,
      });
      setSuccessMessage(response.data.message);
      navigate('/');

    } catch (error) {
      setSuccessMessage(error.response.data.message);
    }
  };
  return (
    <div className="container022">
      <div className="col-md-4 offset-md-4 form form2 form3">
      <h1 className="text-center"> Reset Password</h1>
      <div>
        <label className="form-group">New Password:</label>
        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <label className="form-group">Confirm Password:</label>
        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      {successMessage && <p>{successMessage}</p>}
      {successMessage && <p>{successMessage}</p>}
      <button className="form-control button" onClick={handleResetPassword}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
