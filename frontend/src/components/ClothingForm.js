import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import axios from '../axiosConfig';

const ClothingForm = ({ open, onClose, editItem }) => {
  const initialFormState = {
    name: '',
    category: '',
    color: '',
    size: '',
    season: '',
    brand: '',
    description: '',
    imageUrl: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
      setImagePreview(editItem.imageUrl);
    } else {
      setFormData(initialFormState);
      setImagePreview(null);
      setSelectedFile(null);
    }
    setError(null);
  }, [editItem, open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      let imageUrl = formData.imageUrl;

      if (selectedFile) {
        const formDataWithImage = new FormData();
        formDataWithImage.append('file', selectedFile);
        const uploadResponse = await axios.post('/api/upload', formDataWithImage, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        imageUrl = uploadResponse.data.url;
      }

      const dataToSubmit = {
        ...formData,
        category: formData.category.toUpperCase(),
        season: formData.season.toUpperCase(),
        imageUrl,
      };

      if (editItem) {
        await axios.put(`/api/clothes/${editItem.id}`, dataToSubmit);
      } else {
        await axios.post('/api/clothes', dataToSubmit);
      }

      onClose(true);
    } catch (error) {
      console.error('Error saving item:', error);
      setError(error.response?.data?.message || 'Error saving item. Please try again.');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={() => onClose(false)}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(255, 105, 180, 0.2)',
        },
      }}
    >
      <DialogTitle sx={{ 
        background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
        color: 'white',
        textAlign: 'center',
      }}>
        {editItem ? 'Edit Item' : 'Add New Item'}
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: 2,
            mt: 1,
          }}
        >
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            required
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#FF69B4',
                },
              },
            }}
          />

          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              label="Category"
            >
              <MenuItem value="TOP">Tops</MenuItem>
              <MenuItem value="BOTTOM">Bottoms</MenuItem>
              <MenuItem value="DRESS">Dresses</MenuItem>
              <MenuItem value="OUTERWEAR">Outerwear</MenuItem>
              <MenuItem value="SHOES">Shoes</MenuItem>
              <MenuItem value="ACCESSORIES">Accessories</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="color"
            label="Color"
            value={formData.color}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            name="size"
            label="Size"
            value={formData.size}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <FormControl fullWidth required>
            <InputLabel>Season</InputLabel>
            <Select
              name="season"
              value={formData.season}
              onChange={handleInputChange}
              label="Season"
            >
              <MenuItem value="SPRING">Spring</MenuItem>
              <MenuItem value="SUMMER">Summer</MenuItem>
              <MenuItem value="FALL">Fall</MenuItem>
              <MenuItem value="WINTER">Winter</MenuItem>
              <MenuItem value="ALL">All Seasons</MenuItem>
            </Select>
          </FormControl>

          <TextField
            name="brand"
            label="Brand"
            value={formData.brand}
            onChange={handleInputChange}
            fullWidth
            required
          />

          <TextField
            name="description"
            label="Description"
            value={formData.description || ''}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
          />

          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-upload">
            <Button
              component="span"
              variant="outlined"
              fullWidth
              sx={{
                borderColor: '#FF69B4',
                color: '#FF69B4',
                '&:hover': {
                  borderColor: '#FF1493',
                  backgroundColor: 'rgba(255, 105, 180, 0.1)',
                },
              }}
            >
              Upload Image
            </Button>
          </label>

          {imagePreview && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                }}
              />
            </Box>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={() => onClose(false)}
          sx={{
            color: '#FF69B4',
            '&:hover': {
              backgroundColor: 'rgba(255, 105, 180, 0.1)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #FF69B4 30%, #FFB6C1 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 180, .3)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF1493 30%, #FF69B4 90%)',
            },
          }}
        >
          {editItem ? 'Save Changes' : 'Add Item'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClothingForm;
