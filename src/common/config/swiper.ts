import { Autoplay, Pagination } from "swiper/modules";
import type { SwiperProps } from "swiper/react";

export const swiperConfig: SwiperProps = {
  modules: [Autoplay, Pagination],
  breakpoints: {
    640: { slidesPerView: 1 },
    1024: { slidesPerView: 2 },
    1440: { slidesPerView: 3 },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  pagination: { clickable: true },
  style: { width: "100%", height: "600px" },
  className: "rounded-md overflow-hidden border border-pink-100",
  grabCursor: true,
  spaceBetween: 0,
};
