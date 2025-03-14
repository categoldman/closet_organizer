import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import AuthModal from './AuthModal';

const StyledBox = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #FFE4E1 0%, #FFF0F5 100%)',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
  borderRadius: 20,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
  color: 'white',
  padding: '15px 40px',
  fontSize: '1.2rem',
  marginTop: theme.spacing(4),
  '&:hover': {
    background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
  },
}));

const AuthPage = () => {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  return (
    <StyledBox>
      <Container maxWidth="sm">
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            color: '#FF69B4',
            fontWeight: 'bold',
            marginBottom: 2,
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          Closet Organizer
        </Typography>
        <Typography 
          variant="h5" 
          sx={{ 
            color: '#666',
            marginBottom: 4,
            lineHeight: 1.6
          }}
        >
          Your personal digital wardrobe assistant. Create stunning outfits and organize your clothes with style!
        </Typography>
        <StyledButton onClick={() => setAuthModalOpen(true)}>
          Get Started
        </StyledButton>
      </Container>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </StyledBox>
  );
};

export default AuthPage;
