import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper";
import { isMobile, isDesktop, isTablet } from "react-device-detect";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Slide } from "./Slide";
import { Link } from "react-router-dom";

export const Slider = ({title, data}) => {
  return (
    <div className="w-[90%] h-max mx-auto md:mb-10 mb-4">
      <div className="mb-4 flex items-center justify-between">
      <h1
        className="md:text-3xl text-xl text-pink-500 font-bold"
      >
      {title.toUpperCase()}
      </h1>
      <Link to={`/products?category=${title}&page=1`} className="text-blue-500 underline underline-offset-4">Show more</Link>
      </div>
      <Swiper
        className="w-full h-[50vh] md:h-[48vh]"
        modules={[Navigation, Pagination, Scrollbar]}
        spaceBetween={20}
        slidesPerView={isMobile ? 2 : isTablet ? 3 : 5}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {data?.map(({ name, price, images, _id: id }, index) => (
          <SwiperSlide
            key={id}
            className="drop-shadow-lg h-[2vh] md:h-[30vh]"
          >
            <Slide
              id={id}
              image={images[0]?.url}
              title={name}
              price={price}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
