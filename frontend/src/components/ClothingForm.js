import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid
} from '@mui/material';
import axios from 'axios';

const categories = ['Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Shoes', 'Accessories'];
const seasons = ['Spring', 'Summer', 'Fall', 'Winter', 'All Season'];
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];

const ClothingForm = ({ open, onClose, editItem }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    color: '',
    size: '',
    season: '',
    brand: '',
    location: '',
    notes: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editItem) {
        await axios.put(`http://localhost:8080/api/clothes/${editItem.id}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/clothes', formData);
      }
      onClose(true);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="sm" fullWidth>
      <DialogTitle>{editItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="name"
                label="Item Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="category"
                label="Category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="color"
                label="Color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="size"
                label="Size"
                value={formData.size}
                onChange={handleChange}
                required
              >
                {sizes.map(size => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                name="season"
                label="Season"
                value={formData.season}
                onChange={handleChange}
                required
              >
                {seasons.map(season => (
                  <MenuItem key={season} value={season}>{season}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="brand"
                label="Brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="location"
                label="Location in Closet"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="notes"
                label="Notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose(false)}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            {editItem ? 'Save Changes' : 'Add Item'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ClothingForm;
