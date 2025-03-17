import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from '../axiosConfig';

const OutfitCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [outfits, setOutfits] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  useEffect(() => {
    const fetchMonthOutfits = async () => {
      const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      
      try {
        const response = await axios.get('/api/outfits/history', {
          params: {
            startDate: startDate.toISOString().split('T')[0],
            endDate: endDate.toISOString().split('T')[0],
          },
        });
        
        const outfitsByDate = {};
        response.data.forEach(outfit => {
          outfitsByDate[outfit.date] = outfit;
        });
        setOutfits(outfitsByDate);
      } catch (error) {
        console.error('Error fetching outfits:', error);
      }
    };

    fetchMonthOutfits();
  }, [currentDate]);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const dateStr = date.toISOString().split('T')[0];
    setSelectedDate(date);
    setSelectedOutfit(outfits[dateStr] || null);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, backgroundColor: 'rgba(255, 105, 180, 0.05)' }}>
        {/* Calendar Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'space-between' }}>
          <IconButton onClick={handlePrevMonth} sx={{ color: '#FF69B4' }}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h5" sx={{ color: '#FF69B4', fontWeight: 'bold' }}>
            {formatDate(currentDate)}
          </Typography>
          <IconButton onClick={handleNextMonth} sx={{ color: '#FF69B4' }}>
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Calendar Grid */}
        <Grid container spacing={1}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <Grid item xs={12/7} key={day}>
              <Typography
                align="center"
                sx={{ color: '#FF69B4', fontWeight: 'bold', mb: 1 }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
          
          {getDaysInMonth(currentDate).map((date, index) => (
            <Grid item xs={12/7} key={index}>
              {date && (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Paper
                    onClick={() => handleDateClick(date)}
                    sx={{
                      p: 1,
                      height: '80px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      backgroundColor: outfits[date.toISOString().split('T')[0]] 
                        ? 'rgba(255, 105, 180, 0.1)'
                        : 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 105, 180, 0.2)',
                      },
                    }}
                  >
                    <Typography>{date.getDate()}</Typography>
                    {outfits[date.toISOString().split('T')[0]] && (
                      <EventIcon sx={{ color: '#FF69B4', mt: 1 }} />
                    )}
                  </Paper>
                </motion.div>
              )}
            </Grid>
          ))}
        </Grid>

        {/* Outfit Dialog */}
        <Dialog
          open={Boolean(selectedOutfit)}
          onClose={() => {
            setSelectedDate(null);
            setSelectedOutfit(null);
          }}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ color: '#FF69B4' }}>
            {selectedDate && new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(selectedDate)}
          </DialogTitle>
          <DialogContent>
            {selectedOutfit && (
              <Grid container spacing={2}>
                {selectedOutfit.items.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Card>
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
                        <Typography variant="body2" color="text.secondary">
                          {item.category}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setSelectedDate(null);
                setSelectedOutfit(null);
              }}
              sx={{
                color: '#FF69B4',
                '&:hover': {
                  backgroundColor: 'rgba(255, 105, 180, 0.1)',
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default OutfitCalendar;
