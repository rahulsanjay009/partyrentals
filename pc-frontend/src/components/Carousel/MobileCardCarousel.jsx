import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonItem, IonTitle, IonLabel } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

const MobileCardCarousel = () => {
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
    <>
    <IonItem>
    <IonLabel style={{textAlign:'center'}}> Recent Events </IonLabel>
    </IonItem>
    <Swiper
      spaceBetween={10}
      slidesPerView={1.2}
      breakpoints={{
        640: { slidesPerView: 2.2 },
        992: { slidesPerView: 3.2 },
        1200: { slidesPerView: 4.2 },
      }}
    >
      {cards.map((card, idx) => (
        <SwiperSlide key={idx}>
          <IonCard>
            <IonImg src={card.img} />
            <IonCardHeader>
              <IonCardTitle>{card.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{card.content}</IonCardContent>
          </IonCard>
        </SwiperSlide>
      ))}
    </Swiper>
    </>
  );
};

export default MobileCardCarousel;
