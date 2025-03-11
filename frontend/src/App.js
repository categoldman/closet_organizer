import React, { useState } from 'react';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  CssBaseline,
  createTheme,
  ThemeProvider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ClothingList from './components/ClothingList';
import ClothingForm from './components/ClothingForm';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddClick = () => {
    setEditItem(null);
    setOpenForm(true);
  };

  const handleEditItem = (item) => {
    setEditItem(item);
    setOpenForm(true);
  };

  const handleCloseForm = (refresh) => {
    setOpenForm(false);
    setEditItem(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Closet Organizer
            </Typography>
            <Button
              color="inherit"
              startIcon={<AddIcon />}
              onClick={handleAddClick}
            >
              Add Item
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search your closet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <ClothingList onEdit={handleEditItem} />
          <ClothingForm
            open={openForm}
            onClose={handleCloseForm}
            editItem={editItem}
          />
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
