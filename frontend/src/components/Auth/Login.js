import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  Tabs,
  Tab,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const { login, register, error, loading } = useAuth();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === 0) {
      await login(formData.email, formData.password);
    } else {
      await register(formData.email, formData.password, formData.username);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(255, 105, 180, 0.2)',
            width: '100%',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            sx={{
              mb: 3,
              '& .MuiTabs-indicator': {
                backgroundColor: '#FF69B4',
              },
            }}
          >
            <Tab
              label="Sign In"
              sx={{
                color: activeTab === 0 ? '#FF69B4' : 'inherit',
                '&.Mui-selected': {
                  color: '#FF69B4',
                },
              }}
            />
            <Tab
              label="Register"
              sx={{
                color: activeTab === 1 ? '#FF69B4' : 'inherit',
                '&.Mui-selected': {
                  color: '#FF69B4',
                },
              }}
            />
          </Tabs>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            {activeTab === 1 && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formData.username}
                onChange={handleInputChange}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#FF69B4',
                    },
                  },
                }}
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF69B4',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete={activeTab === 0 ? 'current-password' : 'new-password'}
              value={formData.password}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#FF69B4',
                  },
                },
              }}
            />
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
                mb: 2,
                background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
                borderRadius: 20,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                },
              }}
            >
              {loading ? 'Please wait...' : activeTab === 0 ? 'Sign In' : 'Register'}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
