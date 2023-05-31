import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function useAuth() {
    const navigate = useNavigate();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (!token) {
        navigate('/'); // Redirect to login page if token is not found
      }
    }, [navigate]);
  
    return null; // You can customize the return value based on your needs
  }
  export default useAuth;
