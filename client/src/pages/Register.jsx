import React, { useState } from 'react';
import {
  Grid, Typography, TextField, Button, Tabs, Tab, Avatar, Box
} from '@mui/material';

const RegisterPage = () => {
  const [tabValue, setTabValue] = useState(1); // 0 = Login, 1 = Register
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    profilePicture: null,
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        background: 'linear-gradient(30deg,rgb(25, 35, 37),rgb(18, 209, 190))',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container item xs={11} md={8} sx={{ boxShadow: 10, borderRadius: 3, overflow: 'hidden', height: '600px', width: '800px' }}>

        {/* Left Section with Tabs + Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            flexDirection: 'row',
            color: '#fff',
          }}
        >
          {/* Tabs Section */}
          <Box
            sx={{
              width: '45%',
              borderRight: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
            }}
          >
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={(e, newVal) => setTabValue(newVal)}
              TabIndicatorProps={{ style: { backgroundColor: 'white' } }} // white underline
              sx={{
    '& .MuiTab-root': {
      color: '#ccc', // Inactive tab color
      fontWeight: 500,
      alignItems: 'flex-start',
    },
    '& .Mui-selected': {
      color: '#fff !important', // Force active tab label white
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'white', // Underline color
    },
  }}
            >
              <Tab label="LOGIN" />
              <Tab label="REGISTER" />
            </Tabs>
          </Box>

          {/* Form Section */}
          <Box
            sx={{
              width: '55%',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {tabValue === 0 ? 'LOGIN' : 'REGISTER'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {tabValue === 0 ? 'Welcome back, please login' : 'Register to take advantage of our features'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} mt={2}>
              {/* If Login Tab */}
              {tabValue === 0 && (
                <>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    required
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    required
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      mt: 2,
                      borderRadius: 3,
                      color: 'rgb(17, 138, 126)',
                      backgroundColor: 'white',
                      '&:hover': { backgroundColor: '#e0e0e0', border: '1px solid #fff' },
                    }}
                  >
                    LOGIN
                  </Button>
                  <Button
                    onClick={() => setTabValue(1)}
                    sx={{
                      mt: 2,
                      color: '#fff',
                      textTransform: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    New user? Register here
                  </Button>
                  
                </>
              )}

              {/* If Register Tab */}
              {tabValue === 1 && (
                <>
                  <TextField
                    fullWidth
                    label="User Name"
                    name="name"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    required
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    required
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    variant="outlined"
                    margin="normal"
                    onChange={handleChange}
                    required
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={2}
                    onChange={handleChange}
                    required
                    sx={{
                      input: { color: '#fff' },
                      label: { color: '#ccc' },
                      '& label.Mui-focused': { color: '#fff' },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': { borderColor: '#ccc' },
                        '&:hover fieldset': { borderColor: '#fff' },
                        '&.Mui-focused fieldset': { borderColor: '#fff' },
                      },
                    }}
                  />

                  <Box
                    textAlign="center"
                    my={2}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        borderRadius: 3,
                        color: 'rgb(17, 138, 126)',
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#e0e0e0', border: '1px solid #fff' },
                      }}
                    >
                      Upload Profile Picture
                      <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        borderRadius: 3,
                        color: 'rgb(17, 138, 126)',
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#e0e0e0', border: '1px solid #fff' },
                      }}
                    >
                      REGISTER
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
