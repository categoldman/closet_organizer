import React, { useState } from 'react';
import { Container, Box, AppBar, Tabs, Tab, Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ClothingList from './components/ClothingList';
import OutfitCreator from './components/OutfitCreator';
<<<<<<< HEAD
import OutfitCalendar from './components/OutfitCalendar';
=======
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
import AuthPage from './components/Auth/AuthPage';
import { AuthProvider, useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF69B4',
    },
    secondary: {
      main: '#FFB6C1',
    },
  },
});

const AppContent = () => {
  const [tabValue, setTabValue] = useState(0);
  const { user, logout } = useAuth();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              flexGrow: 1,
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: '#fff',
                },
              },
            }}
          >
            <Tab label="My Closet" />
            <Tab label="Create Outfits" />
<<<<<<< HEAD
            <Tab label="Outfit Calendar" />
=======
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
          </Tabs>
          <Button
            color="inherit"
            onClick={logout}
            sx={{
              ml: 2,
              borderRadius: 20,
              border: '1px solid white',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </AppBar>

      <Container sx={{ mt: 4 }}>
<<<<<<< HEAD
        {tabValue === 0 ? (
          <ClothingList />
        ) : tabValue === 1 ? (
          <OutfitCreator />
        ) : (
          <OutfitCalendar />
        )}
=======
        {tabValue === 0 ? <ClothingList /> : <OutfitCreator />}
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
      </Container>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
