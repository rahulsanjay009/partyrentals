import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardHeader, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useEffect } from 'react';
import APIService from '../../services/APIService';

const CardCarousel = ({events}) => {


  return (
    <Box padding={'10px'}>      
      <Typography padding={'5px'} fontSize={'30px'}> Recent Events </Typography>
      <Swiper
        spaceBetween={16}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2.2 },
          992: { slidesPerView: 3.2 },
          1200: { slidesPerView: 4.2 },
        }}
      >
        {events.map((card, idx) => (
          <SwiperSlide key={idx}>
            <Card sx={{ maxWidth: 320, margin: 'auto' }}>
              <CardMedia
                component="img"
                height="250"
                image={card.image_url}
                alt={card.event_name}
              />
              <CardHeader title={card.event_name} />
              {/* <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {card.content}
                </Typography>
              </CardContent> */}
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CardCarousel;
