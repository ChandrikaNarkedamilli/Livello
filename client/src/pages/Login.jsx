import React, { useState } from 'react';
import {
  Grid, Typography, TextField, Button, Tabs, Tab, Avatar, Box
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [tabValue, setTabValue] = useState(0); 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    profilePicture: null,
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleTabChange = (newVal) => {
  setTabValue(newVal);
  setFormData({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    profilePicture: null,
    password: '',
  });
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (tabValue === 0) {
    try {
      await dispatch(login({ email: formData.email, password: formData.password })).unwrap();
      navigate('/');
    } catch (err) {
      alert(err);
    }
  } else {
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      fd.append('password', formData.password);
      fd.append('phoneNumber', formData.phoneNumber);
      fd.append('address', formData.address);
      fd.append('role', 'user');
      if (formData.profilePicture) fd.append('profilePicture', formData.profilePicture);

      await axios.post('/auth/register', fd);
      alert('Registration successful, Please login');
      setTabValue(0);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration Failed');
    }
  }
};


  return (
    <Grid container sx={{
      minHeight: '95vh',
      minWidth: '100%',
      background: 'linear-gradient(530deg,rgb(16, 21, 21),rgb(20, 61, 57))',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Grid container   sx={{
        background: 'linear-gradient(30deg,rgb(25, 35, 37),rgb(18, 209, 190))',
        boxShadow: 10,
        borderRadius: 3,
        overflow: 'hidden',
        height: '630px',
        width: '800px',
        marginTop: 0
      }}>
        <Grid   sx={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          flexDirection: 'row',
          color: '#fff',
        }}>
          <Box sx={{
            width: '45%',
            borderRight: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}>
            <Tabs
              orientation="vertical"
              value={tabValue}
              onChange={(e, newVal) => handleTabChange(newVal)}
              sx={{
                '& .MuiTab-root': { color: '#ccc', fontWeight: 500, alignItems: 'flex-start' },
                '& .Mui-selected': { color: '#fff !important' },
                '& .MuiTabs-indicator': { backgroundColor: 'white' },
              }}
            >
              <Tab label="LOGIN" />
              <Tab label="REGISTER" />
            </Tabs>
          </Box>

          <Box sx={{
            width: '55%',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {tabValue === 0 ? 'LOGIN' : 'REGISTER'}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {tabValue === 0 ? 'Welcome back, please login' : 'Register to take advantage of our features'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} mt={2}>
              {tabValue === 0 ? (
                <>
                  <TextField
                    fullWidth label="Email" name="email" type="email" variant="outlined" value={formData.email} 
                    margin="normal" autoComplete='email' onChange={handleChange} required sx={textFieldStyle}
                  />
                  <TextField
                    fullWidth label="Password" name="password" type="password" variant="outlined" value={formData.password} 
                    margin="normal" autoComplete='password' onChange={handleChange} required sx={textFieldStyle}
                  />
                  <Button type="submit" variant="contained" sx={buttonStyle}>LOGIN</Button>
                  <Button onClick={() => setTabValue(1)} sx={{
                    mt: 2, color: '#fff', textTransform: 'none',
                    '&:hover': { textDecoration: 'underline' },
                  }}>New user? Register here</Button>
                </>
              ) : (
                <>
                  <TextField fullWidth label="User Name" name="name" variant="outlined"
                    margin="normal" onChange={handleChange} required sx={textFieldStyle}
                  />
                  <TextField fullWidth label="Email" name="email" type="email" variant="outlined"
                    margin="normal" onChange={handleChange} required sx={textFieldStyle}
                  />
                  <TextField fullWidth label="Phone Number" name="phoneNumber" type="tel" variant="outlined"
                    margin="normal" onChange={handleChange} required sx={textFieldStyle}
                  />
                  <TextField fullWidth label="Address" name="address" variant="outlined" multiline
                    rows={2} margin="normal" onChange={handleChange} required sx={textFieldStyle}
                  />
                  <TextField fullWidth label="Password" name="password" type="password" variant="outlined"
                    margin="normal" onChange={handleChange} required sx={textFieldStyle}
                  />

                  <Box textAlign="center" my={2} sx={{
                    display: 'flex', flexDirection: 'row',
                    alignItems: 'center', justifyContent: 'center', gap: 2,
                  }}>
                    <Button variant="contained" component="label" sx={buttonStyle}>
                      Upload Profile Picture
                      <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>
                    <Button type="submit" variant="contained" sx={buttonStyle}>
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

const textFieldStyle = {
  input: { color: '#fff' },
  label: { color: '#ccc' },
  '& label.Mui-focused': { color: '#fff' },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: '#ccc' },
    '&:hover fieldset': { borderColor: '#fff' },
    '&.Mui-focused fieldset': { borderColor: '#fff' },
  },
};

const buttonStyle = {
  mt: 2, borderRadius: 3, color: 'rgb(17, 138, 126)',
  backgroundColor: 'white', '&:hover': {
    backgroundColor: '#e0e0e0', border: '1px solid #fff'
  },
};

export default Login;
