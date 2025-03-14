import React, { useState } from 'react';
import { Dialog } from '@mui/material';
import Login from './Login';
import Register from './Register';

const AuthModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      {isLogin ? (
        <Login onToggleView={toggleView} />
      ) : (
        <Register onToggleView={toggleView} />
      )}
    </Dialog>
  );
};

export default AuthModal;
