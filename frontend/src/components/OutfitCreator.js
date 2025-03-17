import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
<<<<<<< HEAD
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
=======
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import SaveIcon from '@mui/icons-material/Save';
import axios from '../axiosConfig';

const OutfitCreator = () => {
  const [clothes, setClothes] = useState([]);
  const [currentOutfit, setCurrentOutfit] = useState([]);
  const [savedOutfits, setSavedOutfits] = useState([]);
  const [currentOutfitIndex, setCurrentOutfitIndex] = useState(0);
<<<<<<< HEAD
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
=======
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87

  useEffect(() => {
    fetchClothes();
  }, []);

  const fetchClothes = async () => {
    try {
      const response = await axios.get('/api/clothes');
      setClothes(response.data);
    } catch (error) {
      console.error('Error fetching clothes:', error);
    }
  };

  const addToOutfit = (item) => {
    if (!currentOutfit.find(i => i.id === item.id)) {
      setCurrentOutfit([...currentOutfit, item]);
    }
  };

  const removeFromOutfit = (itemId) => {
    setCurrentOutfit(currentOutfit.filter(item => item.id !== itemId));
  };

  const saveOutfit = () => {
    if (currentOutfit.length > 0) {
      setSavedOutfits([...savedOutfits, currentOutfit]);
      setCurrentOutfit([]);
    }
  };

<<<<<<< HEAD
  const saveOutfitToCalendar = async () => {
    if (!selectedDate || currentOutfit.length === 0) return;

    try {
      await axios.post('/api/outfits/history', {
        date: selectedDate,
        items: currentOutfit,
      });
      setShowDatePicker(false);
      setSelectedDate(null);
      setCurrentOutfit([]);
    } catch (error) {
      console.error('Error saving outfit to calendar:', error);
    }
  };

=======
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
  const navigateOutfits = (direction) => {
    if (direction === 'next') {
      setCurrentOutfitIndex((prev) => 
        prev === savedOutfits.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentOutfitIndex((prev) => 
        prev === 0 ? savedOutfits.length - 1 : prev - 1
      );
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Current Outfit Display */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#FF69B4' }}>
          Current Outfit
        </Typography>
        <AnimatePresence>
          <Grid container spacing={2}>
            {currentOutfit.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    {item.imageUrl && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.imageUrl}
                        alt={item.name}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" sx={{ color: '#FF69B4' }}>
                        {item.name}
                      </Typography>
                      <IconButton
                        onClick={() => removeFromOutfit(item.id)}
                        sx={{ color: '#FF69B4' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
        {currentOutfit.length > 0 && (
<<<<<<< HEAD
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={() => setShowDatePicker(true)}
              sx={{
                background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
                borderRadius: 20,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                },
              }}
            >
              Add to Calendar
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={saveOutfit}
              sx={{
                background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
                borderRadius: 20,
                boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
                color: 'white',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
                },
              }}
            >
              Save Outfit
            </Button>
          </Box>
=======
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveOutfit}
            sx={{
              mt: 2,
              background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
              borderRadius: 20,
              boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
              },
            }}
          >
            Save Outfit
          </Button>
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
        )}
      </Box>

      {/* Saved Outfits Display */}
      {savedOutfits.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 2, color: '#FF69B4' }}>
            Saved Outfits
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              onClick={() => navigateOutfits('prev')}
              sx={{ color: '#FF69B4' }}
            >
              <NavigateBeforeIcon />
            </IconButton>
            <Grid container spacing={2}>
              {savedOutfits[currentOutfitIndex].map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    {item.imageUrl && (
                      <CardMedia
                        component="img"
                        height="200"
                        image={item.imageUrl}
                        alt={item.name}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent>
                      <Typography variant="h6" sx={{ color: '#FF69B4' }}>
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <IconButton 
              onClick={() => navigateOutfits('next')}
              sx={{ color: '#FF69B4' }}
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>
        </Box>
      )}

      {/* Available Clothes */}
      <Typography variant="h5" sx={{ mb: 2, color: '#FF69B4' }}>
        Available Items
      </Typography>
      <Grid container spacing={2}>
        {clothes.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card 
              onClick={() => addToOutfit(item)}
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 4px 20px rgba(255, 105, 180, 0.25)',
                },
              }}
            >
              {item.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={item.imageUrl}
                  alt={item.name}
                  sx={{ objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" sx={{ color: '#FF69B4' }}>
                  {item.name}
                </Typography>
                <Typography color="textSecondary">
                  {item.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
<<<<<<< HEAD

      <Dialog open={showDatePicker} onClose={() => setShowDatePicker(false)}>
        <DialogTitle sx={{ color: '#FF69B4' }}>Choose a Date</DialogTitle>
        <DialogContent>
          <TextField
            type="date"
            value={selectedDate || ''}
            onChange={(e) => setSelectedDate(e.target.value)}
            fullWidth
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDatePicker(false)} sx={{ color: '#FF69B4' }}>
            Cancel
          </Button>
          <Button
            onClick={saveOutfitToCalendar}
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
              color: 'white',
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
=======
>>>>>>> 8fc5ceb51c263e8f93ef7c2058e783adbf346f87
    </Box>
  );
};

export default OutfitCreator;
