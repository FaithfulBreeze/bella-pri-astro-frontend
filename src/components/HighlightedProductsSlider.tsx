import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import { swiperConfig } from "../common/config/swiper";
import type { IProduct } from "../interfaces/product";

export interface Props {
  products: IProduct[];
}

export default function HighlightedProductsSlider({ products }: Props) {
  return (
    <div className="block mx-auto max-w-[1480px] px-7">
      <Swiper {...swiperConfig}>
        {products.map((product) => (
          <SwiperSlide key={product.id} className="overflow-hidden">
            <ProductCard {...product} isSliderCard={true} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
