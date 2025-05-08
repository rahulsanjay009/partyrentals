import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Card, CardContent, Typography } from '@mui/material';

const CategoryCards = ({ categories = [] }) => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const cardStyle = {
    width: 180,
    m: 1,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 6,
    },
  };

  const imageStyle = {
    width: 100,
    height: 100,
    objectFit: 'cover',
    borderRadius: 4,
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" className="categories_cards">
      {/* All Category Card */}
      <Card onClick={() => handleClick('/ALL')} sx={cardStyle}>
        <CardContent>
          <img
            src="https://thumbs.dreamstime.com/b/event-supplies-flat-glyph-icons-party-equipment-stage-constructions-visual-projector-stanchion-flipchart-marquee-signs-115703883.jpg"
            alt="All"
            style={imageStyle}
          />
          <Typography variant="body1" mt={1}>
            All
          </Typography>
        </CardContent>
      </Card>

      {/* Category Cards */}
      {categories.map((cat) => (
        <Card
          key={cat.id || cat.name}
          onClick={() => handleClick(`/${encodeURIComponent(cat.name)}`)}
          sx={cardStyle}
        >
          <CardContent>
            <img
              src={
                cat.image_url
                  ? cat.image_url
                  : 'https://res.cloudinary.com/dmm4awbwm/image/upload/v1746672352/rlrckqhdnfdnvohwt4xb.png'
              }
              alt={cat.name}
              style={imageStyle}
            />
            <Typography variant="body2" fontSize={14} fontWeight={300} mt={1}>
              {cat.name}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CategoryCards;
