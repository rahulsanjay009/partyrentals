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
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const visibleCategories = categories.slice(0, 6);
  const overflowCategories = categories.slice(6); 

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Sri Krishna Party Rentals
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
            {visibleCategories.map((category, index) => (
                <Button key={index} color="inherit" onClick={()=>selectCategory(category)}>
                {category}
                </Button>
            ))}

            {overflowCategories.length > 0 && (
                <>
                <Button color="inherit" onClick={handleMenuClick}>
                    More <ArrowDropDownIcon/>
                </Button>
                <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {overflowCategories.map((category, index) => (
                    <MenuItem key={index} onClick={()=>{ selectCategory(category); handleClose();}}>
                        {category}
                    </MenuItem>
                    ))}
                </Menu>
                </>
            )}
            </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveMenu;
