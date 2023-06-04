import React, { useState } from 'react';
import axios from 'axios';
import './StyleForgetPassword.css'

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/password/reset/request', { email })
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
        setSuccessMessage('');
      });
  };

  return (
    <div className="container022">
      <div className="col-md-4 offset-md-4 form form2">
      <h1 >Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="form-group" >Your Email:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
          <button className="form-control button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
