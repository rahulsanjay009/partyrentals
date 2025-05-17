import { useState, useMemo } from 'react';
import { useNavigate, useLocation, redirect } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Menu,
  MenuItem,
  Box,
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ResponsiveMenu = ({ categories }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const allCategories = useMemo(() => ['ALL', ...categories.map((c) => c.name)], [categories]);

  const currentPath = decodeURIComponent(location.pathname).slice(1).toLowerCase();

  const isActive = (routeName) => {
    const normalizedRoute = routeName.toLowerCase();
    return (
      (normalizedRoute === 'home' && currentPath === '') ||
      currentPath === normalizedRoute
    );
  };

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (category) => {
    const route = category.toLowerCase() === 'home' ? '/' : `/${encodeURIComponent(category)}`;
    navigate(route);
    handleClose();
  };

  return (
    <AppBar position="static" color="success">
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        {/* Logo & Address Section */}
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center'}}>
          <a href='/' style={{ cursor: 'pointer' }}>
            <img
              src="https://res.cloudinary.com/dmm4awbwm/image/upload/f_auto,q_auto/tsee5mrm7cymclmefpic"
              alt="Logo"
              height="50"
              width="50"
            />
          </a>
          <a href='/' style={{ cursor: 'pointer', color:'white', textDecoration:'none' }}>
          <Box onClick={()=>{redirect('/')}}>
            <Typography fontWeight="bold">Sri Krishna</Typography>
            <Typography variant="body2">Party Rentals LLC</Typography>
          </Box>
          </a>
          &nbsp; &nbsp;
          <Typography variant="body2">
            2619 Cordeila Ln, Tracy, CA 95377
          </Typography>
        </Box>

        {/* Navigation Section */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => handleSelect('Home')}
            sx={{
              color: isActive('home') ? 'yellow' : 'white',
              fontWeight: isActive('home') ? 'bold' : 'normal',
            }}
          >
            Home
          </Button>

          <Button
            onClick={handleMenuClick}
            sx={{
              color: currentPath && allCategories.some(cat => cat.toLowerCase() === currentPath) ? 'yellow' : 'white',
              fontWeight: 'normal',
            }}
          >
            Rentals <ArrowDropDownIcon />
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {allCategories.map((name, index) => (
              <MenuItem key={index} onClick={() => handleSelect(name)}>
                {name}
              </MenuItem>
            ))}
          </Menu>

          <Button
            onClick={() => navigate('/about')}
            sx={{
              color: isActive('about') ? 'yellow' : 'white',
              fontWeight: isActive('about') ? 'bold' : 'normal',
            }}
          >
            About Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveMenu;
