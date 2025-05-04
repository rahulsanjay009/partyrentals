import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const ResponsiveMenu = ({ categories, selectCategory }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Home'); // Track active category
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (category) => {
    setActiveCategory(category);
    selectCategory(category);
    handleClose();
  };

  // const visibleCategories = categories.slice(0, 5); 
  const overflowCategories = ['ALL',...categories]; // Any remaining categories

  return (
    <AppBar position="static" color='success'>
      <Toolbar>
        <Box variant="h6" sx={{ display:'flex',flexGrow: 1, gap: '10px', alignItems:'center' }}>
          <img src="https://res.cloudinary.com/dmm4awbwm/image/upload/f_auto,q_auto/tsee5mrm7cymclmefpic" alt="Kitten" height="50" width="50" />
          <Typography className="styled-text">
            <span className="upper-text">Sri Krishna</span><br/>
            <span className="lower-text">Party Rentals LLC</span>
          </Typography>

          <Typography> 2619 Cordeila Ln, Tracy, CA 95377  United States </Typography>  
        </Box>
        
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          {/* ALL Button */}
          <Button
            key="ALL"
            onClick={() => handleSelect('Home')}
            sx={{
              color: 'white',
              backgroundColor: activeCategory === 'Home' ? 'success.light' : 'transparent',
              fontWeight: activeCategory === 'Home' ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: activeCategory === 'Home' ? 'success.main' : 'rgba(255,255,255,0.1)',
              },
            }}
          >
            Home
          </Button>

          

          {/* "More" button for overflow categories */}
          {overflowCategories.length > 0 && (
            <>
              <Button
                onClick={handleMenuClick}
                sx={{
                  color: 'white',
                  backgroundColor: overflowCategories.includes(activeCategory) ? 'success.light' : 'transparent',
                  fontWeight: overflowCategories.includes(activeCategory) ? 'bold' : 'normal',
                  '&:hover': {
                    backgroundColor: overflowCategories.includes(activeCategory) ? 'success.main' : 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                {activeCategory == 'Home' ? 'Rentals' : activeCategory} <ArrowDropDownIcon />
              </Button>

              {/* Dropdown menu for additional categories */}
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {overflowCategories.map((category, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => handleSelect(category)}
                    sx={{
                      fontWeight: activeCategory === category ? 'bold' : 'normal',
                    }}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Menu>
              <Button
            key="ALL"
            onClick={() => handleSelect('Home')}
            sx={{
              color: 'white',
              backgroundColor: activeCategory === 'About' ? 'success.light' : 'transparent',
              fontWeight: activeCategory === 'About' ? 'bold' : 'normal',
              '&:hover': {
                backgroundColor: activeCategory === 'About' ? 'success.main' : 'rgba(255,255,255,0.1)',
              },
            }}
          >
            About
          </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveMenu;
