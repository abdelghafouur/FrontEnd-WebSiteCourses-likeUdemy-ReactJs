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
    <div classname="container022">
      <div classname="col-md-4 offset-md-4 form form2">
      <h2 classname="text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div classname="text-center">
            <label classname="form-group" >Email:</label>
            <input type="email" classname="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          {successMessage && <p>{successMessage}</p>}
          <button classname="form-control button" type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
