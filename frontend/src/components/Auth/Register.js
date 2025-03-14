import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAuth } from '../../context/AuthContext';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'rgba(255, 192, 203, 0.1)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 192, 203, 0.3)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
  border: 0,
  borderRadius: 20,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  marginTop: theme.spacing(2),
  '&:hover': {
    background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
  },
}));

const Register = ({ onToggleView }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(formData.email, formData.password, formData.name);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <StyledPaper elevation={6}>
        <Typography component="h1" variant="h4" sx={{ mb: 3, color: '#FF69B4' }}>
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#FF69B4' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#FF69B4' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#FF69B4' } } }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: '#FF69B4' } } }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <StyledButton
            type="submit"
            fullWidth
          >
            Sign Up
          </StyledButton>
          <Button
            fullWidth
            onClick={onToggleView}
            sx={{
              mt: 2,
              color: '#FF69B4',
              '&:hover': {
                backgroundColor: 'rgba(255, 105, 180, 0.1)',
              },
            }}
          >
            Already have an account? Sign In
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default Register;
