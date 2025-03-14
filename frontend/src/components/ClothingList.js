import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Button,
  CardActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import axios from '../axiosConfig';
import ClothingForm from './ClothingForm';

const ClothingList = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('/api/clothes');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/clothes/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setOpenForm(true);
  };

  const handleCloseForm = (refresh) => {
    setOpenForm(false);
    setEditItem(null);
    if (refresh) {
      fetchItems();
    }
  };

  const filteredItems = items.filter(item =>
    Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <>
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
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
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: '#FF69B4',
              },
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          sx={{
            background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
            borderRadius: 20,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
            color: 'white',
            minWidth: '120px',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
            },
          }}
        >
          Add Item
        </Button>
      </Box>

      <Grid container spacing={3}>
        {filteredItems.map((item) => (
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
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" component="div" sx={{ color: '#FF69B4' }}>
                    {item.name}
                  </Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>Category: {item.category}</Typography>
                <Typography color="textSecondary" gutterBottom>Color: {item.color}</Typography>
                <Typography color="textSecondary" gutterBottom>Size: {item.size}</Typography>
                <Typography color="textSecondary" gutterBottom>Season: {item.season}</Typography>
                {item.brand && (
                  <Typography color="textSecondary" gutterBottom>Brand: {item.brand}</Typography>
                )}
                {item.location && (
                  <Typography color="textSecondary" gutterBottom>Location: {item.location}</Typography>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end', p: 1 }}>
                <IconButton
                  onClick={() => handleEdit(item)}
                  size="small"
                  sx={{ color: '#FF69B4' }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(item.id)}
                  size="small"
                  sx={{ color: '#FF69B4' }}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <ClothingForm
        open={openForm}
        onClose={handleCloseForm}
        editItem={editItem}
      />
    </>
  );
};

export default ClothingList;
