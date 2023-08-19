import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import {CashStack, HouseAdd, HouseCheck, HouseDash, HouseDown} from 'react-bootstrap-icons'
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
          <div className="border-b-[1px] border-b-gray-400 p-16 flex justify-center"><HouseAdd className="text-emerald-400" size={60} /></div>
          <div className="flex justify-center bg-emerald-400 p-[39px] text-2xl font-semibold text-white">
            Houses For Sale
          </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <div className="border-b-[1px] border-b-gray-400 p-16 flex justify-center"><HouseCheck className="text-red-400" size={60} /></div>
          <div className="flex justify-center bg-red-400 p-[39px] text-2xl font-semibold text-white">
            Houses For Rent
          </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <div className="border-b-[1px] border-b-gray-400 p-16 flex justify-center"><CashStack className="text-amber-400" size={60} /></div>
          <div className="flex justify-center bg-amber-400 p-[39px] text-2xl font-semibold text-white">
            Want a Mortgage
          </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <div className="border-b-[1px] border-b-gray-400 p-16 flex justify-center"><HouseDown className="text-cyan-400" size={60} /></div>
          <div className="flex justify-center bg-cyan-400 p-[39px] text-2xl font-semibold text-white">
            Houses For Lease
          </div>
        </SwiperSlide>
        <SwiperSlide className="shadow-lg border-[1px] border-gray-400">
          <div className="border-b-[1px] border-b-gray-400 p-16 flex justify-center"><HouseDash className="text-fuchsia-400" size={60} /></div>
          <div className="flex justify-center bg-fuchsia-400 p-[39px] text-2xl font-semibold text-white">
            Are you a Seller ?
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-center pt-5 pb-5">
        <Link to="/client/contact">
          <Button variant="contained" color="primary">
            Quick Contact Us
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Carousel;
