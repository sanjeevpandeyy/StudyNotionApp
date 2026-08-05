import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";

import {
  Autoplay,
  Navigation,
  Pagination,
  FreeMode,
} from "swiper/modules";

import Course_Card from "./Course_Card";

const CourseSlider = ({ Courses = [] }) => {
  if (!Courses || Courses.length === 0) {
    return (
      <p className="text-center text-xl text-richblack-5">
        No Course Found
      </p>
    );
  }

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={25}
      loop={Courses.length > 1}
      modules={[Autoplay, Navigation, Pagination, FreeMode]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="w-full"
    >
      {Courses.map((course) => (
        <SwiperSlide key={course?._id}>
          <Course_Card
            course={course}
            Height="h-[250px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CourseSlider;

