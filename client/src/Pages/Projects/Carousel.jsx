import React from "react";
import { Link } from "react-router-dom";
import { CashStack, HouseAdd, HouseCheck, HouseDash, HouseDown } from "react-bootstrap-icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Carousel.css";

import { EffectCoverflow, Pagination, Navigation, Keyboard } from "swiper/modules";
import { Button } from "@mui/material";

const Carousel = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        keyboard={{
          enabled: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation, Keyboard]}
        className="mySwiper">
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <img src="#" />
        </SwiperSlide>
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <img src="#" />
        </SwiperSlide>
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <img src="#" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Carousel;
