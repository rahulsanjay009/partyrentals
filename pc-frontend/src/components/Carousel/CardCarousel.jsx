import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardHeader, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const CardCarousel = () => {
  const cards = [
    {
      title: 'Baby Gender Reveal',
      img: 'https://res.cloudinary.com/dmm4awbwm/image/upload/v1746409559/1737398583_ce2e392e3bf1af55c475_qjklhx.jpg',
    //   content: 'Make birthdays unforgettable with our party setups.',
    },
    {
      title: 'Pongal',
      img: 'https://res.cloudinary.com/dmm4awbwm/image/upload/v1746409565/1737398160_d3ed20cfbee9d77692bd_mqpf2b.jpg',
    //   content: 'Elegant decorations and rentals for your big day.',
    }
  ];

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
        {cards.map((card, idx) => (
          <SwiperSlide key={idx}>
            <Card sx={{ maxWidth: 320, margin: 'auto' }}>
              <CardMedia
                component="img"
                height="250"
                image={card.img}
                alt={card.title}
              />
              <CardHeader title={card.title} />
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
