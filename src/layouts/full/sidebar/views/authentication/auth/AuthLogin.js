import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomTextField from '../../../../../../components/forms/theme-elements/CustomTextField';
import { APIURL } from 'src/Url';

const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields are mandatory.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const response = await axios.post(`${APIURL}api/admin/login`, {
        email: email,
        password: password,
      });

      toast.success(response.data.message, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Store the access token
      localStorage.setItem('AdminToken', response.data.accesstoken);
      navigate('/getOrders');

      // Reset the form
      setEmail('');
      setPassword('');
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error('An error occurred. Please try again.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: 'white',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px',
      }}
    >
      {/* Toast Notification Container */}
      <ToastContainer />

      {title ? (
        <Typography fontWeight="700" variant="h4" mb={2} textAlign="center">
          {title}
        </Typography>
      ) : null}

      {subtext ? (
        <Typography variant="subtitle2" mb={2} textAlign="center" color="textSecondary">
          {subtext}
        </Typography>
      ) : null}

      <Stack spacing={3}>
        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="email"
            mb="5px"
          >
            Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>

        <Box>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            component="label"
            htmlFor="password"
            mb="5px"
          >
            Password
          </Typography>
          <CustomTextField
            id="password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Stack justifyContent="space-between" direction="row" alignItems="center">
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember this Device" />
          </FormGroup>
        </Stack>

        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleSubmit}
          sx={{ padding: '10px 0', fontWeight: 'bold', fontSize: '16px' }}
        >
          Sign In
        </Button>

        {subtitle && (
          <Typography variant="body2" mt={2} textAlign="center" color="textSecondary">
            {subtitle}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default AuthLogin;
