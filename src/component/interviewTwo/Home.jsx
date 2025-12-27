import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={() => navigate('/users')} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Go to Users
      </button>
    </div>
  );
};

export default HomePage;