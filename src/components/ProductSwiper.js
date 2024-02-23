import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ProductSlider = ({ products }) => (
  <Swiper
    slidesPerView={3}
    spaceBetween={30}
    pagination={{ clickable: true }}
    navigation
    scrollbar={{ draggable: true }}
  >
    {products.map((product) => (
      <SwiperSlide key={product.id}>
        <img src={product.image} alt={product.name} />
      </SwiperSlide>
    ))}
  </Swiper>
);
