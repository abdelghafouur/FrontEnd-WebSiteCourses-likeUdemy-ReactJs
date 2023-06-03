import React, { useState } from 'react';
import axios from 'axios';

const VerificationToken = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/password/reset/verify', { email, code })
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
    <div>
      <h2>Verification Token</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Reset Code:</label>
          <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VerificationToken;
