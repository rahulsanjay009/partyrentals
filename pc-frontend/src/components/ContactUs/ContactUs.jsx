import React from 'react';
import { Box, IconButton, Typography, Link } from '@mui/material';
import { WhatsApp, Instagram, OutgoingMail as Gmail } from '@mui/icons-material'; // Import MUI icons for WhatsApp, Instagram, and Gmail

const ContactUs = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        backgroundColor: '#282c34',
        color: 'white',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Contact Us
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
        {/* WhatsApp Icon */}
        <IconButton
          component={Link}
          href="https://wa.me/16692688087" // Replace with your WhatsApp number link
          target="_blank"
          color="inherit"
        >
          <WhatsApp />
        </IconButton>

        {/* Instagram Icon */}
        <IconButton
          component={Link}
          href="https://instagram.com/skprllc" // Replace with your Instagram profile link
          target="_blank"
          color="inherit"
        >
          <Instagram />
        </IconButton>

        {/* Gmail Icon */}
        <IconButton
          component={Link}
          href="mailto:srikrishnapartyrentals@gmail.com" // Replace with your Gmail address
          target="_blank"
          color="inherit"
        >
          <Gmail />
        </IconButton>
      </Box>

      <Typography variant="body2" sx={{ marginTop: '12px' }}>
        © {new Date().getFullYear()} Sri Krishna Party Rentals LLC. All rights reserved.
      </Typography>
    </Box>
  );
};

export default ContactUs;
