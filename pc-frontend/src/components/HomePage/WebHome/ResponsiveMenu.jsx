import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const open = Boolean(anchorEl);

  const currentPath = decodeURIComponent(location.pathname).replace('/', '') || 'Home';

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (category) => {
    const route = category === 'Home' ? '/' : `/${encodeURIComponent(category)}`;
    navigate(route);
    handleClose();
  };

  const allCategories = useMemo(() => ['ALL', ...categories], [categories]);

  const isActive = (routeName) =>
    currentPath.toLowerCase() === routeName.toLowerCase();

  return (
    <AppBar position="static" color="success">
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', gap: 2 }}>
          <img
            src="https://res.cloudinary.com/dmm4awbwm/image/upload/f_auto,q_auto/tsee5mrm7cymclmefpic"
            alt="Logo"
            height="50"
            width="50"
          />
          <Box>
            <Typography fontWeight="bold">Sri Krishna</Typography>
            <Typography variant="body2">Party Rentals LLC</Typography>
          </Box>
          <Typography variant="body2">
            2619 Cordeila Ln, Tracy, CA 95377
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            onClick={() => handleSelect('Home')}
            sx={{
              color: isActive('Home') ? 'yellow' : 'white',
              fontWeight: isActive('Home') ? 'bold' : 'normal',
            }}
          >
            Home
          </Button>

          <Button
            onClick={handleMenuClick}
            sx={{ color: open || [{name:'ALL'},categories].some((cat) => cat?.name === currentPath) ? 'yellow' : 'white' }}
          >
            Rentals <ArrowDropDownIcon />
          </Button>

          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>            
            {[...allCategories,{name:'ALL'}].map((category, index) => (
              <MenuItem key={index} onClick={() => handleSelect(category?.name)}>
                {category?.name}
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
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveMenu;
